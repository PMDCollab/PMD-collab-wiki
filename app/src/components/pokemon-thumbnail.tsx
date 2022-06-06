import { faCoins } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Monster } from '../generated/graphql'

export default function PokemonThumbnail(props: {
        info: Monster,
        infoKey: string,
        showIndex: boolean,
        showSpriteAuthor: boolean,
        showPortraitAuthor: boolean,
        showLastModification: boolean,
        showPortraitBounty: boolean,
        showSpriteBounty: boolean
    }){
    let image: ReactElement | null = null
    let date: ReactElement | null = null
    let index: ReactElement | null = null
    let portraitAuthor: ReactElement | null = null
    let spriteAuthor: ReactElement | null = null
    let portraitBounty: ReactElement | null = null
    let spriteBounty: ReactElement | null = null

    if(props.showPortraitAuthor){
        portraitAuthor = <p style={{fontSize: '0.55em', margin: '0px'}}>{props.info?.manual?.portraits?.creditPrimary?.name}</p> 
    }

    if(props.showSpriteAuthor){
        spriteAuthor = <p style={{fontSize: '0.55em', margin: '0px'}}>{props.info.manual?.sprites.creditPrimary?.name}</p> 
    }

    if(props.showIndex){
        index = <p style={{fontSize: '0.55em', margin: '0px'}}>{props.infoKey}</p> 
    }

    if(props.showLastModification){
        const portraitDate = new Date(props.info.manual?.portraits.modifiedDate)
        const spriteDate = new Date(props.info.manual?.sprites.modifiedDate)
        date = <p style={{fontSize: '0.45em', margin: '0px'}}>{formatDate(Math.max(portraitDate.getTime(), spriteDate.getTime()))}</p>
    }

    if(props.showPortraitBounty){
        const bounties = new Array<number>()
        props.info.forms.forEach(f=>{
            f.portraits.bounty.exists ? bounties.push(f.portraits.bounty.exists) : null
            f.portraits.bounty.full ? bounties.push(f.portraits.bounty.full) : null
            f.portraits.bounty.incomplete ? bounties.push(f.portraits.bounty.incomplete) : null
        })
        portraitBounty = <div style={{display:'flex'}}>
            <p style={{margin:'0px', fontSize:'0.55em', marginRight:'2px'}}>{
                bounties.length > 0 ? Math.max(...bounties): 0
            }</p>
            <FontAwesomeIcon icon={faCoins} size="xs"/>
        </div>
    }

    if(props.showSpriteBounty){
        const bounties = new Array<number>()
        props.info.forms.forEach(f=>{
            f.sprites.bounty.exists ? bounties.push(f.sprites.bounty.exists) : null
            f.sprites.bounty.full ? bounties.push(f.sprites.bounty.full) : null
            f.sprites.bounty.incomplete ? bounties.push(f.sprites.bounty.incomplete) : null
        })
        spriteBounty = <div style={{display:'flex'}}>
            <p style={{margin:'0px', fontSize:'0.55em', marginRight:'2px'}}>{
                bounties.length > 0 ? Math.max(...bounties): 0
            }</p>
            <FontAwesomeIcon icon={faCoins} size="xs"/>
        </div>
    }


    if (props.info.manual?.portraits.emotion?.url) {    
        image = <img className='my-img' alt='' src={props.info.manual.portraits.emotion?.url}/>
    } else {
        image = <h1 style={{height:'80px', margin:'0px'}}>?</h1>
    }

    return <Link to={props.infoKey.toString()} className='my-link'>
        <div className='my-container nes-container nes-pointer grow' style={{display:'flex', flexFlow:'column', justifyContent:'space-between', alignItems:'center', minWidth: '100px', margin:'10px'}}>
             {image}
            <p style={{fontSize: '0.55em', margin: '0px'}}>{props.info.name}</p>
            {index}
            {portraitAuthor}
            {spriteAuthor}
            {date}
            {portraitBounty}
            {spriteBounty}
        </div>
    </Link>
}

export function formatDate(n: number | undefined) {
    if(n){
        const date = new Date(n)
        return  pad( date.getDate() ) +
            '/' + pad( date.getMonth() + 1 ) +
            '/' + date.getFullYear()
    }
    else{
        return ''
    }

}

export function pad(number: number) {
    if ( number < 10 ) {
        return '0' + number
        }
    return number
}
