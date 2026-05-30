// game.js - Claude Code Master Game Engine
// Based on NLP Master game engine pattern — local-first with optional Supabase cloud sync

// ═══════════════════════════════════════
// Supabase Init (optional cloud sync — anonymous-first)
// The anon key is public by design and protected by Row Level Security.
// ═══════════════════════════════════════
const SUPABASE_URL = 'https://nulazmrhbsnclvuafztt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51bGF6bXJoYnNuY2x2dWFmenR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMjI3NTMsImV4cCI6MjA5NTU5ODc1M30.ygc95aAKFnDDp9x16kMmvfYYpFLXQNRYwd_H2etMvO8';
const _supabase = (window.supabase && SUPABASE_URL && SUPABASE_ANON_KEY)
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : {
        auth: {
            getSession: async () => ({ data: { session: null } }),
            signInWithOAuth: async () => ({ error: { message: 'לא הוגדר חיבור לשרת. המשך במצב אורח.' } }),
            signInWithPassword: async () => ({ error: { message: 'לא הוגדר חיבור לשרת. המשך במצב אורח.' } }),
            signUp: async () => ({ error: { message: 'לא הוגדר חיבור לשרת. המשך במצב אורח.' } }),
            signOut: async () => ({}),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
        },
        from: () => ({
            select: () => ({ eq: () => ({ single: async () => ({ data: null, error: true }) }) }),
            upsert: async () => ({}),
            update: () => ({ eq: async () => ({}) })
        })
    };

const HEART_RECOVERY_MINUTES = 20;

// ═══════════════════════════════════════
// Sound Manager (Web Audio API)
// ═══════════════════════════════════════
class SoundManager {
    constructor() {
        this.enabled = localStorage.getItem('ccGameSound') !== 'off';
        this.ctx = null;
    }
    getContext() {
        if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        return this.ctx;
    }
    play(type) {
        if (!this.enabled) return;
        try {
            const ctx = this.getContext();
            if (ctx.state === 'suspended') ctx.resume();
            switch (type) {
                case 'correct': this._playCorrect(ctx); break;
                case 'wrong': this._playWrong(ctx); break;
                case 'levelUp': this._playLevelUp(ctx); break;
                case 'achievement': this._playAchievement(ctx); break;
                case 'click': this._playClick(ctx); break;
            }
        } catch (e) { /* audio not supported */ }
    }
    _playTone(ctx, freq, duration, type = 'sine', gain = 0.3) {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = type; osc.frequency.value = freq;
        g.gain.value = gain;
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.connect(g); g.connect(ctx.destination);
        osc.start(ctx.currentTime); osc.stop(ctx.currentTime + duration);
    }
    _playCorrect(ctx) {
        this._playTone(ctx, 523, 0.15, 'sine', 0.2);
        setTimeout(() => this._playTone(ctx, 659, 0.15, 'sine', 0.2), 100);
        setTimeout(() => this._playTone(ctx, 784, 0.2, 'sine', 0.25), 200);
    }
    _playWrong(ctx) { this._playTone(ctx, 200, 0.3, 'triangle', 0.2); }
    _playLevelUp(ctx) {
        [523, 587, 659, 784, 880].forEach((f, i) => {
            setTimeout(() => this._playTone(ctx, f, 0.2, 'sine', 0.2), i * 100);
        });
    }
    _playAchievement(ctx) {
        [784, 988, 1175].forEach((f, i) => {
            setTimeout(() => this._playTone(ctx, f, 0.25, 'sine', 0.15), i * 150);
        });
    }
    _playClick(ctx) { this._playTone(ctx, 600, 0.05, 'sine', 0.1); }
    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem('ccGameSound', this.enabled ? 'on' : 'off');
        return this.enabled;
    }
}

// ═══════════════════════════════════════
// Main Game Class
// ═══════════════════════════════════════
class ClaudeCodeGame {
    constructor() {
        this.currentScreen = 'home';
        this.currentModule = null;
        this.currentLesson = null;
        this.currentExerciseIndex = 0;
        this.selectedAnswer = null;
        this.exerciseAnswered = false;
        this.isDailyChallenge = false;
        this.lessonMistakes = 0;
        this.onboardingStep = 0;
        this.heartTimerInterval = null;
        this.userMenuOpen = false;

        this.sound = new SoundManager();
        this.user = null;
        this.saveDebounceTimer = null;

        this.playerData = this.getDefaultPlayerData();

        // Mentor messages
        this.mentorMessages = {
            welcome: [
                "היי! אני קלוד, המנטור שלך. מוכנים למסע?",
                "ברוכים הבאים! מוכנים להפוך למאסטרים?",
                "שמח לראות אותך! יחד נשלוט בטרמינל."
            ],
            moduleIntro: {
                1: "הבסיס של הכל! בואו נבין מה זה Claude Code ולמה זה משנה את הדרך שבה מפתחים.",
                2: "עכשיו נלמד לעבוד עם קבצים ופרויקטים — הכוח האמיתי של Claude Code!",
                3: "בטיחות קודמת! נבין את מערכת ההרשאות ואיך Claude Code שומר עליכם.",
                4: "הוראות טובות = תוצאות מדהימות. בואו נלמד prompt engineering!",
                5: "כלים מתקדמים — Hooks, MCP, ועולם שלם של אפשרויות!",
                6: "סוכנים, עבודה במקביל, ואורקסטרציה — הרמה הגבוהה!",
                7: "Extended Thinking, Memory ו-Best Practices — אתם כמעט מאסטרים!"
            },
            lessonStart: [
                "מעולה! בואו נתחיל. קחו את הזמן.",
                "אני לצידך בכל שלב. בהצלחה!",
                "זוכרים — כל תרגיל מקרב אתכם לשליטה מלאה ב-Claude Code!"
            ],
            correctAnswer: [
                "מדהים! בדיוק ככה!",
                "וואו, את/ה ממש תופס/ת את זה!",
                "נכון מאוד! אתם הולכים להיות Claude Code masters!",
                "יופי! הטרמינל כבר מפחד ממכם!",
                "מצוין! את/ה בדרך להיות מפתח AI מעולה!"
            ],
            wrongAnswer: [
                "לא נורא! טעויות הן חלק מהלמידה.",
                "קרוב! בפעם הבאה נסו לחשוב על ההקשר.",
                "לא בדיוק, אבל זו הזדמנות ללמוד משהו חדש!",
                "אל דאגה, גם Claude Code לומד מטעויות!"
            ],
            encouragement: [
                "את/ה עושה עבודה נהדרת!",
                "כל תרגיל מקרב אותך לשליטה ב-CLI!",
                "אני גאה בך! ממשיכים!",
                "המשיכו ככה, Master!"
            ],
            lessonComplete: [
                "איזה כיף! סיימת שיעור נוסף!",
                "מעולה! עוד צעד בדרך לשליטה מלאה!",
                "אלופים! הידע הזה ישנה לכם את העבודה!"
            ]
        };

        // Achievements
        this.achievements = [
            { id: 'first_lesson', title: 'Hello World', desc: 'סיימת את השיעור הראשון', icon: '💻', condition: (d) => Object.keys(d.completedLessons).length >= 1 },
            { id: 'five_lessons', title: 'Code Explorer', desc: 'סיימת 5 שיעורים', icon: '🔍', condition: (d) => Object.keys(d.completedLessons).length >= 5 },
            { id: 'ten_lessons', title: 'Power User', desc: 'סיימת 10 שיעורים', icon: '⚡', condition: (d) => Object.keys(d.completedLessons).length >= 10 },
            { id: 'all_lessons', title: 'Claude Code Master', desc: 'סיימת את כל השיעורים', icon: '🏆', condition: (d) => Object.keys(d.completedLessons).length >= 15 },
            { id: 'streak_3', title: 'התמדה', desc: '3 ימים ברצף', icon: '🔥', condition: (d) => d.streak >= 3 },
            { id: 'streak_7', title: 'שבוע של קידוד', desc: '7 ימים ברצף', icon: '⭐', condition: (d) => d.streak >= 7 },
            { id: 'xp_500', title: 'צובר ניסיון', desc: 'צברת 500 XP', icon: '🎖️', condition: (d) => d.xp >= 500 },
            { id: 'xp_2000', title: 'Terminal Warrior', desc: 'צברת 2000 XP', icon: '🏅', condition: (d) => d.xp >= 2000 },
            { id: 'perfect_lesson', title: 'Zero Bugs', desc: 'סיימת שיעור בלי טעויות', icon: '✨', condition: (d) => d.perfectLessons >= 1 },
            { id: 'accuracy_80', title: 'דיוק גבוה', desc: 'דיוק של 80% ומעלה', icon: '🎯', condition: (d) => d.totalCorrectAnswers > 0 && (d.totalCorrectAnswers / (d.totalCorrectAnswers + d.totalWrongAnswers)) >= 0.8 }
        ];

        this.initRipple();
        this.init();
    }

