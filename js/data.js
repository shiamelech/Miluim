// נתוני האפליקציה בלבד.
// כדי לעדכן חיילים או תאריכים – עורכים רק את הקובץ הזה.

const DATES_LIST = [
    { date: "09/09", day: "רביעי", month: "09", iso: "2026-09-09" },
    { date: "10/09", day: "חמישי", month: "09", iso: "2026-09-10" },
    { date: "11/09", day: "שישי", month: "09", iso: "2026-09-11" },
    { date: "12/09", day: "שבת", month: "09", iso: "2026-09-12" },
    { date: "13/09", day: "ראשון", month: "09", iso: "2026-09-13" },
    { date: "14/09", day: "שני", month: "09", iso: "2026-09-14" },
    { date: "15/09", day: "שלישי", month: "09", iso: "2026-09-15" },
    { date: "16/09", day: "רביעי", month: "09", iso: "2026-09-16" },
    { date: "17/09", day: "חמישי", month: "09", iso: "2026-09-17" },
    { date: "18/09", day: "שישי", month: "09", iso: "2026-09-18" },
    { date: "19/09", day: "שבת", month: "09", iso: "2026-09-19" },
    { date: "20/09", day: "ראשון", month: "09", iso: "2026-09-20" },
    { date: "21/09", day: "שני", month: "09", iso: "2026-09-21" },
    { date: "22/09", day: "שלישי", month: "09", iso: "2026-09-22" },
    { date: "23/09", day: "רביעי", month: "09", iso: "2026-09-23" },
    { date: "24/09", day: "חמישי", month: "09", iso: "2026-09-24" },
    { date: "25/09", day: "שישי", month: "09", iso: "2026-09-25" },
    { date: "26/09", day: "שבת", month: "09", iso: "2026-09-26" },
    { date: "27/09", day: "ראשון", month: "09", iso: "2026-09-27" },
    { date: "28/09", day: "שני", month: "09", iso: "2026-09-28" },
    { date: "29/09", day: "שלישי", month: "09", iso: "2026-09-29" },
    { date: "30/09", day: "רביעי", month: "09", iso: "2026-09-30" },
    { date: "01/10", day: "חמישי", month: "10", iso: "2026-10-01" },
    { date: "02/10", day: "שישי", month: "10", iso: "2026-10-02" },
    { date: "03/10", day: "שבת", month: "10", iso: "2026-10-03" },
    { date: "04/10", day: "ראשון", month: "10", iso: "2026-10-04" },
    { date: "05/10", day: "שני", month: "10", iso: "2026-10-05" },
    { date: "06/10", day: "שלישי", month: "10", iso: "2026-10-06" }
];


        // Database parsed directly from "יציאות א מעודכן.csv"
      // ==========================================
// נתוני חיילים נטענים מקובץ CSV
// ==========================================

let SOLDIERS_DATA = [];


// כתובת קובץ ה-CSV
const CSV_FILE = "./data/יציאות.csv";


// ==========================================
// טעינת CSV
// ==========================================

async function loadSoldiersData() {
    try {
        const response = await fetch(CSV_FILE);

        if (!response.ok) {
            throw new Error(
                `לא ניתן לטעון את קובץ ה-CSV: ${response.status}`
            );
        }

        const csvText = await response.text();

        SOLDIERS_DATA = parseCSV(csvText);

        console.log(
            `נטענו ${SOLDIERS_DATA.length} חיילים מקובץ ה-CSV`
        );

        // לאחר שהנתונים נטענו,
        // מפעילים את האפליקציה
        initializeApp();

    } catch (error) {
        console.error("שגיאה בטעינת CSV:", error);

        const container = document.getElementById("soldiers-grid");

        if (container) {
            container.innerHTML = `
                <div class="text-center p-6 text-red-400">
                    <i class="fas fa-exclamation-triangle mb-2"></i>
                    <div>לא ניתן לטעון את נתוני החיילים</div>
                    <div class="text-sm mt-2 text-slate-400">
                        בדוק שקובץ ה-CSV נמצא במקום הנכון
                    </div>
                </div>
            `;
        }
    }
}


// ==========================================
// פענוח CSV
// ==========================================

function parseCSV(csvText) {

    // מנקה BOM וירידות שורה
    csvText = csvText
        .replace(/^\uFEFF/, "")
        .replace(/\r/g, "");

    const lines = csvText
        .split("\n")
        .filter(line => line.trim() !== "");

    if (lines.length < 2) {
        console.error("קובץ ה-CSV ריק או לא תקין");
        return [];
    }


    // ========================================
    // שורת הכותרות
    // ========================================

    const headers = parseCSVLine(lines[0]);


    // התאריכים נמצאים מהעמודה הרביעית והלאה
    const dateHeaders = headers.slice(3);


    // ========================================
    // יצירת DATES_LIST מתוך ה-CSV
    // ========================================

    DATES_LIST.length = 0;

    dateHeaders.forEach(date => {

        const cleanDate = date.trim();

        if (!cleanDate) {
            return;
        }

        const parts = cleanDate.split("/");

        if (parts.length !== 2) {
            return;
        }

        const day = parts[0].padStart(2, "0");
        const month = parts[1].padStart(2, "0");

        const year =
            month === "09" ? "2026" : "2026";

        const iso = `${year}-${month}-${day}`;

        const dateObject = new Date(iso);

        const days = [
            "ראשון",
            "שני",
            "שלישי",
            "רביעי",
            "חמישי",
            "שישי",
            "שבת"
        ];

        DATES_LIST.push({
            date: `${day}/${month}`,
            day: days[dateObject.getDay()],
            month: month,
            iso: iso
        });
    });


    // ========================================
    // יצירת SOLDIERS_DATA
    // ========================================

    const soldiers = [];

    const teamCounters = {};


    for (let i = 1; i < lines.length; i++) {

        const values = parseCSVLine(lines[i]);

        if (values.length < 4) {
            continue;
        }


        // ======================================
        // עמודות בסיס
        // ======================================

        const lastName = (values[0] || "").trim();
        const firstName = (values[1] || "").trim();
        const team = (values[2] || "").trim();


        // מתעלמים משורה ללא שם
        if (!firstName && !lastName) {
            continue;
        }


        // ======================================
        // יצירת ID אוטומטי
        // ======================================

        if (!teamCounters[team]) {
            teamCounters[team] = 1;
        } else {
            teamCounters[team]++;
        }

        const id = `${team}_${teamCounters[team]}`;


        // ======================================
        // לוח היציאות
        // ======================================

        const schedule = values
            .slice(3)
            .map(value => (value || "").trim());


        // ======================================
        // הוספת החייל
        // ======================================

        soldiers.push({
            id: id,
            firstName: firstName,
            lastName: lastName,
            fullName: `${firstName} ${lastName}`.trim(),
            team: team,
            schedule: schedule
        });
    }


    return soldiers;
}


// ==========================================
// פענוח שורת CSV
// תומך גם בפסיקים בתוך גרשיים
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
// התחלת האפליקציה
// ==========================================

loadSoldiersData();
