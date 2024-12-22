import React from 'react';
import { Header, Footer, TitleScreen } from './components/';


/**Main 'welcome' view. Contains shortcuts to other views.*/
export default function Home({auth}: {auth: boolean}):JSX.Element {

    return <>  

        <Header auth={auth} />

        <TitleScreen />
        
        <Footer />
    </>
}