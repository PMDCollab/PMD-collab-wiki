import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import Home from './Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
    <BrowserRouter>
          <Routes>
            <Route path='/PMD-collab-wiki' element={<Home/>}/>
            {Object.keys(metadata).map(k=><Route key={k} path={`/PMD-collab-wiki/${k}`} element={<PokemonPage infoKey={k} info={metadata[k]}/>}/>)}
            <Route path='/PMD-collab-wiki/About' element={<About/>}/>
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
