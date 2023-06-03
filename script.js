let data = fetch("/Parsed_Info.json").then(resp => {
    return resp.body.getReader().read();
}).then(body => {
    let textDecoder = new TextDecoder("utf-8");
    return JSON.parse(textDecoder.decode(body.value));
});

console.log(data)