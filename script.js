const todayKey = new Date().toISOString().slice(0, 10);

const tasks = {
    openen: [
        { name: 'Kassa openen', info: 'Alles goed natellen en openen volgens procedure.' },
        { name: 'Winkel openen', info: 'Deuren open, licht en muziek aan.' }
    ],
    dag: [
        { name: 'Aanvullen', info: 'Vul aan vanuit magazijn.' },
        { name: 'Stomen', info: 'Zichtbare kleding glad.' },
        { name: 'Hangers', info: 'Alle hangers dezelfde kant op.' },
        { name: 'Prijsstickers', info: 'Elke hangtag heeft een sticker.' },
        { name: 'Kaartjes', info: 'Labels naar binnen.' },
        { name: 'Alarm', info: 'Alle items hebben alarm.' },
        { name: 'Kassa netjes', info: 'Balie schoon.' },
        { name: 'Polybags', info: 'Alles in polybags.' },
        { name: 'Kratten', info: 'Juiste krat, netjes gesorteerd.' }
    ],
    sluiten: [
        { name: 'Transfers', info: 'Transfers ingevoerd.' },
        { name: 'Kassa sluiten', info: 'Kas tellen en afsluiten.' },
        { name: 'iPad oplader', info: 'iPad aan oplader.' },
        { name: 'Vuilniszakken', info: 'Vervangen indien vol.' },
        { name: 'Kassa schoon', info: 'Balie reinigen.' },
        { name: 'Omzet foto', info: 'Foto doorgestuurd.' },
        { name: 'Stofzuigen/Dweilen', info: 'Indien nodig.' },
        { name: 'Airco uit', info: 'Alles uit.' }
    ]
};

const progressEl = document.getElementById('progress');

function renderColumn(list, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    list.forEach(task => {
        const key = `task-${todayKey}-${task.name}`;

        const card = document.createElement('div');
        card.className = 'task-card';

        if (localStorage.getItem(key) === 'done') {
            card.classList.add('completed');
        }

        const title = document.createElement('div');
        title.innerText = task.name;

        const info = document.createElement('div');
        info.className = 'info-btn';
        info.innerText = '?';
        info.onclick = e => {
            e.stopPropagation();
            alert(task.info);
        };

        card.onclick = () => {
            card.classList.toggle('completed');
            localStorage.setItem(key, card.classList.contains('completed') ? 'done' : 'open');
            updateProgress();
        };

        card.appendChild(title);
        card.appendChild(info);
        container.appendChild(card);
    });
}

function updateProgress() {
    const done = document.querySelectorAll('.task-card.completed').length;
    const total = document.querySelectorAll('.task-card').length;
    progressEl.innerText = `${done}/${total}`;

    localStorage.setItem(`day-${todayKey}`, done === total ? 'complete' : 'incomplete');
}

renderColumn(tasks.openen, 'tasks-openen');
renderColumn(tasks.dag, 'tasks-dag');
renderColumn(tasks.sluiten, 'tasks-sluiten');
updateProgress();

// Notities
const notes = document.getElementById('daily-notes');
notes.value = localStorage.getItem(`notes-${todayKey}`) || '';
notes.oninput = () => {
    localStorage.setItem(`notes-${todayKey}`, notes.value);
};

// Planning knop
document.getElementById('agenda-btn').onclick = () => {
    window.open('planning.html', '_blank');
};
