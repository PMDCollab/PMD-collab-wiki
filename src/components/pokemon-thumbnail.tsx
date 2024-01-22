import { Link } from "react-router-dom"
import { Paper, Typography } from "@mui/material"
import { formatDate, getFormBounty, getMonsterBounty, thumbnailScale } from '../util'
import { MonsterFormWithRef } from "./pokemon-carousel"
import { Maybe } from '../generated/graphql'
import { Toggle } from '../types/params'

interface Props {
  form: MonsterFormWithRef
  infoKey: string
  toggles: Map<Toggle, boolean>
  isSpeciesThumbnail?: boolean
  showForms: boolean
}
export default function PokemonThumbnail({
  form, form: { monster, formIndex },
  infoKey,
  toggles,
  isSpeciesThumbnail = false,
  showForms
}: Props) {
  const {
    index, spriteAuthor, portraitAuthor, lastModification,
    portraitBounty, spriteBounty
  } = Object.fromEntries(toggles);
  const textBoxStyle = { width: 80, height: 25 };
  const textBoxWithResize = (name?: Maybe<string>) => ({
    ...textBoxStyle,
    fontSize: `${thumbnailScale(name)}em`,
    lineHeight: `${1.2 / thumbnailScale(name)}em`
  })
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
            loading='lazy'
          />
        ) : (
          // TODO: Fix margin so that the image and text line up perfectly (6.93333px gap) -sec
          <Typography variant="h4" align="center" sx={{ height: 80, display: "grid", marginBottom: 13 / 15, placeItems: "center" }}>
            ?
          </Typography>
        )}
        <Typography
          align="center" color="GrayText" noWrap sx={textBoxWithResize(monster.name)}
        >
          {monster.name}
        </Typography>
        {showForms && (
          <Typography color="GrayText" align="center" noWrap sx={textBoxWithResize(form.fullName)}>
            {form.fullName}
          </Typography>
        )}
        {index && <Typography align="center" color="GrayText" noWrap sx={{ width: 80, height: 25 }}>
          {infoKey}
        </Typography>}
        {portraitAuthor && (
          <Typography align="center" color="GrayText" noWrap sx={textBoxWithResize(form.portraits.creditPrimary?.name)}>
            {form.portraits.creditPrimary?.name ?? "N/A"}
          </Typography>
        )}
        {spriteAuthor && (
          <Typography align="center" color="GrayText" noWrap sx={textBoxWithResize(form.sprites.creditPrimary?.name)}>
            {form.sprites.creditPrimary?.name ?? "N/A"}
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
            {isSpeciesThumbnail ? getMonsterBounty(monster ,'portraits') : getFormBounty(form, 'portraits')} gp
          </Typography>
        )}
        {spriteBounty && (
          <Typography color="GrayText" align="center" noWrap sx={textBoxStyle}>
            {isSpeciesThumbnail ? getMonsterBounty(monster, 'sprites') : getFormBounty(form, 'sprites')} gp
          </Typography>
        )}
      </Paper>
    </Link>
  )
}