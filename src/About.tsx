import { Box, Container, Link, Typography } from "@mui/material"
import { Bar } from "./components/bar"

export default function About() {
  return (
    <Box>
      <Bar />
      <Container maxWidth="xl">
        <Typography variant="h2" gutterBottom>
          PMDCollab Sprite Project
        </Typography>

        <Typography variant="h3" gutterBottom>
          What is PMDCollab ?
        </Typography>

        <Typography>
          PMDCollab is a collaborative project providing tools and resources to
          help fans of Pokémon Mystery Dungeon create their own ROMhacks,
          fangames, sprite comics, and more.
        </Typography>

        <Typography>
          This project, SpriteCollab, aims to be a central resource for
          PMD-styled portrait art and top-down dungeon sprites for Pokémon of
          all generations.
        </Typography>
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

        <h3 className="nes-text is-primary">
          What can I use these sprites for? (Terms of Use)
        </h3>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ display: "flex", flexFlow: "column" }}>
            <h4 className="nes-text is-primary">YOU MAY</h4>
            <ul>
              <li>
                Use these sprites in a ROMhack, fangame, sprite comic, etc.
              </li>
              <li>
                Use these sprites as profile pictures, Discord emotes, etc.
              </li>
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
        <p>
          You are free to use, copy, redistribute, or modify sprites and
          portraits from this repository for your own projects and
          contributions. When using portraits or sprites from this repository,
          you must credit the contributors for each portrait and sprite you use.
          This information can be found on the page for each sprite.
        </p>

        <h3 className="nes-text is-primary">
          Where did these sprites come from?
        </h3>
        <Typography>
          The sprites and portraits in this repository includes both sprites
          made by Chunsoft for the original games and custom, fan-made sprites.
          Specific artist credits can be found on the pages for each sprite.
        </Typography>

        <h3 className="nes-text is-primary">How can I help?</h3>
        <Typography>
          If you have created or want to learn how to create sprites, you can
          join the #sprite-asset-help channel of the{" "}
          <Link href="https://discord.gg/skytemple">
            SkyTemple discord server
          </Link>
          . Talk to the friendly artists there and they'll help walk you through
          the process of adding sprites to the repository.
        </Typography>
        <Typography>
          Many of the artists there also take commissions for sprites, so if you
          need sprites for a specific Pokémon that isn't currently in the
          repository, you can commission someone to make them for you as well.
        </Typography>

        <h3 className="nes-text is-primary">
          What other cool stuff do you guys do?
        </h3>
        <Typography>Here's some of our favorites!</Typography>

        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ display: "flex", flexFlow: "column" }}>
            <ul>
              <li>
                <Link href="https://skytemple.org">SkyTemple</Link>, a tool to
                make ROMhacks of Pokémon Mystery Dungeon: Explorers of Sky
              </li>
              <li>
                <Link href="https://projectpokemon.org/home/files/file/4235-skytemple-randomizer/">
                  SkyTemple Randomizer
                </Link>
                , a program that randomizes all of the Pokémon in Explorers of
                Sky.
              </li>
              <li>
                <Link href="https://github.com/audinowho/PMDODump">PMDO</Link>,
                a Pokémon Mystery Dungeon fangame and fangame engine
              </li>
              <li>
                <Link href="https://projectpokemon.org/home/forums/topic/59548-dreamnexus-a-rom-editor-for-pok%C3%A9mon-mystery-dungeon-rescue-team-dx/">
                  DreamNexus
                </Link>
                , a ROM editor for Rescue Team DX
              </li>
              <li>
                <Link href="https://pokemon-auto-chess.com">
                  Pokemon Auto Chess
                </Link>
                , an Auto Chess web based fan game
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </Box>
  )
}
