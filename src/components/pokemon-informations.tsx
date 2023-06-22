import Credits from "./credits"
import Emotions from "./emotions"
import { formatDate } from "./pokemon-thumbnail"
import SpritePreview from "./sprite-preview"
import { Dungeon } from "../types/enum"
import { useRef } from "react"
import { MonsterForm } from "../generated/graphql"
import Bounty from "./bounty"
import { Box, Grid, Link, Paper, Typography } from "@mui/material"

export default function PokemonInformations(props: {
  info: MonsterForm
  infoKey: number
}) {
  const bg = useRef<Dungeon>(
    Object.keys(Dungeon)[
      Math.floor(Math.random() * Object.keys(Dungeon).length)
    ] as Dungeon
  )
  const portraitDate = props.info.portraits.modifiedDate
    ? new Date(props.info.portraits.modifiedDate)
    : undefined
  const spriteDate = props.info.sprites.modifiedDate
    ? new Date(props.info.sprites.modifiedDate)
    : undefined
  const portraitSheetUrl = props.info.portraits.sheetUrl ? (
    <Link target="_blank" href={props.info.portraits.sheetUrl}>
      <Typography>Download all portraits</Typography>
    </Link>
  ) : null
  const portraitRecolorSheetUrl = props.info.portraits.recolorSheetUrl ? (
    <Link target="_blank" href={props.info.portraits.recolorSheetUrl}>
      <Typography>Download recolor portraits</Typography>
    </Link>
  ) : null
  const zipUrl = props.info.sprites.zipUrl ? (
    <Link target="_blank" href={props.info.sprites.zipUrl}>
      <Typography>Download all sprites</Typography>
    </Link>
  ) : null
  const spriteRecolorSheetUrl = props.info.sprites.recolorSheetUrl ? (
    <Link target="_blank" href={props.info.sprites.recolorSheetUrl}>
      <Typography> Download recolor sprites</Typography>
    </Link>
  ) : null
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item>
          <Typography fontWeight="bold" variant="h5">
            Portraits
          </Typography>
        </Grid>
        <Grid item>
          <Typography>{getLastModification(portraitDate)}</Typography>
        </Grid>
        <Grid item>
          <Bounty bounty={props.info.portraits.bounty} />
        </Grid>
        <Grid item>{portraitSheetUrl}</Grid>
        <Grid item>{portraitRecolorSheetUrl}</Grid>
      </Grid>
      <Credits
        primary={props.info.portraits.creditPrimary}
        secondary={props.info.portraits.creditSecondary}
      />
      {props.info.portraits.emotions.length !== 0 ? (
        <Emotions
          emotions={props.info.portraits.emotions.concat(
            props.info.portraits.emotionsFlipped
              ? props.info.portraits.emotionsFlipped
              : []
          )}
        />
      ) : (
        <Typography variant="h5">No portraits available for now.</Typography>
      )}
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          <Grid item>
            <Typography fontWeight="bold" variant="h5">
              Sprites
            </Typography>
          </Grid>
          <Grid item>
            <Typography>{getLastModification(spriteDate)}</Typography>
          </Grid>
          <Grid item>
            <Bounty bounty={props.info.sprites.bounty} />
          </Grid>
          <Grid item>{zipUrl}</Grid>
          <Grid item>{spriteRecolorSheetUrl}</Grid>
        </Grid>
        <Credits
          primary={props.info.sprites.creditPrimary}
          secondary={props.info.sprites.creditSecondary}
        />
      </Box>
      {props.info.sprites.actions.length !== 0 ? (
        <Grid container spacing={2} sx={{ mt: 3 }}>
          {props.info.sprites.actions.map((k) =>
            k.__typename === "Sprite" && props.info.sprites.animDataXml ? (
              <Grid item key={k.action}>
                <Paper elevation={2}>
                  <SpritePreview
                    dungeon={bg.current}
                    sprite={k}
                    animDataUrl={props.info.sprites.animDataXml}
                  />
                </Paper>
              </Grid>
            ) : null
          )}
        </Grid>
      ) : (
        <Typography variant="h5">No sprites available for now.</Typography>
      )}
    </Box>
  )
}

function getLastModification(t: Date | undefined) {
  if (t) {
    return "Modified at " + formatDate(t.getTime())
  }
  return ""
}
