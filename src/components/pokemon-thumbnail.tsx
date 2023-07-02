import { ReactElement } from "react"
import { Link } from "react-router-dom"
import { Monster } from "../generated/graphql"
import { Paper, Typography } from "@mui/material"
import { formatDate, getMonsterMaxPortraitBounty, getMonsterMaxSpriteBounty } from '../util'

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
      {props.info.manual?.portraits.creditPrimary?.name}
    </Typography>
  )
  const spriteAuthor = props.showSpriteAuthor && (
    <Typography align="center" color="GrayText" noWrap sx={{ width: "80px" }}>
      {props.info.manual?.sprites.creditPrimary?.name}
    </Typography>
  )
  const portraitBounty = props.showPortraitBounty && (
    <Typography color="GrayText" align="center" noWrap>
      {getMonsterMaxPortraitBounty(props.info)} gp
    </Typography>
  )
  const spriteBounty = props.showSpriteBounty && (
    <Typography color="GrayText" align="center" noWrap>
      {getMonsterMaxSpriteBounty(props.info)} gp
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