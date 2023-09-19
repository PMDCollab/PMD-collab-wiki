import { Link } from "react-router-dom"
import { Paper, Typography } from "@mui/material"
import { formatDate, getFormMaxPortraitBounty, getFormMaxSpriteBounty, getMonsterMaxPortraitBounty, getMonsterMaxSpriteBounty, thumbnailScale } from '../util'
import { MonsterFormWithRef } from "./pokemon-carousel"

interface Props {
  form: MonsterFormWithRef
  infoKey: string
  doesShowParameters: Record<string, boolean>
  isSpeciesThumbnail?: boolean
  showForms: boolean
}
export default function PokemonThumbnail({
  form, form: { monster, formIndex },
  infoKey,
  doesShowParameters: {
    index, spriteAuthor, portraitAuthor, lastModification,
    portraitBounty, spriteBounty
  },
  isSpeciesThumbnail = false,
  showForms
}: Props) {
  return (
    <Link to={`/${infoKey}?form=${formIndex}`}>
      <Paper
        sx={{ minWidth: 80 }}
        elevation={2}
      >
        {form.portraits.previewEmotion?.url ? (
          <img
            src={form.portraits.previewEmotion.url}
            style={{ height: 80, imageRendering: "pixelated" }}
          />
        ) : (
          // TODO: Fix margin so that the image and text line up perfectly (6.93333px gap) -sec
          <Typography variant="h4" align="center" sx={{ height: 80, display: "grid", marginBottom: 13/15, placeItems: "center" }}>
            ?
          </Typography>
        )}
        <Typography
          align="center" color="GrayText" noWrap sx={{
            width: 80,
            height: 25,
            fontSize: `${thumbnailScale(monster.name)}em`,
            lineHeight: `${1.2 / thumbnailScale(monster.name)}em`
          }}
        >
          {monster.name}
        </Typography>
        {showForms && (
          <Typography color="GrayText" align="center" noWrap sx={{
            width: 80,
            height: 25,
            fontSize: `${thumbnailScale(form.fullName)}em`,
            lineHeight: `${1.2 / thumbnailScale(form.fullName)}em`
          }}>
            {form.fullName}
          </Typography>
        )}
        {index && <Typography align="center" color="GrayText" noWrap sx={{ width: 80, height: 25 }}>
          {infoKey}
        </Typography>}
        {portraitAuthor && (
          <Typography align="center" color="GrayText" noWrap sx={{ width: 80, height: 25 }}>
            {form.portraits.creditPrimary?.name}
          </Typography>
        )}
        {spriteAuthor && (
          <Typography align="center" color="GrayText" noWrap sx={{ width: 80, height: 25 }}>
            {form.sprites.creditPrimary?.name}
          </Typography>
        )}
        {lastModification && (
          <Typography align="center" color="GrayText" noWrap sx={{ width: 80, height: 25 }}>
            {formatDate(Math.max(
              new Date(form.portraits.modifiedDate).getTime(),
              new Date(form.sprites.modifiedDate).getTime()
            ))}
          </Typography>
        )}
        {portraitBounty && (
          <Typography color="GrayText" align="center" noWrap sx={{ width: 80, height: 25 }}>
            {isSpeciesThumbnail ? getMonsterMaxPortraitBounty(monster) : getFormMaxPortraitBounty(form)} gp
          </Typography>
        )}
        {spriteBounty && (
          <Typography color="GrayText" align="center" noWrap sx={{ width: 80, height: 25 }}>
            {isSpeciesThumbnail ? getMonsterMaxSpriteBounty(monster) : getFormMaxSpriteBounty(form)} gp
          </Typography>
        )}
      </Paper>
    </Link>
  )
}