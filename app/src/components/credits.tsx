import { Credit } from '../generated/graphql'

export default function Credits(props:{
        primary: Credit | undefined | null,
        secondary: Credit[]
    }){
    return  <div style={{display:'flex', flexGrow: '.3', justifyContent: 'space-around'}}>
    {props.primary?.name ? <div style={{display:'flex', flexFlow:'column', justifyContent:'space-between', alignItems:'baseline'}}>
        <p style={{fontSize:'0.7em'}}>by</p>
        <Author credit={props.primary}/>
    </div>: null}

    {props.secondary.length !== 0 ? <div style={{display:'flex', flexFlow:'column', justifyContent:'space-between', alignItems:'baseline'}}>
        <p style={{fontSize:'0.7em'}}>Others</p>
        <div style={{display:'flex', justifyContent:'space-around', gap:'0.7em'}}>
            {props.secondary.map(s=> <Author credit={s} key={s.id}/>)}
        </div>
    </div> : null}

</div>
}

function Author(props: {credit: Credit | undefined | null}){
    return <div key={props.credit?.id} style={{display:'flex', flexFlow:'column', justifyContent:'space-between', alignItems:'baseline'}}>
    {props.credit?.name ? <a className='nes-text is-primary' style={{fontSize:'0.7em', margin: '0px'}} href={props.credit?.contact ? props.credit?.contact : ''}>{props.credit?.name}</a>:
    <p className='nes-text' style={{fontSize:'0.7em', margin: '0px'}}>{props.credit?.discordHandle}</p>}
</div>
}
