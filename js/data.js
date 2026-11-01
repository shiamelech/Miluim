// ==========================================
// נתוני האפליקציה - טעינת שלושה קובצי CSV
// ==========================================

let DATES_LIST = [];
let SOLDIERS_DATA = [];

const CSV_FILES = [
    "./data/יציאות א מעודכן.csv",
    "./data/יציאות סבב ב לפרסום.csv",
    "./data/סבב יציאות שלישי קו חורון.csv"
];


// ==========================================
// טעינת כל קובצי ה-CSV
// ==========================================

async function loadSoldiersData() {

    try {

        console.log("מתחיל טעינת קובצי CSV...");

        const responses = await Promise.all(
            CSV_FILES.map(file => fetch(file))
        );

        // בדיקת טעינת הקבצים
        for (let i = 0; i < responses.length; i++) {

            if (!responses[i].ok) {

                throw new Error(
                    `קובץ לא נטען: ${CSV_FILES[i]} (${responses[i].status})`
                );
            }
        }

        // קריאת תוכן הקבצים
        const csvTexts = await Promise.all(
            responses.map(response => response.text())
        );

        console.log("כל הקבצים נטענו בהצלחה");

        // פענוח הקבצים
        const parsedFiles = csvTexts.map(
            csv => parseCSVFile(csv)
        );

        // הצגת נתוני כל קובץ
        parsedFiles.forEach((parsed, index) => {

            console.log(
                CSV_FILES[index],
                "| חיילים:",
                parsed.soldiers.length,
                "| תאריכים:",
                parsed.dates.length
            );

        });

        // איחוד כל התאריכים
        buildDatesList(
            ...parsedFiles.map(file => file.dates)
        );

        // איחוד כל החיילים
        SOLDIERS_DATA = mergeSoldiers(
            ...parsedFiles.map(file => file.soldiers)
        );

        console.log("--------------------------------");
        console.log("טעינת הנתונים הושלמה");
        console.log("סה״כ חיילים:", SOLDIERS_DATA.length);
        console.log("סה״כ תאריכים:", DATES_LIST.length);
        console.log("תאריך ראשון:", DATES_LIST[0]?.date);
        console.log("תאריך אחרון:", DATES_LIST[DATES_LIST.length - 1]?.date);
        console.log("--------------------------------");

        // הפעלת האפליקציה
        initializeApp();

    } catch (error) {

        console.error("שגיאה בטעינת הנתונים:", error);

        const container =
            document.getElementById("soldiers-grid");

        if (container) {

            container.innerHTML = `
                <div class="col-span-2 text-center p-6 text-red-400">

                    <i class="fas fa-exclamation-triangle mb-2"></i>

                    <div>
                        לא ניתן לטעון את נתוני החיילים
                    </div>

                    <div class="text-sm mt-2 text-slate-400">
                        ${error.message}
                    </div>

                </div>
            `;
        }
    }
}


// ==========================================
// פענוח קובץ CSV
// ==========================================

function parseCSVFile(csvText) {

    csvText = csvText
        .replace(/^\uFEFF/, "")
        .replace(/\r/g, "");

    const lines = csvText
        .split("\n")
        .filter(line => line.trim() !== "");

    if (lines.length < 2) {

        return {
            dates: [],
            soldiers: []
        };
    }

    // קריאת כותרות
    const headers = parseCSVLine(lines[0])
        .map(header => header.trim());

    // שלוש העמודות הראשונות הן שם משפחה, שם פרטי וצוות
    const dateHeaders = headers.slice(3);

    // המרת התאריכים
    const dates = dateHeaders
        .map(convertDateHeader)
        .filter(Boolean);

    const soldiers = [];

    // מעבר על החיילים
    for (let i = 1; i < lines.length; i++) {

        const values = parseCSVLine(lines[i]);

        if (values.length < 4) {
            continue;
        }

        const lastName =
            (values[0] || "").trim();

        const firstName =
            (values[1] || "").trim();

        const team =
            (values[2] || "").trim();

        if (!firstName && !lastName) {
            continue;
        }

        const schedule = {};

        // שיוך כל יציאה לתאריך המתאים
        dateHeaders.forEach((header, index) => {

            const date = convertDateHeader(header);

            if (!date) {
                return;
            }

            schedule[date.date] =
                (values[index + 3] || "").trim();

        });

        soldiers.push({

            firstName,
            lastName,

            fullName:
                `${firstName} ${lastName}`.trim(),

            team,

            schedule

        });
    }

    return {
        dates,
        soldiers
    };
}


// ==========================================
// המרת כותרת תאריך
// תומך בפורמטים:
// 09-ספט
// 01-אוק
// 06/10
// 06/11
// ==========================================

