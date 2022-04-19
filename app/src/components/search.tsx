export default function Search(){
    return <div className="nes-field is-inline" style={{width:'30%'}}>
    <label htmlFor="inline_field">Search for a Pokemon</label>
    <input type="text" id="inline_field" className="nes-input" placeholder="Mewtwo..."/>
  </div>
}