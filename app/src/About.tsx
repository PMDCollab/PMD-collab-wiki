import Buttons from "./components/buttons"

export default function About(){
    return (
        <div className="App">
            <Buttons/>
            <div className='nes-container' style={{height:'90vh', overflowY: 'scroll', backgroundColor:'rgba(255,255,255,0.8)', display:'flex', flexFlow:'column', alignItems:'center'}}>
                <h1 className="nes-text is-primary">The PMD Sprite Repository</h1>
                <p>Welcome to the PMD Sprite Repository! This is a comprehensive resource of official sprites from the Pokémon Mystery Dungeon NDS games, and custom sprites made in the same style. We have both spritesheets and portraits. They are easily downloaded for use in fan projects, and can be imported to SkyTemple. We aim to provide sprites for every Pokémon of every generation!
When using, you must credit the contributors. They can be found on each Pokémon's page.</p>
                <h3 className="nes-text is-primary"> How to collaborate ?</h3>
                <p>Have you made a portrait we're missing? Notice errors in existing portraits? Join us on the SkyTemple Discord to speak to contributors and submit your own!
Portrait submissions should follow these rules and guidelines: </p>
                <div className='lists'>
                    <ul className="nes-list is-disc">
                        <li>All portraits must be 40 by 40 pixels.</li>
                        <li>Emotions must be arranged in the pattern in this template.</li>
                        <li>It is preferred that individual portraits contain 15 colors or less.</li>
                        <li>Submissions must not edit official portraits.</li>
                    </ul>
                </div>
            </div>
        </div>
      )
}