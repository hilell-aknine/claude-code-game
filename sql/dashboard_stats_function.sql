-- =============================================
-- Dashboard aggregate stats for the Claude Code game
-- Project: nulazmrhbsnclvuafztt
-- Run this in Supabase SQL Editor.
--
-- Returns ONLY aggregate numbers (counts/averages/time series).
-- No emails, no individual rows. SECURITY DEFINER lets it read past RLS
-- while exposing nothing personal; EXECUTE is granted to anon so the
-- public dashboard page can call it via supabase.rpc('get_game_stats').
-- =============================================

-- Helper FIRST (get_game_stats references it): count keys in a JSONB object
-- (completed_lessons looks like {"1-1":true, "1-2":true, ...})
CREATE OR REPLACE FUNCTION jsonb_object_keys_count(j jsonb)
RETURNS int
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT CASE
    WHEN j IS NULL OR jsonb_typeof(j) <> 'object' THEN 0
    ELSE (SELECT count(*)::int FROM jsonb_object_keys(j))
  END;
$$;

CREATE OR REPLACE FUNCTION get_game_stats()
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH p AS (
    SELECT
      xp,
      level,
      streak,
      longest_streak,
      total_correct,
      total_wrong,
      perfect_lessons,
      jsonb_object_keys_count(completed_lessons) AS lessons_done,
      created_at,
      updated_at
    FROM claude_code_game_players
  ),
  days AS (
    SELECT generate_series(
      (now() AT TIME ZONE 'Asia/Jerusalem')::date - INTERVAL '29 days',
      (now() AT TIME ZONE 'Asia/Jerusalem')::date,
      INTERVAL '1 day'
    )::date AS day
  ),
  series AS (
    SELECT
      d.day,
      (SELECT count(*) FROM claude_code_game_players c
         WHERE (c.created_at AT TIME ZONE 'Asia/Jerusalem')::date = d.day) AS new_players,
      (SELECT count(*) FROM claude_code_game_players c
         WHERE (c.updated_at AT TIME ZONE 'Asia/Jerusalem')::date = d.day) AS active_players
    FROM days d
    ORDER BY d.day
  )
  SELECT jsonb_build_object(
    'totals', jsonb_build_object(
      'total_players', (SELECT count(*) FROM p),
      'active_7d',     (SELECT count(*) FROM p WHERE updated_at >= now() - INTERVAL '7 days'),
      'new_today',     (SELECT count(*) FROM p WHERE (created_at AT TIME ZONE 'Asia/Jerusalem')::date = (now() AT TIME ZONE 'Asia/Jerusalem')::date),
      'new_7d',        (SELECT count(*) FROM p WHERE created_at >= now() - INTERVAL '7 days')
    ),
    'engagement', jsonb_build_object(
      'avg_xp',         (SELECT COALESCE(round(avg(xp))::int, 0) FROM p),
      'max_xp',         (SELECT COALESCE(max(xp), 0) FROM p),
      'avg_lessons',    (SELECT COALESCE(round(avg(lessons_done), 1), 0) FROM p),
      'avg_streak',     (SELECT COALESCE(round(avg(streak), 1), 0) FROM p),
      'longest_streak', (SELECT COALESCE(max(longest_streak), 0) FROM p),
      'avg_accuracy',   (SELECT COALESCE(round(100.0 * sum(total_correct) / NULLIF(sum(total_correct) + sum(total_wrong), 0))::int, 0) FROM p)
    ),
    'funnel', jsonb_build_object(
      'entered',         (SELECT count(*) FROM p),
      'started',         (SELECT count(*) FROM p WHERE xp > 0 OR lessons_done > 0),
      'finished_lesson', (SELECT count(*) FROM p WHERE lessons_done >= 1),
      'returned',        (SELECT count(*) FROM p WHERE streak >= 2 OR (updated_at AT TIME ZONE 'Asia/Jerusalem')::date > (created_at AT TIME ZONE 'Asia/Jerusalem')::date)
    ),
    'series', (SELECT COALESCE(jsonb_agg(jsonb_build_object(
                 'day', to_char(day, 'YYYY-MM-DD'),
                 'new', new_players,
                 'active', active_players)), '[]'::jsonb) FROM series)
  );
$$;

-- Expose ONLY the aggregate function to the public (anon) role
GRANT EXECUTE ON FUNCTION get_game_stats() TO anon, authenticated;
