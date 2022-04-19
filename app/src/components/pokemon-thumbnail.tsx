import { ITracker } from '../types/ITracker';

export default function PokemonThumbnail(props: {info: ITracker, infoKey: string}){
    return <div className='my-container nes-container nes-pointer grow' style={{display:'flex', flexFlow:'column', justifyContent:'space-between', alignItems:'center', width: '100px', margin:'20px'}}>
        <img className='my-img' alt='' src={`https://raw.githubusercontent.com/keldaan-ag/SpriteCollab/master/portrait/${props.infoKey}/Normal.png`}/>
        <p style={{fontSize: '0.5vw', margin: '0px'}}>{props.info.name}</p>
    </div>;
}