import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import Home from './Home';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Convert } from './types/ITracker';
import PokemonPage from './components/pokemon-page';
import About from './About';
import { CDN_URL } from './types/enum';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

fetch(`${CDN_URL}/tracker.json`)
.then(res=>res.json())
.then(tracker=>{
  const metadata = Convert.toITracker(JSON.stringify(tracker));
  root.render(
    <React.StrictMode>
      <HashRouter>
            <Routes>
              <Route path='/' element={<Home metadata={metadata}/>}/>
              {Object.keys(metadata).map(k=><Route key={k} path={`/${k}`} element={<PokemonPage infoKey={k} info={metadata[k]}/>}/>)}
              <Route path='/About' element={<About/>}/>
            </Routes>
        </HashRouter>
    </React.StrictMode>
  )
})
