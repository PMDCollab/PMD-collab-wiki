import { Action, CDN_URL, ICreditNames } from "../types/enum";
import { ITracker } from "../types/ITracker";
import Buttons from "./buttons";
import Credits from "./credits";
import Emotions from "./emotions";
import SpritePreview from "./sprite-preview";
import DataFrame from 'dataframe-js';
import { useState } from "react";

export default function PokemonPage(props:{infoKey: string, info: ITracker}){
    const [df, setDf] = useState<ICreditNames>();
    const [initialized, setInitialized] = useState<boolean>(false);
    if(!initialized){
        setInitialized(true);
        DataFrame.fromText(`${CDN_URL}/credit_names.txt`,'\t',true)
        .then(df=>{setDf(df.toDict())});
    }

    return <div className="App">
        <Buttons/>
        <div className='nes-container' style={{height:'90vh', backgroundColor:'rgba(255,255,255,0.7)', display:'flex', flexFlow:'column', overflowY:'scroll'}}>
            <h1>{props.info.name} ({props.infoKey})</h1>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <h2>Emotions</h2>
                <Credits df={df} primary={props.info.portrait_credit.primary} secondary={props.info.portrait_credit.secondary}/>
            </div>
            <Emotions infoKey={props.infoKey} emotions={props.info.portrait_files}/>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <h2>Sprites</h2>
                <Credits df={df} primary={props.info.sprite_credit.primary} secondary={props.info.sprite_credit.secondary}/>
            </div>
            <div  style={{display:'flex', flexWrap:'wrap'}}>
                {(Object.keys(props.info.sprite_files) as Action[]).map(
                    k => <SpritePreview key={k} infoKey={props.infoKey} action={k}/>
                )}
            </div>
        </div>
    </div>
}