// לוגיקת האפליקציה בלבד.
// כאן נמצאות החיפוש, הבחירה, הסינון, הרשימה, תצוגת החודש והשיתוף.

const STORAGE_KEY = "military_schedule_selected_soldier_id";
        let currentSoldier = null;
let selectedTeamFilter = "ALL";
let selectedStatusFilter = "ALL";
let currentViewMode = "list";

        // Calculate "Today" relative to dataset scope or real calendar date
        function getTodayIndex() {
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const formatted = `${day}/${month}`;
            
            const idx = DATES_LIST.findIndex(d => d.date === formatted);
            // If today falls outside dataset scope, pick nearest or default to index 1 (10/09)
            return idx !== -1 ? idx : 1; 
        }

        const TODAY_INDEX = getTodayIndex();

        // On Page Load Initialization
        window.addEventListener('DOMContentLoaded', () => {
            const savedSoldierId = localStorage.getItem(STORAGE_KEY);
            if (savedSoldierId) {
                const found = SOLDIERS_DATA.find(s => s.id === savedSoldierId);
                if (found) {
                    selectSoldier(found, false);
                    return;
                }
            }
            // Show search screen if no saved soldier
            showSearchScreen();
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
            
            // Update button styles
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

            // Render autocomplete list
            if (matches.length > 0) {
                autocompleteList.innerHTML = matches.map(s => `
                    <div onclick="selectSoldierById('${s.id}')" class="px-4 py-3 hover:bg-slate-800/80 cursor-pointer flex items-center justify-between transition">
                        <div class="flex items-center gap-2.5">
                            <div class="w-7 h-7 rounded-lg bg-brand-600/30 text-brand-300 flex items-center justify-center font-bold text-xs">
                                ${s.firstName[0]}
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
                showToast(`נבחר החייל: ${soldier.fullName}`);
            }

            // Close search modal / view
            document.getElementById('autocomplete-list').classList.add('hidden');
            document.getElementById('view-search').classList.add('hidden');
            document.getElementById('view-search').classList.remove('flex');
            
            // Show Dashboard
            document.getElementById('view-dashboard').classList.remove('hidden');
            document.getElementById('view-dashboard').classList.add('flex');
            document.getElementById('header-actions').classList.remove('hidden');

            renderDashboard();
        }

        function renderDashboard() {
            if (!currentSoldier) return;

            // Render Header Card info
            document.getElementById('soldier-name').textContent = currentSoldier.fullName;
            document.getElementById('soldier-team').textContent = `מחלקה ${currentSoldier.team}`;
            document.getElementById('soldier-avatar').textContent = `${currentSoldier.firstName[0]}${currentSoldier.lastName[0] || ''}`;

            // Current status calculation
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

            // Calculate Statistics
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

            // Calculate Upcoming Exit Date to Home
            calculateUpcomingExit();

            // Render current schedule view
if (currentViewMode === 'month') {
    renderMonthCalendar();
} else {
    renderTimeline();
}

        function calculateUpcomingExit() {
            let nextExitDate = null;
            let daysUntil = null;

            // Search forward from TODAY_INDEX for the first status transition to "בית"
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

             function renderMonthCalendar() {
    const container = document.getElementById('month-container');

    if (!currentSoldier) return;

    /*
     * The current dataset contains September and October 2026.
     * We create a calendar for every month represented in DATES_LIST.
     */

    const months = [...new Set(DATES_LIST.map(d => d.month))];

    let html = '';

    const monthNames = {
        '09': 'ספטמבר',
        '10': 'אוקטובר'
    };

    const weekdayHeaders = [
        'א',
        'ב',
        'ג',
        'ד',
        'ה',
        'ו',
        'ש'
    ];

    months.forEach(monthNumber => {

        const monthDates = DATES_LIST.filter(d => d.month === monthNumber);

        if (monthDates.length === 0) return;

        const year = 2026;
        const monthIndex = Number(monthNumber) - 1;

        // First day of the month
        const firstDate = new Date(year, monthIndex, 1);

        // JS: Sunday=0, Monday=1 ... Saturday=6
        const firstDayOfWeek = firstDate.getDay();

        html += `
            <div class="glass-card rounded-2xl p-3 border-slate-800/80 mb-3">

                <!-- Month Header -->
                <div class="flex items-center justify-between mb-3 px-1">

                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-xl bg-brand-600/20 text-brand-300 flex items-center justify-center">
                            <i class="fas fa-calendar-days text-xs"></i>
                        </div>

                        <div>
                            <div class="text-sm font-bold text-white">
                                ${monthNames[monthNumber] || monthNumber} 2026
                            </div>

                            <div class="text-[10px] text-slate-500">
                                לוח יציאות
                            </div>
                        </div>
                    </div>

                    <!-- Legend -->
                    <div class="flex items-center gap-2 text-[9px]">

                        <div class="flex items-center gap-1 text-slate-400">
                            <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                            בסיס
                        </div>

                        <div class="flex items-center gap-1 text-slate-400">
                            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                            בית
                        </div>

                    </div>

                </div>

                <!-- Weekday Headers -->
                <div class="month-calendar mb-1">
                    ${weekdayHeaders.map(day => `
                        <div class="month-weekday">${day}</div>
                    `).join('')}
                </div>

                <!-- Days -->
                <div class="month-calendar">
        `;

        // Empty cells before the first day
        for (let i = 0; i < firstDayOfWeek; i++) {
            html += `
                <div class="month-day border-transparent bg-transparent"></div>
            `;
        }

        /*
         * Create all days of the actual month.
         * Days outside the current dataset remain empty.
         */
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

        for (let day = 1; day <= daysInMonth; day++) {

            const dateString =
                `${String(day).padStart(2, '0')}/${monthNumber}`;

            const dateIndex =
                DATES_LIST.findIndex(d => d.date === dateString);

            const hasData = dateIndex !== -1;

            const status = hasData
                ? (currentSoldier.schedule[dateIndex] || '')
                : '';

            const isToday =
                hasData && dateIndex === TODAY_INDEX;

            // Apply status filter
            let hiddenByFilter = false;

            if (
                selectedStatusFilter === 'בסיס' &&
                status !== 'בסיס'
            ) {
                hiddenByFilter = true;
            }

            if (
                selectedStatusFilter === 'בית' &&
                status !== 'בית'
            ) {
                hiddenByFilter = true;
            }

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

            if (isToday) {
                dayClass += ' month-day-today';
            }

            html += `
                <div
                    class="${dayClass}"
                    ${hasData ? `id="month-date-${dateIndex}"` : ''}
                >

                    ${isToday ? `
                        <span class="month-day-label">היום</span>
                    ` : ''}

                    <span class="month-day-number">
                        ${day}
                    </span>

                    ${statusText ? `
                        <span class="month-day-status">
                            ${statusText}
                        </span>
                    ` : ''}

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

                // Apply Filter
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

        function scrollToToday() {
    setDisplayFilter('ALL');

    setTimeout(() => {

        let todayEl;

        if (currentViewMode === 'month') {
            todayEl = document.getElementById(`month-date-${TODAY_INDEX}`);
        } else {
            todayEl = document.getElementById(`date-card-${TODAY_INDEX}`);
        }

        if (todayEl) {

            todayEl.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });

            if (currentViewMode === 'month') {

                todayEl.classList.add('ring-2', 'ring-brand-400');

                setTimeout(() => {
                    todayEl.classList.remove(
                        'ring-2',
                        'ring-brand-400'
                    );
                }, 1500);

            } else {

                todayEl.classList.add(
                    'ring-2',
                    'ring-brand-400'
                );

                setTimeout(() => {
                    todayEl.classList.remove(
                        'ring-2',
                        'ring-brand-400'
                    );
                }, 1500);
            }
        }

    }, 50);
        }

        function shareWhatsApp() {
            if (!currentSoldier) return;

            let text = `📅 *לוח יציאות אישי - ${currentSoldier.fullName} (מחלקה ${currentSoldier.team})*\n\n`;
            
            DATES_LIST.forEach((d, i) => {
                const st = currentSoldier.schedule[i] || 'אין נתון';
                const icon = st === 'בסיס' ? '⛺' : (st === 'בית' ? '🏠' : '📌');
                text += `${d.date} (${d.day}): ${st} ${icon}\n`;
            });

            text += `נוצר באמצעות אפליקציית לוח יציאות אישי`;

            // Copy to Clipboard
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

}
