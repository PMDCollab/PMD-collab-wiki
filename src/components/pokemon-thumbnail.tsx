import { ReactElement } from "react"
import { Link } from "react-router-dom"
import { Monster } from "../generated/graphql"
import { Paper, Typography } from "@mui/material"

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
      <Typography align="center" color="GrayText" noWrap sx={{ width: "80px" }}>
        {props.info?.manual?.portraits?.creditPrimary?.name}
      </Typography>
    )
  }

  if (props.showSpriteAuthor) {
    spriteAuthor = (
      <Typography align="center" color="GrayText" noWrap sx={{ width: "80px" }}>
        {props.info.manual?.sprites.creditPrimary?.name}
      </Typography>
    )
  }

  if (props.showIndex) {
    index = (
      <Typography align="center" color="GrayText" noWrap sx={{ width: "80px" }}>
        {props.infoKey}
      </Typography>
    )
  }

  if (props.showLastModification) {
    const portraitDate = new Date(props.info.manual?.portraits.modifiedDate)
    const spriteDate = new Date(props.info.manual?.sprites.modifiedDate)
    date = (
      <Typography align="center" color="GrayText" noWrap sx={{ width: "80px" }}>
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
      <Typography color="GrayText" align="center" noWrap>
        {bounties.length > 0 ? Math.max(...bounties) : 0} gp
      </Typography>
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
      <Typography align="center" color="GrayText" noWrap>
        {bounties.length > 0 ? Math.max(...bounties) : 0} gp
      </Typography>
    )
  }

  if (props.info.manual?.portraits.previewEmotion?.url) {
    image = (
      <img
        src={props.info.manual.portraits.previewEmotion?.url}
        style={{ height: 80, imageRendering: "pixelated" }}
      />
    )
  } else {
    image = <Typography variant="h4">?</Typography>
  }

  return (
    <Link to={`/${props.infoKey}`}>
      <Paper
        sx={{
          minWidth: 80,
          maxHeight:
            index ||
            portraitAuthor ||
            spriteAuthor ||
            date ||
            portraitBounty ||
            spriteBounty
              ? "inherit"
              : 80
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
      date.getFullYear().toString().slice(2)
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
