// לוגיקת האפליקציה בלבד (Vanilla JS)

const STORAGE_KEY = "military_schedule_selected_soldier_id";
let currentSoldier = null;
let selectedTeamFilter = "ALL";
let selectedStatusFilter = "ALL";
let currentViewMode = "list";
// אוגר נתונים עבור התאריכים העבריים והחגים
let hebrewDataCache = {};

// שליפת נתונים מ-Hebcal עבור חודשי הלוח
async function fetchHebrewCalendarData() {
    const year = 2026;
    const months = [...new Set(DATES_LIST.map(d => d.month))];

    for (const month of months) {
        const url = `https://www.hebcal.com/hebcal?v=1&cfg=json&maj=on&min=on&ss=on&i=on&lang=he&d=on&year=${year}&month=${Number(month)}`;
        try {
            const res = await fetch(url);
            const data = await res.json();

            data.items.forEach(item => {
                const dateKey = item.date.split('T')[0]; // פורמט YYYY-MM-DD
                if (!hebrewDataCache[dateKey]) {
                    hebrewDataCache[dateKey] = { events: [], hebrewDate: '' };
                }

                if (item.category === 'hebrewDate') {
                    hebrewDataCache[dateKey].hebrewDate = item.hebrew;
                } else {
                    hebrewDataCache[dateKey].events.push(item.hebrew || item.title);
                }
            });
        } catch (e) {
            console.error("Error fetching Hebrew calendar data:", e);
        }
    }
}
// חישוב אינדקס "היום"
function getTodayIndex() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const formatted = `${day}/${month}`;
    
    const idx = DATES_LIST.findIndex(d => d.date === formatted);
    return idx !== -1 ? idx : 0; 
}

const TODAY_INDEX = getTodayIndex();

// ==========================================
// אתחול האפליקציה וניהול היסטוריה (Back Button)
// ==========================================

function initializeApp() {
    // ריענון תצוגה בזמן אמת במידה והמשתמש שינה מצב תצוגה בטלפון
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
        if (currentSoldier) renderDashboard();
    });
    // הגדרת מצב הבית בהיסטוריה
    history.replaceState({ view: 'search' }, '', window.location.pathname);
    
    // פתיחה תמיד בדף החיפוש
    showSearchScreen(false);
}

function showSearchScreen(pushHistory = true) {
    currentSoldier = null;
    
    document.getElementById('view-search').classList.remove('hidden');
    document.getElementById('view-search').classList.add('flex');
    document.getElementById('view-dashboard').classList.add('hidden');
    document.getElementById('view-dashboard').classList.remove('flex');
    document.getElementById('header-actions').classList.add('hidden');
    
    renderSoldiersGrid();

    if (pushHistory && history.state?.view !== 'search') {
        history.pushState({ view: 'search' }, '', window.location.pathname);
    }
}

function openSearchModal() {
    if (history.state && history.state.view === 'dashboard') {
        history.back(); // מעבר אחורה בהיסטוריה יריץ את אירוע popstate
    } else {
        showSearchScreen(true);
    }
}

function selectSoldierById(id) {
    const soldier = SOLDIERS_DATA.find(s => s.id === id);
    if (soldier) {
        selectSoldier(soldier, true);
    }
}

function selectSoldier(soldier, pushHistory = true) {
    currentSoldier = soldier;
    localStorage.setItem(STORAGE_KEY, soldier.id);

    if (pushHistory) {
        history.pushState({ view: 'dashboard', soldierId: soldier.id }, '', '#soldier');
    }

    // סגירת מקלדת בנייד בעת בחירה
    if (document.activeElement) {
        document.activeElement.blur();
    }

    document.getElementById('autocomplete-list').classList.add('hidden');
    document.getElementById('view-search').classList.add('hidden');
    document.getElementById('view-search').classList.remove('flex');
    
    document.getElementById('view-dashboard').classList.remove('hidden');
    document.getElementById('view-dashboard').classList.add('flex');
    document.getElementById('header-actions').classList.remove('hidden');

    renderDashboard();
}

// האזנה לכפתור חזרה בדפדפן / בנייד
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.view === 'dashboard' && event.state.soldierId) {
        const soldier = SOLDIERS_DATA.find(s => s.id === event.state.soldierId);
        if (soldier) {
            selectSoldier(soldier, false);
        } else {
            showSearchScreen(false);
        }
    } else {
        showSearchScreen(false);
    }
});

