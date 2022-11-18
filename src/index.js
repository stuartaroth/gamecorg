import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import './App.css';
import reportWebVitals from './reportWebVitals';

import CategoryView from './CategoryView';
import HomeView from './HomeView';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div className="App">
        <header className="App-header">
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path='/:category' element={<CategoryView />} />
                        <Route path='/' element={<HomeView />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </header>
    </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
