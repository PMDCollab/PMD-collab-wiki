import './style/app.css';
import "nes.css/css/nes.min.css";
import PokemonCarousel from './components/pokemon-carousel';
import Search from './components/search';
import { useState } from 'react';
import Buttons from './components/buttons';
import { ITracker } from './types/ITracker';
import { CreditInformation, RankMethod } from './types/enum';
import DisplayParameters from './components/display-parameters';

export default function Home(props:{metadata: {[key: string]: ITracker}, mappedCredits: Map<string, CreditInformation>}) {
    const [currentText, setCurrentText] = useState('');
    const [rankBy, setRankBy] = useState<RankMethod>(RankMethod.POKEDEX_NUMBER);
    const [showPortraitAuthor, setPortraitAuthor] = useState<boolean>(false);
    const [showSpriteAuthor, setSpriteAuthor] = useState<boolean>(false);
    const [showIndex, setShowIndex] = useState<boolean>(false);
    const [showLastModification, setShowLastModification] = useState<boolean>(false);


    return (
        <div className="App">
            <Buttons/>
            <div className='nes-container' style={{height:'90vh', backgroundColor:'rgba(255,255,255,0.85)', display:'flex', flexFlow:'column', alignItems:'center'}}>
                <div style={{display:'flex', width:'100%', alignContent:'center', alignItems:'center', justifyContent:'space-between'}}>
                  <DisplayParameters setSpriteAuthor={setSpriteAuthor} setPortraitAuthor={setPortraitAuthor} setShowIndex={setShowIndex} setShowLastModification={setShowLastModification}/>
                  <Search currentText={currentText} setCurrentText={setCurrentText}/>
                  <div className="nes-select is-inline" style={{display:'flex', alignItems:'center', width:'30%'}}>
                  <p style={{fontSize:'0.7em'}}>Rank by</p>
                  <select style={{borderWidth:'2px', height:'40px', fontSize:'0.7em'}} value={rankBy} id="default_select" onChange={e=>{setRankBy(e.target.value as RankMethod)}}>
                      {(Object.values(RankMethod) as RankMethod[]).map(r=><option style={{fontSize:'1.5em', fontFamily: "Press Start 2P"}} key={r} value={r}>{r}</option>)}
                  </select>
                  </div>
                </div>
                <PokemonCarousel 
                    currentText={currentText}
                    metadata={props.metadata}
                    rankBy={rankBy}
                    showPortraitAuthor={showPortraitAuthor}
                    showSpriteAuthor={showSpriteAuthor}
                    showIndex={showIndex}
                    showLastModification={showLastModification}
                    mappedCredits={props.mappedCredits}
                />
            </div>
        </div>
      )
}
