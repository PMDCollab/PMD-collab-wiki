import './style/app.css';
import "nes.css/css/nes.min.css";
import PokemonCarousel from './components/pokemon-carousel';
import Search from './components/search';
import { useState } from 'react';
import Buttons from './components/buttons';
import { ITracker } from './types/ITracker';
import { CDN_URL, ICreditNames, RankMethod } from './types/enum';
import DisplayParameters from './components/display-parameters';
import { DataFrame } from 'dataframe-js';

export default function Home(props:{metadata: {[key: string]: ITracker}}) {
    const [currentText, setCurrentText] = useState('');
    const [rankBy, setRankBy] = useState<RankMethod>(RankMethod.POKEDEX_NUMBER);
    const [showPortraitAuthor, setPortraitAuthor] = useState<boolean>(false);
    const [showSpriteAuthor, setSpriteAuthor] = useState<boolean>(false);
    const [showIndex, setShowIndex] = useState<boolean>(false);
    const [showLastModification, setShowLastModification] = useState<boolean>(false);
    const [initialized, setInitialized] = useState<boolean>(false);

    if(!initialized){
        setInitialized(true);
        DataFrame.fromText(`${CDN_URL}/credit_names.txt`,'\t',true)
        .then(df=>{return df.toDict()})
        .then((dict: ICreditNames)=>{
            Object.keys(props.metadata).forEach(k =>{
                const i = dict.Discord.findIndex(e=>e===props.metadata[k].portrait_credit.primary)
                const j = dict.Discord.findIndex(e=>e===props.metadata[k].sprite_credit.primary)
                if(i !== -1){
                    props.metadata[k].portrait_credit.primary = dict.Name[i]
                }
                if(j !== -1){
                    props.metadata[k].sprite_credit.primary = dict.Name[i]
                }
            })
        })
    }

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
                <PokemonCarousel currentText={currentText} metadata={props.metadata} rankBy={rankBy} showPortraitAuthor={showPortraitAuthor} showSpriteAuthor={showSpriteAuthor} showIndex={showIndex} showLastModification={showLastModification}/>
            </div>
        </div>
      )
}
