/// Given a URL, return a promise to the JSON object at that URL
function getUrlJSONPromise(url) {
    return fetch(url).then(resp => resp.body.getReader().read()).then(body => {
        let textDecoder = new TextDecoder("utf-8");
        return JSON.parse(textDecoder.decode(body.value));
    });
}

let imageFilenamesPromise = getUrlJSONPromise("/Image_Filenames.json");
// let plantsPromise = getUrlJSONPromise("/Counties/King.json");
let zipCountyPromise = getUrlJSONPromise("/Zip_County.json");

function onSearch() {
    let zip = document.getElementById("zipinput").value;

    document.getElementById("data").classList.add("hidden");
    document.getElementById("data_table").innerHTML = "";

    zipCountyPromise.then(zipCounty => {
        let dataUrl = `/Counties/${zipCounty[zip]}.json`;
        return Promise.all([imageFilenamesPromise, getUrlJSONPromise(dataUrl)]); // [imageFilenames, plants]
    }).then(([imageFilenames, plants]) => {
        let dataTable = document.getElementById("data_table");
   
        for(plant of plants.invasive_species) {
            let imageUrl = `https://plants.sc.egov.usda.gov/ImageLibrary/standard/${imageFilenames[plant.code]}`;
    
            dataTable.insertAdjacentHTML('beforeend', `
                <tr>
                    <td><img src="${imageUrl}"></td>
                    <td>${plant.common_name}</td>
                    <td><i>${plant.scientific_name}</i></td>
                    <td>${plant.impact}</td>
                </tr>
            `);
        }
    
        document.getElementById("data").classList.remove("hidden");
    })
}