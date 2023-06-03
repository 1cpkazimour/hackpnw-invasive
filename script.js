let imageFilenamesPromise = fetch("/Image_Filenames.json").then(resp => {
    return resp.body.getReader().read();
}).then(body => {
    let textDecoder = new TextDecoder("utf-8");
    return JSON.parse(textDecoder.decode(body.value));
})

let plantsPromise = fetch("Counties/King.json").then(resp => {
    return resp.body.getReader().read();
}).then(body => {
    let textDecoder = new TextDecoder("utf-8");
    return JSON.parse(textDecoder.decode(body.value)).invasive_species;
});

Promise.all([imageFilenamesPromise, plantsPromise]).then(([imageFilenames, plants]) => {
    let dataTable = document.getElementById("data_table");
   
    for(plant of plants) {
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
})