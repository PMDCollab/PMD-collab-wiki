import { ITracker } from "../types/ITracker";
import Buttons from "./buttons";
import Emotions from "./emotions";

export default function PokemonPage(props:{infoKey: string, info: ITracker}){
    return <div className="App">
        <Buttons/>
        <div className='nes-container' style={{height:'90vh', backgroundColor:'rgba(255,255,255,0.7)', display:'flex', flexFlow:'column', alignItems:'center'}}>
            <h1>{props.info.name} ({props.infoKey})</h1>
            <Emotions infoKey={props.infoKey} emotions={props.info.portrait_files}/>
            <div></div>
        </div>
    </div>
}