import { Link } from "react-router-dom"
import { Monster } from "../generated/graphql"
import { Paper, Typography } from "@mui/material"
import { formatDate, getMonsterMaxPortraitBounty, getMonsterMaxSpriteBounty } from '../util'

interface Props {
  info: Monster
  infoKey: string
  doesShowParameters: Record<string, boolean>
}

export default function PokemonThumbnail({
  info, info: { manual, name },
  infoKey, doesShowParameters: {
    index, spriteAuthor, portraitAuthor, lastModification,
    portraitBounty, spriteBounty
  }
}: Props) {
  return (
    <Link to={`/${infoKey}`}>
      <Paper
        sx={{
          minWidth: 80
        }}
        elevation={2}
      >
        {manual?.portraits.previewEmotion?.url ? (
          <img
            src={manual.portraits.previewEmotion?.url}
            style={{ height: 80, imageRendering: "pixelated" }}
          />
        ) : (
          <Typography variant="h4" align="center" sx={{ height: 80 }}>
            ?
          </Typography>
        )}
        <Typography
          align="center"
          color="GrayText"
          noWrap
          sx={{ width: "80px" }}
        >
          {name}
        </Typography>
        {index && <Typography align="center" color="GrayText" noWrap sx={{ width: "80px" }}>
          {infoKey}
        </Typography>}
        {portraitAuthor && (
          <Typography align="center" color="GrayText" noWrap sx={{ width: "80px" }}>
            {manual?.portraits.creditPrimary?.name}
          </Typography>
        )}
        {spriteAuthor && (
          <Typography align="center" color="GrayText" noWrap sx={{ width: "80px" }}>
            {manual?.sprites.creditPrimary?.name}
          </Typography>
        )}
        {lastModification && (
          <Typography align="center" color="GrayText" noWrap sx={{ width: "80px" }}>
            {formatDate(Math.max(
              new Date(manual?.portraits.modifiedDate).getTime(),
              new Date(manual?.sprites.modifiedDate).getTime()
            ))}
          </Typography>
        )}
        {portraitBounty && (
          <Typography color="GrayText" align="center" noWrap>
            {getMonsterMaxPortraitBounty(info)} gp
          </Typography>
        )}
        {spriteBounty && (
          <Typography color="GrayText" align="center" noWrap>
            {getMonsterMaxSpriteBounty(info)} gp
          </Typography>
        )}
      </Paper>
    </Link>
  )
}