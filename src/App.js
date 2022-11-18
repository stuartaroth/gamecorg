import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import _ from 'underscore';

import './App.css';

let data = [{"name":"Horror Movies","values":["Halloween","Michael Myers","Laurie Strode","Jamie Lee Curtis","John Carpenter","The Texas Chain Saw Massacre","Leatherface","Gunnar Hansen","Sally Hardesty","Franklin Hardesty","Friday the 13th","Jason Voorhees","Pamela Voorhees"]},{"name":"Lord of the Rings","values":["Frodo Baggins","Bilbo Baggins","Aragorn","Samwise Gamgee","Legolas","Elijah Wood","Viggo Mortensen","Sean Astin","Orlando Bloom","Gandalf","Ian McKellen"]},{"name":"Star Wars","values":["Luke Skywalker","Darth Vader","Leia Organa","Han Solo","Chewbacca","R2-D2","C-3P0","Lando Calrissian","Harrison Ford","Mark Hamill","James Earl Jones","George Lucas"]}];

function AppContainer() {
    let location = useLocation();
    if (location.pathname === "/") {
        return (
            <CategoryList categories={data}></CategoryList>
        );
    } else {
        return (
            <CheckIfValidView categories={data} pathname={location.pathname}></CheckIfValidView>
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

function CheckIfValidView(props) {
    let foundItem = findFromPath(props.categories, props.pathname);
    if (foundItem) {
        return (
            <GameView gameData={foundItem}></GameView>
        )
    } else {
        return (
            <InvalidView></InvalidView>
        )
    }
}

function InvalidView(props) {
    return (
        <div>Invalid request</div>
    )
}


class GameView extends React.Component {
    constructor(props) {
        super();
        let gameData = props.gameData;


        let currentWord = _.sample(gameData.values);
        let gameList = _.reject(gameData.values, (i) => i === currentWord);

        this.state = {
            gameList: gameList,
            resultList: [],
            currentWord: currentWord
        };

        console.log("should only happen once?");
        console.log(this.state);
    }

    correct() {
        console.log(this);
        let gameList = this.state.gameList;
        let currentWord = this.state.currentWord;
        let resultList = this.state.resultList;

        resultList.push({key: currentWord, correct: true});
        currentWord = _.sample(gameList);
        gameList = _.reject(gameList, (i) => i === currentWord);


        this.setState({
            gameList: gameList,
            resultList: [],
            currentWord: currentWord
        });
    }

    incorrect() {
        let gameList = this.state.gameList;
        let currentWord = this.state.currentWord;
        let resultList = this.state.resultList;

        resultList.push({key: currentWord, correct: false});
        currentWord = _.sample(gameList);
        gameList = _.reject(gameList, (i) => i === currentWord);


        this.setState({
            gameList: gameList,
            resultList: [],
            currentWord: currentWord
        });
    }

    render() {
        return (
            <div>
                <div>{this.state.currentWord}</div>
                <div>_______________</div>
                <br></br>
                <div>
                    <span onClick={this.incorrect} style={{fontSize: '60px'}}>❌</span><span onClick={this.correct} style={{fontSize: '60px'}}>✅</span>
                </div>

            </div>
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

class App extends React.Component {
    render() {
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
}

export default App;
