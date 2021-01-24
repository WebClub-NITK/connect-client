import React from 'react'
import Navigation from './Navigation'
import Logo from '../assets/logo.png'
import toggel from '../components/Connect/Toggel'


const Home = () => {
    return (
        <div style={{width: '100vw', marginTop: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <img src={Logo} alt={'logo'} style={{objectFit: 'contain'}} />
            <h1>Connect</h1>
            <Navigation />
            <button type="submit" onClick={toggel}>Toggel</button>
        </div>
    )
}

export default Home
