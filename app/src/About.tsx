import Buttons from "./components/buttons"

export default function About(){
    return (
        <div className="App">
            <Buttons/>
            <div className='nes-container' style={{height:'90vh', overflowY: 'scroll', backgroundColor:'rgba(255,255,255,0.9)', display:'block', fontFamily:'verdana'}}>
                <h1 className="nes-text is-primary">PMD Collab Sprite Project</h1>
                <p>Pokemon Mystery Dungeon Collaborative Sprite project</p>
                <h3 className="nes-text is-primary"> What is PMD Collab ?</h3>
                <p>
                    PMD Collab is a participatory project created by fans of the Pokemon Mystery Dungeon games (like Pokemon Mystery Dungeon: Explorers of Sky or Pokemon Mystery Dungeon: Red Rescue Team).
                    The project provides assets of pokemons from every generations in a standard format. Those assets can be split in 2 categories: Portraits and Sprites.
                </p>
                <div style={{display:'flex', justifyContent:'space-around'}}>
                    <div style={{display:'flex', flexFlow:'column'}}>
                        <h4 className="nes-text is-primary"> Portraits</h4>
                        <img src="https://spriteserver.pmdcollab.org/assets/portrait_recolor-0025-0000-0001.png"/>
                    </div>
                    <div style={{display:'flex', flexFlow:'column'}}>
                        <h4 className="nes-text is-primary"> Sprites</h4>
                        <img src="https://spriteserver.pmdcollab.org/assets/sprite_recolor-0025-0000-0001.png"/>
                    </div>
                </div>

                <h3 className="nes-text is-primary"> Where is PMD Collab ?</h3>
                <p>
                    The main repository where every data comes from is hosted on github at <a href='https://github.com/PMDCollab/SpriteCollab'>https://github.com/PMDCollab/SpriteCollab</a> .
                </p>
                <h3 className="nes-text is-primary">How to collaborate ?</h3>
                <p>if you have drawn sprites or portraits, you can submit them in the #submissions channel of our discord (you can join at <a href='"https://discord.gg/skytemple"'>https://discord.gg/skytemple</a>). You can also support financially support other artists to do new sprites for the project.
                </p>
            </div>
        </div>
      )
}