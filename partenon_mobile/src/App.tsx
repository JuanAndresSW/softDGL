import React, { Suspense, lazy } from "react";
import {SplashScreen} from 'components/standalone';
import { Route, Routes } from "react-router-dom";

const Home =    lazy(() => import('views/Home/Home'));
const Museum =  lazy(() => import('views/Museum/Museum'));

/**Application's global component.*/
export default function App(): JSX.Element {

    return <Suspense fallback={<SplashScreen />}>

        <Routes>

            <Route index      element={<Home />} />
            <Route path=":id" element={<Museum />} />     

        </Routes>

    </Suspense>
}