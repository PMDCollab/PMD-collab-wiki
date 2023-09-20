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
  const textBoxStyle = { width: 80, height: 25 };
  const textBoxWithResize = {
    ...textBoxStyle,
    fontSize: `${thumbnailScale(monster.name)}em`,
    lineHeight: `${1.2 / thumbnailScale(monster.name)}em`
  }
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
          <Typography variant="h4" align="center" sx={{ height: 80, display: "grid", marginBottom: 13 / 15, placeItems: "center" }}>
            ?
          </Typography>
        )}
        <Typography
          align="center" color="GrayText" noWrap sx={textBoxWithResize}
        >
          {monster.name}
        </Typography>
        {showForms && (
          <Typography color="GrayText" align="center" noWrap sx={textBoxWithResize}>
            {form.fullName}
          </Typography>
        )}
        {index && <Typography align="center" color="GrayText" noWrap sx={{ width: 80, height: 25 }}>
          {infoKey}
        </Typography>}
        {portraitAuthor && (
          <Typography align="center" color="GrayText" noWrap sx={textBoxWithResize}>
            {form.portraits.creditPrimary?.name}
          </Typography>
        )}
        {spriteAuthor && (
          <Typography align="center" color="GrayText" noWrap sx={textBoxWithResize}>
            {form.sprites.creditPrimary?.name}
          </Typography>
        )}
        {lastModification && (
          <Typography align="center" color="GrayText" noWrap sx={textBoxStyle}>
            {formatDate(Math.max(
              new Date(form.portraits.modifiedDate).getTime(),
              new Date(form.sprites.modifiedDate).getTime()
            ))}
          </Typography>
        )}
        {portraitBounty && (
          <Typography color="GrayText" align="center" noWrap sx={textBoxStyle}>
            {isSpeciesThumbnail ? getMonsterMaxPortraitBounty(monster) : getFormMaxPortraitBounty(form)} gp
          </Typography>
        )}
        {spriteBounty && (
          <Typography color="GrayText" align="center" noWrap sx={textBoxStyle}>
            {isSpeciesThumbnail ? getMonsterMaxSpriteBounty(monster) : getFormMaxSpriteBounty(form)} gp
          </Typography>
        )}
      </Paper>
    </Link>
  )
}