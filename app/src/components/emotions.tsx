import { CDN_URL } from "../types/enum"
import mappedEmotionsFile from '../mappedEmotions.json'

const mappedEmotions = mappedEmotionsFile as {[key: string]: string}

export default function Emotions(props: {
    infoKey: string,
    emotions: number[]
    }){
    return <div style={{display:'flex', flexWrap:'wrap'}}>
    {props.emotions.map(k=>mappedEmotions[k.toString()]).sort().map(k=>{
       return <div key={k} className="my-container nes-container" style={{margin:'10px', marginLeft:'0px', display:'flex', flexFlow:'column', justifyContent:'space-around', alignItems:'center'}}>
           <img className="my-img" alt="" src={`${CDN_URL}/portrait/${props.infoKey}/${k}.png`}/>
           <p style={{fontSize: '0.6em', margin: '0px'}}>{k}</p>
       </div> 
    })}
    </div>
}