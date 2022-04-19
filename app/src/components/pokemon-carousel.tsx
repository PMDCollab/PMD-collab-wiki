import tracker from '../types/tracker.json';
import { Convert } from '../types/ITracker';
import PokemonThumbnail from './pokemon-thumbnail';

const metadata = Convert.toITracker(JSON.stringify(tracker));

export default function PokemonCarousel(){
    return <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-between'}}>
        {Object.keys(metadata).map(k=><PokemonThumbnail key={k} infoKey={k} info={metadata[k]}/>)}
    </div>
}