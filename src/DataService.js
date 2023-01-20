
import gameCorgData from "./gamecorg.json";
class DataService {
    static rawData = gameCorgData;

    static getData() {
        var data = localStorage.getItem("data");
        if (!data) {
            this.setData(this.rawData);
            data = localStorage.getItem("data");
        }

        return JSON.parse(data);
    }

    static resetData() {
        localStorage.setItem("data", JSON.stringify(this.rawData));
    }

    static setData(data) {
        localStorage.setItem("data", JSON.stringify(data));
    }

    static setSpecificData(name, values) {
        var data = this.getData();
        for (var i = 0; i < data.length; i++) {
            if (data[i]["name"] === name) {
                data[i]["values"] = values;
            }
        }
        this.setData(data);
    }

    static resetSpecificData(name) {
        var data = this.rawData;
        for (var i = 0; i < data.length; i++) {
            if (data[i]["name"] === name) {
                this.setSpecificData(name, data[i]["values"]);
            }
        }
    }

    static urlize(text) {
        return text.replaceAll(' ', '-').toLowerCase();
    }

    static findFromParam(pathname) {
        var data = this.getData();

        for (let i = 0; i < data.length; i++) {
            let urlized = this.urlize(data[i].name);
            if (urlized === pathname) {
                return data[i];
            }
        }
        return null;
    }
}

export default DataService;