import { ITracker } from "../types/ITracker";
import Buttons from "./buttons";
import PokemonInformations from "./pokemon-informations";

export default function PokemonPage(props:{
        infoKey: string,
        info: ITracker
    }){

    return <div className="App">
        <Buttons/>
        <div className='nes-container' style={{height:'90vh', backgroundColor:'rgba(255,255,255,0.85)', display:'flex', flexFlow:'column', overflowY:'scroll'}}>
            <h1 style={{fontSize:'1.5em'}}>{props.info.name} ({props.infoKey})</h1>
            <PokemonInformations
                    portraitCredit={props.info.portrait_credit}
                    portraitFiles={props.info.portrait_files}
                    spriteCredit={props.info.sprite_credit}
                    spriteFiles={props.info.sprite_files}
                    spriteModified={props.info.sprite_modified}
                    portraitModified={props.info.portrait_modified}
                    infoKey={`${props.infoKey}`}
                />
        </div>
    </div>
}