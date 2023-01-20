const fs = require('fs');
const XLSX = require('xlsx');


let xlsxFile = 'data/gamecorg.xlsx';
let jsonFile = 'src/gamecorg.json';


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

    let dataList = [];

    for (let sheetsKey in workbook.Sheets) {

        let distinctValues = {};

        let sheetValue = workbook.Sheets[sheetsKey];
        for (let cellReference in sheetValue) {
            let text = sheetValue[cellReference].v;
            if (text) {
                distinctValues[text] = true;
            }
        }

        let distinctValuesList = [];
        for (var k in distinctValues) {
            distinctValuesList.push(k);
        }

        let data = {name: sheetsKey, values: distinctValuesList};
        dataList.push(data);
    }

    return JSON.stringify(dataList);
}