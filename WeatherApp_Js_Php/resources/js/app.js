import debounce from 'lodash.debounce';

const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

const loadPlaceForecast = async matchCode => {
    const loadData = document.getElementById('some-info');

    const response = await fetch(`/weather/long-term/${matchCode}`);
    const citiesInfo = await response.json();

    for (let i = 0; i < citiesInfo.forecastTimestamps.length; i++) {

        let dateAndTime = citiesInfo.forecastTimestamps[i].forecastTimeUtc;
        dateAndTime = dateAndTime.substring(0, dateAndTime.length - 3);

        let div = document.createElement('div');
        div.classList.add('card', 'bg-secondary', 'mb-3');
        div.style.width = "11.6rem";
        div.style.height = "13.5rem";
        let div2 = document.createElement('div')
        div2.classList.add('card-header');
        div2.innerText = dateAndTime;
        let div3 = document.createElement('div');
        div3.classList.add('card-body');
        let h3 = document.createElement('h3');
        h3.classList.add('card-title');

        if (Number(citiesInfo.forecastTimestamps[i].airTemperature) > 0) {
            h3.style.color = "darkred";
        } else {
            h3.style.color = "darkblue";
        }

        h3.innerText = Math.floor(citiesInfo.forecastTimestamps[i].airTemperature) + String.fromCharCode(176) + 'C';
        let p = document.createElement('p');
        p.classList.add('card-text');
        p.innerText = 'Debesuotumas: ' + citiesInfo.forecastTimestamps[i].cloudCover + String.fromCharCode(37);
        let p2 = document.createElement('p');
        p2.classList.add('card-text');
        p2.innerText = 'Vėjo greitis: ' + citiesInfo.forecastTimestamps[i].windSpeed + 'm/s';
        let p3 = document.createElement('p');
        p3.classList.add('card-text');
        p3.innerText = 'Drėgnumas: ' + citiesInfo.forecastTimestamps[i].relativeHumidity + String.fromCharCode(37);

        div.appendChild(div2);
        div.appendChild(div3);
        div3.appendChild(h3);
        div3.appendChild(p);
        div3.appendChild(p2);
        div3.appendChild(p3);
        loadData.appendChild(div);
    }
}

const searchCity = async searchText => {

    const response = await fetch('/weather/places');
    const cities = await response.json();

    matchList.innerHTML = '';

    let matches = cities.filter(city => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return city.name.match(regex) || city.code.match(regex);
    });

    matches = matches.slice(0, 5);

    for (let match of matches) {
        let button = document.createElement('button');

        button.addEventListener('click', function () {
            button.classList.add('active');

            setTimeout(() => {
                matchList.innerHTML = '';
            }, 100);

            search.value = match.name;
            loadPlaceForecast(match.code);
        });

        button.classList.add('list-group-item', 'list-group-item-action');
        button.innerText = match.name;
        matchList.appendChild(button);

        if (searchText.length === 0) {
            match = [];
            matchList.innerHTML = '';
        }
    }

    document.getElementById('some-info').innerHTML = "";
}

search.addEventListener('input', debounce(() => {
    searchCity(search.value).then(r => search.value)
}, 100));