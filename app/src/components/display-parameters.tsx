import { Dispatch, SetStateAction } from "react";

export default function DisplayParameters(props:{
    setShowIndex: Dispatch<SetStateAction<boolean>>,
    setPortraitAuthor: Dispatch<SetStateAction<boolean>>,
    setSpriteAuthor: Dispatch<SetStateAction<boolean>>,
    setShowLastModification: Dispatch<SetStateAction<boolean>>
}){
    return <div style={{display:'flex', flexFlow:'column', alignItems:'start', minWidth:'200px', maxWidth:'200px'}}>
        <label className="my-label">
            <input type="checkbox" className="nes-checkbox my-cursor" onChange={e=>{props.setShowIndex(e.target.checked)}} />
            <span style={{fontSize:'0.7em'}}>Index</span>
        </label>
        <label className="my-label">
            <input type="checkbox" className="nes-checkbox my-cursor" onChange={e=>{props.setPortraitAuthor(e.target.checked)}} />
            <span style={{fontSize:'0.7em'}}>Portrait Author</span>
        </label>
        <label className="my-label">
            <input type="checkbox" className="nes-checkbox my-cursor" onChange={e=>{props.setSpriteAuthor(e.target.checked)}} />
            <span style={{fontSize:'0.7em'}}>Sprite Author</span>
        </label>
        <label className="my-label">
            <input type="checkbox" className="nes-checkbox my-cursor" onChange={e=>{props.setShowLastModification(e.target.checked)}} />
            <span style={{fontSize:'0.7em'}}>Last Change</span>
        </label>
    </div>
}