let data = fetch("/Parsed_Info.json").then(resp => {
    return resp.body.getReader().read();
}).then(body => {
    let textDecoder = new TextDecoder("utf-8");
    let plants = JSON.parse(textDecoder.decode(body.value)).invasive_species;

    let dataTable = document.getElementById("data_table");

    for(plant of plants) {
        dataTable.insertAdjacentHTML('beforeend', `
            <tr>
                <td><img src="${plant.picture_url}"></td>
                <td>${plant.common_name}</td>
                <td>${plant.scientific_name}</td>
                <td>${plant.impact}</td>
            </tr>
        `);
    }
});