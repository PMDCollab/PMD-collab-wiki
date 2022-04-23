import { Link } from 'react-router-dom';
import { CDN_URL, Emotion } from '../types/enum';
import { ITracker } from '../types/ITracker';

export default function PokemonThumbnail(props: {info: ITracker, infoKey: string}){
    let image = undefined;
    if (props.info.portrait_files[Emotion.NORMAL] !== undefined) {
        image = <img className='my-img' alt='' src={`${CDN_URL}/portrait/${props.infoKey}/${Emotion.NORMAL}.png`}/>;
    } else if (Object.keys(props.info.portrait_files).length > 0) {
        image = <img className='my-img' alt='' src={`${CDN_URL}/portrait/${props.infoKey}/${Object.keys(props.info.portrait_files)[0]}.png`}/>;
    } else {
        image = <h1 style={{height:'80px', margin:'0px'}}>?</h1>;
    }

    return <Link to={props.infoKey} className='my-link'>
        <div className='my-container nes-container nes-pointer grow' style={{display:'flex', flexFlow:'column', justifyContent:'space-between', alignItems:'center', minWidth: '100px', margin:'20px'}}>
             {image}
            <p style={{fontSize: '0.6em', margin: '0px'}}>{props.infoKey}<br />{props.info.name}</p>
        </div>
    </Link>
}