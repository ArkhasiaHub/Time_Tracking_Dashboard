const url = './data.json';

function getReponseJson(response) {
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
}

function getStat(data, timeframe) {
    let title = data['title'];
    let {current, previous} = data['timeframes'][timeframe];
    return [title, current, previous];
}

function updateStat(stat) {
    const [id, current, previous] = stat;
    const component = document.getElementById(id.toLowerCase().replace(' ', '-'));
    const spanTimeFrame = component.querySelectorAll('span');
    spanTimeFrame[0].textContent = `${current}hrs`;
    spanTimeFrame[1].textContent = `Previous - ${previous}hrs`;
}

function parseData(data, timeFrame) {
    data.forEach((item) => {
        updateStat(getStat(item, timeFrame));
    });
}

export async function fetchData(timeframe) {
    try {
        const promise = await fetch(url);
        const json = await promise.json();
        parseData(json, timeframe);
    } catch (error) {
        console.error(`Error occured: ${error}`);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    fetchData('daily');
});
