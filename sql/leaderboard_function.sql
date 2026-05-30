-- =============================================
-- Leaderboard + "where am I" for the Claude Code game
-- Project: nulazmrhbsnclvuafztt
-- Run this in Supabase SQL Editor (after dashboard_stats_function.sql).
--
-- Returns ONLY anonymized aggregates: a top-10 list of XP values (no names,
-- no emails, no user_ids) plus the caller's rank/percentile computed from the
-- XP they pass in. SECURITY DEFINER so it can rank across all rows past RLS
-- while exposing nothing personal. EXECUTE granted to anon.
--
-- Percentile/rank are computed among ACTIVE players (xp > 0) so the
-- encouragement is meaningful — the many anonymous "just opened it" rows
-- with 0 XP don't dilute the standings.
-- =============================================

CREATE OR REPLACE FUNCTION get_leaderboard(my_xp integer DEFAULT 0)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH active AS (
    SELECT xp FROM claude_code_game_players WHERE xp > 0
  ),
  ranked AS (
    SELECT xp, ROW_NUMBER() OVER (ORDER BY xp DESC) AS rank
    FROM active
  )
  SELECT jsonb_build_object(
    -- total active players (xp > 0)
    'total_active', (SELECT count(*) FROM active),
    -- top 10 anonymized: [{rank, xp}, ...]
    'top', (SELECT COALESCE(jsonb_agg(jsonb_build_object('rank', rank, 'xp', xp)
                            ORDER BY rank), '[]'::jsonb)
            FROM ranked WHERE rank <= 10),
    -- caller's standing among active players
    'my_rank', (SELECT count(*) FROM active WHERE xp > my_xp) + 1,
    -- percentile = % of active players you are at-or-ahead-of (0..100)
    'my_percentile', (
      SELECT CASE WHEN count(*) = 0 THEN 100
        ELSE round(100.0 * (SELECT count(*) FROM active WHERE xp <= my_xp) / count(*))::int
      END FROM active
    )
  );
$$;

GRANT EXECUTE ON FUNCTION get_leaderboard(integer) TO anon, authenticated;
