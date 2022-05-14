export default function Search(props:{currentText: string, setCurrentText: React.Dispatch<React.SetStateAction<string>>}){
    return <div className="nes-field is-inline" style={{flexBasis:'200%'}}>
    <label htmlFor="inline_field" style={{fontSize:'0.7em', textAlign: 'center'}}>Search for a Pokemon</label>
    <input style={{padding:'5px', height:'40px', borderWidth: '2px', fontSize:'.7em'}} value={props.currentText} onChange={(e)=>{props.setCurrentText(e.target.value)}} type="text" id="inline_field" className="nes-input" placeholder="Mewtwo..."/>
  </div>
}