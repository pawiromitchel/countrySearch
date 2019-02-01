let countryJSON = [];

function setCountryInfo(country) {
    if (country) {
        document.getElementById('capital').value = country.capital;
        document.getElementById('timezone').value = country.timezones[0];
        document.getElementById('language').value = country.languages[0].name;
        document.getElementById('currency').value = country.currencies[0].name;

        const borders = document.getElementById('borders');
        borders.innerHTML = '';

        country.borders.forEach((border, index) => {
            const html = `<li>${border}</li>`;
            borders.innerHTML += html;
        });

        // assign flag
        document.getElementById('flag').setAttribute('src', country.flag);

        const regionals = document.getElementById('regionals');
        regionals.innerHTML = '';

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
