// ==========================================
// נתוני האפליקציה - טעינה מקבצי CSV
// ==========================================

let DATES_LIST = [];
let SOLDIERS_DATA = [];

// שני קבצי הנתונים
const CSV_FILE_A = "./data/יציאות א מעודכן(3).csv";
const CSV_FILE_B = "./data/יציאות סבב ב לפרסום.csv";


// ==========================================
// טעינת שני קבצי ה-CSV
// ==========================================

async function loadSoldiersData() {
    try {
        console.log("טוען קובץ א...");
        console.log("טוען קובץ ב...");

        const [responseA, responseB] = await Promise.all([
            fetch(CSV_FILE_A),
            fetch(CSV_FILE_B)
        ]);

        if (!responseA.ok) {
            throw new Error(
                `לא ניתן לטעון את קובץ א: ${responseA.status}`
            );
        }

        if (!responseB.ok) {
            throw new Error(
                `לא ניתן לטעון את קובץ ב: ${responseB.status}`
            );
        }

        const csvTextA = await responseA.text();
        const csvTextB = await responseB.text();

        console.log("קובץ א נטען בהצלחה");
        console.log("קובץ ב נטען בהצלחה");

        // פענוח שני הקבצים
        const parsedA = parseCSVFile(csvTextA);
        const parsedB = parseCSVFile(csvTextB);

        console.log(`קובץ א: ${parsedA.soldiers.length} חיילים`);
        console.log(`קובץ ב: ${parsedB.soldiers.length} חיילים`);

        // יצירת רשימת התאריכים המלאה
        buildDatesList(
            parsedA.dates,
            parsedB.dates
        );

        // חיבור שני הקבצים
        SOLDIERS_DATA = mergeSoldiers(
            parsedA.soldiers,
            parsedB.soldiers
        );

        console.log(
            `סה"כ נטענו ${SOLDIERS_DATA.length} חיילים`
        );

        console.log(
            `סה"כ ${DATES_LIST.length} תאריכים`
        );

        // לאחר שהנתונים נטענו - מתחילים את האפליקציה
        initializeApp();

    } catch (error) {

        console.error(
            "שגיאה בטעינת נתוני CSV:",
            error
        );

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
                        בדוק שקבצי ה-CSV נמצאים בתיקיית data
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

    const headers = parseCSVLine(lines[0])
        .map(header => header.trim());

    // שלוש העמודות הראשונות:
    // שם משפחה
    // שם פרטי
    // מחלקה / צוות

    const dateHeaders = headers.slice(3);

    const dates = dateHeaders
        .map(convertDateHeader)
        .filter(Boolean);

    const soldiers = [];

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
// תומך:
// 09-ספט
// 10-ספט
// 06/10
// 07/10
// ==========================================

function convertDateHeader(header) {

    const value = String(header || "").trim();

    if (!value) {
        return null;
    }

    // --------------------------------------
    // פורמט: 09/10
    // --------------------------------------

    if (/^\d{1,2}\/\d{1,2}$/.test(value)) {

        const parts = value.split("/");

        const day =
            parts[0].padStart(2, "0");

        const month =
            parts[1].padStart(2, "0");

        return createDateObject(day, month);
    }


    // --------------------------------------
    // פורמט: 09-ספט
    // --------------------------------------

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

    if (match) {

        const day =
            match[1].padStart(2, "0");

        const hebrewMonth =
            match[2].trim();

        const month =
            hebrewMonths[hebrewMonth];

        if (month) {
            return createDateObject(day, month);
        }
    }

    return null;
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
// יצירת רשימת התאריכים המלאה
// ==========================================

function buildDatesList(datesA, datesB) {

    const allDates = [
        ...datesA,
        ...datesB
    ];

    const uniqueDates = new Map();

    allDates.forEach(date => {

        if (!uniqueDates.has(date.date)) {
            uniqueDates.set(
                date.date,
                date
            );
        }
    });

    DATES_LIST = Array.from(
        uniqueDates.values()
    ).sort(
        (a, b) =>
            new Date(a.iso) -
            new Date(b.iso)
    );

    console.log(
        "DATES_LIST:",
        DATES_LIST
    );
}


// ==========================================
// חיבור שני קבצי החיילים
// ==========================================

function mergeSoldiers(soldiersA, soldiersB) {

    const soldiersMap = new Map();


    // --------------------------------------
    // קודם מכניסים את קובץ א
    // --------------------------------------

    soldiersA.forEach(soldier => {

        const key =
            createSoldierKey(
                soldier.firstName,
                soldier.lastName
            );

        soldiersMap.set(key, {
            firstName: soldier.firstName,
            lastName: soldier.lastName,
            fullName: soldier.fullName,
            team: soldier.team,
            schedule: {
                ...soldier.schedule
            }
        });
    });


    // --------------------------------------
    // לאחר מכן מוסיפים את קובץ ב
    // --------------------------------------

    soldiersB.forEach(soldier => {

        const key =
            createSoldierKey(
                soldier.firstName,
                soldier.lastName
            );

        if (soldiersMap.has(key)) {

            const existing =
                soldiersMap.get(key);

            // אם קיים בשני הקבצים,
            // קובץ ב מוסיף את התאריכים שלו

            existing.schedule = {
                ...existing.schedule,
                ...soldier.schedule
            };

            // אם לקובץ ב יש צוות
            // נשתמש בו רק אם אין בקובץ א
            if (!existing.team && soldier.team) {
                existing.team = soldier.team;
            }

        } else {

            // חייל שקיים רק בקובץ ב

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


    // --------------------------------------
    // המרה למבנה שה-app.js מצפה לו
    // --------------------------------------

    const soldiers =
        Array.from(soldiersMap.values());

    return soldiers.map(
        (soldier, index) => {

            const schedule =
                DATES_LIST.map(
                    date =>
                        soldier.schedule[date.date] || ""
                );

            return {
                id: `soldier_${index + 1}`,
                firstName: soldier.firstName,
                lastName: soldier.lastName,
                fullName: soldier.fullName,
                team: soldier.team,
                schedule
            };
        }
    );
}


// ==========================================
// יצירת מפתח ייחודי לחייל
// ==========================================

function createSoldierKey(firstName, lastName) {

    return (
        `${firstName}|${lastName}`
    )
        .trim()
        .toLowerCase();
}


// ==========================================
// פענוח שורת CSV
// תומך בפסיקים בתוך גרשיים
// ==========================================

function parseCSVLine(line) {

    const result = [];

    let current = "";
    let insideQuotes = false;

    for (
        let i = 0;
        i < line.length;
        i++
    ) {

        const char = line[i];

        if (char === '"') {

            if (
                insideQuotes &&
                line[i + 1] === '"'
            ) {
                current += '"';
                i++;
            } else {
                insideQuotes =
                    !insideQuotes;
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
// התחלת האפליקציה
// ==========================================

loadSoldiersData();
