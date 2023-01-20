import React from 'react';

import { Link } from 'react-router-dom';


import DataService from './DataService';

function resetData() {
    DataService.resetData();
}

export default function HomeView() {
    let categories = DataService.getData();
    let categoryItems = categories.map((category) => <div><Link to={"/" + DataService.urlize(category.name)} key={category.name}>{category.name}</Link></div>);
    return (
        <div>
            <div key='categoryContainer'>{categoryItems}</div>
            <div>.</div>
            <button key='resetContainer' onClick={resetData}>Reset Data</button>
        </div>
    );
}