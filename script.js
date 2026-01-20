const tasks = {
    openen: [
        { name: 'Kassa openen', info: 'Alles goed natellen, en openen volgens procedure.' },
        { name: 'Winkel openen', info: 'Deuren open, licht aan, muziek aan.' }
    ],
    dag: [
        { name: 'Aanvullen', info: 'Check of alles voldoende in de winkel staat.' },
        { name: 'Stomen', info: 'Alle zichtbare kleding glad.' },
        { name: 'Hangers', info: 'Alle hangers met logo dezelfde kant op.' },
        { name: 'Prijsstickers', info: 'Check alle hangtags of er een prijs sticker op zit.' },
        { name: 'Kaartjes', info: 'Alle labels naar binnen.' },
        { name: 'Alarm', info: 'Elk item moet een alarm hebben.' },
        { name: 'Kassa netjes', info: 'Geen rommel, alles schoon.' },
        { name: 'Polybags', info: 'Alles in juiste zakjes en krat.' },
        { name: 'Kratten', info: 'Alles in juiste krat en netjes gesorteerd.' }
    ],
    sluiten: [
        { name: 'Transfers', info: 'Zijn alle transfers bijgewerkt?' },
        { name: 'Kassa sluiten', info: 'Kas tellen en afsluiten.' },
        { name: 'iPad oplader', info: 'Zet iPad aan oplader.' },
        { name: 'Vuilniszakken', info: 'Vervang volle zakken.' },
        { name: 'Kassa schoon', info: 'Balie en scherm reinigen.' },
        { name: 'Omzet foto', info: 'Foto doorsturen.' },
        { name: 'Stofzuigen/Dweilen', info: 'Altijd stofzuigen en dweilen.' },
        { name: 'Airco uit', info: 'Controleer of alle airco uit staat.' }
    ]
};

const progressEl = document.getElementById('progress');
const todayKey = new Date().toISOString().slice(0,10);

function renderColumn(taskList, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    taskList.forEach(task => {
        const card = document.createElement('div');
        card.className = 'task-card';
        card.innerText = task.name;

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

        card.appendChild(infoBtn);
        container.appendChild(card);
    });
}

function updateProgress() {
    const allTasks = document.querySelectorAll('.task-card');
    const doneTasks = document.querySelectorAll('.task-card.completed');

    progressEl.innerText = `${doneTasks.length}/${allTasks.length}`;

    if (allTasks.length > 0 && doneTasks.length === allTasks.length) {
        localStorage.setItem(`day-${todayKey}`, 'complete');
    } else {
        localStorage.setItem(`day-${todayKey}`, 'incomplete');
    }
}

renderColumn(tasks.openen, 'tasks-openen');
renderColumn(tasks.dag, 'tasks-dag');
renderColumn(tasks.sluiten, 'tasks-sluiten');
updateProgress();

// Notities
const notesField = document.getElementById('daily-notes');
notesField.value = localStorage.getItem(`notes-${todayKey}`) || '';
notesField.addEventListener('input', () => {
    localStorage.setItem(`notes-${todayKey}`, notesField.value);
});

// Planning knop
document.getElementById('agenda-btn').addEventListener('click', () => {
    window.open('planning.html', '_blank');
});
