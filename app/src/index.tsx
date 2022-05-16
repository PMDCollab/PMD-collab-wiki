import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import Home from './Home';
import { HashRouter, Routes, Route } from 'react-router-dom';
import PokemonPage from './components/pokemon-page';
import About from './About';
import { CDN_URL } from './types/enum';
import { ITracker } from './types/ITracker';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

fetch(`${CDN_URL}/tracker.json`)
.then(res=>res.json())
.then(tracker =>{
    const metadata = tracker as { [key: string]: ITracker }
    const flatMetadata: {[key: string]: ITracker} = {}

    function flattenMetadata(info: ITracker, infoKey: string, infoName: string){
        if(info.portrait_files && Object.keys(info.portrait_files).length > 0){
            flatMetadata[infoKey] = info
            flatMetadata[infoKey].name = infoName
        }
        if(info.subgroups){
            Object.keys(info.subgroups).forEach(s =>{
                const split = info.subgroups[s].name.split(' ').join(',').split('_').join(',').split(',')
                let name = ''
                split.forEach(spl => {if(!infoName.includes(spl)){name += ' ' + spl}})
                flattenMetadata(info.subgroups[s], `${infoKey}/${s}`, `${infoName} ${name}`)
            })
        }
    }

    Object.keys(metadata).forEach(k=>flattenMetadata(metadata[k],k, metadata[k].name))

    root.render(
        <React.StrictMode>
        <HashRouter>
                <Routes>
                <Route path='/' element={<Home metadata={flatMetadata}/>}/>
                {Object.keys(flatMetadata).map(k=><Route key={k} path={`/${k}`} element={<PokemonPage infoKey={k} info={flatMetadata[k]}/>}/>)}
                <Route path='/About' element={<About/>}/>
                </Routes>
            </HashRouter>
        </React.StrictMode>
    )
})
