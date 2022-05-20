import { Credit, MinPath } from "../types/ITracker"
import Credits from "./credits";
import Emotions from "./emotions";
import { formatDate } from "./pokemon-thumbnail";
import SpritePreview from "./sprite-preview";
import mappedActionsFile from '../mappedActions.json'
import {DISCORD_APP_URL, Dungeon} from '../types/enum'
import { useRef } from "react"

const mappedActions = mappedActionsFile as {[key: string]: string}

export default function PokemonInformations(props:{
    portraitFiles: number[],
    portraitCredit: Credit,
    spriteFiles: number[],
    spriteCredit: Credit,
    infoKey: string,
    spriteModified: string,
    portraitModified: string,
    portraitLink: string,
    portraitRecolorLink: string,
    spriteLink: string,
    spriteRecolorLink: string
    }){
    const bg = useRef<Dungeon>(Object.keys(Dungeon)[Math.floor(Math.random() * Object.keys(Dungeon).length)] as Dungeon)
    const portraitDate = props.portraitModified !== '' ? new Date(props.portraitModified): undefined;
    const spriteDate = props.spriteModified !== '' ? new Date(props.spriteModified): undefined;
    const pl = props.portraitLink && props.portraitLink !== '' ? <a target="_blank" style={{fontSize:'0.6em', marginRight:'5%'}} href={`${DISCORD_APP_URL}${props.portraitLink}`} rel="noreferrer">Download all portraits</a> : null
    const prl = props.portraitRecolorLink && props.portraitRecolorLink !== '' ? <a target="_blank" style={{fontSize:'0.6em'}} href={`${DISCORD_APP_URL}${props.portraitRecolorLink}`} rel="noreferrer">Download recolor portraits</a>: null
    const sl = props.spriteLink && props.spriteLink !== '' ? <a target="_blank" style={{fontSize:'0.6em', marginRight:'5%'}} href={`${DISCORD_APP_URL}${props.spriteLink}`} rel="noreferrer">Download all sprites</a>: null
    const srl = props.spriteRecolorLink && props.spriteRecolorLink !== '' ? <a target="_blank" style={{fontSize:'0.6em'}} href={`${DISCORD_APP_URL}${props.spriteRecolorLink}`} rel="noreferrer">Download recolor sprites</a>: null
    return <div>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap'}}>
            <div style={{display:'flex', alignItems:'baseline'}}>
                <div>
                    <h4 style={{textAlign:'left'}}>Portraits</h4>
                    <p style={{textAlign:'left',fontSize: '0.6em', margin: '0px'}}>{getLastModification(portraitDate)}</p>
                </div>
                {pl}
                {prl}
            </div>
            <Credits primary={props.portraitCredit[MinPath.PRIMARY]} secondary={props.portraitCredit[MinPath.SECONDARY]}/>
        </div>
        {Object.keys(props.portraitFiles).length !== 0 ? <Emotions infoKey={props.infoKey} emotions={props.portraitFiles}/>: <p>No portraits available for now.</p>}
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap'}}>
            <div style={{display:'flex', alignItems:'baseline'}}>
                <div>
                    <h4 style={{textAlign:'left'}}>Sprites</h4>
                    <p style={{textAlign:'left', fontSize: '0.6em', margin: '0px'}}>{getLastModification(spriteDate)}</p>
                </div>
                {sl}
                {srl}
            </div>
            <Credits primary={props.spriteCredit[MinPath.PRIMARY]} secondary={props.spriteCredit[MinPath.SECONDARY]}/>
        </div>
        {Object.keys(props.spriteFiles).length !== 0 ? <div  style={{display:'flex', flexWrap:'wrap'}}>
            {props.spriteFiles.map(
                k => <SpritePreview key={k} infoKey={props.infoKey} dungeon={bg.current} action={mappedActions[k.toString()]}/>
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