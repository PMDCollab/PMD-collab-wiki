import { CreditInformation } from "../types/enum";


export default function Credits(props:{mappedCredits: Map<string, CreditInformation>, primary: string, secondary: string[]}){
    function findCredits(id:string){
        let contact = '';
        let name = '';
        const c = props.mappedCredits.get(id)
        if(c){
            contact = c.contact
            name = c.name
        }
        return <a className='nes-text is-primary' style={{marginRight:'20px', fontSize:'1em'}} key={id} href={contact}>{name}</a>;
    }

    return  <div style={{display:'flex', flexGrow: '.3', justifyContent: 'space-around'}}>
    {props.primary.length !== 0 ? <div>
        <p style={{fontSize:'0.6em'}}>by</p>
        <p style={{fontSize:'1em'}}>{findCredits(props.primary)}</p>
    </div>: null}

    {props.secondary.length !== 0 ? <div>
        <p style={{fontSize:'0.6em'}}>Others</p>
        <div style={{display:'flex', justifyContent:'space-around'}}>
            {props.secondary.map(s=>findCredits(s))}
        </div>
    </div> : null}

</div>
}