function convertDateHeader(header) {

    const value =
        String(header || "").trim();

    if (!value) {
        return null;
    }

    // תאריך בפורמט 06/10
    if (/^\d{1,2}\/\d{1,2}$/.test(value)) {

        const parts = value.split("/");

        return createDateObject(
            parts[0].padStart(2, "0"),
            parts[1].padStart(2, "0")
        );
    }

    // חודשים בעברית
    const hebrewMonths = {

        "ינו": "01",
        "פבר": "02",
        "מרץ": "03",
        "אפר": "04",
        "מאי": "05",
        "יונ": "06",
        "יול": "07",
        "אוג": "08",
        "ספט": "09",
        "אוק": "10",
        "נוב": "11",
        "דצמ": "12"

    };

    const match =
        value.match(/^(\d{1,2})-(.+)$/);

    if (!match) {
        return null;
    }

    const day =
        match[1].padStart(2, "0");

    const month =
        hebrewMonths[match[2].trim()];

    if (!month) {
        return null;
    }

    return createDateObject(day, month);
}


// ==========================================
// יצירת אובייקט תאריך
// ==========================================

function createDateObject(day, month) {

    const year = 2026;

    const iso =
        `${year}-${month}-${day}`;

    const dateObject =
        new Date(`${iso}T00:00:00`);

    const days = [

        "ראשון",
        "שני",
        "שלישי",
        "רביעי",
        "חמישי",
        "שישי",
        "שבת"

    ];

    return {

        date: `${day}/${month}`,

        day: days[dateObject.getDay()],

        month,

        iso

    };
}


// ==========================================
// איחוד רשימות התאריכים
// ==========================================

function buildDatesList(...dateGroups) {

    const datesMap = new Map();

    // איחוד כל התאריכים מכל הקבצים
    dateGroups.flat().forEach(date => {

        if (!datesMap.has(date.date)) {

            datesMap.set(
                date.date,
                date
            );
        }

    });

    // מיון לפי סדר כרונולוגי
    DATES_LIST = Array.from(
        datesMap.values()
    ).sort(
        (a, b) =>
            new Date(a.iso) - new Date(b.iso)
    );

    console.log(
        "רשימת התאריכים המלאה:",
        DATES_LIST
    );
}


// ==========================================
// איחוד החיילים מכל הקבצים
// ==========================================

function mergeSoldiers(...soldierGroups) {

    const soldiersMap = new Map();

    // מעבר על כל החיילים מכל הקבצים
    soldierGroups.flat().forEach(soldier => {

        const key = createSoldierKey(
            soldier.firstName,
            soldier.lastName
        );

        // אם החייל כבר קיים
        if (soldiersMap.has(key)) {

            const existing =
                soldiersMap.get(key);

            // איחוד היציאות
            // נתונים מקובץ מאוחר יותר גוברים במקרה של תאריך כפול
            existing.schedule = {

                ...existing.schedule,

                ...soldier.schedule

            };

            if (!existing.team && soldier.team) {
                existing.team = soldier.team;
            }

        } else {

            // חייל חדש
            soldiersMap.set(key, {

                firstName: soldier.firstName,

                lastName: soldier.lastName,

                fullName: soldier.fullName,

                team: soldier.team,

                schedule: {
                    ...soldier.schedule
                }

            });
        }

    });

    // התאמת היציאות של כל חייל לרשימת התאריכים המלאה
    const soldiers = Array.from(
        soldiersMap.values()
    );

    return soldiers.map((soldier, index) => {

        const schedule = DATES_LIST.map(date => {

            return soldier.schedule[date.date] || "";

        });

        return {

            id: `soldier_${index + 1}`,

            firstName: soldier.firstName,

            lastName: soldier.lastName,

            fullName: soldier.fullName,

            team: soldier.team,

            schedule

        };

    });
}


// ==========================================
// יצירת מזהה ייחודי לחייל
// ==========================================

function createSoldierKey(firstName, lastName) {

    return `${firstName}|${lastName}`
        .trim()
        .toLowerCase();
}


// ==========================================
// פענוח שורת CSV
// תמיכה בפסיקים בתוך גרשיים
// ==========================================

function parseCSVLine(line) {

    const result = [];

    let current = "";

    let insideQuotes = false;

    for (let i = 0; i < line.length; i++) {

        const char = line[i];

        if (char === '"') {

            if (
                insideQuotes &&
                line[i + 1] === '"'
            ) {

                current += '"';

                i++;

            } else {

                insideQuotes = !insideQuotes;

            }

        } else if (
            char === "," &&
            !insideQuotes
        ) {

            result.push(current);

            current = "";

        } else {

            current += char;

        }

    }

    result.push(current);

    return result;
}


// ==========================================
// הפעלת האפליקציה
// ==========================================

loadSoldiersData();
