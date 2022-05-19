import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import Home from './Home';
import { HashRouter, Routes, Route } from 'react-router-dom';
import PokemonPage from './components/pokemon-page';
import About from './About';
import { ITracker } from './types/ITracker';
import tracker from './tracker.json'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const flatMetadata: {[key: string]: ITracker} = tracker as unknown as {[key: string]: ITracker}

root.render(
<React.StrictMode>
<HashRouter>
        <Routes>
        <Route path='/' element={<Home metadata={flatMetadata}/>}/>
        {Object.keys(flatMetadata).map(k=>k.split('/').length <= 1 ? <Route key={k} path={`/${k}`} element={<PokemonPage infoKey={k} info={flatMetadata[k]}/>}/> : null)}
        <Route path='/About' element={<About/>}/>
        </Routes>
    </HashRouter>
</React.StrictMode>)