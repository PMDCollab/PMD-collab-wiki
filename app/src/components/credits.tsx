export default function Credits(props:{primary: string, secondary: string[]}){
    return  <div style={{display:'flex', alignItems:'center', width:'40%', justifyContent:'space-between'}}>
    <p>by:</p>
    <div style={{display:'flex', flexFlow:'column'}}>
        <p className="nes-text is-primary">Primary</p>
        <p>{props.primary}</p>
    </div>
    <div style={{display:'flex', flexFlow:'column'}}>
        <p className="nes-text is-primary">Secondary</p>
        <p>{props.secondary}</p>
    </div>
</div>
}