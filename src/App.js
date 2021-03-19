import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import MainNavbar from './components/MainNavbar'
import Routes from './components/Routes'

const App = () => {

    console.log('Welcome to connect client 🔥')

    return (
        <div>
            <Router>
                <MainNavbar />
                <Routes />
            </Router>

        </div>
    )
}

export default App
