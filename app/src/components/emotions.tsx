import { Portrait } from "../generated/graphql"

export default function Emotions(props: {
    emotions: Portrait[]
    }){
    return <div style={{display:'flex', flexWrap:'wrap'}}>
    {props.emotions.sort((a,b)=>a.emotion.localeCompare(b.emotion)).map(k=>{
       return <div key={k.emotion} className="my-container nes-container" style={{margin:'10px', marginLeft:'0px', display:'flex', flexFlow:'column', justifyContent:'space-around', alignItems:'center'}}>
           <img className="my-img" alt="" src={k.url}/>
           <p style={{fontSize: '0.6em', margin: '0px'}}>{k.emotion}</p>
       </div> 
    })}
    </div>
}