    // ═══════════════════════════════════════
    // Init
    // ═══════════════════════════════════════
    async init() {
        // Local-first: load instantly so the game never blocks on the network
        this.playerData = this.loadFromLocalStorage() || this.getDefaultPlayerData();

        // Restore an existing cloud session in the background (optional login)
        try {
            const { data: { session } } = await _supabase.auth.getSession();
            if (session?.user) {
                this.user = session.user;
                await this.loadFromCloud(session.user);
            } else {
                // No session yet — sign in anonymously so every visitor is counted
                // (silent, no signup friction). Guests who later log in merge via _mergeProgress.
                const { data: anon } = await _supabase.auth.signInAnonymously();
                if (anon?.user) {
                    this.user = anon.user;
                    await this.loadFromCloud(anon.user);
                }
            }
        } catch (e) { /* offline / anonymous-auth disabled — stay local */ }

        // Handle Google OAuth redirect landing back on the page
        _supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user && !this.user) {
                this.user = session.user;
                await this.loadFromCloud(session.user);
                this.updateStatsDisplay();
                this.updateAuthUI();
                if (this.currentScreen === 'home') this.renderHomeScreen();
            }
        });

        document.getElementById('loading-screen').style.display = 'none';

        // Show landing page for first-time visitors, or if no lessons completed
        const hasPlayed = this.playerData.onboardingComplete || Object.keys(this.playerData.completedLessons).length > 0;
        if (!hasPlayed && !localStorage.getItem('ccLandingSeen')) {
            this.showLanding();
            return;
        }

        this.startGame();
    }

    showLanding() {
        document.getElementById('landing-page').style.display = 'block';
        document.getElementById('app-header').style.display = 'none';
        document.getElementById('main-content').style.display = 'none';
        document.getElementById('progress-wrapper').style.display = 'none';
        document.getElementById('feedback-panel').style.display = 'none';
        document.getElementById('footer-actions').style.display = 'none';
        document.getElementById('modal-overlay').style.display = 'none';
    }

    hideLanding() {
        document.getElementById('landing-page').style.display = 'none';
        document.getElementById('feedback-panel').style.display = '';
        localStorage.setItem('ccLandingSeen', '1');
        this.startGame();
    }

    backToLanding() {
        this.hideUserMenu();
        if (this.heartTimerInterval) clearInterval(this.heartTimerInterval);
        this.showLanding();
        window.scrollTo(0, 0);
    }

    startGame() {
        document.getElementById('app-header').style.display = 'block';
        document.getElementById('main-content').style.display = 'block';
        document.getElementById('progress-wrapper').style.display = 'block';

        this.updateStreak();
        this.recoverHearts();
        this.updateStatsDisplay();
        this.updateAuthUI();
        this.startHeartTimer();

        if (!this.playerData.onboardingComplete) {
            this.showOnboarding();
        } else {
            this.renderHomeScreen();
        }
    }

    // ═══════════════════════════════════════
    // Ripple
    // ═══════════════════════════════════════
    initRipple() {
        document.addEventListener('click', (e) => {
            const target = e.target.closest('.btn, .option-btn, .word-chip, .compare-card, .module-card, .lesson-item, .daily-challenge-btn, .home-path-node:not(.locked)');
            if (!target) return;
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            const rect = target.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            target.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    }

    // ═══════════════════════════════════════
    // Data Persistence (LocalStorage)
    // ═══════════════════════════════════════
    getDefaultPlayerData() {
        return {
            xp: 0, level: 1, hearts: 5, maxHearts: 5,
            streak: 0, lastPlayDate: null, lastHeartLost: null,
            completedLessons: {}, achievements: [],
            totalCorrectAnswers: 0, totalWrongAnswers: 0,
            perfectLessons: 0, perfectLessonsList: [],
            dailyChallengeCompleted: null,
            onboardingComplete: false, longestStreak: 0
        };
    }

    loadFromLocalStorage() {
        try {
            const saved = localStorage.getItem('claudeCodeGameData');
            if (saved) return JSON.parse(saved);
        } catch (e) { /* ignore */ }
        return null;
    }

    savePlayerData() {
        // Always persist locally first (instant, offline-safe)
        localStorage.setItem('claudeCodeGameData', JSON.stringify(this.playerData));

        // Debounced cloud sync when logged in
        if (this.user) {
            clearTimeout(this.saveDebounceTimer);
            this.saveDebounceTimer = setTimeout(() => this.saveToCloud(), 1000);
        }
    }

    // ═══════════════════════════════════════
    // Cloud Sync (Supabase — optional)
    // ═══════════════════════════════════════
    _rowFromPlayerData() {
        const d = this.playerData;
        return {
            user_id: this.user.id,
            xp: d.xp, level: d.level,
            hearts: d.hearts, max_hearts: d.maxHearts,
            streak: d.streak, longest_streak: d.longestStreak || 0,
            last_play_date: d.lastPlayDate, last_heart_lost: d.lastHeartLost,
            completed_lessons: d.completedLessons || {},
            achievements: d.achievements || [],
            perfect_lessons_list: d.perfectLessonsList || [],
            total_correct: d.totalCorrectAnswers || 0,
            total_wrong: d.totalWrongAnswers || 0,
            perfect_lessons: d.perfectLessons || 0,
            daily_challenge_completed: d.dailyChallengeCompleted
        };
    }

    async loadFromCloud(user) {
        try {
            const { data, error } = await _supabase
                .from('claude_code_game_players')
                .select('*')
                .eq('user_id', user.id)
                .single();

            if (data && !error) {
                // Merge cloud with local — keep the further-along progress per field
                const local = this.playerData;
                const cloud = {
                    xp: data.xp || 0, level: data.level || 1,
                    hearts: data.hearts ?? 5, maxHearts: data.max_hearts || 5,
                    streak: data.streak || 0, longestStreak: data.longest_streak || 0,
                    lastPlayDate: data.last_play_date || null,
                    lastHeartLost: data.last_heart_lost || null,
                    completedLessons: data.completed_lessons || {},
                    achievements: data.achievements || [],
                    perfectLessonsList: data.perfect_lessons_list || [],
                    totalCorrectAnswers: data.total_correct || 0,
                    totalWrongAnswers: data.total_wrong || 0,
                    perfectLessons: data.perfect_lessons || 0,
                    dailyChallengeCompleted: data.daily_challenge_completed || null,
                    onboardingComplete: true
                };
                this.playerData = this._mergeProgress(local, cloud);
                localStorage.setItem('claudeCodeGameData', JSON.stringify(this.playerData));
                // Push the merged result back so both sides converge
                await this.saveToCloud();
                return;
            }

            // No cloud row yet — create one from whatever we have locally
            await _supabase.from('claude_code_game_players')
                .upsert(this._rowFromPlayerData(), { onConflict: 'user_id' });
        } catch (e) {
            console.warn('Cloud load failed, staying local', e);
        }
    }

    _mergeProgress(local, cloud) {
        // Field-level "best of both" so logging in never loses guest progress
        const merged = { ...cloud };
        merged.xp = Math.max(local.xp || 0, cloud.xp || 0);
        merged.level = Math.max(local.level || 1, cloud.level || 1);
        merged.streak = Math.max(local.streak || 0, cloud.streak || 0);
        merged.longestStreak = Math.max(local.longestStreak || 0, cloud.longestStreak || 0);
        merged.totalCorrectAnswers = Math.max(local.totalCorrectAnswers || 0, cloud.totalCorrectAnswers || 0);
        merged.totalWrongAnswers = Math.max(local.totalWrongAnswers || 0, cloud.totalWrongAnswers || 0);
        merged.perfectLessons = Math.max(local.perfectLessons || 0, cloud.perfectLessons || 0);
        merged.completedLessons = { ...(cloud.completedLessons || {}), ...(local.completedLessons || {}) };
        merged.achievements = Array.from(new Set([...(cloud.achievements || []), ...(local.achievements || [])]));
        merged.perfectLessonsList = Array.from(new Set([...(cloud.perfectLessonsList || []), ...(local.perfectLessonsList || [])]));
        merged.hearts = Math.max(local.hearts ?? 5, cloud.hearts ?? 5);
        merged.maxHearts = cloud.maxHearts || local.maxHearts || 5;
        merged.dailyChallengeCompleted = cloud.dailyChallengeCompleted || local.dailyChallengeCompleted || null;
        merged.lastPlayDate = cloud.lastPlayDate || local.lastPlayDate || null;
        merged.onboardingComplete = true;
        return merged;
    }

    async saveToCloud() {
        if (!this.user) return;
        try {
            await _supabase.from('claude_code_game_players')
                .upsert({ ...this._rowFromPlayerData(), updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
        } catch (e) {
            console.warn('Cloud save failed', e);
        }
    }

    // ═══════════════════════════════════════
    // Heart Recovery
    // ═══════════════════════════════════════
    recoverHearts() {
        if (this.playerData.hearts >= this.playerData.maxHearts) {
            this.playerData.lastHeartLost = null; return;
        }
        if (!this.playerData.lastHeartLost) return;
        const lostTime = new Date(this.playerData.lastHeartLost).getTime();
        const elapsed = Date.now() - lostTime;
        const recovered = Math.floor(elapsed / (HEART_RECOVERY_MINUTES * 60 * 1000));
        if (recovered > 0) {
            this.playerData.hearts = Math.min(this.playerData.maxHearts, this.playerData.hearts + recovered);
            if (this.playerData.hearts >= this.playerData.maxHearts) {
                this.playerData.lastHeartLost = null;
            } else {
                this.playerData.lastHeartLost = new Date(lostTime + recovered * HEART_RECOVERY_MINUTES * 60 * 1000).toISOString();
            }
            this.savePlayerData();
        }
    }

    startHeartTimer() {
        if (this.heartTimerInterval) clearInterval(this.heartTimerInterval);
        this.heartTimerInterval = setInterval(() => this.updateHeartTimer(), 1000);
        this.updateHeartTimer();
    }

    updateHeartTimer() {
        const bar = document.getElementById('heart-timer-bar');
        if (this.playerData.hearts >= this.playerData.maxHearts || !this.playerData.lastHeartLost) {
            bar.style.display = 'none'; return;
        }
        bar.style.display = 'block';
        const lostTime = new Date(this.playerData.lastHeartLost).getTime();
        const elapsed = Date.now() - lostTime;
        const totalMs = HEART_RECOVERY_MINUTES * 60 * 1000;
        const remaining = totalMs - (elapsed % totalMs);
        const progress = ((totalMs - remaining) / totalMs) * 100;
        const mins = Math.floor(remaining / 60000);
        const secs = Math.floor((remaining % 60000) / 1000);
        document.getElementById('heart-timer-text').innerHTML = `<i class="fa-solid fa-heart"></i> +1 בעוד ${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        document.getElementById('heart-timer-fill').style.width = progress + '%';
        if (elapsed >= totalMs) { this.recoverHearts(); this.updateStatsDisplay(); }
    }

    // ═══════════════════════════════════════
    // Onboarding
    // ═══════════════════════════════════════
    showOnboarding() {
        this.onboardingStep = 0;
        document.getElementById('onboarding-overlay').style.display = 'flex';
        this.renderOnboardingStep();
    }

    renderOnboardingStep() {
        const steps = [
            { icon: '<i class="fa-solid fa-terminal"></i>', title: 'ברוכים הבאים ל-Claude Code Master!', text: 'כאן תלמדו את כל מה שצריך לדעת על Claude Code — הכלי שמשנה את הדרך שמפתחים עובדים.' },
            { icon: '<i class="fa-solid fa-graduation-cap"></i>', title: '15 שיעורים, 7 מודולים', text: 'ממבוא בסיסי ועד טכניקות מתקדמות — Agent SDK, MCP, Hooks ועוד. כל שיעור עם תרגילים אינטראקטיביים.' },
            { icon: '<i class="fa-solid fa-rocket"></i>', title: 'בואו נתחיל!', text: 'צברו XP, שמרו על סטריק יומי, ופתחו הישגים. מוכנים להיות Claude Code Masters?' }
        ];
        const step = steps[this.onboardingStep];
        document.getElementById('onboarding-step-content').innerHTML = `
            <span class="onboarding-icon">${step.icon}</span>
            <h2>${step.title}</h2>
            <p>${step.text}</p>
        `;
        document.getElementById('onboarding-dots').innerHTML = steps.map((_, i) => {
            let cls = 'onboarding-dot';
            if (i < this.onboardingStep) cls += ' done';
            if (i === this.onboardingStep) cls += ' active';
            return `<div class="${cls}"></div>`;
        }).join('');
        document.getElementById('onboarding-btn').textContent = this.onboardingStep === steps.length - 1 ? 'בואו נתחיל!' : 'הבא';
    }

    nextOnboardingStep() {
        this.sound.play('click');
        this.onboardingStep++;
        if (this.onboardingStep >= 3) {
            document.getElementById('onboarding-overlay').style.display = 'none';
            this.playerData.onboardingComplete = true;
            this.savePlayerData();
            this.renderHomeScreen();
        } else {
            this.renderOnboardingStep();
        }
    }

    skipOnboarding() {
        document.getElementById('onboarding-overlay').style.display = 'none';
        this.playerData.onboardingComplete = true;
        this.savePlayerData();
        this.renderHomeScreen();
    }

    // ═══════════════════════════════════════
    // Screen Transitions
    // ═══════════════════════════════════════
    transitionTo(renderFn) {
        const container = document.getElementById('game-container');
        container.classList.add('fade-out');
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'instant' });
            renderFn.call(this);
            container.classList.remove('fade-out');
        }, 200);
    }

    // ═══════════════════════════════════════
    // Sound & User Menu
    // ═══════════════════════════════════════
    toggleSound() {
        const enabled = this.sound.toggle();
        document.getElementById('sound-toggle').innerHTML = enabled ? '<i class="fa-solid fa-volume-high"></i>' : '<i class="fa-solid fa-volume-xmark"></i>';
        if (enabled) this.sound.play('click');
    }

    toggleUserMenu() {
        this.userMenuOpen = !this.userMenuOpen;
        document.getElementById('user-menu').style.display = this.userMenuOpen ? 'block' : 'none';
        if (this.userMenuOpen) {
            setTimeout(() => {
                const handler = (e) => {
                    if (!e.target.closest('.user-menu') && !e.target.closest('.user-menu-btn')) {
                        this.hideUserMenu(); document.removeEventListener('click', handler);
                    }
                };
                document.addEventListener('click', handler);
            }, 10);
        }
    }

    hideUserMenu() {
        this.userMenuOpen = false;
        document.getElementById('user-menu').style.display = 'none';
    }

    // ═══════════════════════════════════════
    // Auth (optional cloud login)
    // ═══════════════════════════════════════
    updateAuthUI() {
        const emailEl = document.getElementById('user-menu-email');
        const loginBtn = document.getElementById('menu-login-btn');
        const logoutBtn = document.getElementById('menu-logout-btn');
        // Anonymous users are tracked for analytics but treated as guests in the UI
        const realUser = this.user && !this.user.is_anonymous;
        if (emailEl) emailEl.textContent = realUser ? (this.user.email || 'מחובר') : 'מצב אורח (נשמר במכשיר)';
        if (loginBtn) loginBtn.style.display = realUser ? 'none' : 'flex';
        if (logoutBtn) logoutBtn.style.display = realUser ? 'flex' : 'none';
        // Header register button: show only for guests
        const headerReg = document.getElementById('header-register-btn');
        if (headerReg) headerReg.style.display = realUser ? 'none' : 'inline-flex';
    }

    showAuthModal() {
        this.hideUserMenu();
        const body = `
            <div style="text-align:right; display:flex; flex-direction:column; gap:10px;">
                <p style="opacity:.8; font-size:.9em; margin:0 0 4px;">התחבר כדי לשמור את ההתקדמות ולסנכרן בין מכשירים. ההתקדמות הנוכחית שלך תישמר.</p>
                <input id="cc-auth-email" type="email" placeholder="אימייל" style="padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.05);color:inherit;">
                <input id="cc-auth-pass" type="password" placeholder="סיסמה (6+ תווים)" style="padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.05);color:inherit;">
                <div id="cc-auth-error" style="display:none;color:#ff6b6b;font-size:.85em;"></div>
                <div style="display:flex; gap:8px;">
                    <button class="btn btn-primary" style="flex:1;" onclick="game.loginWithEmail()">כניסה</button>
                    <button class="btn btn-secondary" style="flex:1;" onclick="game.registerWithEmail()">הרשמה</button>
                </div>
            </div>`;
        this.showModal('<i class="fa-solid fa-cloud-arrow-up"></i>', 'שמירה בענן', '', '');
        document.getElementById('modal-text').innerHTML = body;
        document.getElementById('modal-buttons').innerHTML = `<button class="btn btn-secondary" onclick="game.closeModal()">סגירה</button>`;
    }

    _authError(msg) {
        const el = document.getElementById('cc-auth-error');
        if (el) { el.textContent = msg; el.style.display = 'block'; }
    }

    async loginWithGoogle() {
        const { error } = await _supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: window.location.origin + window.location.pathname }
        });
        if (error) this._authError(error.message);
    }

    async loginWithEmail() {
        const email = document.getElementById('cc-auth-email')?.value.trim();
        const password = document.getElementById('cc-auth-pass')?.value;
        if (!email || !password) { this._authError('נא למלא אימייל וסיסמה'); return; }
        const { data, error } = await _supabase.auth.signInWithPassword({ email, password });
        if (error) { this._authError('אימייל או סיסמה שגויים'); return; }
        await this._onLoginSuccess(data.user);
    }

    async registerWithEmail() {
        const email = document.getElementById('cc-auth-email')?.value.trim();
        const password = document.getElementById('cc-auth-pass')?.value;
        if (!email || !password) { this._authError('נא למלא אימייל וסיסמה'); return; }
        if (password.length < 6) { this._authError('הסיסמה חייבת להכיל לפחות 6 תווים'); return; }
        const { data, error } = await _supabase.auth.signUp({ email, password });
        if (error) { this._authError(error.message); return; }
        if (!data.user) { this._authError('נשלח אימייל אימות. אשר אותו והתחבר.'); return; }
        await this._onLoginSuccess(data.user);
    }

    async _onLoginSuccess(user) {
        this.user = user;
        await this.loadFromCloud(user);
        this.closeModal();
        this.updateAuthUI();
        this.updateStatsDisplay();
        this.renderHomeScreen();
    }

    async logout() {
        await _supabase.auth.signOut();
        this.user = null;
        this.hideUserMenu();
        this.updateAuthUI();
    }

    async resetProgress() {
        if (!confirm('בטוחים? כל ההתקדמות תימחק!')) return;
        localStorage.removeItem('claudeCodeGameData');
        this.playerData = this.getDefaultPlayerData();
        // Wipe the cloud row too when logged in
        if (this.user) {
            try {
                await _supabase.from('claude_code_game_players')
                    .upsert({ ...this._rowFromPlayerData(), updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
            } catch (e) { /* ignore */ }
        }
        this.savePlayerData();
        this.updateStatsDisplay();
        this.renderHomeScreen();
        this.hideUserMenu();
    }

    // ═══════════════════════════════════════
    // Mentor
    // ═══════════════════════════════════════
    createMentorHTML(message, showName = true) {
        return `
            <div class="mentor-container mentor-enter">
                <div class="mentor-avatar">
                    <i class="fa-solid fa-terminal"></i>
                </div>
                <div class="mentor-bubble">
                    ${showName ? '<div class="mentor-name">Claude — המנטור שלך</div>' : ''}
                    <div class="mentor-message">${message}</div>
                </div>
            </div>
        `;
    }

    getRandomMessage(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

    // ═══════════════════════════════════════
    // Streak
    // ═══════════════════════════════════════
    updateStreak() {
        const today = new Date().toDateString();
        const lastPlay = this.playerData.lastPlayDate;
        if (lastPlay) {
            const lastDate = new Date(lastPlay);
            const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
            if (lastPlay === today) { /* already played */ }
            else if (lastDate.toDateString() === yesterday.toDateString()) {
                this.playerData.streak++; this.playerData.lastPlayDate = today; this.savePlayerData();
            } else {
                this.playerData.streak = 1; this.playerData.lastPlayDate = today; this.savePlayerData();
            }
        } else {
            this.playerData.streak = 1; this.playerData.lastPlayDate = today; this.savePlayerData();
        }
        if (this.playerData.streak > (this.playerData.longestStreak || 0)) {
            this.playerData.longestStreak = this.playerData.streak; this.savePlayerData();
        }
    }

    // ═══════════════════════════════════════
    // Stats Display
    // ═══════════════════════════════════════
    updateStatsDisplay() {
        document.getElementById('xp-value').textContent = this.playerData.xp;
        document.getElementById('streak-value').textContent = this.playerData.streak;
        this.renderHearts();
    }

    renderHearts() {
        const container = document.getElementById('hearts-container');
        let html = '';
        for (let i = 0; i < this.playerData.maxHearts; i++) {
            html += `<span class="heart ${i >= this.playerData.hearts ? 'empty' : ''}"><i class="fa-solid fa-heart"></i></span>`;
        }
        container.innerHTML = html;
    }

    // ═══════════════════════════════════════
    // Level System
    // ═══════════════════════════════════════
    calculateLevel() {
        const thresholds = [0, 100, 250, 500, 1000, 2000, 4000, 8000];
        for (let i = thresholds.length - 1; i >= 0; i--) {
            if (this.playerData.xp >= thresholds[i]) return i + 1;
        }
        return 1;
    }

    getLevelName(level) {
        const names = ['Beginner', 'Explorer', 'Developer', 'Engineer', 'Senior', 'Architect', 'Master', 'Claude Whisperer'];
        return names[level - 1] || 'Claude Whisperer';
    }

    getLevelProgressInfo() {
        const thresholds = [0, 100, 250, 500, 1000, 2000, 4000, 8000];
        const lv = this.playerData.level;
        const xp = this.playerData.xp;
        const curr = thresholds[lv - 1] || 0;
        const next = thresholds[lv] || thresholds[thresholds.length - 1];
        const progress = Math.min(100, ((xp - curr) / (next - curr)) * 100);
        return { progress, xpToNext: Math.max(0, next - xp), currentXP: xp, nextThreshold: next };
    }

    // ═══════════════════════════════════════
    // Achievements
    // ═══════════════════════════════════════
    renderAchievementsGrid() {
        return this.achievements.slice(0, 8).map(a => {
            const unlocked = this.playerData.achievements.includes(a.id);
            return `<div class="achievement-item ${unlocked ? 'unlocked' : 'locked'}">
                <div class="achievement-icon">${a.icon}</div>
                <div class="achievement-name">${a.title}</div>
            </div>`;
        }).join('');
    }

    checkAchievements() {
        let newList = [];
        this.achievements.forEach(a => {
            if (!this.playerData.achievements.includes(a.id) && a.condition(this.playerData)) {
                this.playerData.achievements.push(a.id);
                newList.push(a);
            }
        });
        if (newList.length > 0) {
            this.savePlayerData();
            this.showAchievementPopup(newList[0]);
        }
    }

    showAchievementPopup(a) {
        this.sound.play('achievement');
        const popup = document.createElement('div');
        popup.className = 'achievement-popup';
        popup.innerHTML = `
            <div class="achievement-popup-icon">${a.icon}</div>
            <div class="achievement-popup-content">
                <div class="achievement-popup-title">הישג חדש!</div>
                <div class="achievement-popup-name">${a.title}</div>
                <div class="achievement-popup-desc">${a.desc}</div>
            </div>
        `;
        document.body.appendChild(popup);
        setTimeout(() => popup.classList.add('show'), 100);
        setTimeout(() => { popup.classList.remove('show'); setTimeout(() => popup.remove(), 500); }, 3000);
    }

    // ═══════════════════════════════════════
    // XP & Level Up
    // ═══════════════════════════════════════
    addXP(amount) {
        const oldLevel = this.playerData.level;
        this.playerData.xp += amount;
        this.playerData.level = this.calculateLevel();
        this.savePlayerData();
        this.updateStatsDisplay();
        if (this.playerData.level > oldLevel) {
            this.showLevelUp();
        }
    }

    showLevelUp() {
        this.sound.play('levelUp');
        const overlay = document.getElementById('level-up-overlay');
        document.getElementById('level-up-text').innerHTML = `
            <div style="font-size: 3rem;">🎉</div>
            <div style="font-size: 1.5rem; font-weight: 700;">רמה ${this.playerData.level}!</div>
            <div>${this.getLevelName(this.playerData.level)}</div>
        `;
        overlay.style.display = 'flex';
        setTimeout(() => { overlay.style.display = 'none'; }, 2500);
    }

    // ═══════════════════════════════════════
    // Daily Challenge
    // ═══════════════════════════════════════
    startDailyChallenge() {
        const today = new Date().toDateString();
        if (this.playerData.dailyChallengeCompleted === today) return;
        const available = MODULES.filter((m, i) => i === 0 || this.getModuleProgress(MODULES[i - 1].id) >= 50);
        if (available.length === 0) { this.transitionTo(() => this.openModule(1)); return; }
        const random = available[Math.floor(Math.random() * available.length)];
        this.isDailyChallenge = true;
        this.dailyChallengeExercisesLeft = 3;
        this.transitionTo(() => this.openModule(random.id));
    }

    completeDailyChallenge() {
        this.playerData.dailyChallengeCompleted = new Date().toDateString();
        this.addXP(50);
        this.savePlayerData();
        this.isDailyChallenge = false;
        this.showModal('<i class="fa-solid fa-bullseye"></i>', 'אתגר יומי הושלם!', 'קיבלת +50 XP בונוס! חזרו מחר לאתגר חדש.', `<button class="btn btn-primary" onclick="game.closeModal()">מעולה!</button>`);
    }

    // ═══════════════════════════════════════
    // Modal
    // ═══════════════════════════════════════
    showModal(icon, title, text, buttons) {
        document.getElementById('modal-icon').innerHTML = icon;
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-text').textContent = text;
        document.getElementById('modal-buttons').innerHTML = buttons;
        document.getElementById('modal-overlay').classList.add('show');
    }

    closeModal() {
        document.getElementById('modal-overlay').classList.remove('show');
    }

    // ═══════════════════════════════════════
    // Stats Screen
    // ═══════════════════════════════════════
    showStats() {
        this.hideUserMenu();
        const d = this.playerData;
        const totalQ = d.totalCorrectAnswers + d.totalWrongAnswers;
        const accuracy = totalQ > 0 ? Math.round((d.totalCorrectAnswers / totalQ) * 100) : 0;
        const lessonsCount = Object.keys(d.completedLessons).length;
        this.showModal('📊', 'הסטטיסטיקות שלי', '', '');
        document.getElementById('modal-text').innerHTML = `
            <div style="text-align: right; line-height: 2;">
                <div>⭐ XP: <strong>${d.xp}</strong></div>
                <div>🔥 סטריק: <strong>${d.streak}</strong> ימים (שיא: ${d.longestStreak || 0})</div>
                <div>📚 שיעורים: <strong>${lessonsCount}/15</strong></div>
                <div>🎯 דיוק: <strong>${accuracy}%</strong></div>
                <div>✅ תשובות נכונות: <strong>${d.totalCorrectAnswers}</strong></div>
                <div>✨ שיעורים מושלמים: <strong>${d.perfectLessons}</strong></div>
                <div>🏅 הישגים: <strong>${d.achievements.length}/${this.achievements.length}</strong></div>
            </div>
        `;
        document.getElementById('modal-buttons').innerHTML = `<button class="btn btn-primary" onclick="game.closeModal()">סגירה</button>`;
    }

    // ═══════════════════════════════════════
    // Module Progress
    // ═══════════════════════════════════════
    getModuleProgress(moduleId) {
        const module = MODULES.find(m => m.id === moduleId);
        if (!module) return 0;
        const total = module.lessons.length;
        const done = module.lessons.filter(l => this.playerData.completedLessons[`${moduleId}-${l.id}`]).length;
        return Math.round((done / total) * 100);
    }

    // ═══════════════════════════════════════
    // Home Screen
    // ═══════════════════════════════════════
    renderHomeScreen() {
        this.currentScreen = 'home';
        const container = document.getElementById('game-container');
        const welcomeMessage = this.getRandomMessage(this.mentorMessages.welcome);
        const levelInfo = this.getLevelProgressInfo();
        const dailyDone = this.playerData.dailyChallengeCompleted === new Date().toDateString();

        document.getElementById('progress-container').style.display = 'none';
        document.getElementById('footer-actions').style.display = 'none';

        let pathHtml = '';

        // Daily challenge
        pathHtml += `
            <div class="home-path-node special" onclick="game.startDailyChallenge()">
                <div class="home-path-icon">${dailyDone ? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-solid fa-bullseye"></i>'}</div>
                <div class="home-path-info">
                    <div class="home-path-label">אתגר יומי</div>
                    <div class="home-path-title">${dailyDone ? 'הושלם היום!' : 'השלימו 3 תרגילים'}</div>
                    <div class="home-path-desc">${dailyDone ? 'כל הכבוד! חזרו מחר' : 'קבלו בונוס XP!'}</div>
                </div>
                <div class="home-path-arrow">${dailyDone ? '' : '←'}</div>
            </div>`;

        // Modules
        MODULES.forEach((module, index) => {
            const progress = this.getModuleProgress(module.id);
            const isCompleted = progress === 100;
            const isLocked = index > 0 && this.getModuleProgress(MODULES[index - 1].id) < 50;

            let stateClass = 'available';
            let stateIcon = module.icon;
            if (isLocked) { stateClass = 'locked'; stateIcon = '🔒'; }
            else if (isCompleted) { stateClass = 'completed'; stateIcon = '✅'; }

            pathHtml += `
                <div class="home-path-node ${stateClass}" onclick="${isLocked ? '' : `game.transitionTo(function() { game.openModule(${module.id}) })`}">
                    <div class="home-path-icon">${stateIcon}</div>
                    <div class="home-path-info">
                        <div class="home-path-label">מודול ${index + 1}</div>
                        <div class="home-path-title">${module.title}</div>
                        <div class="home-path-desc">${module.description}</div>
                        <div class="home-path-progress">
                            <div class="home-path-progress-bar"><div class="home-path-progress-fill" style="width: ${progress}%"></div></div>
                            <span class="home-path-progress-text">${progress}%</span>
                        </div>
                    </div>
                    <div class="home-path-arrow">${isLocked ? '' : '←'}</div>
                </div>`;
        });

        // Goal
        const totalProgress = MODULES.reduce((sum, m) => sum + this.getModuleProgress(m.id), 0);
        const overallProgress = Math.round(totalProgress / MODULES.length);
        pathHtml += `
            <div class="home-path-node goal" style="cursor: default;">
                <div class="home-path-icon">🏆</div>
                <div class="home-path-info">
                    <div class="home-path-label">יעד</div>
                    <div class="home-path-title">Claude Code Master</div>
                    <div class="home-path-desc">השלימו את כל המודולים</div>
                    <div class="home-path-progress">
                        <div class="home-path-progress-bar"><div class="home-path-progress-fill" style="width: ${overallProgress}%"></div></div>
                        <span class="home-path-progress-text">${overallProgress}%</span>
                    </div>
                </div>
            </div>`;

        container.innerHTML = `
            ${this.createMentorHTML(welcomeMessage)}
            <div class="level-progress-container">
                <div class="level-info">
                    <div class="level-current">
                        <span class="level-badge">רמה ${this.playerData.level}</span>
                        <span class="level-name">${this.getLevelName(this.playerData.level)}</span>
                    </div>
                    <span class="level-next">${levelInfo.xpToNext} XP לרמה הבאה</span>
                </div>
                <div class="level-progress-bar"><div class="level-progress-fill" style="width: ${levelInfo.progress}%"></div></div>
            </div>
            <div class="home-journey-path">${pathHtml}</div>
            <div class="achievements-section">
                <h3 class="achievements-title"><i class="fa-solid fa-trophy"></i> הישגים</h3>
                <div class="achievements-grid">${this.renderAchievementsGrid()}</div>
            </div>
        `;
    }

    // ═══════════════════════════════════════
    // Module Screen
    // ═══════════════════════════════════════
    openModule(moduleId) {
        const module = MODULES.find(m => m.id === moduleId);
        if (!module) return;
        this.currentModule = module;
        this.currentScreen = 'module';
        const container = document.getElementById('game-container');
        const introMessage = this.mentorMessages.moduleIntro[moduleId] || 'בואו נתחיל!';

        const lessonsHtml = module.lessons.map(lesson => {
            const key = `${moduleId}-${lesson.id}`;
            const isCompleted = !!this.playerData.completedLessons[key];
            const isPerfect = this.playerData.perfectLessonsList && this.playerData.perfectLessonsList.includes(key);
            return `
                <div class="lesson-item ${isCompleted ? 'completed' : ''}" onclick="game.transitionTo(function() { game.startLesson(${moduleId}, ${lesson.id}) })">
                    <div class="lesson-icon">${isPerfect ? '⭐' : isCompleted ? '✅' : '📘'}</div>
                    <div class="lesson-info">
                        <div class="lesson-title">${lesson.title}</div>
                        <div class="lesson-exercises">${lesson.exercises.length} תרגילים</div>
                    </div>
                    <div class="lesson-arrow">←</div>
                </div>`;
        }).join('');

        container.innerHTML = `
            <button class="back-btn" onclick="game.transitionTo(function() { game.renderHomeScreen() })">← חזרה</button>
            ${this.createMentorHTML(introMessage)}
            <div class="module-header">
                <div class="module-icon-large">${module.icon}</div>
                <h2>${module.title}</h2>
                <p class="module-desc">${module.description}</p>
            </div>
            <div class="lessons-list">${lessonsHtml}</div>
        `;
    }

    // ═══════════════════════════════════════
    // Lesson
    // ═══════════════════════════════════════
    startLesson(moduleId, lessonId) {
        const module = MODULES.find(m => m.id === moduleId);
        if (!module) return;
        const lesson = module.lessons.find(l => l.id === lessonId);
        if (!lesson) return;

        this.currentModule = module;
        this.currentLesson = lesson;
        this.currentExerciseIndex = 0;
        this.lessonMistakes = 0;
        this.currentScreen = 'lesson';

        // Show lesson intro (summary)
        const container = document.getElementById('game-container');
        const startMessage = this.getRandomMessage(this.mentorMessages.lessonStart);

        container.innerHTML = `
            <button class="back-btn" onclick="game.exitLesson()">✕</button>
            ${this.createMentorHTML(startMessage)}
            <div class="lesson-intro">
                <h2 class="lesson-intro-title">${lesson.title}</h2>
                <div class="lesson-summary">
                    <div class="summary-card">
                        <div class="summary-icon"><i class="fa-solid fa-lightbulb"></i></div>
                        <div class="summary-text">${lesson.summary}</div>
                    </div>
                    ${lesson.summaryDetail ? `
                    <div class="summary-detail">
                        <div class="summary-detail-icon"><i class="fa-solid fa-magnifying-glass"></i></div>
                        <div class="summary-detail-text">${lesson.summaryDetail}</div>
                    </div>` : ''}
                </div>
                <button class="btn btn-primary btn-full" onclick="game.beginExercises()">
                    <i class="fa-solid fa-play"></i> התחילו לתרגל (${lesson.exercises.length} תרגילים)
                </button>
            </div>
        `;
    }

    beginExercises() {
        this.sound.play('click');
        document.getElementById('progress-container').style.display = 'block';
        this.renderExercise();
    }

    exitLesson() {
        this.sound.play('click');
        document.getElementById('progress-container').style.display = 'none';
        document.getElementById('footer-actions').style.display = 'none';
        document.getElementById('feedback-panel').classList.remove('show');
        this.transitionTo(() => this.openModule(this.currentModule.id));
    }

    updateProgressBar() {
        if (!this.currentLesson) return;
        const total = this.currentLesson.exercises.length;
        const current = this.currentExerciseIndex;
        const pct = Math.round((current / total) * 100);
        document.getElementById('progress-bar').style.width = pct + '%';
    }

    showFooter() {
        document.getElementById('footer-actions').style.display = 'block';
        document.getElementById('check-btn').disabled = true;
    }

    enableCheckButton() {
        document.getElementById('check-btn').disabled = false;
    }

    // ═══════════════════════════════════════
    // Render Exercise
    // ═══════════════════════════════════════
    renderExercise() {
        const exercise = this.currentLesson.exercises[this.currentExerciseIndex];
        if (!exercise) { this.completeLesson(); return; }

        this.selectedAnswer = null;
        this.exerciseAnswered = false;
        this.updateProgressBar();
        const container = document.getElementById('game-container');

        switch (exercise.type) {
            case 'multiple-choice': this.renderMultipleChoice(container, exercise); break;
            case 'fill-blank': this.renderFillBlank(container, exercise); break;
            case 'order': this.renderOrder(container, exercise); break;
            case 'identify': this.renderIdentify(container, exercise); break;
            case 'compare': this.renderCompare(container, exercise); break;
            case 'improve': this.renderImprove(container, exercise); break;
            case 'match': this.renderMatch(container, exercise); break;
        }
        this.showFooter();
        if (exercise.type === 'order') this.enableCheckButton();
    }

    // ═══════════════════════════════════════
    // Exercise Renderers
    // ═══════════════════════════════════════
    renderMultipleChoice(container, exercise) {
        const letters = ['א', 'ב', 'ג', 'ד'];
        container.innerHTML = `
            <button class="back-btn" onclick="game.exitLesson()">✕</button>
            <div class="exercise-container">
                <div class="exercise-type"><i class="fa-solid fa-list"></i> בחירה מרובה</div>
                <div class="exercise-question">${exercise.question}</div>
                <div class="options-list">
                    ${exercise.options.map((opt, i) => `
                        <button class="option-btn" onclick="game.selectOption(${i})">
                            <span class="option-letter">${letters[i]}</span>
                            <span>${opt}</span>
                        </button>
                    `).join('')}
                </div>
            </div>`;
    }

    selectOption(index) {
        if (this.exerciseAnswered) return;
        this.sound.play('click');
        this.selectedAnswer = index;
        document.querySelectorAll('.option-btn').forEach((btn, i) => btn.classList.toggle('selected', i === index));
        this.enableCheckButton();
    }

    renderFillBlank(container, exercise) {
        const templateHtml = exercise.template.replace('___', '<span class="blank-slot" id="blank-slot">___</span>');
        const shuffled = this.shuffleArray([...exercise.options]);
        container.innerHTML = `
            <button class="back-btn" onclick="game.exitLesson()">✕</button>
            <div class="exercise-container">
                <div class="exercise-type"><i class="fa-solid fa-pen"></i> השלמת משפט</div>
                <div class="exercise-question">${exercise.question}</div>
                <div class="fill-blank-container">
                    <div class="template-text">${templateHtml}</div>
                    <div class="word-bank">${shuffled.map(word => `
                        <button class="word-chip" data-word-index="${exercise.options.indexOf(word)}" onclick="game.selectWord(this)">${word}</button>
                    `).join('')}</div>
                </div>
            </div>`;
    }

    selectWord(el) {
        if (this.exerciseAnswered) return;
        this.sound.play('click');
        this.selectedAnswer = parseInt(el.dataset.wordIndex);
        document.getElementById('blank-slot').textContent = el.textContent;
        document.getElementById('blank-slot').classList.add('filled');
        document.querySelectorAll('.word-chip').forEach(c => c.classList.toggle('selected', c === el));
        this.enableCheckButton();
    }

    renderOrder(container, exercise) {
        const shuffled = this.shuffleArray([...exercise.items].map((item, i) => ({ item, originalIndex: i })));
        this._orderItems = shuffled;

        container.innerHTML = `
            <button class="back-btn" onclick="game.exitLesson()">✕</button>
            <div class="exercise-container">
                <div class="exercise-type"><i class="fa-solid fa-sort"></i> סידור לפי סדר</div>
                <div class="exercise-question">${exercise.question}</div>
                <div class="order-container" id="order-container">
                    ${shuffled.map((obj, i) => `
                        <div class="order-item" data-pos="${i}" data-original="${obj.originalIndex}" onclick="game.selectOrderItem(${i})">
                            <span class="order-number">${i + 1}</span>
                            <span class="order-text">${obj.item}</span>
                            <div class="order-buttons">
                                <button class="order-btn order-up" onclick="event.stopPropagation(); game.moveOrderItem(${i}, -1)" title="הזז למעלה" ${i === 0 ? 'disabled' : ''}>
                                    <i class="fa-solid fa-chevron-up"></i>
                                </button>
                                <button class="order-btn order-down" onclick="event.stopPropagation(); game.moveOrderItem(${i}, 1)" title="הזז למטה" ${i === shuffled.length - 1 ? 'disabled' : ''}>
                                    <i class="fa-solid fa-chevron-down"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="order-hint"><i class="fa-solid fa-arrows-up-down"></i> לחצו על החצים או גררו כדי לסדר</div>
            </div>`;
        this.enableCheckButton();
    }

    selectOrderItem(pos) {
        if (this.exerciseAnswered) return;
        this.sound.play('click');
        const items = document.querySelectorAll('.order-item');
        if (this._selectedOrderPos !== undefined && this._selectedOrderPos !== pos) {
            // Swap the two items
            this._swapOrderItems(this._selectedOrderPos, pos);
            items.forEach(el => el.classList.remove('order-selected'));
            this._selectedOrderPos = undefined;
        } else if (this._selectedOrderPos === pos) {
            // Deselect
            items[pos].classList.remove('order-selected');
            this._selectedOrderPos = undefined;
        } else {
            // Select first
            items.forEach(el => el.classList.remove('order-selected'));
            items[pos].classList.add('order-selected');
            this._selectedOrderPos = pos;
        }
    }

    moveOrderItem(pos, direction) {
        if (this.exerciseAnswered || this._orderMoving) return;
        this._orderMoving = true;
        setTimeout(() => { this._orderMoving = false; }, 280);
        this.sound.play('click');
        const newPos = pos + direction;
        const container = document.getElementById('order-container');
        const items = [...container.children];
        if (newPos < 0 || newPos >= items.length) return;

        this._swapOrderItems(pos, newPos);
        // Clear selection
        this._selectedOrderPos = undefined;
        container.querySelectorAll('.order-item').forEach(el => el.classList.remove('order-selected'));
    }

    _swapOrderItems(posA, posB) {
        const container = document.getElementById('order-container');
        const items = [...container.children];
        if (posA === posB || !items[posA] || !items[posB]) return;

        // Swap DOM positions with animation
        const itemA = items[posA];
        const itemB = items[posB];

        // Get rects before swap
        const rectA = itemA.getBoundingClientRect();
        const rectB = itemB.getBoundingClientRect();

        // Swap in DOM
        if (posA < posB) {
            container.insertBefore(itemB, itemA);
        } else {
            container.insertBefore(itemA, itemB);
        }

        // Animate
        const newItems = [...container.children];
        const newRectA = itemA.getBoundingClientRect();
        const newRectB = itemB.getBoundingClientRect();

        this._animateSwap(itemA, rectA, newRectA);
        this._animateSwap(itemB, rectB, newRectB);

        // Update numbers & buttons
        this._refreshOrderUI();
    }

    _animateSwap(el, from, to) {
        const dx = from.left - to.left;
        const dy = from.top - to.top;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
        el.style.transition = 'none';
        requestAnimationFrame(() => {
            el.style.transition = 'transform 0.25s ease';
            el.style.transform = '';
            setTimeout(() => { el.style.transition = ''; el.style.transform = ''; }, 260);
        });
    }

    _refreshOrderUI() {
        const container = document.getElementById('order-container');
        const items = [...container.children];
        const total = items.length;
        items.forEach((item, i) => {
            // Update number
            item.querySelector('.order-number').textContent = i + 1;
            // Update data-pos
            item.dataset.pos = i;
            // Update onclick
            item.onclick = () => this.selectOrderItem(i);
            // Update buttons
            const upBtn = item.querySelector('.order-up');
            const downBtn = item.querySelector('.order-down');
            if (upBtn) {
                upBtn.disabled = i === 0;
                upBtn.onclick = (e) => { e.stopPropagation(); this.moveOrderItem(i, -1); };
            }
            if (downBtn) {
                downBtn.disabled = i === total - 1;
                downBtn.onclick = (e) => { e.stopPropagation(); this.moveOrderItem(i, 1); };
            }
        });
    }

    renderCompare(container, exercise) {
        container.innerHTML = `
            <button class="back-btn" onclick="game.exitLesson()">✕</button>
            <div class="exercise-container">
                <div class="exercise-type"><i class="fa-solid fa-scale-balanced"></i> השוואה</div>
                <div class="exercise-question">${exercise.question}</div>
                <div class="compare-cards">
                    <div class="compare-card" onclick="game.selectCompare(0)">
                        <div class="compare-label">${exercise.optionA.label}</div>
                        <div class="compare-text">${exercise.optionA.text}</div>
                    </div>
                    <div class="compare-card" onclick="game.selectCompare(1)">
                        <div class="compare-label">${exercise.optionB.label}</div>
                        <div class="compare-text">${exercise.optionB.text}</div>
                    </div>
                </div>
            </div>`;
    }

    selectCompare(index) {
        if (this.exerciseAnswered) return;
        this.sound.play('click');
        this.selectedAnswer = index;
        document.querySelectorAll('.compare-card').forEach((c, i) => c.classList.toggle('selected', i === index));
        this.enableCheckButton();
    }

    renderImprove(container, exercise) {
        const letters = ['א', 'ב', 'ג', 'ד'];
        container.innerHTML = `
            <button class="back-btn" onclick="game.exitLesson()">✕</button>
            <div class="exercise-container">
                <div class="exercise-type"><i class="fa-solid fa-wand-magic-sparkles"></i> שיפור</div>
                <div class="exercise-question">${exercise.question}</div>
                <div class="improve-original">
                    <div class="improve-label">המקור:</div>
                    <div class="improve-text">${exercise.original}</div>
                </div>
                <div class="options-list">
                    ${exercise.options.map((opt, i) => `
                        <button class="option-btn" onclick="game.selectOption(${i})">
                            <span class="option-letter">${letters[i]}</span>
                            <span>${opt}</span>
                        </button>
                    `).join('')}
                </div>
            </div>`;
    }

    renderMatch(container, exercise) {
        const shuffledRight = this.shuffleArray([...exercise.pairs.map(p => p.right)]);
        container.innerHTML = `
            <button class="back-btn" onclick="game.exitLesson()">✕</button>
            <div class="exercise-container">
                <div class="exercise-type"><i class="fa-solid fa-link"></i> התאמה</div>
                <div class="exercise-question">${exercise.question}</div>
                <div class="match-container">
                    <div class="match-column match-left">
                        ${exercise.pairs.map((p, i) => `<div class="match-item" data-left="${i}" onclick="game.selectMatchLeft(${i})">${p.left}</div>`).join('')}
                    </div>
                    <div class="match-column match-right">
                        ${shuffledRight.map((text, i) => `<div class="match-item" data-right="${exercise.pairs.findIndex(p => p.right === text)}" onclick="game.selectMatchRight(this)">${text}</div>`).join('')}
                    </div>
                </div>
                <div class="match-pairs-display" id="match-pairs-display"></div>
            </div>`;
        this._matchState = { selectedLeft: null, pairs: [], total: exercise.pairs.length };
    }

    selectMatchLeft(index) {
        if (this.exerciseAnswered) return;
        this.sound.play('click');
        this._matchState.selectedLeft = index;
        document.querySelectorAll('.match-left .match-item').forEach((el, i) => el.classList.toggle('selected', i === index));
    }

    selectMatchRight(el) {
        if (this.exerciseAnswered || this._matchState.selectedLeft === null) return;
        this.sound.play('click');
        const rightIndex = parseInt(el.dataset.right);
        const leftIndex = this._matchState.selectedLeft;

        // Check if already matched
        if (this._matchState.pairs.some(p => p.left === leftIndex || p.right === rightIndex)) return;

        this._matchState.pairs.push({ left: leftIndex, right: rightIndex });

        // Visual feedback
        document.querySelectorAll('.match-left .match-item')[leftIndex].classList.add('matched');
        el.classList.add('matched');
        document.querySelectorAll('.match-left .match-item').forEach(e => e.classList.remove('selected'));
        this._matchState.selectedLeft = null;

        // Update display
        const exercise = this.currentLesson.exercises[this.currentExerciseIndex];
        const display = document.getElementById('match-pairs-display');
        display.innerHTML = this._matchState.pairs.map(p => `
            <div class="match-pair-row">${exercise.pairs[p.left].left} ↔ ${exercise.pairs[p.right].right}</div>
        `).join('');

        if (this._matchState.pairs.length === this._matchState.total) {
            this.selectedAnswer = this._matchState.pairs;
            this.enableCheckButton();
        }
    }

    renderIdentify(container, exercise) {
        const words = exercise.text.split('');
        container.innerHTML = `
            <button class="back-btn" onclick="game.exitLesson()">✕</button>
            <div class="exercise-container">
                <div class="exercise-type"><i class="fa-solid fa-highlighter"></i> זיהוי</div>
                <div class="exercise-question">${exercise.question}</div>
                <div class="identify-text" id="identify-text">${exercise.text}</div>
                <div class="identify-hint">סמנו את החלק הרלוונטי בטקסט</div>
            </div>`;

        const textEl = document.getElementById('identify-text');
        textEl.addEventListener('mouseup', () => this.handleTextSelection(exercise));
        textEl.addEventListener('touchend', () => this.handleTextSelection(exercise));
    }

    handleTextSelection(exercise) {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed) return;
        const text = selection.toString().trim();
        if (text.length < 2) return;
        this.sound.play('click');
        const fullText = exercise.text;
        const start = fullText.indexOf(text);
        if (start === -1) return;
        this.selectedAnswer = { start, end: start + text.length, text };
        this.enableCheckButton();

        // Highlight
        const textEl = document.getElementById('identify-text');
        textEl.innerHTML = fullText.substring(0, start) + `<span class="identify-highlight">${text}</span>` + fullText.substring(start + text.length);
    }

    // ═══════════════════════════════════════
    // Check Answer
    // ═══════════════════════════════════════
    checkAnswer() {
        const exercise = this.currentLesson.exercises[this.currentExerciseIndex];
        // Order exercises don't use selectedAnswer — always have an answer ready
        const needsSelection = exercise.type !== 'order';
        if (this.exerciseAnswered || (needsSelection && this.selectedAnswer === null)) return;
        this.exerciseAnswered = true;
        this.sound.play('click');

        let isCorrect = false;

        switch (exercise.type) {
            case 'multiple-choice':
            case 'fill-blank':
            case 'improve':
                isCorrect = this.selectedAnswer === exercise.correct;
                break;
            case 'compare':
                isCorrect = this.selectedAnswer === exercise.correct;
                break;
            case 'order': {
                const items = document.querySelectorAll('.order-item');
                const userOrder = [...items].map(el => parseInt(el.dataset.original));
                isCorrect = JSON.stringify(userOrder) === JSON.stringify(exercise.correctOrder);
                break;
            }
            case 'match': {
                isCorrect = this._matchState.pairs.every(p => p.left === p.right);
                break;
            }
            case 'identify': {
                const [cStart, cEnd] = exercise.correctRange;
                const sel = this.selectedAnswer;
                const overlap = Math.max(0, Math.min(sel.end, cEnd) - Math.max(sel.start, cStart));
                const correctLen = cEnd - cStart;
                isCorrect = overlap / correctLen >= 0.5;
                break;
            }
        }

        // Visual feedback on options
        if (exercise.type === 'multiple-choice' || exercise.type === 'improve') {
            document.querySelectorAll('.option-btn').forEach((btn, i) => {
                if (i === exercise.correct) btn.classList.add('correct');
                else if (i === this.selectedAnswer && !isCorrect) btn.classList.add('wrong');
            });
        } else if (exercise.type === 'compare') {
            document.querySelectorAll('.compare-card').forEach((c, i) => {
                if (i === exercise.correct) c.classList.add('correct');
                else if (i === this.selectedAnswer && !isCorrect) c.classList.add('wrong');
            });
        } else if (exercise.type === 'fill-blank') {
            const slot = document.getElementById('blank-slot');
            if (slot) slot.classList.add(isCorrect ? 'correct' : 'wrong');
        } else if (exercise.type === 'order') {
            // Show correct/wrong per item
            const orderItems = document.querySelectorAll('.order-item');
            const userOrder = [...orderItems].map(el => parseInt(el.dataset.original));
            orderItems.forEach((item, i) => {
                const orig = parseInt(item.dataset.original);
                if (orig === exercise.correctOrder[i]) {
                    item.classList.add('order-correct');
                } else {
                    item.classList.add('order-wrong');
                }
                // Disable buttons
                item.querySelectorAll('.order-btn').forEach(b => b.disabled = true);
            });
        }

        if (isCorrect) {
            this.sound.play('correct');
            this.addXP(10);
            this.playerData.totalCorrectAnswers++;
        } else {
            this.sound.play('wrong');
            this.playerData.totalWrongAnswers++;
            this.lessonMistakes++;
            if (this.playerData.hearts > 0) {
                this.playerData.hearts--;
                if (!this.playerData.lastHeartLost) this.playerData.lastHeartLost = new Date().toISOString();
                this.updateStatsDisplay();
            }
        }
        this.savePlayerData();

        // Show feedback
        const feedbackPanel = document.getElementById('feedback-panel');
        const feedbackIcon = document.getElementById('feedback-icon');
        const feedbackTitle = document.getElementById('feedback-title');
        const feedbackExplanation = document.getElementById('feedback-explanation');
        const feedbackBtn = document.getElementById('feedback-btn');

        if (isCorrect) {
            feedbackPanel.className = 'feedback-panel correct';
            feedbackIcon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
            feedbackTitle.textContent = this.getRandomMessage(this.mentorMessages.correctAnswer);
        } else {
            feedbackPanel.className = 'feedback-panel wrong';
            feedbackIcon.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
            feedbackTitle.textContent = this.getRandomMessage(this.mentorMessages.wrongAnswer);
        }

        // Wrong-specific explanation
        let explanation = exercise.explanation;
        if (!isCorrect && exercise.wrongExplanations && exercise.wrongExplanations[this.selectedAnswer]) {
            explanation = exercise.wrongExplanations[this.selectedAnswer] + ' ' + exercise.explanation;
        }
        feedbackExplanation.textContent = explanation;

        feedbackBtn.textContent = 'המשך';
        feedbackBtn.onclick = () => this.continueToNext();
        feedbackPanel.classList.add('show');

        // Hide footer check button
        document.getElementById('footer-actions').style.display = 'none';
    }

    continueToNext() {
        this.sound.play('click');
        document.getElementById('feedback-panel').classList.remove('show');
        this.currentExerciseIndex++;

        if (this.isDailyChallenge) {
            this.dailyChallengeExercisesLeft--;
            if (this.dailyChallengeExercisesLeft <= 0) {
                this.completeDailyChallenge();
                this.transitionTo(() => this.renderHomeScreen());
                return;
            }
        }

        setTimeout(() => this.renderExercise(), 300);
    }

    // ═══════════════════════════════════════
    // Complete Lesson
    // ═══════════════════════════════════════
    completeLesson() {
        const key = `${this.currentModule.id}-${this.currentLesson.id}`;
        const isFirstTime = !this.playerData.completedLessons[key];

        this.playerData.completedLessons[key] = true;
        if (isFirstTime) this.addXP(30);

        if (this.lessonMistakes === 0) {
            this.playerData.perfectLessons = (this.playerData.perfectLessons || 0) + 1;
            if (!this.playerData.perfectLessonsList) this.playerData.perfectLessonsList = [];
            if (!this.playerData.perfectLessonsList.includes(key)) {
                this.playerData.perfectLessonsList.push(key);
                if (isFirstTime) this.addXP(20);
            }
        }

        this.savePlayerData();
        this.checkAchievements();

        document.getElementById('progress-container').style.display = 'none';
        document.getElementById('footer-actions').style.display = 'none';

        const container = document.getElementById('game-container');
        const total = this.currentLesson.exercises.length;
        const correct = total - this.lessonMistakes;
        const accuracy = Math.round((correct / total) * 100);
        const completeMsg = this.getRandomMessage(this.mentorMessages.lessonComplete);

        container.innerHTML = `
            ${this.createMentorHTML(completeMsg)}
            <div class="lesson-complete-card">
                <div class="complete-icon">🎉</div>
                <h2>שיעור הושלם!</h2>
                <h3>${this.currentLesson.title}</h3>
                <div class="complete-stats">
                    <div class="complete-stat">
                        <div class="complete-stat-value">${accuracy}%</div>
                        <div class="complete-stat-label">דיוק</div>
                    </div>
                    <div class="complete-stat">
                        <div class="complete-stat-value">${correct}/${total}</div>
                        <div class="complete-stat-label">תשובות נכונות</div>
                    </div>
                    <div class="complete-stat">
                        <div class="complete-stat-value">+${isFirstTime ? (this.lessonMistakes === 0 ? 60 : 40) : 10}</div>
                        <div class="complete-stat-label">XP</div>
                    </div>
                </div>
                ${this.lessonMistakes === 0 ? '<div class="perfect-badge">✨ שיעור מושלם — Zero Bugs!</div>' : ''}
                <button class="btn btn-primary btn-full" onclick="game.transitionTo(function() { game.openModule(game.currentModule.id) })">חזרה למודול</button>
                <button class="btn btn-secondary btn-full" onclick="game.transitionTo(function() { game.renderHomeScreen() })">מסך ראשי</button>
            </div>
        `;

        // Positive-motivation popup based on the player's standing (after every lesson)
        this.showEncouragementPopup();
    }

    // ═══════════════════════════════════════
    // Leaderboard + positive-motivation popups
    // ═══════════════════════════════════════
    async fetchLeaderboard() {
        try {
            const { data, error } = await _supabase.rpc('get_leaderboard', { my_xp: this.playerData.xp || 0 });
            if (error || !data) return null;
            return data;
        } catch (e) { return null; }
    }

    async showEncouragementPopup() {
        // Give the cloud save a moment, then read standings
        const lb = await this.fetchLeaderboard();
        // Build a positive message. Percentile = % of active players you're at-or-ahead-of.
        let icon = '<i class="fa-solid fa-trophy"></i>';
        let title, text;
        const xp = this.playerData.xp || 0;

        if (lb && lb.total_active >= 5) {
            const pct = lb.my_percentile;           // 0..100
            const rank = lb.my_rank;
            const ahead = Math.max(0, 100 - pct);    // % still ahead of you
            if (pct >= 90) {
                icon = '<i class="fa-solid fa-crown"></i>';
                title = 'אלופים! 👑';
                text = `אתם ב-TOP ${ahead <= 0 ? 1 : ahead}% של כל השחקנים. מיקום ${rank}. מטורף — ממשיכים לשמור על המקום!`;
            } else if (pct >= 50) {
                icon = '<i class="fa-solid fa-fire"></i>';
                title = 'מעולה, ממשיכים! 🔥';
                text = `עברתם כבר ${pct}% מהשחקנים! אתם במיקום ${rank}. עוד כמה שיעורים ואתם בצמרת.`;
            } else {
                icon = '<i class="fa-solid fa-rocket"></i>';
                title = 'כל הכבוד! 🚀';
                text = `רק ${pct === 0 ? 30 : Math.max(pct, 10)}% מהנרשמים הגיעו לאן שאתם. בואו נמשיך — כל שיעור מקפיץ אתכם בדירוג!`;
            }
        } else {
            // Not enough data yet — pure encouragement, no fake numbers
            icon = '<i class="fa-solid fa-rocket"></i>';
            title = 'כל הכבוד! 🚀';
            text = `צברתם ${xp} נקודות. אתם מבין הראשונים שמתחילים את המסע — בואו נמשיך!`;
        }

        const btns = `
            <button class="btn btn-primary" onclick="game.closeModal(); game.showLeaderboard();">טבלת המובילים</button>
            <button class="btn btn-secondary" onclick="game.closeModal()">ממשיכים</button>`;
        this.showModal(icon, title, text, btns);
    }

    async showLeaderboard() {
        this.hideUserMenu();
        this.showModal('<i class="fa-solid fa-ranking-star"></i>', 'טבלת המובילים', 'טוען…', '');
        const lb = await this.fetchLeaderboard();
        const textEl = document.getElementById('modal-text');

        if (!lb || !lb.top || lb.top.length === 0) {
            textEl.innerHTML = `<div style="opacity:.8;line-height:1.7;">עדיין אין מספיק שחקנים לטבלה 🙂<br>היו הראשונים — כל נקודה נספרת!</div>`;
            document.getElementById('modal-buttons').innerHTML = `<button class="btn btn-primary" onclick="game.closeModal()">סגירה</button>`;
            return;
        }

        const myXp = this.playerData.xp || 0;
        const myRank = lb.my_rank;
        const medal = r => r === 1 ? '🥇' : r === 2 ? '🥈' : r === 3 ? '🥉' : `<span style="opacity:.6">${r}</span>`;
        let rows = lb.top.map(e => {
            const me = (e.rank === myRank && e.xp === myXp);
            return `<div class="lb-row${me ? ' lb-me' : ''}">
                <span class="lb-rank">${medal(e.rank)}</span>
                <span class="lb-name">${me ? 'אתם 👈' : 'שחקן'}</span>
                <span class="lb-xp">${(e.xp||0).toLocaleString('he-IL')} נק׳</span>
            </div>`;
        }).join('');

        // If the player isn't in the visible top-10, show their own row separately
        const inTop = lb.top.some(e => e.rank === myRank && e.xp === myXp);
        if (!inTop && myXp > 0) {
            rows += `<div class="lb-sep">· · ·</div>
                <div class="lb-row lb-me">
                    <span class="lb-rank">${myRank}</span>
                    <span class="lb-name">אתם 👈</span>
                    <span class="lb-xp">${myXp.toLocaleString('he-IL')} נק׳</span>
                </div>`;
        }

        textEl.innerHTML = `
            <div class="lb-head">מתוך ${(lb.total_active||0).toLocaleString('he-IL')} שחקנים פעילים${myXp>0?` · אתם במקום ${myRank}`:''}</div>
            <div class="lb-list">${rows}</div>`;
        document.getElementById('modal-buttons').innerHTML = `<button class="btn btn-primary" onclick="game.closeModal()">סגירה</button>`;
    }

    // ═══════════════════════════════════════
    // Helpers
    // ═══════════════════════════════════════
    shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
}

// Init
const game = new ClaudeCodeGame();
