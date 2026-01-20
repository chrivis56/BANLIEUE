const today = new Date();
const todayKey = today.toISOString().slice(0,10);

const calendarEl = document.querySelector('.calendar');
const notesField = document.getElementById('popup-notes');
const saveBtn = document.getElementById('save-notes');
let selectedDateKey = null;

// Bouw kalender: 30 dagen terug + 30 dagen vooruit
for(let i=-30; i<=30; i++){
    const date = new Date();
    date.setDate(today.getDate()+i);
    const key = date.toISOString().slice(0,10);

    const status = localStorage.getItem(`day-${key}`);
    const isComplete = status==='complete';
    const isFuture = date>today;
    const isToday = key===todayKey;

    let className='', symbol='';
    if(isComplete){ className='complete'; symbol='✅'; }
    else if(isFuture){ className='future'; symbol=''; }
    else{ className='incomplete'; symbol='❌'; }
    if(isToday) className += ' today';

    const dayEl = document.createElement('div');
    dayEl.className = `day ${className}`;
    dayEl.dataset.date = key;
    dayEl.innerHTML = `${date.getDate()}/${date.getMonth()+1}<br>${symbol}`;

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
        alert('Selecteer eerst een dag!');
    }
});
