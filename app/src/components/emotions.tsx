import { Portrait } from "../generated/graphql"
import Lock from "./lock"

export default function Emotions(props: {
    emotions: Portrait[]
    }){
    const emotionsCopy = [...props.emotions]
    return <div style={{display:'flex', flexWrap:'wrap'}}>
    {emotionsCopy.sort((a,b)=>a.emotion.localeCompare(b.emotion)).map(k=>{
       return <div key={k.emotion} className="my-container nes-container" style={{margin:'10px', marginLeft:'0px', display:'flex', flexFlow:'column', justifyContent:'space-around', alignItems:'center'}}>
           <img className="my-img" alt="" src={k.url}/>
           <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-around', gap:'2px'}}>
            <Lock locked={k.locked}/>
            <p style={{fontSize: '0.6em', margin: '0px'}}>{k.emotion}</p>
           </div>
       </div> 
    })}
    </div>
}