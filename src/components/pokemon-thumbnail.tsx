import { faCoins } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ReactElement } from "react"
import { Link } from "react-router-dom"
import { Monster } from "../generated/graphql"
import { Grid, Paper, Typography } from "@mui/material"

export default function PokemonThumbnail(props: {
  info: Monster
  infoKey: string
  showIndex: boolean
  showSpriteAuthor: boolean
  showPortraitAuthor: boolean
  showLastModification: boolean
  showPortraitBounty: boolean
  showSpriteBounty: boolean
}) {
  let image: ReactElement | null = null
  let date: ReactElement | null = null
  let index: ReactElement | null = null
  let portraitAuthor: ReactElement | null = null
  let spriteAuthor: ReactElement | null = null
  let portraitBounty: ReactElement | null = null
  let spriteBounty: ReactElement | null = null

  if (props.showPortraitAuthor) {
    portraitAuthor = (
      <Typography align="center" color="GrayText" variant="subtitle2">
        {props.info?.manual?.portraits?.creditPrimary?.name}
      </Typography>
    )
  }

  if (props.showSpriteAuthor) {
    spriteAuthor = (
      <Typography align="center" color="GrayText" variant="subtitle2">
        {props.info.manual?.sprites.creditPrimary?.name}
      </Typography>
    )
  }

  if (props.showIndex) {
    index = (
      <Typography align="center" color="GrayText" variant="subtitle2">
        {props.infoKey}
      </Typography>
    )
  }

  if (props.showLastModification) {
    const portraitDate = new Date(props.info.manual?.portraits.modifiedDate)
    const spriteDate = new Date(props.info.manual?.sprites.modifiedDate)
    date = (
      <Typography align="center" color="GrayText" variant="subtitle2">
        {formatDate(Math.max(portraitDate.getTime(), spriteDate.getTime()))}
      </Typography>
    )
  }

  if (props.showPortraitBounty) {
    const bounties = new Array<number>()
    props.info.forms.forEach((f) => {
      f.portraits.bounty.exists
        ? bounties.push(f.portraits.bounty.exists)
        : null
      f.portraits.bounty.full ? bounties.push(f.portraits.bounty.full) : null
      f.portraits.bounty.incomplete
        ? bounties.push(f.portraits.bounty.incomplete)
        : null
    })
    portraitBounty = (
      <Grid container>
        <Typography color="GrayText" variant="subtitle2">
          {bounties.length > 0 ? Math.max(...bounties) : 0}
        </Typography>
        <FontAwesomeIcon icon={faCoins} size="sm" />
      </Grid>
    )
  }

  if (props.showSpriteBounty) {
    const bounties = new Array<number>()
    props.info.forms.forEach((f) => {
      f.sprites.bounty.exists ? bounties.push(f.sprites.bounty.exists) : null
      f.sprites.bounty.full ? bounties.push(f.sprites.bounty.full) : null
      f.sprites.bounty.incomplete
        ? bounties.push(f.sprites.bounty.incomplete)
        : null
    })
    spriteBounty = (
      <Grid container>
        <Typography align="center" color="GrayText" variant="subtitle2">
          {bounties.length > 0 ? Math.max(...bounties) : 0}
        </Typography>
        <FontAwesomeIcon icon={faCoins} size="sm" />
      </Grid>
    )
  }

  if (props.info.manual?.portraits.previewEmotion?.url) {
    image = (
      <img
        src={props.info.manual.portraits.previewEmotion?.url}
        style={{ height: 40, imageRendering: "pixelated" }}
      />
    )
  } else {
    image = <Typography variant="h4">?</Typography>
  }

  return (
    <Link to={`/${props.infoKey}`}>
      <Paper
        sx={{
          maxWidth: 40,
          minWidth: 40,
          maxHeight:
            index ||
            portraitAuthor ||
            spriteAuthor ||
            date ||
            portraitBounty ||
            spriteBounty
              ? "inherit"
              : 40
        }}
        elevation={2}
      >
        {image}
        {index}
        {portraitAuthor}
        {spriteAuthor}
        {date}
        {portraitBounty}
        {spriteBounty}
      </Paper>
    </Link>
  )
}

export function formatDate(n: number | undefined) {
  if (n) {
    const date = new Date(n)
    return (
      pad(date.getDate()) +
      "/" +
      pad(date.getMonth() + 1) +
      "/" +
      date.getFullYear()
    )
  } else {
    return ""
  }
}

export function pad(number: number) {
  if (number < 10) {
    return "0" + number
  }
  return number
}
