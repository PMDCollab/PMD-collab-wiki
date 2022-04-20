import { Link } from 'react-router-dom';
import { CDN_URL, Emotion } from '../types/enum';
import { ITracker } from '../types/ITracker';

export default function PokemonThumbnail(props: {info: ITracker, infoKey: string}){
    const image = props.info.portrait_files[Emotion.NORMAL] !== undefined ? <img className='my-img' alt='' src={`${CDN_URL}/portrait/${props.infoKey}/${Emotion.NORMAL}.png`}/> : <h1 style={{height:'80px', margin:'0px'}}>?</h1>;
    return <Link to={props.infoKey} className='my-link'>
        <div className='my-container nes-container nes-pointer grow' style={{display:'flex', flexFlow:'column', justifyContent:'space-between', alignItems:'center', width: '100px', margin:'20px'}}>
             {image}
            <p style={{fontSize: '0.5vw', margin: '0px'}}>{props.info.name}</p>
        </div>
    </Link>
}