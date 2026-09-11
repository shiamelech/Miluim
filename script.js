// משתנה לשמירת הסטטוס הנוכחי (ברירת מחדל: רשימה)
let currentViewMode = 'list'; 

function switchView(viewMode) {
  currentViewMode = viewMode;

  const listContainer = document.getElementById('timeline-container'); // התאמה ל-ID המקורי בקוד שלך
  const monthContainer = document.getElementById('monthViewContainer');
  
  const listBtn = document.getElementById('listViewBtn');
  const monthBtn = document.getElementById('monthViewBtn');

  if (listBtn && monthBtn) {
    listBtn.classList.toggle('bg-slate-800', viewMode === 'list');
    listBtn.classList.toggle('text-white', viewMode === 'list');
    monthBtn.classList.toggle('bg-slate-800', viewMode === 'month');
    monthBtn.classList.toggle('text-white', viewMode === 'month');
  }

  if (viewMode === 'list') {
    if (listContainer) listContainer.classList.remove('hidden');
    if (monthContainer) monthContainer.classList.add('hidden');
    renderTimeline();
  } else {
    if (listContainer) listContainer.classList.add('hidden');
    if (monthContainer) monthContainer.classList.remove('hidden');
    renderMonthView();
  }
}

// פונקציה לרינדור תצוגת החודש המותאמת לנתוני החייל הנוכחי
function renderMonthView() {
  const monthContainer = document.getElementById('monthViewContainer');
  if (!monthContainer || !currentSoldier) return;

  monthContainer.innerHTML = '';

  // 1. כותרות ימי השבוע
  const daysOfWeek = ['א\'', 'ב\'', 'ג\'', 'ד\'', 'ה\'', 'ו\'', 'ש\''];
  daysOfWeek.forEach(day => {
    const header = document.createElement('div');
    header.className = 'text-center text-[11px] font-bold text-slate-400 pb-1';
    header.innerText = day;
    monthContainer.appendChild(header);
  });

  // 2. יצירת המשבצות עבור הימים מתוך DATES_LIST ולוח הזמנים של החייל
  DATES_LIST.forEach((dateObj, index) => {
    const status = currentSoldier.schedule[index] || '';
    const isToday = index === TODAY_INDEX;

    // החלת סינון סטטוס אם קיים (בסיס / בית)
    if (selectedStatusFilter === 'בסיס' && status !== 'בסיס') return;
    if (selectedStatusFilter === 'בית' && status !== 'בית') return;

    const card = document.createElement('div');
    
    let borderStyle = 'border-slate-800/80 bg-slate-900/50';
    if (isToday) {
      borderStyle = 'border-brand-500 ring-1 ring-brand-500/50 bg-slate-800/90';
    }

    let indicatorHtml = '';
    if (status === 'בסיס') {
      indicatorHtml = `<span class="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500/50"></span>`;
    } else if (status === 'בית') {
      indicatorHtml = `<span class="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></span>`;
    } else if (status.trim() !== '') {
      indicatorHtml = `<span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>`;
    }

    const dayNum = dateObj.date.split('/')[0];

    card.className = `glass-card ${borderStyle} rounded-xl p-1.5 min-h-[52px] flex flex-col justify-between items-center transition-all`;
    card.innerHTML = `
      <span class="text-xs font-bold ${isToday ? 'text-brand-400' : 'text-slate-200'}">${dayNum}</span>
      <div class="mt-1">${indicatorHtml}</div>
    `;

    monthContainer.appendChild(card);
  });
}
