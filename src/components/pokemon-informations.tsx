import Credits, { Author } from "./credits"
import Emotions from "./emotions"
import SpritePreview from "./sprite-preview"
import { Dungeon } from "../types/enum"
import { Fragment, useRef } from "react"
import { MonsterForm, MonsterHistory } from "../generated/graphql"
import Bounty from "./bounty"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography
} from "@mui/material"
import { formatDate, getLastModification } from "../util"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

interface Props {
  info: MonsterForm
  infoKey: number
}
export default function PokemonInformations({
  info: { sprites, portraits }
}: Props) {
  const bg = useRef<Dungeon>(
    Object.keys(Dungeon)[
      Math.floor(Math.random() * Object.keys(Dungeon).length)
    ] as Dungeon
  )
  const portraitDate =
    portraits.modifiedDate && new Date(portraits.modifiedDate)
  const spriteDate = sprites.modifiedDate && new Date(sprites.modifiedDate)
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
    <Box>
      <Box sx={{ mt: 4, mb: 2 }}>
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
        ) : (
          <Typography variant="h5">No portraits available for now.</Typography>
        )}
      </Box>
      {portraits.history.length > 0 && (
        <History history={portraits.history} title="Portraits History" />
      )}
      <Divider />
      <Box sx={{ mt: 4, mb: 2 }}>
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
        {sprites.actions.length ? (
          <Grid container spacing={2} sx={{ mt: 3 }}>
            {sprites.actions.map(
              (sprite) =>
                sprite.__typename === "Sprite" &&
                sprites.animDataXml && (
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
        ) : (
          <Typography variant="h6">No sprites available for now.</Typography>
        )}
      </Box>

      {sprites.history.length > 0 && (
        <History history={sprites.history} title="Sprites History" />
      )}
      <Divider />
    </Box>
  )
}

export function History(props: { history: MonsterHistory[]; title: string }) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h6">{props.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {
          <List>
            {props.history
              .filter((entry) => !entry.obsolete)
              .map((entry, i) => (
                <Fragment key={i}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar sx={{ mr: 2 }}>
                      <Typography>{formatDate(entry.modifiedDate)}</Typography>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography color={"grayText"}>
                          {entry.modifications.map((m) => m + " ")}
                        </Typography>
                      }
                      secondary={<Author credit={entry.credit} />}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </Fragment>
              ))}
          </List>
        }
      </AccordionDetails>
    </Accordion>
  )
}
