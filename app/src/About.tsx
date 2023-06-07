import Buttons from "./components/buttons"

export default function About() {
  return (
    <div className="App about">
      <Buttons />
      <div
        className="nes-container"
        style={{
          height: "90vh",
          overflowY: "scroll",
          backgroundColor: "rgba(255,255,255,0.9)",
          display: "block",
          padding: "0 5%",
        }}
      >
        <h1 className="nes-text is-primary">PMDCollab Sprite Project</h1>

        <h3 className="nes-text is-primary">What is PMDCollab ?</h3>
        <p>PMDCollab is a collaborative project providing tools and resources to help fans of Pokémon Mystery Dungeon create their own ROMhacks, fangames, sprite comics, and more. </p>
          
        <p>This project, SpriteCollab, aims to be a central resource for PMD-styled portrait art and top-down dungeon sprites for Pokémon of all generations.
        </p>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ display: "flex", flexFlow: "column" }}>
            <h4 className="nes-text is-primary">Portraits</h4>
            <img
              src="https://spriteserver.pmdcollab.org/assets/portrait_recolor-0025-0000-0001.png"
              style={{ maxWidth: "30vw" }}
            />
          </div>
          <div style={{ display: "flex", flexFlow: "column" }}>
            <h4 className="nes-text is-primary">Sprites</h4>
            <img
              src="https://spriteserver.pmdcollab.org/assets/sprite_recolor-0025-0000-0001.png"
              style={{ maxWidth: "30vw" }}
            />
          </div>
        </div>

        <h3 className="nes-text is-primary">What can I use these sprites for? (Terms of Use)</h3>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ display: "flex", flexFlow: "column" }}>
            <h4 className="nes-text is-primary">YOU MAY</h4>
            <ul>
              <li>Use these sprites in a ROMhack, fangame, sprite comic, etc.</li>
              <li>Use these sprites as profile pictures, Discord emotes, etc.</li>
              <li>Make edits or recolors of these sprites.</li>
            </ul>
          </div>
          <div style={{ display: "flex", flexFlow: "column" }}>
            <h4 className="nes-text is-error">DO NOT</h4>
            <ul>
              <li>Sell the things you make with these sprites.</li>
              <li>Use these sprites without giving credit.</li>
              <li>Claim that you created sprites that you did not make.</li>
            </ul>
          </div>
        </div>
        <h4>Boring legalese version</h4>
        <p className="nes-text" style={{ fontSize: "8pt" }}>
          You are free to use, copy, redistribute, or modify sprites and
          portraits from this repository for your own projects and
          contributions. When using portraits or sprites from this repository,
          you must credit the contributors for each portrait and sprite you use.
          This information can be found on the page for each sprite.
        </p>

        <h3 className="nes-text is-primary">Where did these sprites come from?</h3>
        <p>
          The sprites and portraits in this repository includes both sprites made by Chunsoft for the original games and custom, fan-made sprites. 
          Specific artist credits can be found on the pages for each sprite.
        </p>

        <h3 className="nes-text is-primary">How can I help?</h3>
        <p>
          If you have created or want to learn how to create sprites, you can join the
          #sprite-asset-help channel of the <a href='"https://discord.gg/skytemple"'>SkyTemple discord server</a>. 
          Talk to the friendly artists there and they'll help walk you through the process of adding sprites to the repository.
        </p>
        <p>  
          Many of the artists there also take commissions for sprites, so if you need sprites for a specific Pokémon that isn't currently in the repository, you can commission someone to make them for you as well.
        </p>

        <h3 className="nes-text is-primary">What other cool stuff do you guys do?</h3>
        <p>Here's some of our favorites!</p>

        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ display: "flex", flexFlow: "column" }}>
            <ul>
              <li><a href="https://skytemple.org">SkyTemple</a>, a tool to make ROMhacks of Pokémon Mystery Dungeon: Explorers of Sky</li>
              <li><a href="https://projectpokemon.org/home/files/file/4235-skytemple-randomizer/">SkyTemple Randomizer</a>, a program that randomizes all of the Pokémon in Explorers of Sky.</li>
              <li><a href="https://github.com/audinowho/PMDODump">PMDO</a>, a Pokémon Mystery Dungeon fangame and fangame engine</li>
              <li><a href="https://projectpokemon.org/home/forums/topic/59548-dreamnexus-a-rom-editor-for-pok%C3%A9mon-mystery-dungeon-rescue-team-dx/">DreamNexus</a>, a ROM editor for Rescue Team DX</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
