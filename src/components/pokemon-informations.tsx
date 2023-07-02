import Credits from "./credits"
import Emotions from "./emotions"
import SpritePreview from "./sprite-preview"
import { Dungeon } from "../types/enum"
import { useRef } from "react"
import { MonsterForm } from "../generated/graphql"
import Bounty from "./bounty"
import { Box, Grid, Link, Paper, Typography } from "@mui/material"
import { getLastModification } from '../util'

export default function PokemonInformations(props: {
  info: MonsterForm
  infoKey: number
}) {
  const bg = useRef<Dungeon>(
    Object.keys(Dungeon)[
    Math.floor(Math.random() * Object.keys(Dungeon).length)
    ] as Dungeon
  )
  const { portraits, sprites } = props.info;
  const portraitDate = portraits.modifiedDate &&
    new Date(portraits.modifiedDate)
  const spriteDate = sprites.modifiedDate &&
    new Date(sprites.modifiedDate)
  const portraitSheetUrl = portraits.sheetUrl && (
    <Link target="_blank" href={portraits.sheetUrl}>
      <Typography>Download all portraits</Typography>
    </Link>
  )
  const portraitRecolorSheetUrl = portraits.recolorSheetUrl && (
    <Link target="_blank" href={portraits.recolorSheetUrl}>
      <Typography>Download recolor portraits</Typography>
    </Link>
  )
  const zipUrl = sprites.zipUrl && (
    <Link target="_blank" href={sprites.zipUrl}>
      <Typography>Download all sprites</Typography>
    </Link>
  )
  const spriteRecolorSheetUrl = sprites.recolorSheetUrl && (
    <Link target="_blank" href={sprites.recolorSheetUrl}>
      <Typography> Download recolor sprites</Typography>
    </Link>
  )
  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography fontWeight="bold" variant="h5">
            Portraits
          </Typography>
        </Grid>
        <Grid item>
          <Typography>{getLastModification(portraitDate)}</Typography>
        </Grid>
        <Grid item>
          <Bounty bounty={portraits.bounty} />
        </Grid>
        <Grid item>{portraitSheetUrl}</Grid>
        <Grid item>{portraitRecolorSheetUrl}</Grid>
      </Grid>
      <Credits
        primary={portraits.creditPrimary}
        secondary={portraits.creditSecondary}
      />
      {portraits.emotions.length ? (
        <Emotions
          emotions={portraits.emotions.concat(
            portraits.emotionsFlipped ?? []
          )}
        />
      ) : <Typography variant="h5">No portraits available for now.</Typography>}
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Typography fontWeight="bold" variant="h5">
              Sprites
            </Typography>
          </Grid>
          <Grid item>
            <Typography>{getLastModification(spriteDate)}</Typography>
          </Grid>
          <Grid item>
            <Bounty bounty={sprites.bounty} />
          </Grid>
          <Grid item>{zipUrl}</Grid>
          <Grid item>{spriteRecolorSheetUrl}</Grid>
        </Grid>
        <Credits
          primary={sprites.creditPrimary}
          secondary={sprites.creditSecondary}
        />
      </Box>
      {sprites.actions.length ? (
        <Grid container spacing={2} sx={{ mt: 3 }}>
          {sprites.actions.map(sprite =>
            sprite.__typename === "Sprite" && sprites.animDataXml && (
              <Grid item key={sprite.action}>
                <Paper elevation={2}>
                  <SpritePreview
                    dungeon={bg.current}
                    sprite={sprite}
                    animDataUrl={sprites.animDataXml}
                  />
                </Paper>
              </Grid>
            )
          )}
        </Grid>
      ) : <Typography variant="h5">No sprites available for now.</Typography>}
    </Box>
  )
}
