import './style/app.css';
import "nes.css/css/nes.min.css";
import PokemonCarousel from './components/pokemon-carousel';
import Search from './components/search';
import { useState } from 'react';
import Buttons from './components/buttons';
import { ITracker } from './types/ITracker';
import { RankMethod } from './types/enum';

export default function Home(props:{metadata: {[key: string]: ITracker}}) {
    const [currentText, setCurrentText] = useState('');
    const [rankBy, setRankBy] = useState<RankMethod>(RankMethod.POKEDEX_NUMBER);

    return (
      <div className="App">
          <Buttons/>
          <div className='nes-container' style={{height:'90vh', backgroundColor:'rgba(255,255,255,0.85)', display:'flex', flexFlow:'column', alignItems:'center'}}>
              <div style={{display:'flex', width:'100%', alignContent:'center', alignItems:'center', justifyContent:'space-between'}}>
                <Search currentText={currentText} setCurrentText={setCurrentText}/>
                <div className="nes-select is-inline" style={{display:'flex', alignItems:'center'}}>
                <p style={{fontSize:'0.7em'}}>Rank by</p>
                <select style={{borderWidth:'2px', height:'40px', fontSize:'0.7em'}} value={rankBy} id="default_select" onChange={e=>{setRankBy(e.target.value as RankMethod)}}>
                    {(Object.values(RankMethod) as RankMethod[]).map(r=><option key={r} value={r}>{r}</option>)}
                </select>
                </div>
              </div>
              <PokemonCarousel currentText={currentText} metadata={props.metadata} rankBy={rankBy}/>
          </div>
      </div>
    );
}
