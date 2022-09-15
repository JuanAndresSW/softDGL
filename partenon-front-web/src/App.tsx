import React, { Suspense, lazy, useEffect, useState } from "react";
import {SplashScreen, Error404} from 'components/standalone';
import getSessionByToken from 'services/getSessionByToken';
import { Navigate, Route, Routes } from "react-router-dom";

const Home =    lazy(() => import('pages/Home/Home'));
const SignUp =  lazy(() => import('pages/SignUp/SignUp'));
const Login =   lazy(() => import('pages/Login/Login'));
const Museum =  lazy(() => import('pages/Museum/Museum'));

/**Application's global component.*/
export default function App(): JSX.Element {

    const [auth, setAuth] = useState(undefined);

    useEffect(()=> {tryGettingAuthorization()}, []);

    async function tryGettingAuthorization() {
        const response = await getSessionByToken();
        setAuth(response.ok);
    }


    return auth === undefined ? <SplashScreen /> :
        
    <Suspense fallback={<SplashScreen />}>
        <Routes>

            <Route index                element={true? <Museum/>:<Home auth={auth} />} />
            <Route path="/registrarse"  element={<SignUp/>} /> 
            <Route path="/ingresar"     element={!auth? <Login/>: <Navigate to="/"/>} />
            <Route path=":museum"       element={<Museum />} />     

        </Routes>
    </Suspense>
}