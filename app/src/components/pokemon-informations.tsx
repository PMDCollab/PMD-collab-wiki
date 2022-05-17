import { Action } from "../types/enum";
import { Credit } from "../types/ITracker";
import Credits from "./credits";
import Emotions from "./emotions";
import { formatDate } from "./pokemon-thumbnail";
import SpritePreview from "./sprite-preview";

export default function PokemonInformations(props:{
    portraitFiles: { [key: string]: boolean },
    portraitCredit: Credit,
    spriteFiles: { [key: string]: boolean },
    spriteCredit: Credit,
    infoKey: string,
    spriteModified: string,
    portraitModified: string
    }){
    const portraitDate = props.portraitModified !== '' ? new Date(props.portraitModified): undefined;
    const spriteDate = props.spriteModified !== '' ? new Date(props.spriteModified): undefined;
    return <div>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
                <h2 style={{textAlign:'left'}}>Emotions</h2>
                <p style={{fontSize: '0.6em', margin: '0px'}}>{getLastModification(portraitDate)}</p>
            </div>
            <Credits primary={props.portraitCredit.primary} secondary={props.portraitCredit.secondary}/>
        </div>
        {Object.keys(props.portraitFiles).length !== 0 ? <Emotions infoKey={props.infoKey} emotions={props.portraitFiles}/>: <p>No portraits available for now.</p>}
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
                <h2 style={{textAlign:'left'}}>Sprites</h2>
                <p style={{fontSize: '0.6em', margin: '0px'}}>{getLastModification(spriteDate)}</p>
            </div>
            <Credits primary={props.spriteCredit.primary} secondary={props.spriteCredit.secondary}/>
        </div>
        {Object.keys(props.spriteFiles).length !== 0 ? <div  style={{display:'flex', flexWrap:'wrap'}}>
            {(Object.keys(props.spriteFiles) as Action[]).map(
                k => <SpritePreview key={k} infoKey={props.infoKey} action={k}/>
            )}
        </div>: <p>No sprites available for now.</p>}

    </div>
}

function getLastModification(t: Date | undefined){
    if(t){
        return 'Modified at ' + formatDate(t.getTime());
    }
    return '';
}