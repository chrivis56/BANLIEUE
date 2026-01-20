// ---------------------------
// Versie 2 - script.js
// ---------------------------

const tasks = {
    openen: [
        { name: 'Kassa openen', info: 'Alles goed natellen, en openen volgens procedure.' },
        { name: 'Winkel openen', info: 'Deuren open, licht aan, muziek aan.' }
    ],
    dag: [
        { name: 'Aanvullen', info: 'Check of alles 3 items in de winkel heeft, zo niet vul aan van achter.' },
        { name: 'Stomen', info: 'Alle zichtbare kleding glad.' },
        { name: 'Hangers', info: 'Alle hangers met logo dezelfde kant op.' },
        { name: 'Prijsstickers', info: 'Check alle hangtags of er een prijs sticker op zit.' },
        { name: 'Kaartjes', info: 'Alle labels naar binnen.' },
        { name: 'Alarm', info: 'Elk item moet een alarm hebben.' },
        { name: 'Kassa netjes', info: 'Geen rommel, alles schoon.' },
        { name: 'Polybags', info: 'Alles in het magazijn moet in een zakje zitten, als je een product zonder zakje hebt geef dit door aan Nicole.' },
        { name: 'Kratten', info: 'Alles in juiste krat en netje op elkaar gesorteerd.' }
    ],
    sluiten: [
        { name: 'Transfers', info: 'Zijn alle transfers goed ingevoerd?' },
        { name: 'Kassa sluiten', info: 'Kas tellen en afsluiten volgens procedure.' },
        { name: 'iPad oplader', info: 'Zit de iPad aan de oplader?' },
        { name: 'Vuilniszakken', info: 'Alle volle zakken vervangen en bij de achterdeur onder de trap leggen.' },
        { name: 'Kassa schoon', info: 'Balie en scherm reinigen.' },
        { name: 'Omzet foto', info: 'Foto doorsturen.' },
        { name: 'Stofzuigen/Dweilen', info: 'Altijd stofzuigen en dweilen als het heeft geregend of vies is.' },
        { name: 'Airco uit', info: 'Controleer of alle airco uit staat.' }
    ]
};

// Progress element
const progressEl = document.getElementById('progress');

// ---------------------------
// Render Column Function
// ---------------------------
function renderColumn(taskList, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // clear previous

    taskList.forEach(task => {
        const card = document.createElement('div');
        card.className = 'task-card';
        if(task.special) card.classList.add('special-task');

        const title = document.createElement('label');
        title.className = 'task-title';
        title.innerText = task.name;

        const infoBtn = document.createElement('div');
        infoBtn.className = 'info-btn';
        infoBtn.innerText = '?';

        infoBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            alert(task.info);
        });

        card.addEventListener('click', () => {
            card.classList.toggle('completed');
            updateProgress();
        });

        card.appendChild(title);
        card.appendChild(infoBtn);
        container.appendChild(card);
    });
}

// ---------------------------
// Render Dag Column met VM taak
// ---------------------------
function renderDagColumn() {
    const container = document.getElementById('tasks-dag');
    container.innerHTML = '';

    const today = new Date();
    const dayOfWeek = today.getDay(); // 1 = maandag
    const weekNumber = getWeekNumber(today); // ISO weeknummer
    const isVMday = (dayOfWeek === 1) && (weekNumber % 2 === 0);

    let dagTasks = [...tasks.dag];

    if(isVMday) {
        dagTasks.unshift({
            name: 'VM',
            info: 'Speciale taak: Voormiddag check',
            special: true
        });
    }

    dagTasks.forEach(task => {
        const card = document.createElement('div');
        card.className = 'task-card';
        if(task.special) card.classList.add('special-task');

        const title = document.createElement('label');
        title.className = 'task-title';
        title.innerText = task.name;

        const infoBtn = document.createElement('div');
        infoBtn.className = 'info-btn';
        infoBtn.innerText = '?';

        infoBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            alert(task.info);
        });

        card.addEventListener('click', () => {
            card.classList.toggle('completed');
            updateProgress();
        });

        card.appendChild(title);
        card.appendChild(infoBtn);
        container.appendChild(card);
    });
}

// ---------------------------
// ISO Week Number
// ---------------------------
function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d - yearStart) / 86400000) + 1)/7);
}

