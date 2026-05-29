const MODULES = [
    {
        id: 1,
        title: "מבוא ל-Claude Code",
        description: "מה זה Claude Code, התקנה ראשונה ושיחה ראשונה",
        icon: "💻",
        lessons: [
            {
                id: 1,
                title: "מה זה Claude Code ולמה זה משנה הכל",
                summary: "Claude Code הוא CLI (כלי שורת פקודה) רשמי של Anthropic שמאפשר לעבוד עם Claude ישירות מהטרמינל. הוא יכול לקרוא קבצים, לכתוב קוד, להריץ פקודות, ולעבוד על פרויקטים שלמים — לא רק לענות על שאלות.",
                summaryDetail: "בניגוד ל-ChatGPT או Claude.ai שעובדים בחלון צ'אט, Claude Code חי בטרמינל שלך ויכול לגעת בקבצים אמיתיים. הוא רואה את כל הפרויקט, מבין קוד קיים, ויכול לבצע שינויים אמיתיים. זה כמו ההבדל בין לשאול מישהו עצה לבין להביא מומחה שיושב לידך ועובד איתך.",
                exercises: [
                    {
                        type: "multiple-choice",
                        question: "מה ההבדל המרכזי בין Claude Code לבין Claude.ai?",
                        options: ["Claude Code עובד בטרמינל ויכול לגעת בקבצים אמיתיים", "Claude Code הוא יותר חכם", "Claude Code עובד רק עם Python", "אין הבדל — שניהם אותו דבר"],
                        correct: 0,
                        explanation: "Claude Code חי בטרמינל ויכול לקרוא, לכתוב ולהריץ קבצים אמיתיים בפרויקט שלך. זה ההבדל המהותי — הוא עובד *עם* הקוד שלך, לא רק מדבר *על* קוד.",
                        wrongExplanations: [null, "שניהם משתמשים באותם מודלים (Claude Opus/Sonnet). ההבדל הוא בממשק ובגישה לקבצים.", "Claude Code עובד עם כל שפת תכנות — Python, JS, Go, Rust ועוד.", "יש הבדל מהותי — Claude Code יכול לבצע פעולות אמיתיות על קבצים."]
                    },
                    {
                        type: "fill-blank",
                        question: "השלימו את המשפט:",
                        template: "Claude Code הוא ___ רשמי של Anthropic לעבודה עם Claude מהטרמינל",
                        options: ["CLI", "IDE", "API", "GUI"],
                        correct: 0,
                        explanation: "CLI = Command Line Interface. Claude Code הוא כלי שורת פקודה שמריצים ישירות בטרמינל."
                    },
                    {
                        type: "compare",
                        question: "איזה תיאור מדויק יותר של Claude Code?",
                        optionA: {
                            label: "תיאור א",
                            text: "בוט צ'אט שעונה על שאלות תכנות"
                        },
                        optionB: {
                            label: "תיאור ב",
                            text: "מפתח AI שיושב בטרמינל, קורא את הקוד שלך, ומבצע שינויים אמיתיים"
                        },
                        correct: 1,
                        explanation: "Claude Code הוא הרבה יותר מבוט צ'אט — הוא agent שיכול לקרוא קבצים, להריץ פקודות, לכתוב קוד, ולבצע שינויים אמיתיים בפרויקט."
                    },
                    {
                        type: "match",
                        question: "התאימו בין הכלי ליכולת שלו:",
                        pairs: [
                            { left: "Claude.ai", right: "צ'אט בדפדפן, מדביקים קוד ידנית" },
                            { left: "Claude Code", right: "CLI בטרמינל, גישה ישירה לקבצים" },
                            { left: "Cursor / VS Code", right: "IDE עם AI משולב בעורך" },
                            { left: "Claude API", right: "גישה תכנותית לבניית אפליקציות" }
                        ],
                        explanation: "כל כלי פותר בעיה אחרת — Claude Code ייחודי ביכולת לעבוד ישירות על הפרויקט מהטרמינל."
                    },
                    {
                        type: "multiple-choice",
                        question: "מה Claude Code יכול לעשות שצ'אט רגיל לא?",
                        options: ["לקרוא ולערוך קבצים אמיתיים בפרויקט", "לכתוב קוד", "להסביר מושגים", "לענות על שאלות"],
                        correct: 0,
                        explanation: "כל AI יכול לכתוב קוד ולהסביר — אבל רק Claude Code יכול לגשת ישירות לקבצים בפרויקט שלך, לקרוא אותם, ולבצע שינויים.",
                        wrongExplanations: [null, "גם צ'אט רגיל יכול לכתוב קוד — ההבדל הוא ביכולת לכתוב ישירות לקבצים.", "גם צ'אט רגיל יכול להסביר מושגים.", "גם צ'אט רגיל עונה על שאלות. הייחוד הוא בגישה לקבצים."]
                    },
                    {
                        type: "order",
                        question: "סדרו את השלבים להתקנת Claude Code:",
                        items: ["להתקין Node.js 18+", "להריץ npm install -g @anthropic-ai/claude-code", "להגדיר ANTHROPIC_API_KEY", "להריץ claude בטרמינל"],
                        correctOrder: [0, 1, 2, 3],
                        explanation: "קודם מתקינים Node.js (דרישת מינימום), אז מתקינים את Claude Code גלובלית, מגדירים מפתח API, ורק אז מריצים."
                    },
                    {
                        type: "improve",
                        question: "איזו פקודת התקנה נכונה?",
                        original: "npm install claude-code",
                        options: ["npm install -g @anthropic-ai/claude-code", "pip install claude-code", "brew install claude", "apt-get install claude-code"],
                        correct: 0,
                        explanation: "הפקודה הנכונה היא npm install -g @anthropic-ai/claude-code. הדגל -g מתקין גלובלית, והחבילה נמצאת תחת @anthropic-ai.",
                        wrongExplanations: [null, "Claude Code הוא חבילת npm, לא Python.", "אין חבילת brew רשמית.", "זה לא חבילת apt."]
                    }
                ]
            },
            {
                id: 2,
                title: "השיחה הראשונה עם Claude Code",
                summary: "פותחים טרמינל, מקלידים claude, ומתחילים לדבר. Claude Code מבין עברית ואנגלית, ויכול לקבל הוראות פשוטות כמו 'תקן את הבאג בקובץ X' או 'צור קומפוננטה חדשה'.",
                summaryDetail: "כשמריצים claude, הכלי נכנס למצב אינטראקטיבי. אפשר לכתוב לו בשפה טבעית מה שרוצים. הוא ישאל שאלות הבהרה אם צריך, יציע תוכנית, ויבקש אישור לפני שינויים. אפשר גם להריץ פקודה חד-פעמית: claude -p 'מה עושה הקובץ הזה'.",
                exercises: [
                    {
                        type: "multiple-choice",
                        question: "איך מתחילים שיחה אינטראקטיבית עם Claude Code?",
                        options: ["מקלידים claude בטרמינל", "פותחים אפליקציה", "נכנסים לאתר", "מריצים python claude.py"],
                        correct: 0,
                        explanation: "פשוט מקלידים claude בטרמינל ומתחילים לכתוב. זה הכל!",
                        wrongExplanations: [null, "Claude Code הוא CLI, לא אפליקציה גרפית.", "זה לא שירות ווב — זה כלי טרמינל.", "Claude Code הוא חבילת npm, לא סקריפט Python."]
                    },
                    {
                        type: "fill-blank",
                        question: "השלימו את הפקודה:",
                        template: "claude ___ 'הסבר מה עושה הקובץ server.js'",
                        options: ["-p", "-r", "-f", "-x"],
                        correct: 0,
                        explanation: "הדגל -p (prompt) מאפשר להריץ פקודה חד-פעמית בלי להיכנס למצב אינטראקטיבי."
                    },
                    {
                        type: "compare",
                        question: "איזו הוראה תיתן תוצאה טובה יותר?",
                        optionA: {
                            label: "הוראה א",
                            text: "תתקן את הבאג"
                        },
                        optionB: {
                            label: "הוראה ב",
                            text: "יש שגיאת TypeError בשורה 42 של utils.js — הפונקציה מקבלת null במקום מערך. תתקן"
                        },
                        correct: 1,
                        explanation: "ככל שההוראה ספציפית יותר, Claude Code עובד טוב יותר. ציינו קובץ, שורה, סוג שגיאה — והתוצאה תהיה מדויקת הרבה יותר."
                    },
                    {
                        type: "multiple-choice",
                        question: "מה Claude Code עושה לפני שהוא משנה קובץ?",
                        options: ["מבקש אישור מהמשתמש", "משנה מיד בלי לשאול", "שומר גיבוי אוטומטי", "שולח אימייל"],
                        correct: 0,
                        explanation: "Claude Code תמיד מציג את השינויים המתוכננים ומבקש אישור לפני ביצוע. זה עיקרון בטיחות מרכזי.",
                        wrongExplanations: [null, "Claude Code לא משנה קבצים בלי אישור — זה עיקרון בטיחות.", "הוא לא שומר גיבוי אוטומטי — אתם אחראים על גרסאות (git).", "אין שליחת אימייל כאן."]
                    },
                    {
                        type: "order",
                        question: "סדרו את זרימת העבודה הטיפוסית עם Claude Code:",
                        items: ["נותנים הוראה בשפה טבעית", "Claude Code קורא את הקוד הרלוונטי", "מציג תוכנית שינויים ומבקש אישור", "מבצע את השינויים"],
                        correctOrder: [0, 1, 2, 3],
                        explanation: "הזרימה היא: הוראה → קריאת קוד → תוכנית → אישור → ביצוע. Claude Code תמיד מבין את ההקשר לפני שהוא פועל."
                    },
                    {
                        type: "match",
                        question: "התאימו בין הפקודה לפעולה:",
                        pairs: [
                            { left: "claude", right: "כניסה למצב אינטראקטיבי" },
                            { left: "claude -p '...'", right: "פקודה חד-פעמית (one-shot)" },
                            { left: "/help", right: "הצגת עזרה בתוך השיחה" },
                            { left: "/clear", right: "ניקוי היסטוריית השיחה" }
                        ],
                        explanation: "claude לבד = צ'אט אינטראקטיבי. -p = פקודה חד-פעמית. /help ו-/clear הם פקודות פנימיות (slash commands)."
                    }
                ]
            },
            {
                id: 3,
                title: "Slash Commands וניווט בסיסי",
                summary: "Claude Code כולל פקודות מיוחדות שמתחילות ב-/ שמאפשרות לשלוט בשיחה: /help לעזרה, /clear לניקוי, /compact לדחיסה, /model לבחירת מודל, /cost לבדיקת עלות.",
                summaryDetail: "/compact הוא אחד הכלים החשובים ביותר — הוא דוחס את ההיסטוריה ומפנה מקום בחלון ההקשר. /model מאפשר לעבור בין Opus (חזק יותר, יקר) ל-Sonnet (מהיר, זול) ול-Haiku (הכי מהיר, הכי זול). /cost מראה כמה עלתה השיחה. פקודות שימושיות נוספות: /init ליצירת CLAUDE.md, /agents לניהול סוכנים, /rewind לחזרה אחורה, ואפשר גם ליצור פקודות / משלכם.",
                exercises: [
                    {
                        type: "multiple-choice",
                        question: "מה עושה הפקודה /compact?",
                        options: ["דוחסת את ההיסטוריה ומפנה מקום בחלון ההקשר", "סוגרת את Claude Code", "מדפיסה את כל השיחה", "מוחקת את הפרויקט"],
                        correct: 0,
                        explanation: "/compact דוחס את כל ההיסטוריה לסיכום קצר, מה שמפנה מקום ומאפשר לשיחה להמשיך זמן רב יותר.",
                        wrongExplanations: [null, "כדי לצאת מ-Claude Code מקלידים /exit או Ctrl+C.", "אין פקודה כזו — /compact דוחסת, לא מדפיסה.", "Claude Code לא מוחק פרויקטים כברירת מחדל."]
                    },
                    {
                        type: "match",
                        question: "התאימו בין ה-slash command לפעולה:",
                        pairs: [
                            { left: "/help", right: "הצגת כל הפקודות הזמינות" },
                            { left: "/clear", right: "ניקוי מלא של היסטוריית השיחה" },
                            { left: "/compact", right: "דחיסת ההיסטוריה לסיכום קצר" },
                            { left: "/cost", right: "הצגת עלות השיחה הנוכחית" }
                        ],
                        explanation: "כל פקודה מתחילה ב-/ ומבצעת פעולה ספציפית בתוך השיחה."
                    },
                    {
                        type: "fill-blank",
                        question: "כדי לעבור ממודל Sonnet ל-Opus, מקלידים:",
                        template: "/model ___",
                        options: ["opus", "gpt-4", "gemini", "claude-3"],
                        correct: 0,
                        explanation: "/model opus (או /model sonnet, /model haiku) מאפשר לעבור בין מודלים תוך כדי שיחה."
                    },
                    {
                        type: "compare",
                        question: "מתי עדיף להשתמש ב-/compact במקום /clear?",
                        optionA: {
                            label: "אפשרות א",
                            text: "כשרוצים לשמור את ההקשר הכללי אבל לפנות מקום בזיכרון"
                        },
                        optionB: {
                            label: "אפשרות ב",
                            text: "כשרוצים להתחיל נושא חדש לגמרי מאפס"
                        },
                        correct: 0,
                        explanation: "/compact שומר סיכום של מה שהיה — מושלם כשממשיכים באותו נושא. /clear מוחק הכל — מתאים כשמתחילים נושא חדש לגמרי."
                    },
                    {
                        type: "order",
                        question: "סדרו את המודלים מהמהיר ביותר ליקר ביותר:",
                        items: ["Haiku — הכי מהיר וזול", "Sonnet — איזון בין מהירות ויכולת", "Opus — הכי חזק ויקר"],
                        correctOrder: [0, 1, 2],
                        explanation: "Haiku < Sonnet < Opus מבחינת מחיר ויכולת. Haiku מצוין לסריקות פשוטות, Sonnet לרוב העבודה, Opus למשימות מורכבות."
                    },
                    {
                        type: "improve",
                        question: "מה הדרך הנכונה לבדוק כמה עלתה השיחה?",
                        original: "כמה זה עולה?",
                        options: ["/cost", "/price", "/money", "/billing"],
                        correct: 0,
                        explanation: "/cost מציג את עלות השיחה הנוכחית — כולל טוקנים של קלט ופלט."
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        title: "עבודה עם קבצים ופרויקטים",
        description: "קריאה, כתיבה, עריכה וחיפוש בקוד",
        icon: "📁",
        lessons: [
            {
                id: 4,
                title: "הכלים של Claude Code — Read, Edit, Write",
                summary: "Claude Code משתמש בכלים (Tools) לביצוע פעולות: Read לקריאת קבצים, Edit לעריכה, Write ליצירת קבצים חדשים, Bash להרצת פקודות, Glob לחיפוש קבצים, Grep לחיפוש תוכן.",
                summaryDetail: "כל כלי עושה דבר אחד טוב: Read קורא קובץ ומציג עם מספרי שורות. Edit מחליף טקסט ספציפי (לא כותב מחדש את כל הקובץ). Write יוצר קובץ חדש או כותב מחדש קובץ שלם. Bash מריץ פקודות של (npm, git, etc). Glob מוצא קבצים לפי תבנית (**//.js). Grep מחפש תוכן בתוך קבצים.",
                exercises: [
                    {
                        type: "match",
                        question: "התאימו בין הכלי לפעולה:",
                        pairs: [
                            { left: "Read", right: "קריאת קובץ קיים" },
                            { left: "Edit", right: "עריכת חלק ספציפי בקובץ" },
                            { left: "Write", right: "יצירת קובץ חדש או כתיבה מחדש" },
                            { left: "Bash", right: "הרצת פקודות בטרמינל" }
                        ],
                        explanation: "כל כלי מתמחה בפעולה אחת — Read קורא, Edit עורך טקסט ספציפי, Write כותב קובץ שלם, Bash מריץ פקודות."
                    },
                    {
                        type: "multiple-choice",
                        question: "מה ההבדל בין Edit ל-Write?",
                        options: ["Edit מחליף טקסט ספציפי, Write כותב קובץ שלם", "אין הבדל", "Edit יותר מהיר", "Write לא יכול לערוך קבצים קיימים"],
                        correct: 0,
                        explanation: "Edit מחליף קטע טקסט מסוים בקובץ (כמו Search & Replace). Write כותב את כל הקובץ מחדש או יוצר חדש.",
                        wrongExplanations: [null, "יש הבדל מהותי בדרך הפעולה!", "שניהם פועלים באותה מהירות — ההבדל הוא בגישה.", "Write דווקא כן יכול לכתוב מחדש קבצים קיימים."]
                    },
                    {
                        type: "compare",
                        question: "מה עדיף לשימוש כשרוצים לשנות שורה אחת בקובץ?",
                        optionA: {
                            label: "Edit",
                            text: "מחליף רק את הטקסט הספציפי בלי לגעת בשאר הקובץ"
                        },
                        optionB: {
                            label: "Write",
                            text: "כותב את כל הקובץ מחדש כולל השינוי"
                        },
                        correct: 0,
                        explanation: "Edit הוא בחירה טובה יותר — הוא שולח רק את השינוי (diff), מה שחוסך טוקנים ומפחית סיכוי לשגיאות."
                    },
                    {
                        type: "fill-blank",
                        question: "כדי לחפש קבצי JavaScript בפרויקט, Claude Code ישתמש בכלי:",
                        template: "___",
                        options: ["Glob", "Read", "Bash", "Write"],
                        correct: 0,
                        explanation: "Glob מוצא קבצים לפי תבנית — לדוגמה **/*.js ימצא את כל קבצי ה-JavaScript בפרויקט."
                    },
                    {
                        type: "order",
                        question: "סדרו את הזרימה הנכונה לתיקון באג:",
                        items: ["Glob — מציאת הקובץ הרלוונטי", "Read — קריאת הקוד", "Edit — תיקון השגיאה", "Bash — הרצת טסטים לוודא שהתיקון עובד"],
                        correctOrder: [0, 1, 2, 3],
                        explanation: "קודם מוצאים, אז קוראים, מתקנים, ולבסוף מוודאים. זו זרימה טבעית של debugging."
                    },
                    {
                        type: "multiple-choice",
                        question: "מה ההבדל בין Glob ל-Grep?",
                        options: ["Glob מחפש שמות קבצים, Grep מחפש תוכן בתוך קבצים", "Glob יותר מהיר", "Grep עובד רק עם Python", "אין הבדל"],
                        correct: 0,
                        explanation: "Glob מוצא קבצים לפי תבנית שם (*.js, **/*.css). Grep מחפש טקסט בתוך תוכן הקבצים (כמו 'function handleClick').",
                        wrongExplanations: [null, "שניהם מהירים — ההבדל הוא במה שהם מחפשים.", "Grep עובד עם כל סוג קובץ.", "יש הבדל ברור — שם קובץ vs תוכן."]
                    }
                ]
            },
            {
                id: 5,
                title: "CLAUDE.md — החוקה של הפרויקט",
                summary: "CLAUDE.md הוא קובץ מיוחד שנטען אוטומטית בתחילת כל שיחה. הוא מגדיר לClaude Code את החוקים, הסגנון, הארכיטקטורה והעדפות של הפרויקט. זה כמו README — אבל עבור Claude.",
                summaryDetail: "כל פרויקט רציני צריך CLAUDE.md. זה המקום לכתוב: סטאק טכנולוגי, מבנה תיקיות, קונבנציות קוד, פקודות build/test, ומה Claude לא צריך לעשות. ככל שה-CLAUDE.md מדויק יותר, Claude Code עובד טוב יותר.",
                exercises: [
                    {
                        type: "multiple-choice",
                        question: "מתי CLAUDE.md נטען?",
                        options: ["אוטומטית בתחילת כל שיחה", "רק כשמבקשים", "פעם ביום", "רק בפעם הראשונה"],
                        correct: 0,
                        explanation: "CLAUDE.md נטען אוטומטית בכל פעם ש-Claude Code נפתח בתיקיית הפרויקט. לא צריך לבקש — הוא תמיד שם.",
                        wrongExplanations: [null, "הוא נטען אוטומטית, בלי צורך לבקש.", "הוא נטען בכל שיחה, לא פעם ביום.", "הוא נטען בכל שיחה, לא רק בראשונה."]
                    },
                    {
                        type: "order",
                        question: "מה כדאי לכלול ב-CLAUDE.md? סדרו לפי חשיבות:",
                        items: ["סטאק טכנולוגי ופקודות build", "קונבנציות קוד ומבנה פרויקט", "מה Claude לא צריך לעשות", "סגנון קומיטים והעדפות"],
                        correctOrder: [0, 1, 2, 3],
                        explanation: "הכי חשוב: מה הסטאק ואיך בונים. אח\"כ: קונבנציות. אח\"כ: מגבלות. ולבסוף: סגנון."
                    },
                    {
                        type: "compare",
                        question: "איזה CLAUDE.md טוב יותר?",
                        optionA: {
                            label: "גרסה א",
                            text: "זה פרויקט React. תכתוב קוד טוב."
                        },
                        optionB: {
                            label: "גרסה ב",
                            text: "Stack: React 19 + Vite + Tailwind 4. Commands: npm run dev (port 3000), npm test. Style: functional components, Hebrew comments, RTL-first."
                        },
                        correct: 1,
                        explanation: "ככל שה-CLAUDE.md ספציפי ומפורט יותר, Claude Code נותן תוצאות טובות יותר. גרסה ב מגדירה סטאק, פקודות, וסגנון במדויק."
                    },
                    {
                        type: "fill-blank",
                        question: "CLAUDE.md ממוקם ב:",
                        template: "___ של הפרויקט",
                        options: ["שורש (root)", "תיקיית src", "תיקיית .git", "תיקיית node_modules"],
                        correct: 0,
                        explanation: "CLAUDE.md נמצא בשורש הפרויקט (root directory) — באותה רמה כמו package.json או README.md."
                    },
                    {
                        type: "improve",
                        question: "איך לשפר את ה-CLAUDE.md הזה?",
                        original: "פרויקט וובסייט",
                        options: ["Stack: Next.js 15, TypeScript, Tailwind. Build: npm run build. Test: npm test. Style: RTL Hebrew, components in src/components/", "תכתוב קוד טוב", "אל תעשה שגיאות", "השתמש ב-React"],
                        correct: 0,
                        explanation: "CLAUDE.md טוב מפרט: סטאק מדויק, פקודות build/test, מבנה תיקיות, וסגנון. לא הוראות כלליות.",
                        wrongExplanations: [null, "זה כללי מדי — Claude Code צריך פרטים ספציפיים.", "זו הוראה שלילית וכללית — עדיף לומר מה כן לעשות.", "זה לא מספיק — צריך גרסה, כלים, ומבנה."]
                    },
                    {
                        type: "match",
                        question: "התאימו בין סוג ההוראה למיקום הנכון:",
                        pairs: [
                            { left: "CLAUDE.md בשורש", right: "הוראות כלליות לפרויקט" },
                            { left: "CLAUDE.md בתיקיית משנה", right: "הוראות ספציפיות לחלק מסוים" },
                            { left: "~/.claude/CLAUDE.md", right: "העדפות אישיות גלובליות" },
                            { left: ".claude/settings.json", right: "הגדרות הרשאות ו-hooks" }
                        ],
                        explanation: "יש היררכיה: גלובלי → שורש פרויקט → תיקיות משנה. כל אחד מוסיף שכבה של הוראות."
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        title: "הרשאות ובטיחות",
        description: "מערכת ההרשאות, מצבים, ומה Claude Code לא יעשה בלי אישור",
        icon: "🛡️",
        lessons: [
            {
                id: 6,
                title: "מערכת ההרשאות — Permission Modes",
                summary: "Claude Code עובד ב-4 מצבי הרשאות: Default (אישור על כל פעולה), Auto-accept edits (עריכות בלי אישור), Plan Mode (קריאה ותכנון בלבד), ו-Bypass Permissions (הכל בלי אישור · מסוכן). עוברים ביניהם בלחיצת Shift+Tab. Default הוא המומלץ למתחילים.",
                summaryDetail: "במצב Default, Claude Code שואל לפני כל כתיבה לקובץ והרצת פקודה. ב-Auto-accept edits הוא עורך קבצים בלי לשאול, אבל עדיין שואל לפני Bash. ב-Plan Mode הוא רק קורא ומתכנן בלי לגעת בכלום, ומציג תוכנית לאישור. ב-Bypass Permissions (המצב שמופעל עם dangerously-skip-permissions) הכל מותר בלי אישור · מסוכן ומומלץ רק למנוסים. מעבר בין המצבים בלחיצת Shift+Tab.",
                exercises: [
                    {
                        type: "multiple-choice",
                        question: "מהו מצב ההרשאות המומלץ למתחילים?",
                        options: ["Default — מבקש אישור על כל פעולה", "Auto-accept edits — עריכות בלי אישור", "Bypass Permissions — מאשר הכל", "Plan Mode — קריאה ותכנון בלבד"],
                        correct: 0,
                        explanation: "Default הוא המאוזן ביותר למתחילים — Claude Code מבקש אישור לפני כל שינוי. כך אתם תמיד בשליטה.",
                        wrongExplanations: [null, "Auto-accept edits מתאים למשתמשים שכבר מכירים את הכלי.", "Bypass Permissions מסוכן — Claude Code יכול להריץ כל פקודה בלי אישור!", "Plan Mode בטוח (קריאה בלבד), אבל הוא לתכנון — לא למצב עבודה רגיל שבו צריך גם לבצע."]
                    },
                    {
                        type: "order",
                        question: "סדרו את מצבי ההרשאות מהמגביל/בטוח ביותר למסוכן:",
                        items: ["Plan Mode — קריאה ותכנון בלבד", "Default — אישור על כל פעולה", "Auto-accept edits — עריכות אוטומטית", "Bypass Permissions — הכל מותר כולל Bash"],
                        correctOrder: [0, 1, 2, 3],
                        explanation: "Plan Mode הכי מגביל (לא משנה כלום) → Default (אישור על הכל) → Auto-accept edits (עריכות בלי אישור) → Bypass (אין בקרה כלל)."
                    },
                    {
                        type: "compare",
                        question: "מתי כדאי לעבור ממצב Default למצב Auto-accept edits?",
                        optionA: {
                            label: "מצב א",
                            text: "כשמבצעים refactoring נרחב שדורש הרבה שינויים בקבצים ואתם בוטחים ב-Claude Code"
                        },
                        optionB: {
                            label: "מצב ב",
                            text: "כשעובדים על פרויקט חדש בפעם הראשונה"
                        },
                        correct: 0,
                        explanation: "Auto-accept edits חוסך אישורים חוזרים כש-Claude Code מבצע הרבה שינויים. בפרויקט חדש, עדיף Default כדי להבין מה קורה."
                    },
                    {
                        type: "match",
                        question: "התאימו בין המצב להתנהגות:",
                        pairs: [
                            { left: "Default", right: "שואל לפני כל Write, Edit ו-Bash" },
                            { left: "Auto-accept edits", right: "עורך קבצים בחופשיות, שואל רק על Bash" },
                            { left: "Plan Mode", right: "קורא ומתכנן, לא משנה כלום" },
                            { left: "Bypass Permissions", right: "מבצע הכל בלי לשאול" }
                        ],
                        explanation: "כל מצב מגדיר רמת אוטונומיה שונה. עוברים ביניהם עם Shift+Tab, ו-settings.json מאפשר כוונון עדין יותר לפי פקודה."
                    },
                    {
                        type: "fill-blank",
                        question: "כדי לאפשר ל-Claude Code להריץ npm test בלי אישור, מגדירים את זה ב:",
                        template: "___",
                        options: ["settings.json", "CLAUDE.md", "package.json", ".gitignore"],
                        correct: 0,
                        explanation: "settings.json (ב-.claude/) מאפשר להגדיר הרשאות ספציפיות — כמו 'npm test מותר בלי אישור'."
                    },
                    {
                        type: "multiple-choice",
                        question: "מה קורה כשמסרבים לאישור פעולה?",
                        options: ["Claude Code מחפש דרך אחרת או שואל מה לעשות", "Claude Code נסגר", "Claude Code מבצע בכל זאת", "הפקודה נשמרת להרצה אחר כך"],
                        correct: 0,
                        explanation: "כשמסרבים, Claude Code מכבד את ההחלטה ומחפש גישה חלופית או שואל כיצד להמשיך.",
                        wrongExplanations: [null, "הוא לא נסגר — ממשיך את השיחה.", "הוא אף פעם לא מבצע פעולה שסורבה!", "אין תור של פעולות — הוא פשוט מתאים את הגישה."]
                    }
                ]
            },
            {
                id: 7,
                title: "Git ובטיחות — מה Claude Code לא יעשה",
                summary: "Claude Code מתנהג בזהירות עם Git: יוצר commits חדשים (לא amend), לא עושה force push, לא מוחק branches, ולא מדלג על hooks. הוא מבין שפעולות הרסניות הן בלתי הפיכות.",
                summaryDetail: "עקרון מפתח: 'מדוד פעמיים, חתוך פעם אחת'. Claude Code לא יעשה git push --force, git reset --hard, או rm -rf בלי אישור מפורש. הוא גם לא יוסיף קבצים רגישים (.env, credentials) ל-git. כשיש קונפליקט — הוא ינסה לפתור, לא למחוק.",
                exercises: [
                    {
                        type: "multiple-choice",
                        question: "מה Claude Code עושה כש-pre-commit hook נכשל?",
                        options: ["מתקן את הבעיה ויוצר commit חדש", "מדלג על ה-hook עם --no-verify", "מוחק את ה-hook", "מפסיק לעבוד"],
                        correct: 0,
                        explanation: "Claude Code לא מדלג על hooks! הוא מתקן את הבעיה (lint, format) ויוצר commit חדש — לא amend.",
                        wrongExplanations: [null, "Claude Code לא ידלג על hooks — זה עיקרון בטיחות.", "הוא לא ימחק hooks — הם שם מסיבה!", "הוא לא מפסיק — הוא מתקן ומנסה שוב."]
                    },
                    {
                        type: "match",
                        question: "התאימו בין הפעולה להתנהגות של Claude Code:",
                        pairs: [
                            { left: "git push --force", right: "לא יבצע בלי אישור מפורש" },
                            { left: "git commit", right: "תמיד commit חדש, לא amend" },
                            { left: "קבצי .env", right: "לא יוסיף ל-git, יזהיר" },
                            { left: "merge conflict", right: "ינסה לפתור, לא למחוק" }
                        ],
                        explanation: "Claude Code תמיד בוחר את הגישה הבטוחה: commit חדש, לא force push, לא לגעת בסודות, לפתור קונפליקטים."
                    },
                    {
                        type: "compare",
                        question: "מה עדיף כש-Claude Code צריך לעדכן commit אחרון?",
                        optionA: {
                            label: "git commit --amend",
                            text: "משנה את ה-commit האחרון, עלול לגרום לבעיות אם כבר נדחף"
                        },
                        optionB: {
                            label: "git commit חדש",
                            text: "יוצר commit חדש עם התיקון, תמיד בטוח"
                        },
                        correct: 1,
                        explanation: "Claude Code תמיד מעדיף commit חדש — זה בטוח יותר ולא משנה היסטוריה שכבר נדחפה."
                    },
                    {
                        type: "fill-blank",
                        question: "העיקרון של Claude Code עם פעולות מסוכנות:",
                        template: "מדוד ___, חתוך פעם אחת",
                        options: ["פעמיים", "שלוש פעמים", "עשר פעמים", "פעם אחת"],
                        correct: 0,
                        explanation: "'מדוד פעמיים, חתוך פעם אחת' — Claude Code בודק פעמיים לפני פעולות בלתי הפיכות."
                    },
                    {
                        type: "order",
                        question: "סדרו את הפעולות מבטוחה למסוכנת:",
                        items: ["קריאת קובץ (Read)", "עריכת קובץ (Edit)", "הרצת npm test (Bash)", "git push --force (Bash)"],
                        correctOrder: [0, 1, 2, 3],
                        explanation: "קריאה בטוחה לגמרי. עריכה הפיכה עם git. npm test בטוח בדרך כלל. force push — מסוכן ובלתי הפיך."
                    },
                    {
                        type: "identify",
                        question: "סמנו את הפקודה המסוכנת שClaude Code לא יריץ בלי אישור:",
                        text: "git add . && git commit -m 'fix' && git push --force origin main && echo 'done'",
                        correctRange: [40, 71],
                        explanation: "git push --force origin main היא הפקודה המסוכנת — היא דורסת היסטוריה בשרת ויכולה למחוק עבודה של אחרים."
                    }
                ]
            }
        ]
    },
    {
        id: 4,
        title: "טכניקות עבודה יעילות",
        description: "איך לתת הוראות טובות, לחסוך טוקנים, ולעבוד חכם",
        icon: "⚡",
        lessons: [
            {
                id: 8,
                title: "Prompt Engineering ל-Claude Code",
                summary: "הוראות טובות = תוצאות טובות. שלושה עקרונות: ספציפיות (מה בדיוק לעשות, באיזה קובץ, איזה סגנון), הקשר (מה הבעיה, מה ניסינו), ומגבלות (מה לא לשנות, מה לא לגעת בו).",
                summaryDetail: "הוראה טובה ל-Claude Code כוללת: מה לעשות (פועל ברור), איפה (קובץ/תיקייה), איך (סגנון, קונבנציות), ומה לא (מגבלות). דוגמה: 'הוסף ולידציה של אימייל לטופס ב-ContactForm.tsx, השתמש ב-zod, אל תשנה את הסטיילינג'.",
                exercises: [
                    {
                        type: "compare",
                        question: "איזו הוראה טובה יותר?",
                        optionA: {
                            label: "הוראה א",
                            text: "תתקן את הבאג"
                        },
                        optionB: {
                            label: "הוראה ב",
                            text: "ב-UserForm.tsx שורה 87 יש TypeError: cannot read 'name' of undefined. הסיבה: formData יכול להיות null. תוסיף null check"
                        },
                        correct: 1,
                        explanation: "הוראה ב ספציפית: קובץ, שורה, סוג שגיאה, סיבה, ופתרון רצוי. Claude Code יטפל בזה מיד בלי חיפושים מיותרים."
                    },
                    {
                        type: "improve",
                        question: "שפרו את ההוראה הזו:",
                        original: "תעשה כפתור",
                        options: ["צור כפתור 'שלח' בטופס ContactForm.tsx, כחול עם hover effect, disabled כשהטופס לא תקין, בסגנון shadcn/ui", "תכתוב קוד של כפתור", "צור button component", "הוסף כפתור לאתר"],
                        correct: 0,
                        explanation: "הוראה טובה מפרטת: מה (כפתור שלח), איפה (ContactForm.tsx), איך (כחול, hover, disabled), סגנון (shadcn/ui).",
                        wrongExplanations: [null, "כללי מדי — אין קובץ, סגנון, או התנהגות.", "קצת יותר טוב, אבל עדיין חסר מיקום, סגנון, והתנהגות.", "מאוד כללי — Claude Code לא ידע לאיזה דף, איזה סגנון, מה הכפתור עושה."]
                    },
                    {
                        type: "multiple-choice",
                        question: "למה חשוב לציין מה Claude Code לא צריך לשנות?",
                        options: ["כדי שלא ישנה קוד שעובד טוב", "כי הוא תמיד משנה הכל", "כדי לחסוך זמן", "זה לא חשוב"],
                        correct: 0,
                        explanation: "מגבלות מונעות שינויים לא רצויים. 'אל תשנה את הסטיילינג' או 'אל תגע בקובץ X' שומרים על קוד שעובד.",
                        wrongExplanations: [null, "הוא לא משנה הכל, אבל מגבלות עוזרות לו להתמקד.", "זה יותר מחיסכון זמן — זה שמירה על קוד תקין.", "זה מאוד חשוב לתוצאות טובות!"]
                    },
                    {
                        type: "order",
                        question: "סדרו את מרכיבי ההוראה הטובה:",
                        items: ["מה לעשות (פועל ברור)", "איפה (קובץ/מיקום)", "איך (סגנון/קונבנציות)", "מה לא לשנות (מגבלות)"],
                        correctOrder: [0, 1, 2, 3],
                        explanation: "קודם מה, אז איפה, אז איך, ולבסוף מגבלות. ככל שמפרטים יותר — התוצאה טובה יותר."
                    },
                    {
                        type: "match",
                        question: "התאימו בין סוג ההוראה לדוגמה:",
                        pairs: [
                            { left: "ספציפית", right: "תקן TypeError בשורה 42 של utils.js" },
                            { left: "עם הקשר", right: "אחרי שינוי X, הטסט Y נכשל" },
                            { left: "עם מגבלות", right: "שנה רק את הפונקציה Z, אל תגע בשאר" },
                            { left: "כללית (רע)", right: "תתקן את הקוד" }
                        ],
                        explanation: "הוראות ספציפיות, עם הקשר ומגבלות נותנות תוצאות הכי טובות. הוראות כלליות גורמות לניחושים."
                    },
                    {
                        type: "fill-blank",
                        question: "שלושת עקרונות ההוראה הטובה:",
                        template: "ספציפיות, הקשר, ___",
                        options: ["מגבלות", "אורך", "פורמליות", "תכיפות"],
                        correct: 0,
                        explanation: "ספציפיות (מה בדיוק), הקשר (למה, מה הבעיה), מגבלות (מה לא לשנות) — שלושת המפתחות."
                    }
                ]
            },
            {
                id: 9,
                title: "חיסכון בטוקנים ויעילות",
                summary: "טוקנים עולים כסף. עקרונות חיסכון: /compact בין נושאים, /clear כשמחליפים נושא, משימה אחת לשיחה, טוענים רק קבצים רלוונטיים, משתמשים ב-Haiku למשימות פשוטות.",
                summaryDetail: "כל מילה שClaude Code קורא או כותב = טוקנים = כסף. אסטרטגיות: 1) /compact כשההיסטוריה גדלה. 2) /clear כשמתחילים נושא חדש. 3) משימה אטומית — דבר אחד בכל שיחה. 4) לא טוענים כל הפרויקט — רק מה שצריך. 5) /model haiku לסריקות פשוטות.",
                exercises: [
                    {
                        type: "multiple-choice",
                        question: "מה הדרך הכי טובה לחסוך טוקנים כשמחליפים נושא?",
                        options: ["/clear — ניקוי מלא של ההיסטוריה", "להמשיך באותה שיחה", "לסגור ולפתוח מחדש", "לשלוח הודעה ריקה"],
                        correct: 0,
                        explanation: "/clear מנקה את כל ההיסטוריה ומתחיל חדש. ככה לא גוררים הקשר לא רלוונטי שעולה טוקנים.",
                        wrongExplanations: [null, "להמשיך באותה שיחה בזבוז טוקנים — Claude Code קורא את כל ההיסטוריה כל פעם.", "לסגור ולפתוח עובד, אבל /clear יותר מהיר.", "הודעה ריקה לא עוזרת."]
                    },
                    {
                        type: "compare",
                        question: "איזו גישה חוסכת יותר טוקנים?",
                        optionA: {
                            label: "גישה א",
                            text: "שיחה ארוכה אחת שמטפלת ב-5 באגים שונים"
                        },
                        optionB: {
                            label: "גישה ב",
                            text: "5 שיחות קצרות — באג אחד לכל שיחה עם /clear ביניהן"
                        },
                        correct: 1,
                        explanation: "שיחות קצרות וממוקדות חוסכות טוקנים. בשיחה ארוכה, Claude Code קורא את כל ההיסטוריה בכל תשובה — כולל באגים שכבר תוקנו."
                    },
                    {
                        type: "order",
                        question: "סדרו את האסטרטגיות מהכי חוסכת להכי בזבזנית:",
                        items: ["/model haiku + משימה ממוקדת", "/model sonnet + /compact תכוף", "/model opus + שיחה ארוכה בלי compact", "/model opus + טעינת כל הפרויקט"],
                        correctOrder: [0, 1, 2, 3],
                        explanation: "Haiku + מיקוד = הכי חסכוני. Opus + שיחה ארוכה + הכל טעון = הכי יקר."
                    },
                    {
                        type: "fill-blank",
                        question: "עיקרון העבודה היעילה: משימה ___ לכל שיחה",
                        template: "משימה ___ לכל שיחה",
                        options: ["אחת", "אינסופית", "גדולה", "מורכבת"],
                        correct: 0,
                        explanation: "משימה אטומית — דבר אחד לכל שיחה. ככה ההקשר ממוקד והטוקנים לא מתבזבזים."
                    },
                    {
                        type: "match",
                        question: "התאימו בין המודל לשימוש האידיאלי:",
                        pairs: [
                            { left: "Haiku", right: "סריקות פשוטות, שאלות מהירות" },
                            { left: "Sonnet", right: "רוב העבודה היומיומית" },
                            { left: "Opus", right: "משימות מורכבות, ארכיטקטורה" },
                            { left: "/compact", right: "כשההיסטוריה תופסת יותר מדי מקום" }
                        ],
                        explanation: "כל מודל מתאים למשהו אחר. חכם = להתאים את המודל למשימה."
                    },
                    {
                        type: "improve",
                        question: "איך לשפר את צורת העבודה הזו?",
                        original: "פותח שיחה אחת ארוכה, שואל 10 שאלות על 10 נושאים שונים, לא עושה compact",
                        options: ["שיחה קצרה לכל נושא, /clear בין נושאים, /compact כשההיסטוריה גדלה", "ממשיך באותה שיחה כי כבר יש הקשר", "שולח הודעות יותר קצרות", "משתמש רק ב-Opus"],
                        correct: 0,
                        explanation: "שיחות ממוקדות + /clear + /compact = חיסכון משמעותי בטוקנים ותוצאות טובות יותר.",
                        wrongExplanations: [null, "הקשר מנושאים אחרים מבזבז טוקנים ומבלבל.", "אורך ההודעה פחות חשוב מאורך ההיסטוריה.", "Opus הוא הכי יקר — לא תמיד צריך אותו."]
                    }
                ]
            }
        ]
    },
    {
        id: 5,
        title: "Hooks, MCP וכלים מתקדמים",
        description: "אוטומציות, שרתי MCP, ועבודה עם סוכנים",
        icon: "🔧",
        lessons: [
            {
                id: 10,
                title: "Hooks — אוטומציות בClaude Code",
                summary: "Hooks הם פקודות shell שרצות אוטומטית בתגובה לאירועים. לדוגמה: hook שמריץ lint אחרי כל Edit, או hook שמוסיף תוכן לפני כל שיחה. מוגדרים ב-settings.json.",
                summaryDetail: "יש כמה סוגי hooks: PreToolUse (לפני שכלי רץ), PostToolUse (אחרי), UserPromptSubmit (כששולחים הודעה), Notification (כש-Claude Code מתריע), Stop ו-SubagentStop (בסיום), ו-SessionStart/SessionEnd (פתיחה וסגירה של סשן). כל hook מקבל JSON עם פרטי האירוע ויכול לחסום, לאשר, או להוסיף תוכן. דוגמה: PostToolUse על Write שמריץ eslint --fix.",
                exercises: [
                    {
                        type: "multiple-choice",
                        question: "מה הם Hooks ב-Claude Code?",
                        options: ["פקודות shell שרצות אוטומטית בתגובה לאירועים", "תוספים גרפיים", "פונקציות JavaScript", "סוג של API"],
                        correct: 0,
                        explanation: "Hooks הם shell commands שמוגדרים ב-settings.json ורצים אוטומטית כשמתרחש אירוע מסוים (כמו Edit או Write).",
                        wrongExplanations: [null, "Hooks הם CLI-based, לא גרפיים.", "הם פקודות shell, לא פונקציות JS.", "הם לא API — הם אוטומציות מקומיות."]
                    },
                    {
                        type: "match",
                        question: "התאימו בין סוג ה-Hook לתזמון:",
                        pairs: [
                            { left: "PreToolUse", right: "לפני שכלי רץ — יכול לחסום" },
                            { left: "PostToolUse", right: "אחרי שכלי סיים — יכול להוסיף" },
                            { left: "Notification", right: "כש-Claude Code שולח הודעה" },
                            { left: "Stop", right: "כש-Claude Code מסיים את התשובה" }
                        ],
                        explanation: "כל hook רץ בזמן אחר — Pre לפני, Post אחרי, Notification על הודעות, Stop בסיום."
                    },
                    {
                        type: "compare",
                        question: "איזה שימוש ב-Hook יעיל יותר?",
                        optionA: {
                            label: "Hook א",
                            text: "PostToolUse על Write → מריץ eslint --fix אוטומטית"
                        },
                        optionB: {
                            label: "Hook ב",
                            text: "לזכור להריץ eslint ידנית אחרי כל שינוי"
                        },
                        correct: 0,
                        explanation: "Hook אוטומטי מבטיח ש-linting תמיד רץ — בלי לסמוך על הזיכרון. זה חוסך זמן ושגיאות."
                    },
                    {
                        type: "fill-blank",
                        question: "Hooks מוגדרים בקובץ:",
                        template: "___",
                        options: ["settings.json", "CLAUDE.md", "package.json", "hooks.js"],
                        correct: 0,
                        explanation: "כל ה-hooks מוגדרים ב-.claude/settings.json — שם מגדירים גם הרשאות והגדרות אחרות."
                    },
                    {
                        type: "order",
                        question: "סדרו את שלבי הגדרת Hook:",
                        items: ["בוחרים אירוע (PreToolUse/PostToolUse/...)", "מגדירים matcher — על אילו כלים", "כותבים את פקודת ה-shell", "מוסיפים ל-settings.json"],
                        correctOrder: [0, 1, 2, 3],
                        explanation: "קודם בוחרים אירוע, אז מגדירים על מה הוא רץ, כותבים את הפקודה, ומוסיפים לקובץ ההגדרות."
                    },
                    {
                        type: "improve",
                        question: "איך לשפר את ה-hook הזה?",
                        original: "PostToolUse על כל כלי → מריץ npm test",
                        options: ["PostToolUse על Write בלבד → מריץ eslint --fix על הקובץ שנשתנה", "PostToolUse על כל כלי → מריץ npm run build", "PreToolUse על Read → מריץ npm test", "Stop → מריץ npm test"],
                        correct: 0,
                        explanation: "hook ממוקד (רק על Write, רק eslint על הקובץ הרלוונטי) הוא יעיל יותר מ-hook שרץ על כל פעולה.",
                        wrongExplanations: [null, "build על כל כלי זה מוגזם — ייקח הרבה זמן.", "test על Read לא הגיוני — לא שינינו שום דבר.", "Stop מתאים לפעולות שונות, לא ל-linting."]
                    },
                    {
                        type: "multiple-choice",
                        question: "מה Hook מסוג PreToolUse יכול לעשות?",
                        options: ["לחסום פעולה לפני שהיא קורית", "רק לתעד פעולות", "לשנות קבצים", "להוסיף XP"],
                        correct: 0,
                        explanation: "PreToolUse רץ לפני שכלי מופעל — הוא יכול לחסום, לאשר, או להוסיף הקשר לפני הביצוע.",
                        wrongExplanations: [null, "הוא יכול גם לחסום, לא רק לתעד.", "הוא לא משנה קבצים — הוא מגיב לאירועים.", "אין קשר ל-XP — זה לא משחק."]
                    }
                ]
            },
            {
                id: 11,
                title: "MCP — הרחבת היכולות",
                summary: "MCP (Model Context Protocol) מאפשר ל-Claude Code להתחבר לשרתים חיצוניים ולהרחיב את היכולות שלו. לדוגמה: שרת MCP ל-Chrome DevTools, Figma, Slack, GitHub, או כל API אחר.",
                summaryDetail: "שרת MCP רץ כתהליך נפרד ומספק 'כלים' נוספים ל-Claude Code. לדוגמה, שרת chrome-devtools נותן יכולת לצלם screenshot, ללחוץ על אלמנטים, ולנווט בדפדפן. מוסיפים שרת עם הפקודה claude mcp add (או בקובץ .mcp.json), ובודקים סטטוס עם /mcp. הכלים נטענים אוטומטית.",
                exercises: [
                    {
                        type: "multiple-choice",
                        question: "מה MCP מאפשר?",
                        options: ["חיבור Claude Code לשירותים חיצוניים", "התקנת Claude Code", "שינוי ממשק", "שמירת קבצים"],
                        correct: 0,
                        explanation: "MCP = Model Context Protocol. הוא מרחיב את Claude Code עם כלים חדשים — כמו גישה לדפדפן, APIs, ושירותים.",
                        wrongExplanations: [null, "MCP לא קשור להתקנה.", "MCP לא משנה ממשק.", "Claude Code כבר יודע לשמור קבצים בלי MCP."]
                    },
                    {
                        type: "match",
                        question: "התאימו בין שרת MCP ליכולת:",
                        pairs: [
                            { left: "chrome-devtools", right: "שליטה בדפדפן, screenshots, ניווט" },
                            { left: "GitHub MCP", right: "יצירת PR, issues, code review" },
                            { left: "Slack MCP", right: "שליחת הודעות, קריאת ערוצים" },
                            { left: "Filesystem MCP", right: "גישה לקבצים מחוץ לפרויקט" }
                        ],
                        explanation: "כל שרת MCP מוסיף יכולות ספציפיות — Chrome DevTools לדפדפן, GitHub ל-Git, Slack להודעות."
                    },
                    {
                        type: "fill-blank",
                        question: "איך מוסיפים שרת MCP ל-Claude Code?",
                        template: "claude ___ add",
                        options: ["mcp", "server", "plugin", "install"],
                        correct: 0,
                        explanation: "הפקודה claude mcp add מוסיפה שרת MCP. אפשר גם להגדיר ידנית בקובץ .mcp.json, ולבדוק סטטוס עם /mcp."
                    },
                    {
                        type: "compare",
                        question: "מה היתרון של MCP על API ישיר?",
                        optionA: {
                            label: "MCP",
                            text: "Claude Code יודע להשתמש בכלי אוטומטית — מגלה, מבין, ומפעיל בלי קוד"
                        },
                        optionB: {
                            label: "API ישיר",
                            text: "צריך לכתוב קוד שמתחבר ל-API, לטפל בauth, ולפרסר תשובות"
                        },
                        correct: 0,
                        explanation: "MCP חושף כלים ש-Claude Code יכול להשתמש בהם ישירות — בלי לכתוב קוד אינטגרציה. זה כמו לתת לו כלי עבודה מוכנים."
                    },
                    {
                        type: "order",
                        question: "סדרו את השלבים להוספת שרת MCP:",
                        items: ["התקנת/איתור שרת ה-MCP", "הוספה עם claude mcp add", "הפעלה מחדש של Claude Code", "שימוש בכלים החדשים בשיחה"],
                        correctOrder: [0, 1, 2, 3],
                        explanation: "מתקינים, מגדירים, מפעילים מחדש — ואז הכלים זמינים אוטומטית."
                    },
                    {
                        type: "improve",
                        question: "איך עדיף להוסיף יכולת שליטה בדפדפן ל-Claude Code?",
                        original: "לכתוב סקריפט Puppeteer ולהריץ דרך Bash",
                        options: ["להתקין שרת MCP של Chrome DevTools — Claude Code ישתמש בכלים ישירות", "לכתוב API wrapper ב-Python", "להשתמש ב-Selenium", "לצלם screenshots ידנית"],
                        correct: 0,
                        explanation: "שרת MCP של Chrome DevTools נותן ל-Claude Code גישה ישירה לדפדפן — screenshots, קליקים, ניווט — בלי לכתוב קוד.",
                        wrongExplanations: [null, "עובד אבל דורש הרבה קוד. MCP נותן את זה מוכן.", "Selenium מיושן ומסובך — MCP הרבה יותר פשוט.", "לא יעיל ולא אוטומטי."]
                    },
                    {
                        type: "multiple-choice",
                        question: "מה קורה כש-Claude Code מזהה שרת MCP מוגדר?",
                        options: ["הכלים של ה-MCP נטענים אוטומטית ומתווספים ליכולות", "צריך להפעיל כל כלי ידנית", "ה-MCP רץ רק כשמבקשים", "צריך לייבא ב-CLAUDE.md"],
                        correct: 0,
                        explanation: "שרתי MCP שמוגדרים ב-settings.json נטענים אוטומטית כשClaude Code נפתח. הכלים מתווספים ליכולות בלי שום פעולה נוספת.",
                        wrongExplanations: [null, "הכלים זמינים אוטומטית — לא צריך הפעלה ידנית.", "MCP רץ ברקע כל הזמן, לא רק על דרישה.", "MCP מוגדר ב-settings.json, לא ב-CLAUDE.md."]
                    }
                ]
            }
        ]
    },
    {
        id: 6,
        title: "עבודה עם Sub-Agents",
        description: "אורקסטרציה, delegation, ועבודה במקביל",
        icon: "🤖",
        lessons: [
            {
                id: 12,
                title: "Sub-Agents — האצלת משימות",
                summary: "Claude Code יכול להפעיל sub-agents — סוכנים קטנים שמבצעים משימות ספציפיות. Agent של Explore לחקירת קוד, Plan לתכנון, ו-general-purpose למשימות מורכבות. הם רצים במקביל וחוזרים עם תוצאות.",
                summaryDetail: "Sub-agents הם כמו עובדים שClaude Code שולח לבצע משימות. Agent explore סורק את הקוד. Agent plan מתכנן אסטרטגיה. כל agent מקבל הקשר ומחזיר תוצאה. היתרון: עבודה במקביל (כמה agents בו-זמנית) והגנה על חלון ההקשר הראשי.",
                exercises: [
                    {
                        type: "multiple-choice",
                        question: "למה משתמשים ב-sub-agents?",
                        options: ["להאציל משימות ולהגן על חלון ההקשר", "כי Claude Code לא יכול לקרוא קבצים", "כדי לשנות שפת תכנות", "כדי לחסוך כסף"],
                        correct: 0,
                        explanation: "Sub-agents מגנים על ההקשר הראשי — תוצאות גולמיות נשארות אצלם, ורק הסיכום חוזר.",
                        wrongExplanations: [null, "Claude Code קורא קבצים מצוין — agents עוזרים בפרלליזם.", "שפת התכנות לא קשורה ל-agents.", "Sub-agents לא בהכרח חוסכים כסף — הם חוסכים הקשר."]
                    },
                    {
                        type: "match",
                        question: "התאימו בין סוג Agent למתי להשתמש בו:",
                        pairs: [
                            { left: "Explore", right: "חיפוש קוד, סריקת פרויקט" },
                            { left: "Plan", right: "תכנון ארכיטקטורה, אסטרטגיה" },
                            { left: "general-purpose", right: "משימות מורכבות רב-שלביות" },
                            { left: "הפעלה במקביל", right: "כשיש משימות בלתי תלויות" }
                        ],
                        explanation: "כל agent מתמחה במשהו — Explore לסריקה, Plan לתכנון, general-purpose לבשר."
                    },
                    {
                        type: "compare",
                        question: "מתי עדיף להשתמש ב-sub-agent במקום לעשות ישירות?",
                        optionA: {
                            label: "Sub-agent",
                            text: "כשצריך לסרוק 50 קבצים, לחפש pattern בכל הפרויקט, או להריץ מחקר"
                        },
                        optionB: {
                            label: "ישירות",
                            text: "כשצריך לקרוא קובץ אחד ספציפי"
                        },
                        correct: 0,
                        explanation: "Sub-agent עדיף כשיש הרבה עבודת סריקה — הוא מגן על ההקשר. לקובץ אחד, ישירות עדיף."
                    },
                    {
                        type: "fill-blank",
                        question: "sub-agents יכולים לרוץ ___ כדי לחסוך זמן",
                        template: "sub-agents יכולים לרוץ ___ כדי לחסוך זמן",
                        options: ["במקביל", "בהמתנה", "בלילה", "פעם בשבוע"],
                        correct: 0,
                        explanation: "כשיש משימות בלתי תלויות, Claude Code יכול להפעיל כמה agents בו-זמנית ולחכות לתוצאות."
                    },
                    {
                        type: "order",
                        question: "סדרו את זרימת העבודה עם sub-agent:",
                        items: ["Claude Code מזהה צורך במשימה", "מפעיל sub-agent עם הוראות ברורות", "Agent מבצע את המשימה באופן עצמאי", "Agent מחזיר תוצאה ל-Claude Code"],
                        correctOrder: [0, 1, 2, 3],
                        explanation: "זיהוי צורך → הפעלה → ביצוע עצמאי → החזרת תוצאה. Agent הוא עצמאי אבל מוגבל למשימה."
                    },
                    {
                        type: "improve",
                        question: "מתי לא כדאי להשתמש ב-sub-agent?",
                        original: "כל פעם שצריך לקרוא קובץ",
                        options: ["כשצריך לקרוא קובץ אחד ספציפי — פשוט לקרוא ישירות", "תמיד כדאי להשתמש ב-agent", "רק בפרויקטים גדולים", "רק עם Opus"],
                        correct: 0,
                        explanation: "לקריאת קובץ אחד, Read ישיר מהיר ויעיל יותר. Sub-agents הם overhead — משתמשים בהם רק כשיש תועלת ברורה.",
                        wrongExplanations: [null, "יש overhead ל-agents — לפעמים ישירות עדיף.", "גודל הפרויקט לא הקובע — סוג המשימה.", "agents עובדים עם כל המודלים."]
                    }
                ]
            },
            {
                id: 13,
                title: "Agent SDK — בניית סוכנים מותאמים",
                summary: "Claude Agent SDK מאפשר לבנות agents מותאמים אישית שמשתמשים ב-Claude API. אפשר ליצור agent שעושה code review, מנהל deployment, או כל תהליך אוטומטי. ב-Python וב-TypeScript.",
                summaryDetail: "Agent SDK נותן שלד מוכן לבניית agents: הגדרת כלים (tools), system prompt, ולוגיקת orchestration. Agent יכול לקרוא למודלים שונים, להשתמש בכלים, ולקבל החלטות. זה שימושי כשרוצים לבנות פתרון חוזר — לא רק לשאול Claude שאלה חד-פעמית.",
                exercises: [
                    {
                        type: "multiple-choice",
                        question: "מה ההבדל בין Claude Code ל-Agent SDK?",
                        options: ["Claude Code הוא כלי מוכן, Agent SDK הוא ספרייה לבניית כלים מותאמים", "אין הבדל", "Agent SDK יותר חזק", "Claude Code הוא ישן יותר"],
                        correct: 0,
                        explanation: "Claude Code = כלי מוכן לשימוש. Agent SDK = ספרייה שמאפשרת לבנות agents מותאמים אישית לצרכים שלך.",
                        wrongExplanations: [null, "יש הבדל מהותי — אחד מוכן, השני בונים.", "שניהם חזקים — לשימושים שונים.", "שניהם עדכניים."]
                    },
                    {
                        type: "match",
                        question: "התאימו בין הרכיב לתפקיד ב-Agent SDK:",
                        pairs: [
                            { left: "Tools", right: "פעולות שה-agent יכול לבצע" },
                            { left: "System Prompt", right: "ההנחיות וההתנהגות של ה-agent" },
                            { left: "Orchestration", right: "לוגיקת קבלת ההחלטות" },
                            { left: "Model", right: "ה-LLM שמפעיל את ה-agent" }
                        ],
                        explanation: "Agent = Model + Prompt + Tools + Orchestration. כל רכיב קובע חלק מההתנהגות."
                    },
                    {
                        type: "compare",
                        question: "מתי עדיף Agent SDK על Claude Code רגיל?",
                        optionA: {
                            label: "Agent SDK",
                            text: "כשצריך תהליך אוטומטי חוזר שרץ בלי התערבות — כמו CI/CD, monitoring, או bot"
                        },
                        optionB: {
                            label: "Claude Code",
                            text: "כשעובדים אינטראקטיבית על פרויקט ורוצים עזרה מיידית"
                        },
                        correct: 0,
                        explanation: "Agent SDK מתאים לאוטומציה חוזרת. Claude Code מתאים לעבודה אינטראקטיבית. שניהם חזקים — לשימושים שונים."
                    },
                    {
                        type: "fill-blank",
                        question: "Agent SDK זמין ב:",
                        template: "Python ו-___",
                        options: ["TypeScript", "Java", "Go", "Rust"],
                        correct: 0,
                        explanation: "Agent SDK של Anthropic זמין ב-Python (claude_agent_sdk) וב-TypeScript (@anthropic-ai/sdk)."
                    },
                    {
                        type: "order",
                        question: "סדרו את שלבי בניית Agent:",
                        items: ["הגדרת tools (פעולות שה-agent יכול לעשות)", "כתיבת system prompt (התנהגות)", "חיבור למודל (Claude)", "orchestration — לוגיקת זרימה"],
                        correctOrder: [0, 1, 2, 3],
                        explanation: "קודם מגדירים מה ה-agent יכול לעשות, אז איך הוא מתנהג, מחברים ל-AI, ומגדירים זרימה."
                    },
                    {
                        type: "improve",
                        question: "מה הגישה הטובה יותר לאוטומציית code review?",
                        original: "כל פעם לבקש מ-Claude Code ידנית: תעשה review על הPR",
                        options: ["לבנות Agent SDK שרץ אוטומטית על כל PR חדש ב-CI/CD", "לכתוב סקריפט bash שבודק syntax", "לבקש מ-ChatGPT ידנית", "להשתמש ב-linter בלבד"],
                        correct: 0,
                        explanation: "Agent SDK מאפשר לבנות agent חוזר שרץ אוטומטית — מושלם ל-CI/CD. בקשה ידנית לא סקלאבילית.",
                        wrongExplanations: [null, "Syntax check זה רק חלק קטן — agent יכול לבדוק לוגיקה, אבטחה, סגנון.", "לא אוטומטי ולא משולב בתהליך.", "Linter בודק סגנון, לא לוגיקה עסקית."]
                    },
                    {
                        type: "multiple-choice",
                        question: "מה היתרון של Agent SDK על סקריפט Python רגיל שקורא ל-Claude API?",
                        options: ["Agent SDK מספק שלד מוכן עם tools, orchestration, ו-error handling", "Agent SDK יותר מהיר", "Agent SDK חינמי", "אין יתרון"],
                        correct: 0,
                        explanation: "Agent SDK חוסך עבודה — מספק infrastructure מוכן לtools, memory, error handling, ו-orchestration. בלעדיו צריך לבנות הכל מאפס.",
                        wrongExplanations: [null, "המהירות דומה — היתרון הוא בתשתית המוכנה.", "שניהם עולים כסף (API calls).", "יש יתרון ברור — תשתית מוכנה vs לבנות מאפס."]
                    }
                ]
            }
        ]
    },
    {
        id: 7,
        title: "מאסטר — עבודה מתקדמת",
        description: "Extended Thinking, Worktrees, Memory ואסטרטגיות מתקדמות",
        icon: "🏆",
        lessons: [
            {
                id: 14,
                title: "Extended Thinking ותכנון מורכב",
                summary: "Extended Thinking (חשיבה מורחבת) הוא מצב שבו Claude חושב לפני שעונה. ב-Opus, זה מאפשר תכנון עמוק יותר, ניתוח מורכב, ופתרון בעיות קשות. אפשר להפעיל עם --thinking.",
                summaryDetail: "Extended thinking = Claude 'חושב בקול רם' לפני שמגיב. זה שימושי במיוחד ל: ארכיטקטורה מורכבת, debugging קשה, refactoring גדול, או קבלת החלטות. העלות גבוהה יותר אבל האיכות משתפרת משמעותית למשימות מורכבות.",
                exercises: [
                    {
                        type: "multiple-choice",
                        question: "מה Extended Thinking עושה?",
                        options: ["מאפשר ל-Claude לחשוב לפני שעונה — תכנון עמוק יותר", "מאיץ את התשובה", "מקטין עלויות", "משנה שפה"],
                        correct: 0,
                        explanation: "Extended Thinking = חשיבה מורחבת. Claude עוצר, חושב, מתכנן, ורק אז מגיב. התוצאות טובות יותר למשימות מורכבות.",
                        wrongExplanations: [null, "זה דווקא לוקח יותר זמן — אבל התוצאה טובה יותר.", "זה עולה יותר — יותר טוקנים.", "שפה לא קשורה ל-thinking mode."]
                    },
                    {
                        type: "compare",
                        question: "מתי כדאי להפעיל Extended Thinking?",
                        optionA: {
                            label: "כדאי",
                            text: "ארכיטקטורה של מערכת חדשה, debugging מורכב, או refactoring גדול"
                        },
                        optionB: {
                            label: "לא כדאי",
                            text: "שינוי טקסט בכפתור, הוספת import, או שאלה פשוטה"
                        },
                        correct: 0,
                        explanation: "Extended Thinking שווה את העלות למשימות מורכבות שדורשות תכנון. למשימות פשוטות — זה בזבוז."
                    },
                    {
                        type: "fill-blank",
                        question: "מצב חשיבה מורחבת מתאים במיוחד למודל:",
                        template: "___",
                        options: ["Opus", "Haiku", "Sonnet", "GPT-4"],
                        correct: 0,
                        explanation: "Opus הוא המודל החזק ביותר — Extended Thinking מנצל את מלוא היכולת שלו לחשיבה עמוקה."
                    },
                    {
                        type: "match",
                        question: "התאימו בין סוג המשימה למצב העבודה:",
                        pairs: [
                            { left: "שאלה מהירה", right: "Haiku, בלי thinking" },
                            { left: "קידוד יומיומי", right: "Sonnet, בלי thinking" },
                            { left: "ארכיטקטורה מורכבת", right: "Opus + Extended Thinking" },
                            { left: "Code review", right: "Sonnet/Opus, לפי מורכבות" }
                        ],
                        explanation: "התאמת מודל + thinking mode למשימה = יעילות מקסימלית. לא כל משימה צריכה Opus + thinking."
                    },
                    {
                        type: "order",
                        question: "סדרו את המשימות מפשוטה למורכבת (כשExtended Thinking הכי שווה):",
                        items: ["שינוי טקסט בכפתור", "תיקון באג בפונקציה", "Refactoring של מודול שלם", "תכנון ארכיטקטורת מערכת חדשה"],
                        correctOrder: [0, 1, 2, 3],
                        explanation: "שינוי טקסט = טריוויאלי. תיקון באג = בינוני. Refactoring = מורכב. ארכיטקטורה = הכי מורכב — שם Extended Thinking הכי שווה."
                    },
                    {
                        type: "improve",
                        question: "איך לגשת למשימת ארכיטקטורה מורכבת?",
                        original: "claude -p 'תכנן לי מערכת'",
                        options: ["להשתמש ב-Opus + Extended Thinking עם brief מפורט: דרישות, constraints, וסטאק טכנולוגי", "להשתמש ב-Haiku כי הוא מהיר", "לשאול ב-ChatGPT", "לכתוב CLAUDE.md ולקוות לטוב"],
                        correct: 0,
                        explanation: "Opus + Extended Thinking + brief מפורט = הקומבינציה הטובה ביותר למשימות ארכיטקטורה. Claude חושב לעומק לפני שמגיב.",
                        wrongExplanations: [null, "Haiku לא מתאים למשימות מורכבות — חסר לו עומק.", "ChatGPT לא משולב בפרויקט ולא רואה את הקוד.", "CLAUDE.md חשוב, אבל לא מספיק — צריך גם מודל חזק ו-thinking."]
                    },
                    {
                        type: "multiple-choice",
                        question: "מה Extended Thinking מוסיף שClaude רגיל לא עושה?",
                        options: ["שלב תכנון פנימי — Claude חושב ומארגן לפני שמגיב", "מהירות גבוהה יותר", "גישה לאינטרנט", "יכולת לקרוא קבצים"],
                        correct: 0,
                        explanation: "Extended Thinking מוסיף שלב 'חשיבה בקול רם' — Claude מתכנן, שוקל חלופות, ומארגן את הגישה לפני שנותן תשובה.",
                        wrongExplanations: [null, "זה דווקא לוקח יותר זמן — אבל התוצאה טובה יותר.", "Extended Thinking לא נותן גישה לאינטרנט.", "Claude Code כבר יכול לקרוא קבצים בלי thinking."]
                    }
                ]
            },
            {
                id: 15,
                title: "Memory, Worktrees ו-Best Practices",
                summary: "Memory מאפשרת ל-Claude Code לזכור דברים בין שיחות. Worktrees מאפשרים עבודה על branches מבודדים. Best practices: atomic tasks, good prompts, right model, CLAUDE.md עדכני.",
                summaryDetail: "Memory נשמרת ב-~/.claude/projects/ וכוללת: מידע על המשתמש (user), פידבק (feedback), פרויקט (project), והפניות (reference). Worktrees הם git worktrees — עותק מבודד של הריפו שclaude code עובד עליו בלי לגעת ב-branch הראשי. Best practices: CLAUDE.md תמיד עדכני, /clear בין נושאים, משימה אטומית, ובחירת מודל נכון.",
                exercises: [
                    {
                        type: "multiple-choice",
                        question: "מה Memory מאפשרת?",
                        options: ["לזכור מידע בין שיחות — העדפות, פידבק, מידע על הפרויקט", "לשמור קבצים", "לגבות את הפרויקט", "להריץ קוד"],
                        correct: 0,
                        explanation: "Memory = זיכרון מתמשך. Claude Code זוכר מי אתם, מה אתם מעדיפים, ומה קרה בשיחות קודמות.",
                        wrongExplanations: [null, "שמירת קבצים זה Write/Edit, לא Memory.", "גיבוי זה git, לא Memory.", "הרצת קוד זה Bash, לא Memory."]
                    },
                    {
                        type: "match",
                        question: "התאימו בין סוג Memory לדוגמה:",
                        pairs: [
                            { left: "user", right: "מפתח senior, מעדיף TypeScript" },
                            { left: "feedback", right: "אל תוסיף comments מיותרים" },
                            { left: "project", right: "merge freeze מתחיל ביום חמישי" },
                            { left: "reference", right: "באגים מתועדים ב-Linear project X" }
                        ],
                        explanation: "4 סוגי זיכרון: user (מי אתה), feedback (מה לשפר), project (מה קורה), reference (איפה למצוא מידע)."
                    },
                    {
                        type: "compare",
                        question: "מתי להשתמש ב-Worktree?",
                        optionA: {
                            label: "Worktree",
                            text: "כשרוצים לבדוק רעיון בלי להשפיע על ה-branch הנוכחי"
                        },
                        optionB: {
                            label: "Branch רגיל",
                            text: "כשרוצים לעבוד על feature חדש בצורה רגילה"
                        },
                        correct: 0,
                        explanation: "Worktree = עותק מבודד. מושלם לניסויים, POCs, או כש-agent צריך לעבוד בלי להפריע. Branch רגיל לעבודה יומיומית."
                    },
                    {
                        type: "order",
                        question: "סדרו את ה-Best Practices לפי חשיבות:",
                        items: ["CLAUDE.md עדכני ומפורט", "משימה אטומית לכל שיחה", "בחירת מודל מתאים למשימה", "/clear בין נושאים"],
                        correctOrder: [0, 1, 2, 3],
                        explanation: "CLAUDE.md הוא הבסיס — בלעדיו Claude Code לא יודע את הכללים. אח\"כ: מיקוד, מודל, וניהול הקשר."
                    },
                    {
                        type: "improve",
                        question: "איך לשפר את זרימת העבודה הזו?",
                        original: "פותחים Claude Code, לא כותבים CLAUDE.md, שואלים שאלות כלליות, ולא עושים clear",
                        options: ["כותבים CLAUDE.md מפורט, נותנים הוראות ספציפיות, /clear בין נושאים, ובוחרים מודל מתאים", "מוסיפים עוד שאלות", "משתמשים רק ב-Opus", "עובדים רק באנגלית"],
                        correct: 0,
                        explanation: "CLAUDE.md + הוראות ספציפיות + /clear + מודל נכון = עבודה יעילה ואיכותית.",
                        wrongExplanations: [null, "כמות שאלות לא משנה — האיכות שלהן כן.", "Opus לא תמיד הבחירה הנכונה — תלוי במשימה.", "Claude Code עובד מצוין בעברית!"]
                    },
                    {
                        type: "fill-blank",
                        question: "Memory נשמרת בתיקייה:",
                        template: "___",
                        options: ["~/.claude/projects/", "~/Documents/", ".git/", "node_modules/"],
                        correct: 0,
                        explanation: "כל הזיכרון נשמר ב-~/.claude/projects/ — תיקייה לכל פרויקט עם קובצי markdown."
                    },
                    {
                        type: "identify",
                        question: "סמנו את הטעות בזרימת העבודה הזו:",
                        text: "פתחתי Claude Code, כתבתי CLAUDE.md, נתתי הוראה ספציפית, עבדתי 3 שעות בלי compact, ואז תהיתי למה זה איטי.",
                        correctRange: [60, 85],
                        explanation: "'עבדתי 3 שעות בלי compact' — ההיסטוריה גדלה וכל תשובה דורשת לקרוא את הכל. /compact מפנה מקום ומשפר מהירות."
                    }
                ]
            }
        ]
    },
    {
        id: 8,
        title: "החדש ב-Claude Code (2026)",
        description: "Plan Mode, Skills, פקודות מותאמות, Rewind ומודלים חדשים",
        icon: "🆕",
        lessons: [
            {
                id: 16,
                title: "Plan Mode — תכנון לפני ביצוע",
                summary: "Plan Mode הוא מצב קריאה בלבד. Claude Code חוקר את הקוד, מבין את הבעיה, ומציג תוכנית מלאה לאישור · בלי לגעת בקובץ אחד עד שאתם מאשרים. עוברים אליו בלחיצת Shift+Tab.",
                summaryDetail: "ב-Plan Mode, Claude קורא, מחפש ומנתח אבל לא עורך ולא מריץ פקודות שמשנות. הוא מסיים בתוכנית מסודרת, ואתם מאשרים (יציאה מ-Plan Mode) והוא מתחיל לבצע. מושלם למשימות גדולות, refactoring, או כשרוצים לראות בדיוק מה הוא עומד לעשות לפני שהוא נוגע בקוד. אפשר להפעיל גם מההתחלה עם הדגל permission-mode plan.",
                exercises: [
                    {
                        type: "multiple-choice",
                        question: "מה מאפיין את Plan Mode?",
                        options: ["Claude חוקר ומציג תוכנית בלי לערוך קבצים", "Claude עובד מהר יותר", "Claude מוחק את ההיסטוריה", "Claude עובר למודל זול"],
                        correct: 0,
                        explanation: "Plan Mode הוא מצב קריאה בלבד — Claude חוקר ומתכנן, ורק אחרי אישור מתחיל לבצע. רשת ביטחון מצוינת למשימות גדולות.",
                        wrongExplanations: [null, "המהירות לא משתנה — מה שמשתנה זה שהוא לא נוגע בקוד עד אישור.", "Plan Mode לא קשור להיסטוריה — זה /clear.", "Plan Mode לא משנה מודל — זה /model."]
                    },
                    {
                        type: "fill-blank",
                        question: "עוברים בין מצבי ההרשאה (כולל Plan Mode) בלחיצת:",
                        template: "___",
                        options: ["Shift+Tab", "Ctrl+C", "Tab", "Enter"],
                        correct: 0,
                        explanation: "Shift+Tab מחליף מצב הרשאה: Default ⟵⟶ Auto-accept edits ⟵⟶ Plan Mode. קיצור מהיר וחשוב."
                    },
                    {
                        type: "compare",
                        question: "מתי Plan Mode עדיף?",
                        optionA: {
                            label: "מצב א",
                            text: "refactoring גדול או משימה לא ברורה שכדאי לראות תוכנית לפני הביצוע"
                        },
                        optionB: {
                            label: "מצב ב",
                            text: "שינוי מילה אחת בכותרת"
                        },
                        correct: 0,
                        explanation: "Plan Mode משתלם כשהמשימה גדולה או לא ברורה — רואים תוכנית ומאשרים. לשינוי זעיר זה סתם עיכוב."
                    },
                    {
                        type: "order",
                        question: "סדרו את זרימת העבודה ב-Plan Mode:",
                        items: ["עוברים ל-Plan Mode (Shift+Tab)", "Claude קורא וחוקר את הקוד", "Claude מציג תוכנית מסודרת", "מאשרים והוא מבצע"],
                        correctOrder: [0, 1, 2, 3],
                        explanation: "כניסה למצב → חקירה → תוכנית → אישור → ביצוע. אתם רואים הכל לפני שמשהו משתנה."
                    },
                    {
                        type: "match",
                        question: "התאימו בין המצב למה שמותר בו:",
                        pairs: [
                            { left: "Plan Mode", right: "קריאה ותכנון, בלי שינויים" },
                            { left: "Default", right: "שינויים אחרי אישור" },
                            { left: "Auto-accept edits", right: "עריכות בלי אישור" },
                            { left: "Shift+Tab", right: "מעבר בין המצבים" }
                        ],
                        explanation: "Plan Mode הוא הקצה המגביל. Shift+Tab מחליף בין כל המצבים תוך כדי שיחה."
                    },
                    {
                        type: "improve",
                        question: "איך לגשת ל-refactoring גדול בצורה בטוחה?",
                        original: "תעשה refactoring לכל הפרויקט (ישר בביצוע)",
                        options: ["עבור ל-Plan Mode, נתח את המבנה, והצג תוכנית refactoring לפני שתיגע בקוד", "פשוט תתחיל לשנות קבצים", "תמחק הכל ותכתוב מחדש", "תעבור ל-Bypass Permissions"],
                        correct: 0,
                        explanation: "Plan Mode נותן לכם לראות את כל התוכנית לפני שינוי. למשימה גדולה זה ההבדל בין שליטה לבין הפתעות.",
                        wrongExplanations: [null, "שינוי ישיר בלי תוכנית מסוכן ב-refactoring גדול.", "מחיקה וכתיבה מחדש מאבדת היסטוריה והקשר.", "Bypass זה ההפך מבטוח — אין שום בקרה."]
                    }
                ]
            },
            {
                id: 17,
                title: "Skills — מיומנויות מותאמות",
                summary: "Skills (מיומנויות) הן תיקיות עם קובץ SKILL.md שמלמדות את Claude Code לבצע משימה מומחית · כמו יצירת PDF, עריכת וידאו או פרסום לוורדפרס. Claude טוען אותן אוטומטית כשהן רלוונטיות למה שביקשתם.",
                summaryDetail: "כל Skill היא תיקייה ב-.claude/skills/ עם קובץ SKILL.md שיש בו כותרת (name) ותיאור (description). התיאור הוא מה שגורם ל-Claude לדעת מתי להשתמש בה. Skill יכולה לכלול גם סקריפטים, תבניות וקבצים נלווים. כך מרחיבים את Claude Code ביכולות חוזרות בלי להסביר הכל מחדש בכל שיחה.",
                exercises: [
                    {
                        type: "multiple-choice",
                        question: "מה זה Skill ב-Claude Code?",
                        options: ["תיקייה עם SKILL.md שמלמדת את Claude משימה מומחית חוזרת", "סוג של מודל", "פקודת git", "תוסף לדפדפן"],
                        correct: 0,
                        explanation: "Skill = חבילת ידע ומשימה. תיקייה עם SKILL.md (ולפעמים סקריפטים), שמרחיבה את Claude ביכולת חוזרת.",
                        wrongExplanations: [null, "Skill לא מודל — היא ידע שמתווסף לכל מודל.", "אין קשר ל-git.", "Skill רצה בתוך Claude Code, לא בדפדפן."]
                    },
                    {
                        type: "fill-blank",
                        question: "קובץ ההגדרה של Skill נקרא:",
                        template: "___",
                        options: ["SKILL.md", "skill.json", "CLAUDE.md", "config.yml"],
                        correct: 0,
                        explanation: "SKILL.md הוא הלב של כל Skill — בתוכו name ו-description, ולפעמים הוראות וקישור לסקריפטים."
                    },
                    {
                        type: "multiple-choice",
                        question: "מה גורם ל-Claude לדעת מתי להשתמש ב-Skill מסוימת?",
                        options: ["ה-description שבקובץ SKILL.md", "סדר הקבצים בתיקייה", "גודל הקובץ", "שם המשתמש"],
                        correct: 0,
                        explanation: "ה-description הוא הטריגר — Claude קורא אותו ומחליט אם ה-Skill רלוונטית לבקשה הנוכחית. לכן כותבים תיאור ברור.",
                        wrongExplanations: [null, "הסדר לא משנה — התיאור הוא הקובע.", "גודל לא רלוונטי.", "אין קשר לשם המשתמש."]
                    },
                    {
                        type: "match",
                        question: "התאימו בין Skill לתפקיד שלה:",
                        pairs: [
                            { left: "Skill ל-PDF", right: "המרת HTML למסמך PDF" },
                            { left: "Skill ל-WhatsApp", right: "שליחת הודעות אוטומטית" },
                            { left: "Skill לתמלול", right: "המרת אודיו לכתוביות" },
                            { left: "description", right: "מתי ה-Skill נטענת" }
                        ],
                        explanation: "כל Skill מתמחה במשימה אחת. ה-description הוא מה שמחבר בין הבקשה שלכם ל-Skill הנכונה."
                    },
                    {
                        type: "compare",
                        question: "איזו גישה חכמה יותר למשימה חוזרת?",
                        optionA: {
                            label: "גישה א",
                            text: "לבנות Skill פעם אחת ולהשתמש בה שוב ושוב בכל פרויקט"
                        },
                        optionB: {
                            label: "גישה ב",
                            text: "להסביר ל-Claude מחדש איך עושים את זה בכל שיחה"
                        },
                        correct: 0,
                        explanation: "Skill חוסכת הסברים חוזרים ומבטיחה תוצאה עקבית. בונים פעם אחת, נהנים תמיד."
                    },
                    {
                        type: "order",
                        question: "סדרו את שלבי יצירת Skill:",
                        items: ["יוצרים תיקייה ב-.claude/skills/", "כותבים SKILL.md עם name ו-description", "מוסיפים סקריפטים/תבניות אם צריך", "Claude טוען אוטומטית כשרלוונטי"],
                        correctOrder: [0, 1, 2, 3],
                        explanation: "תיקייה → SKILL.md → נכסים נלווים → טעינה אוטומטית. פשוט וחזק."
                    }
                ]
            },
            {
                id: 18,
                title: "פקודות מותאמות, /init, @ ו-#",
                summary: "אפשר ליצור פקודות / משלכם · קובץ markdown ב-.claude/commands/ הופך ל-slash command. /init יוצר CLAUDE.md אוטומטית מהקוד הקיים. @ מצרף קובץ ספציפי לשיחה, ו-# מוסיף זיכרון מהיר ל-CLAUDE.md.",
                summaryDetail: "ארבעה קיצורים ששווה לדעת: 1) פקודות מותאמות · כל קובץ .md ב-.claude/commands/ הופך לפקודת / (לדוגמה review.md הופך ל-/review). 2) /init · Claude סורק את הפרויקט ובונה CLAUDE.md ראשוני. 3) @ · מקלידים @src/utils.js כדי לצרף קובץ מדויק לשיחה בלי לחפש. 4) # · מתחילים הודעה ב-# כדי להוסיף שורה לזיכרון הקבוע (CLAUDE.md) תוך כדי עבודה.",
                exercises: [
                    {
                        type: "multiple-choice",
                        question: "איך יוצרים slash command מותאם אישית?",
                        options: ["שמים קובץ markdown ב-.claude/commands/", "עורכים את game.js", "מתקינים חבילת npm", "פונים לתמיכה"],
                        correct: 0,
                        explanation: "כל קובץ .md ב-.claude/commands/ הופך לפקודה. הקובץ review.md יוצר את /review עם ההוראה שכתבתם בו.",
                        wrongExplanations: [null, "אין צורך לגעת בקוד הכלי.", "פקודות מותאמות הן קבצי markdown מקומיים, לא חבילות.", "זה משהו שאתם יוצרים בעצמכם בשניות."]
                    },
                    {
                        type: "fill-blank",
                        question: "כדי ש-Claude ייצר CLAUDE.md אוטומטית מהקוד הקיים, מריצים:",
                        template: "___",
                        options: ["/init", "/new", "/create", "/build"],
                        correct: 0,
                        explanation: "/init סורק את הפרויקט ובונה CLAUDE.md ראשוני · נקודת פתיחה מצוינת לכל פרויקט חדש."
                    },
                    {
                        type: "match",
                        question: "התאימו בין הסימן/הפקודה לפעולה:",
                        pairs: [
                            { left: "@file.js", right: "צירוף קובץ ספציפי לשיחה" },
                            { left: "# טקסט", right: "הוספת זיכרון ל-CLAUDE.md" },
                            { left: "/init", right: "יצירת CLAUDE.md מהקוד" },
                            { left: ".claude/commands/", right: "מיקום הפקודות המותאמות" }
                        ],
                        explanation: "@ מצרף קובץ, # מוסיף זיכרון, /init בונה חוקה, ו-.claude/commands/ הוא בית הפקודות שלכם."
                    },
                    {
                        type: "compare",
                        question: "איזו הוראה ממוקדת יותר?",
                        optionA: {
                            label: "הוראה א",
                            text: "@src/utils.js תקן את הבאג בפונקציית parseDate"
                        },
                        optionB: {
                            label: "הוראה ב",
                            text: "תקן את הבאג איפשהו בקוד"
                        },
                        correct: 0,
                        explanation: "@ מפנה את Claude ישירות לקובץ הנכון · חוסך חיפושים, טוקנים, וניחושים."
                    },
                    {
                        type: "multiple-choice",
                        question: "מה עושה # בתחילת הודעה?",
                        options: ["מוסיף את הטקסט כזיכרון קבוע ל-CLAUDE.md", "מוחק הודעה", "פותח תפריט", "מריץ פקודת shell"],
                        correct: 0,
                        explanation: "# בתחילת הודעה הוא קיצור להוספת שורת זיכרון ל-CLAUDE.md תוך כדי עבודה · בלי לפתוח את הקובץ ידנית.",
                        wrongExplanations: [null, "# לא מוחק כלום.", "# לא תפריט.", "פקודות shell רצות דרך Bash, לא דרך #."]
                    },
                    {
                        type: "order",
                        question: "סדרו את שלבי יצירת פקודה חוזרת:",
                        items: ["יוצרים קובץ .claude/commands/review.md", "כותבים בו את ההוראה (למשל: עשה code review)", "מקלידים /review בשיחה", "Claude מריץ את ההוראה מהקובץ"],
                        correctOrder: [0, 1, 2, 3],
                        explanation: "קובץ → תוכן → קריאה לפקודה → ביצוע. ככה הופכים תהליך חוזר לפקודה אחת."
                    }
                ]
            },
            {
                id: 19,
                title: "Checkpoints ו-Rewind — חזרה אחורה",
                summary: "Claude Code שומר checkpoint לפני כל שינוי. אם משהו השתבש, לוחצים Esc פעמיים או מקלידים /rewind כדי להחזיר את הקוד או את השיחה למצב קודם · כמו Undo חכם בתוך הסשן.",
                summaryDetail: "לפני כל עריכה, Claude Code מצלם את מצב הקבצים. עם /rewind (או Esc Esc) אפשר לחזור אחורה ולבחור אם להחזיר רק את הקוד, רק את השיחה, או את שניהם. זו רשת ביטחון שמאפשרת להתנסות בלי פחד. חשוב: Rewind הוא מנגנון מהיר בתוך הסשן, הוא לא תחליף ל-git שמנהל גרסאות לטווח ארוך.",
                exercises: [
                    {
                        type: "multiple-choice",
                        question: "מה עושה /rewind?",
                        options: ["מחזיר את הקוד או השיחה למצב קודם", "מאיץ את Claude", "מוחק את הפרויקט", "מתקין עדכון"],
                        correct: 0,
                        explanation: "/rewind מחזיר אתכם לנקודה קודמת · אפשר לבחור קוד, שיחה, או שניהם. רשת ביטחון לניסויים.",
                        wrongExplanations: [null, "Rewind לא קשור למהירות.", "הוא לא מוחק כלום — הוא משחזר.", "זה לא מנגנון עדכונים."]
                    },
                    {
                        type: "fill-blank",
                        question: "קיצור המקלדת לחזרה אחורה מהירה:",
                        template: "___",
                        options: ["Esc פעמיים", "Ctrl+Z", "Ctrl+R", "Alt+Z"],
                        correct: 0,
                        explanation: "לחיצה כפולה על Esc פותחת את ה-Rewind · בוחרים נקודה וחוזרים אליה."
                    },
                    {
                        type: "compare",
                        question: "איזו גישה Rewind מאפשר?",
                        optionA: {
                            label: "גישה א",
                            text: "לנסות רעיון נועז, ואם לא עובד לעשות /rewind ולחזור"
                        },
                        optionB: {
                            label: "גישה ב",
                            text: "לפחד לשנות כי אין דרך חזרה"
                        },
                        correct: 0,
                        explanation: "Rewind משחרר אתכם להתנסות · תמיד אפשר לחזור. זה משנה את אופן העבודה."
                    },
                    {
                        type: "multiple-choice",
                        question: "האם Rewind מחליף את git?",
                        options: ["לא — זו רשת ביטחון מהירה בתוך הסשן בלבד", "כן, אפשר לוותר על git", "כן, הוא דוחף לשרת", "כן, הוא מנהל branches"],
                        correct: 0,
                        explanation: "Rewind מצוין לחזרה מהירה בתוך סשן, אבל git עדיין נחוץ לניהול גרסאות, שיתוף, והיסטוריה לטווח ארוך.",
                        wrongExplanations: [null, "git עדיין חיוני — Rewind לא מחליף אותו.", "Rewind מקומי, הוא לא דוחף לשרת.", "ניהול branches נשאר תפקיד של git."]
                    },
                    {
                        type: "match",
                        question: "התאימו בין המושג לתפקיד:",
                        pairs: [
                            { left: "/rewind", right: "חזרה למצב קודם בסשן" },
                            { left: "checkpoint", right: "צילום מצב לפני שינוי" },
                            { left: "Esc Esc", right: "קיצור מהיר ל-Rewind" },
                            { left: "git", right: "ניהול גרסאות לטווח ארוך" }
                        ],
                        explanation: "checkpoint נשמר אוטומטית, /rewind מחזיר אליו, ו-git נשאר לניהול הגרסאות הרשמי."
                    },
                    {
                        type: "order",
                        question: "סדרו את זרימת השימוש ב-Rewind:",
                        items: ["Claude מבצע שינוי", "מגלים שזה לא הכיוון הנכון", "מקלידים /rewind ובוחרים נקודה", "ממשיכים מהמצב הקודם"],
                        correctOrder: [0, 1, 2, 3],
                        explanation: "שינוי → זיהוי בעיה → rewind → המשך. בלי לאבד זמן על תיקונים ידניים."
                    }
                ]
            },
            {
                id: 20,
                title: "Claude Code בכל מקום + המודלים החדשים",
                summary: "Claude Code כבר לא רק בטרמינל · יש תוסף ל-VS Code ו-JetBrains, אפליקציית דסקטופ (Mac/Windows), וגרסת ווב ב-claude.ai/code. המודלים העדכניים: Opus 4.8 (החזק), Sonnet 4.6 (איזון), Haiku 4.5 (מהיר וזול).",
                summaryDetail: "אותו Claude Code, הרבה משטחים: CLI בטרמינל, תוסף IDE שמשתלב בעורך, אפליקציית דסקטופ, וגרסת דפדפן. ה-CLAUDE.md, הזיכרון וה-Skills עוברים איתכם בין כולם. לגבי מודלים · Opus 4.8 למשימות מורכבות וארכיטקטורה, Sonnet 4.6 לרוב העבודה היומיומית, Haiku 4.5 למשימות מהירות וזולות. טיפ: אפשר להריץ פקודות ברקע (Ctrl+B) ולהמשיך לעבוד בזמן שהן רצות.",
                exercises: [
                    {
                        type: "multiple-choice",
                        question: "איפה אפשר להשתמש ב-Claude Code חוץ מהטרמינל?",
                        options: ["תוסף IDE, אפליקציית דסקטופ, וגרסת ווב", "רק בטרמינל", "רק בטלפון", "רק ב-Linux"],
                        correct: 0,
                        explanation: "Claude Code זמין כ-CLI, תוסף ל-VS Code/JetBrains, אפליקציית דסקטופ, וגרסת ווב ב-claude.ai/code. אותו כלי, הרבה דלתות כניסה.",
                        wrongExplanations: [null, "כבר לא רק טרמינל — יש IDE, דסקטופ וווב.", "זה לא מוגבל לטלפון.", "עובד על Mac, Windows ועוד."]
                    },
                    {
                        type: "match",
                        question: "התאימו בין המודל/הקיצור לשימוש:",
                        pairs: [
                            { left: "Opus 4.8", right: "משימות מורכבות וארכיטקטורה" },
                            { left: "Sonnet 4.6", right: "רוב העבודה היומיומית" },
                            { left: "Haiku 4.5", right: "משימות מהירות וזולות" },
                            { left: "Ctrl+B", right: "הרצת פקודה ברקע" }
                        ],
                        explanation: "מתאימים מודל למשימה: Opus לעומק, Sonnet לשגרה, Haiku למהירות. Ctrl+B משחרר אתכם בזמן שפקודה רצה."
                    },
                    {
                        type: "fill-blank",
                        question: "המודל החזק ביותר בקו המוצרים כרגע הוא:",
                        template: "___",
                        options: ["Opus 4.8", "Haiku 4.5", "Sonnet 4.6", "GPT-4"],
                        correct: 0,
                        explanation: "Opus 4.8 הוא החזק ביותר · מתאים לארכיטקטורה, debugging מורכב, ותכנון עמוק."
                    },
                    {
                        type: "compare",
                        question: "מה הבחירה החכמה לסריקה מהירה של קובץ לוגים גדול?",
                        optionA: {
                            label: "בחירה א",
                            text: "Haiku 4.5 — מהיר וזול, מספיק לסריקה פשוטה"
                        },
                        optionB: {
                            label: "בחירה ב",
                            text: "Opus 4.8 — חזק, אבל יקר ומיותר למשימה כזו"
                        },
                        correct: 0,
                        explanation: "לסריקה פשוטה Haiku מושלם · מהיר וזול. שומרים את Opus למשימות שבאמת דורשות עומק."
                    },
                    {
                        type: "order",
                        question: "סדרו את המודלים מהזול/מהיר ליקר/חזק:",
                        items: ["Haiku 4.5", "Sonnet 4.6", "Opus 4.8"],
                        correctOrder: [0, 1, 2],
                        explanation: "Haiku < Sonnet < Opus מבחינת עלות ויכולת. בחירת המודל הנכון = איכות מקסימלית בעלות מינימלית."
                    },
                    {
                        type: "multiple-choice",
                        question: "מה עובר איתכם בין המשטחים (CLI, IDE, דסקטופ)?",
                        options: ["CLAUDE.md, הזיכרון וה-Skills", "כלום, כל משטח נפרד", "רק ההיסטוריה", "רק ההגדרות הגרפיות"],
                        correct: 0,
                        explanation: "ה-CLAUDE.md, הזיכרון וה-Skills הם חלק מהפרויקט והחשבון · הם עוברים איתכם לכל משטח שבו תפתחו את Claude Code.",
                        wrongExplanations: [null, "המשטחים חולקים את אותו הקשר פרויקט.", "לא רק היסטוריה — גם חוקה, זיכרון ו-Skills.", "זה הרבה מעבר להגדרות גרפיות."]
                    }
                ]
            }
        ]
    }
];
