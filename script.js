// --- Takenlijst ---
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

// --- Progress element ---
const progressEl = document.getElementById('progress');

// --- Taken renderen met persistentie ---
function renderColumn(taskList, containerId) {
    const container = document.getElementById(containerId);
    const todayKey = new Date().toISOString().slice(0,10);

    taskList.forEach(task => {
        const card = document.createElement('div');
        card.className = 'task-card';

        const title = document.createElement('label');
        title.innerText = task.name;

        const infoBtn = document.createElement('div');
        infoBtn.className = 'info-btn';
        infoBtn.innerText = '?';
        infoBtn.addEventListener('click', e => {
            e.stopPropagation();
            alert(task.info);
        });

        // --- Check localStorage voor deze taak
        const taskKey = `day-${todayKey}-task-${task.name}`;
        if(localStorage.getItem(taskKey) === 'completed'){
            card.classList.add('completed');
        }

        card.addEventListener('click', () => {
            card.classList.toggle('completed');

            // Opslaan in localStorage
            if(card.classList.contains('completed')){
                localStorage.setItem(taskKey, 'completed');
            } else {
                localStorage.setItem(taskKey, 'incomplete');
            }

            updateProgress();
        });

        card.appendChild(title);
        card.appendChild(infoBtn);
        container.appendChild(card);
    });
}

// --- Progress updaten ---
function updateProgress(){
    const done = document.querySelectorAll('.task-card.completed').length;
    const total = document.querySelectorAll('.task-card').length;
    progressEl.innerText = `${done}/${total} klaar`;
}

// --- Render alle kolommen ---
renderColumn(tasks.openen, 'tasks-openen');
renderColumn(tasks.dag, 'tasks-dag');
renderColumn(tasks.sluiten, 'tasks-sluiten');
updateProgress();

// --- Notities ---
const notesField = document.getElementById('daily-notes');
const todayKey = new Date().toISOString().slice(0,10);

if(notesField){
    notesField.value = localStorage.getItem(`notes-${todayKey}`) || '';

    notesField.addEventListener('input', () => {
        localStorage.setItem(`notes-${todayKey}`, notesField.value);
    });
}

// --- Planning knop ---
// --- Takenlijst ---
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

// --- Progress element ---
const progressEl = document.getElementById('progress');

// --- Taken renderen met persistentie ---
function renderColumn(taskList, containerId) {
    const container = document.getElementById(containerId);
    const todayKey = new Date().toISOString().slice(0,10);

    taskList.forEach(task => {
        const card = document.createElement('div');
        card.className = 'task-card';

        const title = document.createElement('label');
        title.innerText = task.name;

        const infoBtn = document.createElement('div');
        infoBtn.className = 'info-btn';
        infoBtn.innerText = '?';
        infoBtn.addEventListener('click', e => {
            e.stopPropagation();
            alert(task.info);
        });

        // --- Check localStorage voor deze taak
        const taskKey = `day-${todayKey}-task-${task.name}`;
        if(localStorage.getItem(taskKey) === 'completed'){
            card.classList.add('completed');
        }

        card.addEventListener('click', () => {
            card.classList.toggle('completed');

            // Opslaan in localStorage
            if(card.classList.contains('completed')){
                localStorage.setItem(taskKey, 'completed');
            } else {
                localStorage.setItem(taskKey, 'incomplete');
            }

            updateProgress();
        });

        card.appendChild(title);
        card.appendChild(infoBtn);
        container.appendChild(card);
    });
}

// --- Progress updaten ---
function updateProgress(){
    const done = document.querySelectorAll('.task-card.completed').length;
    const total = document.querySelectorAll('.task-card').length;
    progressEl.innerText = `${done}/${total} klaar`;
}

// --- Render alle kolommen ---
renderColumn(tasks.openen, 'tasks-openen');
renderColumn(tasks.dag, 'tasks-dag');
renderColumn(tasks.sluiten, 'tasks-sluiten');
updateProgress();

// --- Notities ---
const notesField = document.getElementById('daily-notes');
const todayKey = new Date().toISOString().slice(0,10);

if(notesField){
    notesField.value = localStorage.getItem(`notes-${todayKey}`) || '';

    notesField.addEventListener('input', () => {
        localStorage.setItem(`notes-${todayKey}`, notesField.value);
    });
}

// --- Planning knop ---
document.getElementById('agenda-btn').addEventListener('click', () => {
    window.location.href = 'planning.html';
});

