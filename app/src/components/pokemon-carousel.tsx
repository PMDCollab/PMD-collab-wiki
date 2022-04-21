import { ITracker } from '../types/ITracker';
import PokemonThumbnail from './pokemon-thumbnail';


export default function PokemonCarousel(props:{currentText:string, metadata: {[key: string]: ITracker}}){
    return <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-between', overflowY:'scroll', overflowX:'hidden'}}>
        {Object.keys(props.metadata)
        .filter(k=>props.metadata[k].name.toLowerCase().includes(props.currentText.toLowerCase()) || k.includes(props.currentText))
        .map(k=><PokemonThumbnail key={k} infoKey={k} info={props.metadata[k]}/>)}
    </div>
}