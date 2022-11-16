import React from 'react';
import { useLocation, Link } from 'react-router-dom';

import './App.css';

let data = [{"name":"Horror Movies","values":{"Halloween":true,"Michael Myers":true,"Laurie Strode":true,"Jamie Lee Curtis":true,"John Carpenter":true,"The Texas Chain Saw Massacre":true,"Leatherface":true,"Gunnar Hansen":true,"Sally Hardesty":true,"Franklin Hardesty":true,"Friday the 13th":true,"Jason Voorhees":true,"Pamela Voorhees":true}},{"name":"Lord of the Rings","values":{"Frodo Baggins":true,"Bilbo Baggins":true,"Aragorn":true,"Samwise Gamgee":true,"Legolas":true,"Elijah Wood":true,"Viggo Mortensen":true,"Sean Astin":true,"Orlando Bloom":true,"Gandalf":true,"Ian McKellen":true}},{"name":"Star Wars","values":{"Luke Skywalker":true,"Darth Vader":true,"Leia Organa":true,"Han Solo":true,"Chewbacca":true,"R2-D2":true,"C-3P0":true,"Lando Calrissian":true,"Harrison Ford":true,"Mark Hamill":true,"James Earl Jones":true,"George Lucas":true}}];

function AppContainer() {
    let location = useLocation();
    if (location.pathname === "/") {
        return (
            <CategoryList categories={data}></CategoryList>
        );
    } else {
        return (
            <GameView categories={data} pathname={location.pathname}></GameView>
        )
    }
}

function CategoryList(props) {
    let categories = props.categories;
    let categoryItems = categories.map((category) => <div><Link to={urlize(category.name)} key={category.name}>{category.name}</Link></div>);
    return (
        <div key='categoryContainer'>{categoryItems}</div>
    );
}

function GameView(props) {
    let foundItem = findFromPath(props.categories, props.pathname);
    if (foundItem) {
        console.log(foundItem);
        return (
            <div>
                <div>whatup</div>
                <br></br>
                <div>_______________</div>
                <br></br>
                <div>
                    <span style={{fontSize: '100px'}}>❌</span><span style={{fontSize: '100px'}}>✅</span>
                </div>

            </div>
        );
    } else {
        return (
            <div>does not exist</div>
        );
    }
}

function findFromPath(data, pathname) {
    for (let i = 0; i < data.length; i++) {
        let urlized = urlize(data[i].name);
        if (urlized === pathname) {
            return data[i];
        }
    }
    return null;
}

function urlize(text) {
    return '/' + text.replaceAll(' ', '-').toLowerCase();
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <AppContainer></AppContainer>
        </div>
      </header>
    </div>
  );
}

export default App;