// ==========================================
// סינון וחיפוש חיילים
// ==========================================

function filterTeam(team, btnElement = null) {
    selectedTeamFilter = team;
    
    document.querySelectorAll('#team-filter-buttons button').forEach(btn => {
        btn.classList.remove('bg-brand-600', 'text-white');
        btn.classList.add('bg-slate-800', 'text-slate-300');
    });

    const target = btnElement || (window.event ? window.event.currentTarget : null);
    if (target) {
        target.classList.remove('bg-slate-800', 'text-slate-300');
        target.classList.add('bg-brand-600', 'text-white');
    }

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
                        ${s.firstName ? s.firstName[0] : ''}
                    </div>
                    <span class="text-sm font-medium text-white">${highlightMatch(s.fullName, query)}</span>
                </div>
                <span class="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded">צוות ${s.team}</span>
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
                ${s.firstName ? s.firstName[0] : ''}${s.lastName ? s.lastName[0] : ''}
            </div>
            <div class="flex-1 min-w-0">
                <div class="text-xs font-semibold text-white truncate">${s.fullName}</div>
                <div class="text-[10px] text-slate-400">מחלקה ${s.team}</div>
            </div>
        </button>
    `).join('');
}

// ==========================================
// תצוגת דשבורד וסטטיסטיקה
// ==========================================

function renderDashboard() {
    if (!currentSoldier) return;

    document.getElementById('soldier-name').textContent = currentSoldier.fullName;
    document.getElementById('soldier-team').textContent = `מחלקה ${currentSoldier.team}`;
    document.getElementById('soldier-avatar').textContent = `${currentSoldier.firstName ? currentSoldier.firstName[0] : ''}${currentSoldier.lastName ? currentSoldier.lastName[0] : ''}`;

    const currentStatus = currentSoldier.schedule[TODAY_INDEX] || 'ללא נתון';
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
        renderMonthCalendar();
    } else {
        renderTimeline();
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
        renderMonthCalendar();
    } else {
        renderTimeline();
    }
}

function switchView(mode) {
    currentViewMode = mode;

    const timeline = document.getElementById('timeline-container');
    const month = document.getElementById('month-container');

    const listBtn = document.getElementById('view-btn-list');
    const monthBtn = document.getElementById('view-btn-month');

    if (mode === 'month') {
        timeline.classList.add('hidden');
        month.classList.remove('hidden');

        listBtn.classList.remove('bg-brand-600', 'text-white', 'font-semibold');
        listBtn.classList.add('text-slate-400');

        monthBtn.classList.add('bg-brand-600', 'text-white', 'font-semibold');
        monthBtn.classList.remove('text-slate-400');

        renderMonthCalendar();
    } else {
        timeline.classList.remove('hidden');
        month.classList.add('hidden');

        monthBtn.classList.remove('bg-brand-600', 'text-white', 'font-semibold');
        monthBtn.classList.add('text-slate-400');

        listBtn.classList.add('bg-brand-600', 'text-white', 'font-semibold');
        listBtn.classList.remove('text-slate-400');

        renderTimeline();
    }
}

// ==========================================
// רינדור לוח חודשי וטיימליין
// ==========================================

function renderMonthCalendar() {
    const container = document.getElementById('month-container');
    if (!currentSoldier) return;

    const months = [...new Set(DATES_LIST.map(d => d.month))];
    let html = '';

    const monthNames = { '09': 'ספטמבר', '10': 'אוקטובר' };
    const weekdayHeaders = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];

    months.forEach(monthNumber => {
        const monthDates = DATES_LIST.filter(d => d.month === monthNumber);
        if (monthDates.length === 0) return;

        const year = 2026;
        const monthIndex = Number(monthNumber) - 1;
        const firstDate = new Date(year, monthIndex, 1);
        const firstDayOfWeek = firstDate.getDay();

        html += `
            <div class="glass-card rounded-2xl p-3 border-slate-800/80 mb-3">
                <div class="flex items-center justify-between mb-3 px-1">
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-xl bg-brand-600/20 text-brand-300 flex items-center justify-center">
                            <i class="fas fa-calendar-days text-xs"></i>
                        </div>
                        <div>
                            <div class="text-sm font-bold text-white">${monthNames[monthNumber] || monthNumber} ${year}</div>
                            <div class="text-[10px] text-slate-500">לוח יציאות</div>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 text-[9px]">
                        <div class="flex items-center gap-1 text-slate-400">
                            <span class="w-2 h-2 rounded-full bg-indigo-500"></span> בסיס
                        </div>
                        <div class="flex items-center gap-1 text-slate-400">
                            <span class="w-2 h-2 rounded-full bg-emerald-500"></span> בית
                        </div>
                    </div>
                </div>

                <div class="month-calendar mb-1">
                    ${weekdayHeaders.map(day => `<div class="month-weekday">${day}</div>`).join('')}
                </div>

                <div class="month-calendar">
        `;

        for (let i = 0; i < firstDayOfWeek; i++) {
            html += `<div class="month-day border-transparent bg-transparent"></div>`;
        }

        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

        for (let day = 1; day <= daysInMonth; day++) {
            const dateString = `${String(day).padStart(2, '0')}/${monthNumber}`;
            const dateIndex = DATES_LIST.findIndex(d => d.date === dateString);
            const hasData = dateIndex !== -1;
            const status = hasData ? (currentSoldier.schedule[dateIndex] || '') : '';
            const isToday = hasData && dateIndex === TODAY_INDEX;

            let hiddenByFilter = false;
            if (selectedStatusFilter === 'בסיס' && status !== 'בסיס') hiddenByFilter = true;
            if (selectedStatusFilter === 'בית' && status !== 'בית') hiddenByFilter = true;

            if (hiddenByFilter) {
                html += `
                    <div class="month-day month-day-empty opacity-30">
                        <span class="month-day-number">${day}</span>
                    </div>
                `;
                continue;
            }

            let dayClass = 'month-day month-day-empty';
            let statusText = '';

            if (status === 'בסיס') {
                dayClass = 'month-day month-day-base';
                statusText = 'בסיס';
            } else if (status === 'בית') {
                dayClass = 'month-day month-day-home';
                statusText = 'בית';
            } else if (status.trim() !== '') {
                dayClass = 'month-day month-day-special';
                statusText = status;
            }

            if (isToday) dayClass += ' month-day-today';

            html += `
                <div class="${dayClass}" ${hasData ? `id="month-date-${dateIndex}"` : ''}>
                    ${isToday ? `<span class="month-day-label">היום</span>` : ''}
                    <span class="month-day-number">${day}</span>
                    ${statusText ? `<span class="month-day-status">${statusText}</span>` : ''}
                </div>
            `;
        }

        html += `
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
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
                        <span class="text-[11px] text-slate-400">${dateObj.month === '09' ? 'ספטמבר' : 'אוקטובר'} 2026 תשפ"ז</span>
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

// ==========================================
// פעולות עזר (גלילה, שיתוף, טוסט)
// ==========================================

function scrollToToday() {
    setDisplayFilter('ALL');

    setTimeout(() => {
        const todayEl = currentViewMode === 'month'
            ? document.getElementById(`month-date-${TODAY_INDEX}`)
            : document.getElementById(`date-card-${TODAY_INDEX}`);

        if (todayEl) {
            todayEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            todayEl.classList.add('ring-2', 'ring-brand-400');

            setTimeout(() => {
                todayEl.classList.remove('ring-2', 'ring-brand-400');
            }, 1500);
        }
    }, 50);
}

async function shareWhatsApp() {
    if (!currentSoldier) return;

    let text = `📅 *לוח יציאות אישי - ${currentSoldier.fullName} (מחלקה ${currentSoldier.team})*\n\n`;
    
    DATES_LIST.forEach((d, i) => {
        const st = currentSoldier.schedule[i] || 'אין נתון';
        const icon = st === 'בסיס' ? '⛺' : (st === 'בית' ? '🏠' : '📌');
        text += `${d.date} (${d.day}): ${st} ${icon}\n`;
    });

    text += `\nנוצר באמצעות אפליקציית לוח יציאות אישי`;

    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
        } else {
            const dummy = document.createElement("textarea");
            document.body.appendChild(dummy);
            dummy.value = text;
            dummy.select();
            document.execCommand("copy");
            document.body.removeChild(dummy);
        }
        showToast("לוח היציאות הועתק! ניתן להדביק ב-WhatsApp");
    } catch (err) {
        showToast("שגיאה בהעתקת הנתונים");
    }
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
