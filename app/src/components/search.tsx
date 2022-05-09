export default function Search(props:{currentText: string, setCurrentText: React.Dispatch<React.SetStateAction<string>>}){
    return <div className="nes-field is-inline">
    <label htmlFor="inline_field">Search for a Pokemon</label>
    <input value={props.currentText} onChange={(e)=>{props.setCurrentText(e.target.value)}} type="text" id="inline_field" className="nes-input" placeholder="Mewtwo..."/>
  </div>
}