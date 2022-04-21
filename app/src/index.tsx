import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import Home from './Home';
import { HashRouter, Routes, Route } from 'react-router-dom';
import tracker from './types/tracker.json';
import { Convert } from './types/ITracker';
import PokemonPage from './components/pokemon-page';
import About from './About';

const metadata = Convert.toITracker(JSON.stringify(tracker));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            {Object.keys(metadata).map(k=><Route key={k} path={`/${k}`} element={<PokemonPage infoKey={k} info={metadata[k]}/>}/>)}
            <Route path='/About' element={<About/>}/>
          </Routes>
      </HashRouter>
  </React.StrictMode>
);
