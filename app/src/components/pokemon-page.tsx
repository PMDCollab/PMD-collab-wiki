import { Link } from "react-router-dom";
import { IFlattenTracker } from "../types/ITracker";
import Buttons from "./buttons";
import PokemonInformations from "./pokemon-informations";

export default function PokemonPage(props:{
        infoKey: string,
        info: IFlattenTracker
    }){

    return <div className="App">
        <Buttons/>
        <div className='nes-container' style={{height:'90vh', backgroundColor:'rgba(255,255,255,0.85)', display:'flex', flexFlow:'column', overflowY:'scroll'}}>
            <h1 style={{fontSize:'1.4em'}}>{props.info.name} </h1>
            <p style={{fontSize: '0.7em'}}>{props.infoKey}</p>
            <div style={{display:'flex', alignItems:'baseline', width:'100%', justifyContent:'center', flexWrap:'wrap'}}>
                <Link key={props.infoKey} to={'/' + props.infoKey} className='my-link'>
                    <p style={{fontSize:'0.7em'}}>{props.info.name}</p>
                </Link>
                {props.info.related.map((p,i)=><Link key={p.id} to={'/' + p.id} className='my-link'>
                    <p style={{fontSize:'0.7em', marginLeft: '10px', marginRight:'10px'}} className={i%2 === 1 ? 'nes-text': 'nes-text is-primary'}>{p.name}</p>
                </Link>)}
            </div>
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