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
        return <a style={{marginRight:'20px'}} key={id} href={contact}>{name}</a>;
    }

    return  <div style={{display:'flex', flexGrow: '.3', justifyContent: 'space-around'}}>
    <div>
        <p>by</p>
        <p>{findCredits(props.primary)}</p>
    </div>
    {props.secondary.length !== 0 ? <div>
        <p>Others</p>
        <div style={{display:'flex', justifyContent:'space-around'}}>
            {props.secondary.map(s=>findCredits(s))}
        </div>
    </div> : null}

</div>
}