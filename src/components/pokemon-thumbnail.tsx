import { ReactElement } from "react"
import { Link } from "react-router-dom"
import { Monster } from "../generated/graphql"
import { Paper, Typography } from "@mui/material"
import { formatDate } from '../util'

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
  const image = props.info.manual?.portraits.previewEmotion?.url ? (
    <img
      src={props.info.manual.portraits.previewEmotion?.url}
      style={{ height: 80, imageRendering: "pixelated" }}
    />
  ) : (
    <Typography variant="h4" align="center" sx={{ height: 80 }}>
      ?
    </Typography>
  )
  const date = props.showLastModification && (
    <Typography align="center" color="GrayText" noWrap sx={{ width: "80px" }}>
      {formatDate(Math.max(
        new Date(props.info.manual?.portraits.modifiedDate).getTime(),
        new Date(props.info.manual?.sprites.modifiedDate).getTime()
      ))}
    </Typography>
  )
  const index = props.showIndex && (
    <Typography align="center" color="GrayText" noWrap sx={{ width: "80px" }}>
      {props.infoKey}
    </Typography>
  )
  const portraitAuthor = props.showPortraitAuthor && (
    <Typography align="center" color="GrayText" noWrap sx={{ width: "80px" }}>
      {props.info?.forms[0]?.portraits?.creditPrimary?.name}
    </Typography>
  )
  const spriteAuthor = props.showSpriteAuthor && (
    <Typography align="center" color="GrayText" noWrap sx={{ width: "80px" }}>
      {props.info.forms[0]?.sprites.creditPrimary?.name}
    </Typography>
  )
  const portraitBounty = props.showPortraitBounty && (
    <Typography color="GrayText" align="center" noWrap>
      {props.info.forms.reduce((a, b) => Math.max(
        a,
        b.portraits.bounty.exists ?? 0,
        b.portraits.bounty.incomplete ?? 0,
        b.portraits.bounty.full ?? 0
      ), 0)} gp
    </Typography>
  )
  const spriteBounty = props.showSpriteBounty && (
    <Typography color="GrayText" align="center" noWrap>
      {props.info.forms.reduce((a, b) => Math.max(
        a,
        b.sprites.bounty.exists ?? 0,
        b.sprites.bounty.incomplete ?? 0,
        b.sprites.bounty.full ?? 0
      ), 0)} gp
    </Typography>
  )

  return (
    <Link to={`/${props.infoKey}`}>
      <Paper
        sx={{
          minWidth: 80
        }}
        elevation={2}
      >
        {image}
        <Typography
          align="center"
          color="GrayText"
          noWrap
          sx={{ width: "80px" }}
        >
          {props.info.name}
        </Typography>
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