import { fetchData } from "./fetch_data.js";

const timeframeList = document.getElementById('timeframe-list');
const buttons = timeframeList.querySelectorAll('.profile-report button');

function removeCurrentTimeFrame() {
    const timeFrame = document.querySelector('.selected-timeframe');
    timeFrame.classList.remove('selected-timeframe');
}

function addSelectedTimeFrame(i) {
    const timeFrame = document.querySelectorAll('.profile-report li');
    timeFrame[i].classList.add('selected-timeframe');
}

function getSelectedLiChild(id) {
    switch (id) {
        case 'button-daily': return [0, 'daily'];
        case 'button-weekly': return [1, 'weekly'];
        case 'button-monthly': return [2, 'monthly'];
    }
}

async function handle_button(e) {
    buttons.forEach(b => {
        b.setAttribute('aria-selected', false);
        b.setAttribute('tabindex', -1);
    });
    
    e.target.setAttribute('aria-selected', true);
    e.target.setAttribute('tabindex', 0);

    const [selectedLiChild, timeframe] = getSelectedLiChild(e.target.id);
    removeCurrentTimeFrame();
    addSelectedTimeFrame(selectedLiChild);
    await fetchData(timeframe);
}

buttons.forEach(function(button) { 
    button.addEventListener('click', handle_button); 
});