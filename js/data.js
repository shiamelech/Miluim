// ==========================================
// נתוני האפליקציה
// ==========================================

let DATES_LIST = [];
let SOLDIERS_DATA = [];

const CSV_FILE_A = "./data/יציאות א מעודכן.csv";
const CSV_FILE_B = "./data/יציאות סבב ב לפרסום.csv";


// ==========================================
// טעינת הקבצים
// ==========================================

async function loadSoldiersData() {
    try {
        console.log("מתחיל טעינת קבצי CSV...");

        const [responseA, responseB] = await Promise.all([
            fetch(CSV_FILE_A),
            fetch(CSV_FILE_B)
        ]);

        if (!responseA.ok) {
            throw new Error(
                `קובץ א לא נטען: ${responseA.status} ${responseA.statusText}`
            );
        }

        if (!responseB.ok) {
            throw new Error(
                `קובץ ב לא נטען: ${responseB.status} ${responseB.statusText}`
            );
        }

        const csvTextA = await responseA.text();
        const csvTextB = await responseB.text();

        console.log("קובץ א נטען");
        console.log("קובץ ב נטען");

        const parsedA = parseCSVFile(csvTextA);
        const parsedB = parseCSVFile(csvTextB);

        console.log("חיילים בקובץ א:", parsedA.soldiers.length);
        console.log("חיילים בקובץ ב:", parsedB.soldiers.length);

        buildDatesList(
            parsedA.dates,
            parsedB.dates
        );

        SOLDIERS_DATA = mergeSoldiers(
            parsedA.soldiers,
            parsedB.soldiers
        );

        console.log("סה״כ חיילים:", SOLDIERS_DATA.length);
        console.log("סה״כ תאריכים:", DATES_LIST.length);

        initializeApp();

    } catch (error) {
        console.error("שגיאה בטעינת הנתונים:", error);

        const container =
            document.getElementById("soldiers-grid");

        if (container) {
            container.innerHTML = `
                <div class="col-span-2 text-center p-6 text-red-400">
                    <i class="fas fa-exclamation-triangle mb-2"></i>
                    <div>לא ניתן לטעון את נתוני החיילים</div>
                    <div class="text-sm mt-2 text-slate-400">
                        ${error.message}
                    </div>
                </div>
            `;
        }
    }
}


// ==========================================
// CSV
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
        .map(x => x.trim());

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

            const date =
                convertDateHeader(header);

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
// המרת תאריך
// ==========================================

function convertDateHeader(header) {

    const value =
        String(header || "").trim();

    if (!value) {
        return null;
    }

    // 06/10
    if (/^\d{1,2}\/\d{1,2}$/.test(value)) {

        const parts =
            value.split("/");

        return createDateObject(
            parts[0].padStart(2, "0"),
            parts[1].padStart(2, "0")
        );
    }

    // 09-ספט
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

    const month =
        hebrewMonths[match[2].trim()];

    if (!month) {
        return null;
    }

    return createDateObject(
        match[1].padStart(2, "0"),
        month
    );
}


// ==========================================
// יצירת תאריך
// ==========================================

function createDateObject(day, month) {

    const year = 2026;

    const date =
        new Date(`${year}-${month}-${day}T00:00:00`);

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
        day: days[date.getDay()],
        month,
        iso: `${year}-${month}-${day}`
    };
}


// ==========================================
// רשימת תאריכים
// ==========================================

function buildDatesList(datesA, datesB) {

    const map = new Map();

    [...datesA, ...datesB].forEach(date => {
        if (!map.has(date.date)) {
            map.set(date.date, date);
        }
    });

    DATES_LIST =
        Array.from(map.values())
            .sort(
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
// איחוד החיילים
// ==========================================

function mergeSoldiers(soldiersA, soldiersB) {

    const map = new Map();

    soldiersA.forEach(soldier => {

        const key =
            createSoldierKey(
                soldier.firstName,
                soldier.lastName
            );

        map.set(key, {
            firstName: soldier.firstName,
            lastName: soldier.lastName,
            fullName: soldier.fullName,
            team: soldier.team,
            schedule: {
                ...soldier.schedule
            }
        });
    });

    soldiersB.forEach(soldier => {

        const key =
            createSoldierKey(
                soldier.firstName,
                soldier.lastName
            );

        if (map.has(key)) {

            const existing =
                map.get(key);

            existing.schedule = {
                ...existing.schedule,
                ...soldier.schedule
            };

            if (!existing.team && soldier.team) {
                existing.team = soldier.team;
            }

        } else {

            map.set(key, {
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

    return Array.from(map.values())
        .map((soldier, index) => {

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
        });
}


// ==========================================
// מפתח חייל
// ==========================================

function createSoldierKey(firstName, lastName) {

    return `${firstName}|${lastName}`
        .trim()
        .toLowerCase();
}


// ==========================================
// פענוח שורת CSV
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
// הפעלה
// ==========================================

loadSoldiersData();
