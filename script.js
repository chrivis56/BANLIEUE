window.onload = () => {

const tasks = {
    openen: ['Kassa openen', 'Winkel openen'],
    dag: ['Aanvullen', 'Stomen', 'Hangers', 'Prijsstickers', 'Kaartjes', 'Alarm'],
    sluiten: ['Kassa sluiten', 'Omzet foto', 'Airco uit']
};

function render(list, id) {
    const el = document.getElementById(id);
    el.innerHTML = '';
    list.forEach(name => {
        const div = document.createElement('div');
        div.className = 'task-card';
        div.innerText = name;
        el.appendChild(div);
    });
}

render(tasks.openen, 'tasks-openen');
render(tasks.dag, 'tasks-dag');
render(tasks.sluiten, 'tasks-sluiten');

document.getElementById('agenda-btn').onclick = () => {
    window.open('planning.html', '_blank');
};

};
