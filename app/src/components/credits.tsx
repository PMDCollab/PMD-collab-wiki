import { ICreditNames } from "../types/enum";

export default function Credits(props:{df:ICreditNames|undefined, primary: string, secondary: string[]}){
    function findCredits(id:string){
        let contact = '';
        let name = '';
        if(props.df){
            const i = props.df.Discord.findIndex(e=>e===id);
            if(i !== -1){
                contact = props.df.Contact[i];
                name = props.df.Name[i];
            }
        }
        return `${name} (${contact})`;
    }

    return  <div style={{display:'flex', alignItems:'center', justifyContent:'space-around'}}>
    <div style={{display:'flex', flexFlow:'column', width:'20%', textAlign:'center'}}>
        <p className="nes-text is-primary">Primary</p>
        <p style={{width:'70%'}}>{findCredits(props.primary)}</p>
    </div>
    <div style={{display:'flex', flexFlow:'column'}}>
        <p className="nes-text is-primary">Secondary</p>
        <div style={{display:'flex', justifyContent:'space-around'}}>
            {props.secondary.map(s=><p key={s}>{findCredits(s)}</p>)}
        </div>
    </div>
</div>
}