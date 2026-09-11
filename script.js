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

const SOLDIERS_DATA = [
    // צוות 1
    { id: "1_1", firstName: "אחיה", lastName: "קלזון", fullName: "אחיה קלזון", team: "1", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית"] },
    { id: "1_2", firstName: "אליה", lastName: "נזרי", fullName: "אליה נזרי", team: "1", schedule: ["בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס",""] },
    { id: "1_3", firstName: "אריה", lastName: "אסולין", fullName: "אריה אסולין", team: "1", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית"] },
    { id: "1_4", firstName: "בניה", lastName: "חיון", fullName: "בניה חיון", team: "1", schedule: ["בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בסיס","בסיס"] },
    { id: "1_5", firstName: "בר", lastName: "כהן", fullName: "בר כהן", team: "1", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס"] },
    { id: "1_6", firstName: "גיל", lastName: "רפופורט", fullName: "גיל רפופורט", team: "1", schedule: ["בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בסיס"] },
    { id: "1_7", firstName: "דולב", lastName: "שמואלי", fullName: "דולב שמואלי", team: "1", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס"] },
    { id: "1_8", firstName: "דור", lastName: "פוגל", fullName: "דור פוגל", team: "1", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בסיס","בסיס","בית","בית","בית","בית","בסיס","בסיס","בסיס","בית","בית","בסיס","בסיס","בסיס","בית","בית","בסיס","בסיס","בסיס","בית","בית"] },
    { id: "1_9", firstName: "דניאל", lastName: "פוזן", fullName: "דניאל פוזן", team: "1", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית"] },
    { id: "1_10", firstName: "יהודה", lastName: "שלום", fullName: "יהודה שלום", team: "1", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בית","בית","בית"] },
    { id: "1_11", firstName: "יהודה עמרם", lastName: "סיגאווי", fullName: "יהודה עמרם סיגאווי", team: "1", schedule: ["בסיס","בסיס","בית","בית","בית","בסיס","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בית","בית","בסיס"] },
    { id: "1_12", firstName: "יוסי", lastName: "מלול", fullName: "יוסי מלול", team: "1", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בסיס","בסיס","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בסיס"] },
    { id: "1_13", firstName: "כפיר", lastName: "כהן", fullName: "כפיר כהן", team: "1", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בית","בית","בסיס"] },
    { id: "1_14", firstName: "ליאו", lastName: "ברוקס", fullName: "ליאו ברוקס", team: "1", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס"] },
    { id: "1_15", firstName: "מקסים", lastName: "דוינטס", fullName: "מקסים דוינטס", team: "1", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בסיס","בסיס","בסיס","בית","בית","בית","בית","בסיס","בסיס","בסיס","בית","בית","בסיס","בסיס","בסיס","בית","בית"] },
    { id: "1_16", firstName: "מתן", lastName: "גורביץ", fullName: "מתן גורביץ", team: "1", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","",""] },
    { id: "1_17", firstName: "מתן", lastName: "קרסנר", fullName: "מתן קרסנר", team: "1", schedule: ["בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בסיס","בסיס","בסיס"] },
    { id: "1_18", firstName: "נדב יצחק", lastName: "עדן", fullName: "נדב יצחק עדן", team: "1", schedule: ["בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס"] },
    { id: "1_19", firstName: "ניב", lastName: "שמעוני", fullName: "ניב שמעוני", team: "1", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית"] },
    { id: "1_20", firstName: "עדן", lastName: "בסון", fullName: "עדן בסון", team: "1", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית"] },
    { id: "1_21", firstName: "עידו", lastName: "אברהמי", fullName: "עידו אברהמי", team: "1", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית"] },
    { id: "1_22", firstName: "עידן", lastName: "ספורטה", fullName: "עידן ספורטה", team: "1", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בסיס","בסיס","בסיס","בית","בית","בית","בית","בסיס","בסיס","בסיס","בית","בית","בסיס","בסיס","בסיס","בית","בית"] },
    { id: "1_23", firstName: "רז", lastName: "קימל", fullName: "רז קימל", team: "1", schedule: ["בית","בית","בסיס","בסיס","בסיס","בית","בית","בסיס","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בסיס"] },
    { id: "1_24", firstName: "שמעון", lastName: "טגה", fullName: "שמעון טגה", team: "1", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בסיס","בסיס","בסיס","בית","בית","בסיס","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית"] },

    // צוות 2
    { id: "2_1", firstName: "אורי", lastName: "גדות", fullName: "אורי גדות", team: "2", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בסיס","בסיס"] },
    { id: "2_2", firstName: "אורי", lastName: "טלמור", fullName: "אורי טלמור", team: "2", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית"] },
    { id: "2_3", firstName: "איתן יעקב", lastName: "וויסרוז", fullName: "איתן יעקב וויסרוז", team: "2", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בית","בית","בית","בית","בית"] },
    { id: "2_4", firstName: "בארי", lastName: "שורצגורן", fullName: "בארי שורצגורן", team: "2", schedule: ["בסיס","בסיס","בית","בית","בית","בית","בסיס","בסיס","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בסיס","בית"] },
    { id: "2_5", firstName: "בן דוד", lastName: "אמיר", fullName: "בן דוד אמיר", team: "2", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בסיס"] },
    { id: "2_6", firstName: "בנימין", lastName: "אברמסון", fullName: "בנימין אברמסון", team: "2", schedule: ["בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס"] },
    { id: "2_7", firstName: "ברורסקי דלר", lastName: "איסויב", fullName: "ברורסקי דלר איסויב", team: "2", schedule: ["בסיס","בית","בית","בית","בית","בית","בית","בית","בית","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס"] },
    { id: "2_8", firstName: "גלעד נחמיה", lastName: "אודים", fullName: "גלעד נחמיה אודים", team: "2", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בסיס","בסיס","בית","בית","בית","בית","בית"] },
    { id: "2_9", firstName: "דוד", lastName: "תשובה", fullName: "דוד תשובה", team: "2", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בסיס","בסיס","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס"] },
    { id: "2_10", firstName: "דניאל", lastName: "זגורי", fullName: "דניאל זגורי", team: "2", schedule: ["בסיס","בית","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בסיס","בסיס","","","","","","","","","","","","","","","לא בימ״מ","לא בימ״מ","לא בימ״מ"] },
    { id: "2_11", firstName: "הראל", lastName: "אמשיקה", fullName: "הראל אמשיקה", team: "2", schedule: ["בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס"] },
    { id: "2_12", firstName: "הראל", lastName: "לאויאן", fullName: "הראל לאויאן", team: "2", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בסיס","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס"] },
    { id: "2_13", firstName: "זאב", lastName: "טייטלמן", fullName: "זאב טייטלמן", team: "2", schedule: ["בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בסיס","בסיס","בסיס"] },
    { id: "2_14", firstName: "יאיר", lastName: "קלי", fullName: "יאיר קלי", team: "2", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בסיס","בסיס","בסיס"] },
    { id: "2_15", firstName: "יעקב", lastName: "בוק", fullName: "יעקב בוק", team: "2", schedule: ["בסיס","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בית","בית","בסיס","בסיס","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס"] },
    { id: "2_16", firstName: "יצחק", lastName: "ספיהו", fullName: "יצחק ספיהו", team: "2", schedule: ["בית","בית","בסיס","בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בסיס","בסיס","בסיס"] },
    { id: "2_17", firstName: "יששכר", lastName: "בנאיש", fullName: "יששכר בנאיש", team: "2", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס"] },
    { id: "2_18", firstName: "לידור", lastName: "ועקנין", fullName: "לידור ועקנין", team: "2", schedule: ["בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס"] },
    { id: "2_19", firstName: "נריה", lastName: "לדרמן", fullName: "נריה לדרמן", team: "2", schedule: ["בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בסיס","בסיס"] },
    { id: "2_20", firstName: "עומר", lastName: "אהרונוביץ", fullName: "עומר אהרונוביץ", team: "2", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בסיס"] },
    { id: "2_21", firstName: "עימנואל", lastName: "אורקו", fullName: "עימנואל אורקו", team: "2", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית"] },
    { id: "2_22", firstName: "עמית", lastName: "אוסטין", fullName: "עמית אוסטין", team: "2", schedule: ["בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בית","לא בימ״מ","לא בימ״מ","לא בימ״מ"] },
    { id: "2_23", firstName: "פוקס", lastName: "מתניה", fullName: "פוקס מתניה", team: "2", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית"] },
    { id: "2_24", firstName: "צואלקר", lastName: "אושר", fullName: "צואלקר אושר", team: "2", schedule: ["בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בית","בסיס"] },
    { id: "2_25", firstName: "קולסיון", lastName: "כפיר", fullName: "קולסיון כפיר", team: "2", schedule: ["בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בית"] },
    { id: "2_26", firstName: "קטורזה", lastName: "אורון", fullName: "קטורזה אורון", team: "2", schedule: ["בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס"] },
    { id: "2_27", firstName: "רועי", lastName: "קריה", fullName: "רועי קריה", team: "2", schedule: ["בסיס","בסיס","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בסיס","בסיס"] },
    { id: "2_28", firstName: "רועי", lastName: "רון", fullName: "רועי רון", team: "2", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בסיס","בסיס","בית","בית","בסיס","בסיס","בסיס","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית"] },

    // צוות 3
    { id: "3_1", firstName: "אלון", lastName: "מאמה", fullName: "אלון מאמה", team: "3", schedule: ["בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בסיס","בסיס"] },
    { id: "3_2", firstName: "אליהו", lastName: "זיו", fullName: "אליהו זיו", team: "3", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בסיס"] },
    { id: "3_3", firstName: "אמנון", lastName: "עזריה", fullName: "אמנון עזריה", team: "3", schedule: ["בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית"] },
    { id: "3_4", firstName: "בניה", lastName: "דינר", fullName: "בניה דינר", team: "3", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","","","","","","","","","","","","","","","","","",""] },
    { id: "3_5", firstName: "דימטרי", lastName: "רבדה", fullName: "דימטרי רבדה", team: "3", schedule: ["בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית"] },
    { id: "3_6", firstName: "דין", lastName: "סמסון", fullName: "דין סמסון", team: "3", schedule: ["בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בית","בית","בסיס","בסיס","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית"] },
    { id: "3_7", firstName: "חגי אברהם", lastName: "רון", fullName: "חגי אברהם רון", team: "3", schedule: ["בסיס","בית","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בסיס","בסיס","בסיס"] },
    { id: "3_8", firstName: "יהונתן", lastName: "קור", fullName: "יהונתן קור", team: "3", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בסיס","בית","בית","בסיס","בסיס","בית","בית","בסיס","בסיס","בסיס","בית","בית","בית","בית","בסיס"] },
    { id: "3_9", firstName: "יובל", lastName: "גרוס", fullName: "יובל גרוס", team: "3", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית"] },
    { id: "3_10", firstName: "יונתן", lastName: "ענקי", fullName: "יונתן ענקי", team: "3", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בית","בית","בסיס","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בית","בסיס","בסיס","בית","בית","בסיס"] },
    { id: "3_11", firstName: "יותם", lastName: "תוראתי", fullName: "יותם תוראתי", team: "3", schedule: ["בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס"] },
    { id: "3_12", firstName: "ים", lastName: "כהן", fullName: "ים כהן", team: "3", schedule: ["בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית"] },
    { id: "3_13", firstName: "כפיר", lastName: "אורן", fullName: "כפיר אורן", team: "3", schedule: ["בית","בית","בית","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס"] },
    { id: "3_14", firstName: "לביא", lastName: "וילנר", fullName: "לביא וילנר", team: "3", schedule: ["בית","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בסיס"] },
    { id: "3_15", firstName: "מסגנאו", lastName: "מינלאי", fullName: "מסגנאו מינלאי", team: "3", schedule: ["בית","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בסיס","בסיס","בסיס"] },
    { id: "3_16", firstName: "נועם", lastName: "תומר", fullName: "נועם תומר", team: "3", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בסיס"] },
    { id: "3_17", firstName: "ניתאי", lastName: "אברמוביץ", fullName: "ניתאי אברמוביץ", team: "3", schedule: ["בית","בית","בית","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס"] },
    { id: "3_18", firstName: "יונתן", lastName: "סטולוב", fullName: "יונתן סטולוב", team: "3", schedule: ["לא בימ״מ","לא בימ״מ","לא בימ״מ","לא בימ״מ","לא בימ״מ","לא בימ״מ","לא בימ״מ","לא בימ״מ","פתיחת שמ״פ","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית"] },
    { id: "3_19", firstName: "עדיאל", lastName: "כהן", fullName: "עדיאל כהן", team: "3", schedule: ["בית","בית","בית","בית","בית","בסיס","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס"] },
    { id: "3_20", firstName: "עומר", lastName: "ויצמן", fullName: "עומר ויצמן", team: "3", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בית","בית","בית","בית","בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס"] },
    { id: "3_21", firstName: "עומר", lastName: "ענב", fullName: "עומר ענב", team: "3", schedule: ["בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בית"] },
    { id: "3_22", firstName: "עופר", lastName: "מלכה", fullName: "עופר מלכה", team: "3", schedule: ["בסיס","בסיס","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס"] },
    { id: "3_23", firstName: "אחיה בן", lastName: "עוקבי", fullName: "אחיה בן עוקבי", team: "3", schedule: ["בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בית","בסיס","בית","בסיס"] },
    { id: "3_24", firstName: "פיליפ", lastName: "איגושין", fullName: "פיליפ איגושין", team: "3", schedule: ["בית","בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בית","בסיס","בסיס"] },
    { id: "3_25", firstName: "דביר", lastName: "צברי", fullName: "דביר צברי", team: "3", schedule: ["בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בסיס"] },
    { id: "3_26", firstName: "צור", lastName: "דדשי", fullName: "צור דדשי", team: "3", schedule: ["בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בית","בסיס","בסיס","בית","בית","בסיס","בסיס","בסיס","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית"] },
    { id: "3_27", firstName: "רון", lastName: "דהן", fullName: "רון דהן", team: "3", schedule: ["בית","בית","בית","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בסיס","בסיס"] },
    { id: "3_28", firstName: "רועי", lastName: "משולם", fullName: "רועי משולם", team: "3", schedule: ["בית","בית","בסיס","בסיס","בסיס","בית","בית","בית","בסיס","בסיס","בסיס","בסיס","בסיס","בית","בית","בית","בסיס","בסיס","","","","","","בית","בית","","",""] }
];

const STORAGE_KEY = "military_schedule_selected_soldier_id";
let currentSoldier = null;
let selectedTeamFilter = "ALL";
let selectedStatusFilter = "ALL";
let currentViewMode = 'list';

function getTodayIndex() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const formatted = `${day}/${month}`;
    
    const idx = DATES_LIST.findIndex(d => d.date === formatted);
    return idx !== -1 ? idx : 1; 
}

const TODAY_INDEX = getTodayIndex();

window.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js');
    }

    const savedSoldierId = localStorage.getItem(STORAGE_KEY);
    if (savedSoldierId) {
        const found = SOLDIERS_DATA.find(s => s.id === savedSoldierId);
        if (found) {
            selectSoldier(found, false);
            return;
        }
    }
    showSearchScreen();
});

window.addEventListener('popstate', () => {
    const dashboard = document.getElementById('view-dashboard');
    if (dashboard && !dashboard.classList.contains('hidden')) {
        showSearchScreen();
    }
});

function showSearchScreen() {
    currentSoldier = null;
    document.getElementById('view-search').classList.remove('hidden');
    document.getElementById('view-search').classList.add('flex');
    document.getElementById('view-dashboard').classList.add('hidden');
    document.getElementById('view-dashboard').classList.remove('flex');
    document.getElementById('header-actions').classList.add('hidden');
    
    renderSoldiersGrid();
}

function openSearchModal() {
    showSearchScreen();
    const input = document.getElementById('soldier-search-input');
    input.value = '';
    input.focus();
}

function filterTeam(team) {
    selectedTeamFilter = team;
    document.querySelectorAll('#team-filter-buttons button').forEach(btn => {
        btn.classList.remove('bg-brand-600', 'text-white');
        btn.classList.add('bg-slate-800', 'text-slate-300');
    });
    event.target.classList.remove('bg-slate-800', 'text-slate-300');
    event.target.classList.add('bg-brand-600', 'text-white');

    renderSoldiersGrid();
}

function onSearchInput(query) {
    const clearBtn = document.getElementById('clear-search-btn');
    const autocompleteList = document.getElementById('autocomplete-list');

    if (query.trim().length > 0) {
        clearBtn.classList.remove('hidden');
    } else {
        clearBtn.classList.add('hidden');
        autocompleteList.classList.add('hidden');
        renderSoldiersGrid();
        return;
    }

    const cleanQuery = query.trim().toLowerCase();
    const matches = SOLDIERS_DATA.filter(s => 
        s.fullName.toLowerCase().includes(cleanQuery) ||
        s.firstName.toLowerCase().includes(cleanQuery) ||
        s.lastName.toLowerCase().includes(cleanQuery)
    );

    if (matches.length > 0) {
        autocompleteList.innerHTML = matches.map(s => `
            <div onclick="selectSoldierById('${s.id}')" class="px-4 py-3 hover:bg-slate-800/80 cursor-pointer flex items-center justify-between transition">
                <div class="flex items-center gap-2.5">
                    <div class="w-7 h-7 rounded-lg bg-brand-600/30 text-brand-300 flex items-center justify-center font-bold text-xs">
                        ${s.firstName[0]}
                    </div>
                    <span class="text-sm font-medium text-white">${highlightMatch(s.fullName, query)}</span>
                </div>
                <span class="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded">מחלקה ${s.team}</span>
            </div>
        `).join('');
        autocompleteList.classList.remove('hidden');
    } else {
        autocompleteList.innerHTML = `
            <div class="px-4 py-3 text-slate-400 text-xs text-center">לא נמצא חייל בשם הזה</div>
        `;
        autocompleteList.classList.remove('hidden');
    }

    renderSoldiersGrid(matches);
}

function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="text-brand-400 font-bold">$1</span>');
}

function clearSearch() {
    const input = document.getElementById('soldier-search-input');
    input.value = '';
    document.getElementById('clear-search-btn').classList.add('hidden');
    document.getElementById('autocomplete-list').classList.add('hidden');
    renderSoldiersGrid();
}

function renderSoldiersGrid(filteredList = null) {
    const grid = document.getElementById('soldiers-grid');
    let list = filteredList || SOLDIERS_DATA;

    if (selectedTeamFilter !== 'ALL') {
        list = list.filter(s => s.team === selectedTeamFilter);
    }

    document.getElementById('soldier-count').textContent = list.length;

    if (list.length === 0) {
        grid.innerHTML = `
            <div class="col-span-2 py-8 text-center text-slate-500 text-xs">
                אין חיילים להצגה בקטגוריה זו
            </div>
        `;
        return;
    }

    grid.innerHTML = list.map(s => `
        <button onclick="selectSoldierById('${s.id}')" class="glass-card glass-card-interactive p-3 rounded-2xl text-right flex items-center gap-2.5 border-slate-800 hover:border-brand-500/50 group">
            <div class="w-9 h-9 rounded-xl bg-slate-800 text-slate-200 font-semibold text-xs flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition">
                ${s.firstName[0]}${s.lastName[0] || ''}
            </div>
            <div class="flex-1 min-w-0">
                <div class="text-xs font-semibold text-white truncate">${s.fullName}</div>
                <div class="text-[10px] text-slate-400">מחלקה ${s.team}</div>
            </div>
        </button>
    `).join('');
}

function selectSoldierById(id) {
    const soldier = SOLDIERS_DATA.find(s => s.id === id);
    if (soldier) {
        selectSoldier(soldier, true);
    }
}

function selectSoldier(soldier, save = true) {
    currentSoldier = soldier;
    if (save) {
        localStorage.setItem(STORAGE_KEY, soldier.id);
        showToast(` ${soldier.fullName}`);
    }

    history.pushState({ view: 'dashboard' }, '');

    document.getElementById('autocomplete-list').classList.add('hidden');
    document.getElementById('view-search').classList.add('hidden');
    document.getElementById('view-search').classList.remove('flex');
    
    document.getElementById('view-dashboard').classList.remove('hidden');
    document.getElementById('view-dashboard').classList.add('flex');
    document.getElementById('header-actions').classList.remove('hidden');

    
    
   function renderDashboard() {
    if (!currentSoldier) return;

    const todayIdx = getTodayIndex();

    document.getElementById('soldier-name').textContent = currentSoldier.fullName;
    document.getElementById('soldier-team').textContent = `מחלקה ${currentSoldier.team}`;
    document.getElementById('soldier-avatar').textContent = `${currentSoldier.firstName[0]}${currentSoldier.lastName[0] || ''}`;

    const currentStatus = currentSoldier.schedule[todayIdx] || 'ללא נתון';
    const statusBadge = document.getElementById('current-status-badge');

    if (currentStatus === 'בסיס') {
        statusBadge.className = 'px-2 py-0.5 rounded-md text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1';
        statusBadge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping"></span> בבסיס ⛺`;
    } else if (currentStatus === 'בית') {
        statusBadge.className = 'px-2 py-0.5 rounded-md text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1';
        statusBadge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> בבית 🏠`;
    } else {
        statusBadge.className = 'px-2 py-0.5 rounded-md text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1';
        statusBadge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span> ${currentStatus}`;
    }

    let baseCount = 0;
    let homeCount = 0;
    let totalValidDays = 0;

    currentSoldier.schedule.forEach(status => {
        if (status === 'בסיס') baseCount++;
        if (status === 'בית') homeCount++;
        if (status && status.trim() !== '') totalValidDays++;
    });

    document.getElementById('stat-base-count').textContent = baseCount;
    document.getElementById('stat-home-count').textContent = homeCount;

    const basePercent = totalValidDays > 0 ? Math.round((baseCount / totalValidDays) * 100) : 0;
    const homePercent = totalValidDays > 0 ? Math.round((homeCount / totalValidDays) * 100) : 0;

    document.getElementById('stat-base-bar').style.width = `${basePercent}%`;
    document.getElementById('stat-home-bar').style.width = `${homePercent}%`;

    calculateUpcomingExit();

    if (currentViewMode === 'month') {
        renderMonthView();
    } else {
        renderTimeline();
    }
}

function renderMonthView() {
    const monthContainer = document.getElementById('monthViewContainer');
    if (!monthContainer || !currentSoldier) return;
    
    // וידוא החלת מחלקת ה-Grid
    monthContainer.className = 'month-grid';
    monthContainer.innerHTML = '';

    const daysOfWeek = ['א\'', 'ב\'', 'ג\'', 'ד\'', 'ה\'', 'ו\'', 'ש\''];
    daysOfWeek.forEach(day => {
        const header = document.createElement('div');
        header.className = 'month-day-header';
        header.innerText = day;
        monthContainer.appendChild(header);
    });

    const dayToColumn = {
        'ראשון': 1,
        'שני': 2,
        'שלישי': 3,
        'רביעי': 4,
        'חמישי': 5,
        'שישי': 6,
        'שבת': 7
    };

    const todayIdx = getTodayIndex();

    DATES_LIST.forEach((item, index) => {
        const status = currentSoldier.schedule[index] || '';
        const isMatch = (selectedStatusFilter === 'ALL') ||
                        (selectedStatusFilter === 'בסיס' && status === 'בסיס') ||
                        (selectedStatusFilter === 'בית' && status === 'בית');

        const card = document.createElement('div');
        const isToday = index === todayIdx;
        
        card.className = `month-day-card ${isToday ? 'is-today' : ''} ${!isMatch ? 'opacity-25' : ''}`;

        // התאמת התא הראשון לטור יום השבוע המתאים (09/09 חל ביום רביעי -> טור 4)
        if (index === 0) {
            const startCol = dayToColumn[item.day] || 1;
            card.style.gridColumnStart = startCol;
        }

        const dayNum = item.date.split('/')[0];
        const statusClass = status === 'בסיס' ? 'base' : (status === 'בית' ? 'home' : '');

        card.innerHTML = `
            <span class="month-day-number">${dayNum}</span>
            ${statusClass ? `<div class="status-indicator ${statusClass}" title="${status}"></div>` : ''}
        `;

        monthContainer.appendChild(card);
    });
}

function calculateUpcomingExit() {
    let nextExitDate = null;
    let daysUntil = null;
    const todayIdx = getTodayIndex();

    for (let i = todayIdx; i < currentSoldier.schedule.length; i++) {
        if (currentSoldier.schedule[i] === 'בית') {
            nextExitDate = DATES_LIST[i].date;
            daysUntil = i - todayIdx;
            break;
        }
    }

    const exitEl = document.getElementById('stat-next-exit');
    const daysEl = document.getElementById('stat-next-days');

    if (nextExitDate) {
        exitEl.textContent = nextExitDate;
        if (daysUntil === 0) {
            daysEl.textContent = 'היום יוצאים!';
        } else if (daysUntil === 1) {
            daysEl.textContent = 'מחר בבית';
        } else {
            daysEl.textContent = `בעוד ${daysUntil} ימים`;
        }
    } else {
        exitEl.textContent = 'אין יציאה';
        daysEl.textContent = 'בטווח הנתונים';
    }
}
 

function calculateUpcomingExit() {
    let nextExitDate = null;
    let daysUntil = null;

    for (let i = TODAY_INDEX; i < currentSoldier.schedule.length; i++) {
        if (currentSoldier.schedule[i] === 'בית') {
            nextExitDate = DATES_LIST[i].date;
            daysUntil = i - TODAY_INDEX;
            break;
        }
    }

    const exitEl = document.getElementById('stat-next-exit');
    const daysEl = document.getElementById('stat-next-days');

    if (nextExitDate) {
        exitEl.textContent = nextExitDate;
        if (daysUntil === 0) {
            daysEl.textContent = 'היום יוצאים!';
        } else if (daysUntil === 1) {
            daysEl.textContent = 'מחר בבית';
        } else {
            daysEl.textContent = `בעוד ${daysUntil} ימים`;
        }
    } else {
        exitEl.textContent = 'אין יציאה';
        daysEl.textContent = 'בטווח הנתונים';
    }
}

function setDisplayFilter(filter) {
    selectedStatusFilter = filter;
    document.querySelectorAll('.status-filter-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-slate-800', 'text-white', 'font-semibold');
        btn.classList.add('text-slate-400');
    });

    const activeBtn = document.getElementById(`filter-btn-${filter}`);
    if (activeBtn) {
        activeBtn.classList.add('active', 'bg-slate-800', 'text-white', 'font-semibold');
        activeBtn.classList.remove('text-slate-400');
    }

    if (currentViewMode === 'month') {
        renderMonthView();
    } else {
        renderTimeline();
    }
}

function renderTimeline() {
    const container = document.getElementById('timeline-container');
    if (!currentSoldier) return;

    let html = '';

    DATES_LIST.forEach((dateObj, index) => {
        const status = currentSoldier.schedule[index] || '';
        const isToday = index === TODAY_INDEX;

        if (selectedStatusFilter === 'בסיס' && status !== 'בסיס') return;
        if (selectedStatusFilter === 'בית' && status !== 'בית') return;

        let badgeHtml = '';
        let borderStyle = 'border-slate-800/80';
        let bgStyle = 'glass-card';

        if (isToday) {
            borderStyle = 'border-brand-500 ring-1 ring-brand-500/50 shadow-lg shadow-brand-500/10';
            bgStyle = 'bg-slate-900/90';
        }

        if (status === 'בסיס') {
            badgeHtml = `
                <div class="px-3 py-1 rounded-xl bg-indigo-950/80 text-indigo-300 border border-indigo-700/50 text-xs font-semibold flex items-center gap-1.5">
                    <i class="fas fa-campground text-indigo-400 text-xs"></i>
                    <span>בסיס</span>
                </div>
            `;
        } else if (status === 'בית') {
            badgeHtml = `
                <div class="px-3 py-1 rounded-xl bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 text-xs font-semibold flex items-center gap-1.5">
                    <i class="fas fa-house text-emerald-400 text-xs"></i>
                    <span>בית</span>
                </div>
            `;
        } else if (status.trim() !== '') {
            badgeHtml = `
                <div class="px-3 py-1 rounded-xl bg-amber-950/80 text-amber-300 border border-amber-700/50 text-xs font-semibold flex items-center gap-1.5">
                    <i class="fas fa-circle-info text-amber-400 text-xs"></i>
                    <span>${status}</span>
                </div>
            `;
        } else {
            badgeHtml = `
                <div class="px-2.5 py-1 rounded-xl bg-slate-800/50 text-slate-500 text-xs font-normal">
                    אין נתון
                </div>
            `;
        }

        html += `
            <div id="date-card-${index}" class="${bgStyle} ${borderStyle} rounded-2xl p-3 flex items-center justify-between transition-all">
                <div class="flex items-center gap-3">
                    <div class="flex flex-col items-center justify-center w-11 h-11 rounded-xl ${isToday ? 'bg-brand-600 text-white font-bold' : 'bg-slate-800/90 text-slate-300'} text-xs">
                        <span class="text-[10px] opacity-80 font-normal">${dateObj.day}</span>
                        <span class="font-bold text-sm leading-none mt-0.5">${dateObj.date}</span>
                    </div>
                    
                    <div class="flex flex-col">
                        <div class="flex items-center gap-1.5">
                            <span class="text-sm font-semibold text-white">יום ${dateObj.day}</span>
                            ${isToday ? '<span class="bg-brand-500/20 text-brand-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-brand-500/30">היום</span>' : ''}
                        </div>
                        <span class="text-[11px] text-slate-400">${dateObj.month === '09' ? 'ספטמבר' : 'אוקטובר'} 2026</span>
                    </div>
                </div>

                <div>
                    ${badgeHtml}
                </div>
            </div>
        `;
    });

    if (html === '') {
        container.innerHTML = `
            <div class="py-12 text-center text-slate-500 text-xs">
                אין ימים התואמים את הסינון שנבחר
            </div>
        `;
    } else {
        container.innerHTML = html;
    }
}

function switchView(viewMode) {
    currentViewMode = viewMode;

    const listContainer = document.getElementById('timeline-container');
    const monthContainer = document.getElementById('monthViewContainer');
    
    document.getElementById('listViewBtn').classList.toggle('active', viewMode === 'list');
    document.getElementById('monthViewBtn').classList.toggle('active', viewMode === 'month');

    if (viewMode === 'list') {
        listContainer.style.display = 'flex';
        monthContainer.style.display = 'none';
        renderTimeline();
    } else {
        listContainer.style.display = 'none';
        monthContainer.style.display = 'grid';
        renderMonthView();
    }
}

function renderMonthView() {
    const monthContainer = document.getElementById('monthViewContainer');
    if (!monthContainer || !currentSoldier) return;
    monthContainer.innerHTML = '';

    const daysOfWeek = ['א\'', 'ב\'', 'ג\'', 'ד\'', 'ה\'', 'ו\'', 'ש\''];
    daysOfWeek.forEach(day => {
        const header = document.createElement('div');
        header.className = 'month-day-header';
        header.innerText = day;
        monthContainer.appendChild(header);
    });

    DATES_LIST.forEach((item, index) => {
        const status = currentSoldier.schedule[index] || '';
        
        if (selectedStatusFilter === 'בסיס' && status !== 'בסיס') return;
        if (selectedStatusFilter === 'בית' && status !== 'בית') return;

        const card = document.createElement('div');
        const isToday = index === TODAY_INDEX;
        card.className = `month-day-card ${isToday ? 'is-today' : ''}`;

        const dayNum = item.date.split('/')[0];
        const statusClass = status === 'בסיס' ? 'base' : (status === 'בית' ? 'home' : '');

        card.innerHTML = `
            <span class="month-day-number">${dayNum}</span>
            ${statusClass ? `<div class="status-indicator ${statusClass}" title="${status}"></div>` : ''}
        `;

        monthContainer.appendChild(card);
    });
}

function scrollToToday() {
    setDisplayFilter('ALL');
    if (currentViewMode !== 'list') {
        switchView('list');
    }
    setTimeout(() => {
        const todayEl = document.getElementById(`date-card-${TODAY_INDEX}`);
        if (todayEl) {
            todayEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            todayEl.classList.add('ring-2', 'ring-brand-400');
            setTimeout(() => {
                todayEl.classList.remove('ring-2', 'ring-brand-400');
            }, 1500);
        }
    }, 50);
}

function shareWhatsApp() {
    if (!currentSoldier) return;

    let text = `📅 *לוח יציאות אישי - ${currentSoldier.fullName} (צוות ${currentSoldier.team})*\n\n`;
    
    DATES_LIST.forEach((d, i) => {
        const st = currentSoldier.schedule[i] || 'אין נתון';
        const icon = st === 'בסיס' ? '⛺' : (st === 'בית' ? '🏠' : '📌');
        text += `${d.date} (${d.day}): ${st} ${icon}\n`;
    });

    text += ` פלוגה ג `;

    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);

    showToast("לוח היציאות הועתק! ניתן להדביק ב-WhatsApp");
}

function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-message').textContent = message;
    
    toast.classList.remove('-translate-y-16', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('-translate-y-16', 'opacity-0');
    }, 3000);
}
