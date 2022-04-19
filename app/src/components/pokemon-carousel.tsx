import tracker from '../types/tracker.json';
import { Convert } from '../types/ITracker';
import PokemonThumbnail from './pokemon-thumbnail';

const metadata = Convert.toITracker(JSON.stringify(tracker));

export default function PokemonCarousel(props:{currentText:string}){
    return <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-between', overflowY:'scroll', overflowX:'hidden'}}>
        {Object.keys(metadata)
        .filter(k=>metadata[k].name.toLowerCase().includes(props.currentText.toLowerCase()))
        .map(k=><PokemonThumbnail key={k} infoKey={k} info={metadata[k]}/>)}
    </div>
}