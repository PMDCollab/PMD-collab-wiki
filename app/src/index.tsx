import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import Home from './Home';
import { HashRouter, Routes, Route } from 'react-router-dom';
import PokemonPage from './components/pokemon-page';
import About from './About';
import { CDN_URL, CreditInformation, ICreditNames } from './types/enum';
import { ITracker } from './types/ITracker';
import DataFrame from 'dataframe-js';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const flatMetadata: {[key: string]: ITracker} = {}
const mappedCredits = new Map<string,CreditInformation>()

fetch(`${CDN_URL}/tracker.json`)
.then(res=>res.json())
.then(tracker =>{
    const metadata = tracker as { [key: string]: ITracker }

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
})
.then(()=> DataFrame.fromText(`${CDN_URL}/credit_names.txt`,'\t',true))
.then(df=> df.toDict())
.then((dict: ICreditNames)=>{
    for (let i = 0; i < dict.Discord.length; i++) {
        mappedCredits.set(dict.Discord[i],{discord: dict.Discord[i], name: dict.Name[i], contact:dict.Contact[i]})
    }
})
.then(()=>{
    root.render(
        <React.StrictMode>
        <HashRouter>
                <Routes>
                <Route path='/' element={<Home metadata={flatMetadata} mappedCredits={mappedCredits}/>}/>
                {Object.keys(flatMetadata).map(k=><Route key={k} path={`/${k}`} element={<PokemonPage infoKey={k} info={flatMetadata[k]} mappedCredits={mappedCredits}/>}/>)}
                <Route path='/About' element={<About/>}/>
                </Routes>
            </HashRouter>
        </React.StrictMode>)
})
