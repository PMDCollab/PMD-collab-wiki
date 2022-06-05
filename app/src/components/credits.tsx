import { Credit } from '../generated/graphql'

export default function Credits(props:{
        primary: Credit | undefined | null,
        secondary: Credit[]
    }){
    return  <div style={{display:'flex', flexGrow: '.3', justifyContent: 'space-around'}}>
    {props.primary?.name ? <div style={{display:'flex', flexFlow:'column', justifyContent:'space-between', alignItems:'baseline'}}>
        <p style={{fontSize:'0.7em'}}>by</p>
        <a className='nes-text is-primary' style={{fontSize:'0.7em', margin: '0px'}} key={props.primary.id} href={props.primary.contact ? props.primary.contact : ''}>{props.primary.name}</a>
    </div>: null}

    {props.secondary.length !== 0 ? <div style={{display:'flex', flexFlow:'column', justifyContent:'space-between', alignItems:'baseline'}}>
        <p style={{fontSize:'0.7em'}}>Others</p>
        <div style={{display:'flex', justifyContent:'space-around', gap:'0.7em'}}>
            {props.secondary.map(s=><div key={s.name} style={{display:'flex', flexFlow:'column', justifyContent:'space-between', alignItems:'baseline'}}>
        <a className='nes-text is-primary' style={{fontSize:'0.7em', margin: '0px'}} href={s.contact ? s.contact : ''}>{s.name}</a>
    </div>)}
        </div>
    </div> : null}

</div>
}
