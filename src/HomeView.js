import React from 'react';

import { Link } from 'react-router-dom';


import DataService from './DataService';

export default function HomeView() {
    let categories = DataService.getData();
    let categoryItems = categories.map((category) => <div><Link to={"/" + DataService.urlize(category.name)} key={category.name}>{category.name}</Link></div>);
    return (
        <div key='categoryContainer'>{categoryItems}</div>
    );
}