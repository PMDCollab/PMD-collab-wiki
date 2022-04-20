export default function Emotions(props: {infoKey: string, emotions:{[key: string]: boolean}}){
    return <div style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap'}}>
    {Object.keys(props.emotions).map(k=>{
       return <div key={k} className="my-container nes-container" style={{margin:'10px', marginLeft:'0px', display:'flex', flexFlow:'column', justifyContent:'space-around', alignItems:'center'}}>
           <img className="my-img" alt="" src={`${process.env.PUBLIC_URL}/collab/portrait/${props.infoKey}/${k}.png`}/>
           <p style={{fontSize: '0.4vw', margin: '0px'}}>{k}</p>
       </div> 
    })}
    </div>
}