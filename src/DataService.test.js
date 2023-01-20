import DataService from './DataService';

var sampleData = [{"name": "Test", "values": ["1", "2", "3", "4", "5"]}, {"name": "Untouched", "values": []}];

test("resetData", () => {
    var originalData = DataService.getData();

    DataService.setData([]);

    expect(DataService.getData()).toEqual([]);

    DataService.resetData();

    expect(DataService.getData()).toEqual(originalData);
});

test("setSpecificData", () => {
    DataService.setData(sampleData);
    DataService.setSpecificData("Test", ["1", "5"]);
    expect(DataService.getData()).toEqual([{"name": "Test", "values": ["1", "5"]}, {"name": "Untouched", "values": []}]);
});