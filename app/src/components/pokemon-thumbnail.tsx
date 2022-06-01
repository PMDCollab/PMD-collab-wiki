import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { CDN_URL } from '../types/enum';
import mappedEmotions from '../mappedEmotions.json'
import { Monster } from '../generated/graphql'

export default function PokemonThumbnail(props: {
        info: Monster,
        infoKey: number,
        showIndex: boolean,
        showSpriteAuthor: boolean,
        showPortraitAuthor: boolean,
        showLastModification: boolean
    }){
    let image: ReactElement | null = null
    let date: ReactElement | null = null
    let index: ReactElement | null = null
    let portraitAuthor: ReactElement | null = null
    let spriteAuthor: ReactElement | null = null

    if(props.showPortraitAuthor){
        portraitAuthor = <p style={{fontSize: '0.55em', margin: '0px'}}>{props.info?.manual?.portraits?.creditPrimary.name}</p> 
    }

    if(props.showSpriteAuthor){
        spriteAuthor = <p style={{fontSize: '0.55em', margin: '0px'}}>{props.info.manual?.sprites.creditPrimary.name}</p> 
    }

    if(props.showIndex){
        index = <p style={{fontSize: '0.55em', margin: '0px'}}>{props.infoKey}</p> 
    }

    if(props.showLastModification){
        const portraitDate = new Date(props.info.manual?.portraits.modifiedDate)
        const spriteDate = new Date(props.info.manual?.sprites.modifiedDate)
        date = <p style={{fontSize: '0.45em', margin: '0px'}}>{formatDate(Math.max(portraitDate.getTime(), spriteDate.getTime()))}</p>
    }



    if (props.info.manual?.portraits.emotion?.url) {    
        image = <img className='my-img' alt='' src={props.info.manual.portraits.emotion?.url}/>;
    } else {
        image = <h1 style={{height:'80px', margin:'0px'}}>?</h1>;
    }

    return <Link to={props.infoKey.toString()} className='my-link'>
        <div className='my-container nes-container nes-pointer grow' style={{display:'flex', flexFlow:'column', justifyContent:'space-between', alignItems:'center', minWidth: '100px', maxWidth: '100px', margin:'10px'}}>
             {image}
            <p style={{fontSize: '0.55em', margin: '0px'}}>{props.info.name}</p>
            {index}
            {portraitAuthor}
            {spriteAuthor}
            {date}
        </div>
    </Link>
}

export function formatDate(n: number | undefined) {
    if(n){
        const date = new Date(n);
        return  pad( date.getDate() ) +
            '/' + pad( date.getMonth() + 1 ) +
            '/' + date.getFullYear()
    }
    else{
        return '';
    }

}

export function pad(number: number) {
    if ( number < 10 ) {
        return '0' + number;
        }
    return number;
}
