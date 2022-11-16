const fs = require('fs');
const XLSX = require('xlsx');


let xlsxFile = 'data/gamecorg.xlsx';
let jsonFile = 'data/gamecorg.json';


let stringJson = getStringJson(xlsxFile);

fs.writeFile(jsonFile, stringJson, function (err) {
    if (err) {
        console.log('Error writing file');
        console.log(err);
    } else {
        console.log('No error writing file');
    }
});


function getStringJson(xlsxFile) {
    let workbook = XLSX.readFile(xlsxFile);

    let datum = [];

    for (let sheetsKey in workbook.Sheets) {

        let distinctValues = {};

        let sheetValue = workbook.Sheets[sheetsKey];
        for (let cellReference in sheetValue) {
            let text = sheetValue[cellReference].v;
            if (text) {
                distinctValues[text] = true;
            }
        }

        let data = {name: sheetsKey, values: distinctValues};
        datum.push(data);
    }

    return JSON.stringify(datum);
}