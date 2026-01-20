// Huidige datum
const today = new Date();
const todayKey = today.toISOString().slice(0,10);

// Elementen
const calendarEl = document.querySelector('.calendar');
const notesField = document.getElementById('popup-notes');
const saveBtn = document.getElementById('save-notes');

let selectedDateKey = null;

// Kalender vullen: 30 dagen terug + 30 dagen vooruit
for(let i=-30; i<=30; i++){
    const date = new Date();
    date.setDate(today.getDate() + i);
    const key = date.toISOString().slice(0,10);

    // Status ophalen
    const status = localStorage.getItem(`day-${key}`);
    const isComplete = status === 'complete';
    const isFuture = date > today;
    const isToday = key === todayKey;

    // CSS classes en symbolen
    let className = '';
    let symbol = '';

    if(isComplete){ className = 'complete'; symbol = '✅'; }
    else if(isFuture){ className = 'future'; symbol = ''; }
    else { className = 'incomplete'; symbol = '❌'; }

    if(isToday) className += ' today';

    // Dag-element maken
    const dayEl = document.createElement('div');
    dayEl.className = `day ${className}`;
    dayEl.dataset.date = key;
    dayEl.innerHTML = `${date.getDate()}/${date.getMonth()+1}<br>${symbol}`;

    // Klikbaar voor verleden/today dagen
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
