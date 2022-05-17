import { CDN_URL } from "../types/enum"

export default function Emotions(props: {
    infoKey: string,
    emotions:{[key: string]: boolean
    }}){
    return <div style={{display:'flex', flexWrap:'wrap'}}>
    {Object.keys(props.emotions).sort().map(k=>{
       return <div key={k} className="my-container nes-container" style={{margin:'10px', marginLeft:'0px', display:'flex', flexFlow:'column', justifyContent:'space-around', alignItems:'center'}}>
           <img className="my-img" alt="" src={`${CDN_URL}/portrait/${props.infoKey}/${k}.png`}/>
           <p style={{fontSize: '0.6em', margin: '0px'}}>{k}</p>
       </div> 
    })}
    </div>
}