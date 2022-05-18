import mappedContactsFile from '../mappedContacts.json'

const mappedContacts = mappedContactsFile as {[key: string]: string}

export default function Credits(props:{
        primary: string,
        secondary: string[]
    }){
    function findCredits(name :string){
        return <a className='nes-text is-primary' style={{marginRight:'20px', fontSize:'0.7em', margin: '0px'}} key={name} href={mappedContacts[name]}>{name}</a>;
    }

    return  <div style={{display:'flex', flexGrow: '.3', justifyContent: 'space-around'}}>
    {props.primary.length !== 0 ? <div style={{display:'flex', flexFlow:'column', justifyContent:'space-between'}}>
        <p style={{fontSize:'0.7em'}}>by</p>
        {findCredits(props.primary)}
    </div>: null}

    {props.secondary.length !== 0 ? <div style={{display:'flex', flexFlow:'column', justifyContent:'space-between'}}>
        <p style={{fontSize:'0.7em'}}>Others</p>
        <div style={{display:'flex', justifyContent:'space-around'}}>
            {props.secondary.map(s=>findCredits(s))}
        </div>
    </div> : null}

</div>
}