// ---------------------------
// Update Progress
// ---------------------------
function updateProgress() {
    const done = document.querySelectorAll('.task-card.completed').length;
    const total = document.querySelectorAll('.task-card').length;
    progressEl.innerText = `${done}/${total} klaar`;

    const today = new Date().toISOString().slice(0,10);
    if(done === total) localStorage.setItem(`day-${today}`, 'complete');
    else localStorage.setItem(`day-${today}`, 'incomplete');
}

// ---------------------------
// Render Columns
// ---------------------------
renderColumn(tasks.openen, 'tasks-openen');
renderDagColumn();
renderColumn(tasks.sluiten, 'tasks-sluiten');
updateProgress();

// ---------------------------
// Notities
// ---------------------------
const notesField = document.getElementById('daily-notes');
const todayKey = new Date().toISOString().slice(0,10);
if(notesField) {
    notesField.value = localStorage.getItem(`notes-${todayKey}`) || '';
    notesField.addEventListener('input', () => {
        localStorage.setItem(`notes-${todayKey}`, notesField.value);
    });
}

// ---------------------------
// Planning knop
// ---------------------------
document.getElementById('agenda-btn').addEventListener('click', () => {
    const today = new Date();
    const todayKey = today.toISOString().slice(0,10);

    let html = `
        <html>
        <head>
            <title>Planning</title>
            <style>
                body { font-family: Arial; padding: 20px; }
                h2 { text-align: center; }
                .calendar { display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px; margin-top:20px; }
                .day { padding: 12px; border-radius: 8px; text-align: center; cursor: pointer; }
                .complete { background-color: #c8f7c5; }
                .incomplete { background-color: #f7c5c5; }
                .future { background-color: #f0f0f0; color: #888; cursor: default; }
                .today { border: 2px solid #333; }
                textarea { width: 100%; min-height: 80px; margin-top: 10px; font-size: 1rem; padding: 5px; }
                button { margin-top: 5px; padding: 5px 10px; font-size: 0.9rem; }
            </style>
        </head>
        <body>
            <h2>Planning: laatste 30 dagen en komende 30 dagen</h2>
            <div class="calendar"></div>
            <div id="notes-section">
                <h3>Notities van geselecteerde dag</h3>
                <textarea id="popup-notes" placeholder="Typ hier notities..."></textarea>
                <button id="save-notes">Opslaan</button>
            </div>
        </body>
        </html>
    `;

    const popup = window.open('', 'Planning', 'width=700,height=600');
    popup.document.write(html);

    popup.onload = () => {
        const calendarEl = popup.document.querySelector('.calendar');
        const notesField = popup.document.getElementById('popup-notes');
        const saveBtn = popup.document.getElementById('save-notes');
        let selectedDateKey = null;

        // Bouw kalender
        for(let i=-30; i<=30; i++){
            const date = new Date();
            date.setDate(today.getDate() + i);
            const key = date.toISOString().slice(0,10);

            const status = localStorage.getItem(`day-${key}`);
            const isComplete = status==='complete';
            const isFuture = date>today;
            const isToday = key===todayKey;

            let className = '';
            let symbol = '';

            if(isComplete){ className='complete'; symbol='✅'; }
            else if(isFuture){ className='future'; symbol=''; }
            else{ className='incomplete'; symbol='❌'; }

            if(isToday) className += ' today';

            const dayEl = popup.document.createElement('div');
            dayEl.className = `day ${className}`;
            dayEl.dataset.date = key;
            dayEl.innerHTML = `${date.getDate()}/${date.getMonth()+1}<br>${symbol}`;

            // Klik op dag
            if(!isFuture){
                dayEl.addEventListener('click', () => {
                    selectedDateKey = key;
                    notesField.value = localStorage.getItem(`notes-${key}`) || '';
                });
            }

            calendarEl.appendChild(dayEl);
        }

        // Notities opslaan
        saveBtn.addEventListener('click', () => {
            if(selectedDateKey){
                localStorage.setItem(`notes-${selectedDateKey}`, notesField.value);
                alert(`Notities voor ${selectedDateKey} opgeslagen!`);
            } else {
                alert('Selecteer eerst een dag in de kalender!');
            }
        });
    };
});
