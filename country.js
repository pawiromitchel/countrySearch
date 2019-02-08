let countryJSON = [];
const regionals = document.getElementById('regionals');
const borders = document.getElementById('borders');
const borderBlock = document.getElementById('borderBlock');
borderBlock.style.display = 'none';

const flag = document.getElementById('flag');
flag.style.display = 'none';

const regionalsTable = document.getElementById('regionalsTable');
regionalsTable.style.display = 'none';


function init() {
    regionalsTable.style.display = 'block';
}

function setCountryInfo(country) {
    if (country) {
        document.getElementById('capital').value = country.capital;
        document.getElementById('timezone').value = country.timezones[0];
        document.getElementById('language').value = country.languages[0].name;
        document.getElementById('currency').value = country.currencies[0].name;

        borders.innerHTML = '';
        if (country.borders.length > 0) {
            borderBlock.style.display = 'block';
            country.borders.forEach((border, index) => {
                const html = `<li>${border}</li>`;
                borders.innerHTML += html;
            });
        } else {
            borderBlock.style.display = 'none';
        }

        // assign flag
        if (country.flag) {
            flag.style.display = 'block';
            flag.setAttribute('src', country.flag);
        } else {
            flag.style.display = 'none';
        }

        regionals.innerHTML = '';
        if (country.regionalBlocs.length > 0) {
            regionalsTable.style.display = 'inline-table';
            country.regionalBlocs.forEach((region, index) => {
                const html =
                    `
                    <tr>
                        <td>${region.acronym}</td>
                        <td>${region.name}</td>
                    </tr>
                `;

                regionals.innerHTML += html;
            });
        } else {
            regionalsTable.style.display = 'none';
        }

        renderMap(country.latlng, country.name);

    } else {
        alert("Country not found ðŸ˜¢");
    }
}

function makeCall(url, listener) {
    const oReq = new XMLHttpRequest();
    oReq.addEventListener("load", listener);
    oReq.open("GET", url);
    oReq.send();
}

function getCountryInfo() {
    const selectedCountry = countryJSON.find(country => country.name === document.getElementById('countries').value);
    setCountryInfo(selectedCountry);
}

makeCall(`https://restcountries.eu/rest/v2/all/`, fillDatalist);

function fillDatalist() {
    if (JSON.parse(this.responseText)[0]) {
        countryJSON = JSON.parse(this.responseText);

        const dataList = document.getElementById('countries');
        countryJSON.forEach((country, index) => {
            const data = `<option value="${country.name}">${country.name}</option>`;
            dataList.innerHTML += data;
        });
    }
}

var mymap = L.map('mapid');

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(mymap);

function renderMap(latlng, countryName) {

    const lat = latlng[0];
    const lng = latlng[1];

    mymap.setView([lat, lng], 5);

    L.marker([lat, lng]).addTo(mymap)
        .bindPopup(`${countryName}`).openPopup();
}
