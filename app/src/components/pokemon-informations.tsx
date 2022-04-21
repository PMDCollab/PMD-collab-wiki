import { Action, ICreditNames } from "../types/enum";
import { Credit } from "../types/ITracker";
import Credits from "./credits";
import Emotions from "./emotions";
import SpritePreview from "./sprite-preview";

export default function PokemonInformations(props:{
    df:ICreditNames | undefined,
    portraitFiles: { [key: string]: boolean },
    portraitCredit: Credit,
    spriteFiles: { [key: string]: boolean },
    spriteCredit: Credit,
    infoKey: string}){
    return <div>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h2>Emotions</h2>
            <Credits df={props.df} primary={props.portraitCredit.primary} secondary={props.portraitCredit.secondary}/>
        </div>
        {Object.keys(props.portraitFiles).length !== 0 ? <Emotions infoKey={props.infoKey} emotions={props.portraitFiles}/>: <p>No portraits available for now.</p>}
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h2>Sprites</h2>
            <Credits df={props.df} primary={props.spriteCredit.primary} secondary={props.spriteCredit.secondary}/>
        </div>
        {Object.keys(props.spriteFiles).length !== 0 ? <div  style={{display:'flex', flexWrap:'wrap'}}>
            {(Object.keys(props.spriteFiles) as Action[]).map(
                k => <SpritePreview key={k} infoKey={props.infoKey} action={k}/>
            )}
        </div>: <p>No sprites available for now.</p>}

    </div>
}