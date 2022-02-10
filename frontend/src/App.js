import React, { Component } from 'react'
import Game from './components/state/Game'
import Logowanie from './components/state/Logowanie'
import Rejestracja from './components/state/Rejestracja'
import './App.css'
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'

class App extends Component {

    render() {
        return (
        <Router>
            <Routes>
            <Route exact path="/" element={<Logowanie/>}></Route>
            <Route exact path="/Rejestracja" element={<Rejestracja/>}></Route>
            <Route exact path="/game" element={<Game/>}></Route>
                


                
            
            </Routes>
        </Router>  

        );
    }
}
export default App;