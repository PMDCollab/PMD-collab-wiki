import { Link } from "react-router-dom"
import { Paper, Typography, useMediaQuery, useTheme } from "@mui/material"
import { formatDate, getFormBounty, getMonsterBounty, getUniqueMonsterName, thumbnailScale } from '../util'
import { MonsterFormWithRef } from "./pokemon-carousel"
import { Maybe } from '../generated/graphql'
import { MutableRefObject, useContext } from 'react'
import { Context } from '../Home'

interface Props {
  form: MonsterFormWithRef
  infoKey: string
  isSpeciesThumbnail: boolean
  creditedMonsRef: MutableRefObject<Record<string, HTMLInputElement | null>>
}
export default function PokemonThumbnail({
  form: { form, monster, formIndex },
  infoKey,
  isSpeciesThumbnail,
  creditedMonsRef
}: Props) {
  const { toggleState, miscState } = useContext(Context)!;
  const { creditsMode, showFormName } = miscState;
  const uniqueName = getUniqueMonsterName(monster, form);
  const boxScale = useMediaQuery(useTheme().breakpoints.down("md")) ? 0.75 : 1;
  const boxSize = 80 * boxScale;
  const {
    index, spriteAuthor, portraitAuthor, lastModification,
    portraitBounty, spriteBounty
  } = Object.fromEntries(toggleState);
  const textBoxStyle = { width: boxSize, height: 25 * boxScale };
  const textBoxWithResize = (name?: Maybe<string>) => ({
    ...textBoxStyle,
    fontSize: `${thumbnailScale(name) * boxScale}em`,
    lineHeight: `${1.2 / thumbnailScale(name) * boxScale}em`
  })
  const insideThumbnail = <Paper
    sx={{ minWidth: boxSize }}
    elevation={2}
  >
    {form.portraits.previewEmotion?.url ? (
      <img
        src={form.portraits.previewEmotion.url}
        style={{ height: boxSize, imageRendering: "pixelated" }}
        loading='lazy'
      />
    ) : (
      <Typography variant="h4" align="center" sx={{ height: boxSize, display: "grid", marginBottom: 13 / 15, placeItems: "center" }}>
        ?
      </Typography>
    )}
    <Typography
      align="center" color="GrayText" noWrap sx={textBoxWithResize(monster.name)}
    >
      {monster.name}
    </Typography>
    {showFormName && (
      <Typography color="GrayText" align="center" noWrap sx={textBoxWithResize(form.fullName)}>
        {form.fullName}
      </Typography>
    )}
    {index && <Typography align="center" color="GrayText" noWrap sx={{ width: boxSize, height: 25 }}>
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
      <Typography align="center" color="GrayText" noWrap sx={textBoxStyle} fontSize={16 * boxScale}>
        {formatDate(Math.max(
          form.portraits.modifiedDate && new Date(form.portraits.modifiedDate).getTime() || 0,
          form.sprites.modifiedDate && new Date(form.sprites.modifiedDate).getTime() || 0
        ))}
      </Typography>
    )}
    {portraitBounty && (
      <Typography color="GrayText" align="center" noWrap sx={textBoxStyle} fontSize={16 * boxScale}>
        {isSpeciesThumbnail ? getMonsterBounty(monster, 'portraits') : getFormBounty(form, 'portraits')} gp
      </Typography>
    )}
    {spriteBounty && (
      <Typography color="GrayText" align="center" noWrap sx={textBoxStyle} fontSize={16 * boxScale}>
        {isSpeciesThumbnail ? getMonsterBounty(monster, 'sprites') : getFormBounty(form, 'sprites')} gp
      </Typography>
    )}
  </Paper>
  return creditsMode ?
    <div className="credit-label">
      <label htmlFor={uniqueName} style={{ cursor: 'pointer' }}>
        <input type="checkbox" name={uniqueName} id={uniqueName} ref={el => creditedMonsRef.current[uniqueName] = el} />
        {insideThumbnail}
      </label>
    </div> :
    <Link to={`/${infoKey}?form=${formIndex}`} style={{ transform: "scale(0.5)" }}>
      {insideThumbnail}
    </Link>
}