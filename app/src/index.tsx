import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import tracker from './types/tracker.json';
import { Convert } from './types/ITracker';
import PokemonPage from './components/pokemon-page';

const metadata = Convert.toITracker(JSON.stringify(tracker));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            {Object.keys(metadata).map(k=><Route key={k} path={`/${k}`} element={<PokemonPage infoKey={k} info={metadata[k]}/>}/>)}
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
