import { Checkbox, FormControlLabel, Grid, Typography } from "@mui/material"
import { Dispatch, SetStateAction } from "react"

export default function DisplayParameters(props: {
  setShowIndex: Dispatch<SetStateAction<boolean>>
  setPortraitAuthor: Dispatch<SetStateAction<boolean>>
  setSpriteAuthor: Dispatch<SetStateAction<boolean>>
  setShowLastModification: Dispatch<SetStateAction<boolean>>
  setShowPortraitBounty: Dispatch<SetStateAction<boolean>>
  setShowSpriteBounty: Dispatch<SetStateAction<boolean>>
  setShowOnlyFullyFeaturedSprites: Dispatch<SetStateAction<boolean>>
  setShowOnlyFullyFeaturedPortraits: Dispatch<SetStateAction<boolean>>
  showPortraitAuthor: boolean
  showSpriteAuthor: boolean
  showIndex: boolean
  showLastModification: boolean
  showPortraitBounty: boolean
  showSpriteBounty: boolean
  showOnlyFullyFeaturedSprites: boolean
  showOnlyFullyFeaturedPortraits: boolean
}) {
  return (
    <Grid container spacing={2}>
      <Grid item>
        <FormControlLabel
          label={<Typography color="text.secondary">Index</Typography>}
          control={
            <Checkbox
              checked={props.showIndex}
              onChange={(e) => {
                props.setShowIndex(e.target.checked)
              }}
            />
          }
        />
        <FormControlLabel
          label={
            <Typography color="text.secondary">Portrait Author</Typography>
          }
          control={
            <Checkbox
              checked={props.showPortraitAuthor}
              onChange={(e) => {
                props.setPortraitAuthor(e.target.checked)
              }}
            />
          }
        />
        <FormControlLabel
          label={<Typography color="text.secondary">Sprite Author</Typography>}
          control={
            <Checkbox
              checked={props.showSpriteAuthor}
              onChange={(e) => {
                props.setSpriteAuthor(e.target.checked)
              }}
            />
          }
        />
        <FormControlLabel
          label={<Typography color="text.secondary">Last Change</Typography>}
          control={
            <Checkbox
              checked={props.showLastModification}
              onChange={(e) => {
                props.setShowLastModification(e.target.checked)
              }}
            />
          }
        />
        <FormControlLabel
          label={
            <Typography color="text.secondary">Portrait bounty</Typography>
          }
          control={
            <Checkbox
              checked={props.showPortraitBounty}
              onChange={(e) => {
                props.setShowPortraitBounty(e.target.checked)
              }}
            />
          }
        />
        <FormControlLabel
          label={<Typography color="text.secondary">Sprite bounty</Typography>}
          control={
            <Checkbox
              checked={props.showSpriteBounty}
              onChange={(e) => {
                props.setShowSpriteBounty(e.target.checked)
              }}
            />
          }
        />
        <FormControlLabel
          label={
            <Typography color="text.secondary">
              Fully-featured portraits
            </Typography>
          }
          control={
            <Checkbox
              checked={props.showOnlyFullyFeaturedPortraits}
              onChange={(e) => {
                props.setShowOnlyFullyFeaturedPortraits(e.target.checked)
              }}
            />
          }
        />
        <FormControlLabel
          label={
            <Typography color="text.secondary">
              Fully-featured sprites
            </Typography>
          }
          control={
            <Checkbox
              checked={props.showOnlyFullyFeaturedSprites}
              onChange={(e) => {
                props.setShowOnlyFullyFeaturedSprites(e.target.checked)
              }}
            />
          }
        />
      </Grid>
    </Grid>
  )
}
