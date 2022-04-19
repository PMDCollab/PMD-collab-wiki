import { ITracker } from "../types/ITracker";
import Buttons from "./buttons";
import Emotions from "./emotions";

export default function PokemonPage(props:{infoKey: string, info: ITracker}){
    return <div className="App">
        <Buttons/>
        <div className='nes-container' style={{height:'90vh', backgroundColor:'rgba(255,255,255,0.7)', display:'flex', flexFlow:'column', overflowY:'scroll'}}>
            <h1>{props.info.name} ({props.infoKey})</h1>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <h2>Emotions</h2>
                <div style={{display:'flex', alignItems:'center', width:'40%', justifyContent:'space-between'}}>
                    <p>by:</p>
                    <div style={{display:'flex', flexFlow:'column'}}>
                        <p className="nes-text is-primary">Primary</p>
                        <p>{props.info.portrait_credit.primary}</p>
                    </div>
                    <div style={{display:'flex', flexFlow:'column'}}>
                        <p className="nes-text is-primary">Secondary</p>
                        <p>{props.info.portrait_credit.secondary}</p>
                    </div>
                </div>

            </div>
            <Emotions infoKey={props.infoKey} emotions={props.info.portrait_files}/>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <h2>Sprites</h2>
                <div style={{display:'flex', alignItems:'center', width:'40%', justifyContent:'space-between'}}>
                    <p>by:</p>
                    <div style={{display:'flex', flexFlow:'column'}}>
                        <p className="nes-text is-primary">Primary</p>
                        <p>{props.info.sprite_credit.primary}</p>
                    </div>
                    <div style={{display:'flex', flexFlow:'column'}}>
                        <p className="nes-text is-primary">Secondary</p>
                        <p>{props.info.sprite_credit.secondary}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
}