import React from 'react';
import './SplashScreen.css';
import logo from 'assets/svg/logo.svg';

/**
 * Pantalla de carga para cuando no es posible mostrar otro componente.
 */
export default function SplashScreen() {

    return (
        <div className='fallback'>
            <div><img src={logo} alt="" /></div>
        </div>
    );
}