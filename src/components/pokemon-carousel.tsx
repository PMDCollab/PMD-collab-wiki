/* eslint-disable no-case-declarations */
import { useMemo } from "react"
import { Monster, Phase, useCarrouselQuery } from "../generated/graphql"
import { RankMethod } from "../types/enum"
import PokemonThumbnail from "./pokemon-thumbnail"
import { Grid, Typography } from "@mui/material"

function filterMonster(
  monsters: Monster[],
  currentText: string,
  showOnlyFullyFeaturedPortraits: boolean,
  showOnlyFullyFeaturedSprites: boolean,
  rankBy: RankMethod
) {
  const lowerCaseText = currentText.toLowerCase()
  return monsters
    .filter(
      (k) =>
        k?.name?.toLowerCase().includes(lowerCaseText) ||
        k?.forms.find(
          (f) =>
            f.portraits.creditPrimary?.name
              ?.toLowerCase()
              .includes(lowerCaseText) ||
            f.portraits.creditSecondary?.find((c) =>
              c.name?.toLowerCase().includes(lowerCaseText)
            )
        ) ||
        k?.forms.find(
          (f) =>
            f.sprites.creditPrimary?.name
              ?.toLowerCase()
              .includes(lowerCaseText) ||
            f.sprites.creditSecondary?.find((c) =>
              c.name?.toLowerCase().includes(lowerCaseText)
            )
        ) ||
        k?.id.toString().includes(lowerCaseText)
    )
    .filter((k) =>
      showOnlyFullyFeaturedPortraits
        ? k.manual?.portraits.phase === Phase.Full
        : true
    )
    .filter((k) =>
      showOnlyFullyFeaturedSprites
        ? k.manual?.sprites.phase === Phase.Full
        : true
    )
    .sort((a, b) => rankFunction(rankBy, a as Monster, b as Monster))
}

export default function PokemonCarousel(props: {
  currentText: string
  rankBy: RankMethod
  showIndex: boolean
  showPortraitAuthor: boolean
  showSpriteAuthor: boolean
  showLastModification: boolean
  showPortraitBounty: boolean
  showSpriteBounty: boolean
  showOnlyFullyFeaturedSprites: boolean
  showOnlyFullyFeaturedPortraits: boolean
  ids: number[]
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loading, error, data, refetch, fetchMore } = useCarrouselQuery({
    variables: {
      ids: props.ids,
      withPortraitBounty: props.showPortraitBounty,
      withSpriteBounty: props.showSpriteBounty,
      withModifiedDate: props.showLastModification,
      withFullyFeaturedPortrait: props.showOnlyFullyFeaturedPortraits,
      withFullyFeaturedSprite: props.showOnlyFullyFeaturedSprites,
      withCredits:
        props.showPortraitAuthor ||
        props.showSpriteAuthor ||
        props.currentText !== "",
      withForms:
        props.showPortraitAuthor ||
        props.showSpriteAuthor ||
        props.showPortraitBounty ||
        props.showSpriteBounty ||
        props.currentText !== ""
    }
  })
  const visibleMonsters = useMemo(() => {
    const monsters = (data?.monster ? data.monster : []) as Monster[]
    return filterMonster(
      monsters,
      props.currentText,
      props.showOnlyFullyFeaturedPortraits,
      props.showOnlyFullyFeaturedSprites,
      props.rankBy
    )
  }, [
    data,
    props.currentText,
    props.showOnlyFullyFeaturedPortraits,
    props.showOnlyFullyFeaturedSprites,
    props.rankBy
  ])

  if (loading) {
    return (
      <Typography variant="h5" align="center">
        Loading...
      </Typography>
    )
  }
  if (error) return <Typography>Error</Typography>

  return (
    <Grid container spacing={2}>
      {visibleMonsters.map((k) => (
        <Grid item key={k.id}>
          <PokemonThumbnail
            infoKey={k.rawId}
            info={k as Monster}
            showIndex={props.showIndex}
            showPortraitAuthor={props.showPortraitAuthor}
            showSpriteAuthor={props.showSpriteAuthor}
            showLastModification={props.showLastModification}
            showPortraitBounty={props.showPortraitBounty}
            showSpriteBounty={props.showSpriteBounty}
          />
        </Grid>
      ))}
    </Grid>
  )
}

function rankFunction(rankBy: RankMethod, a: Monster, b: Monster): number {
  let result: number | undefined = 0
  const aBounties = new Array<number>()
  const bBounties = new Array<number>()
  switch (rankBy) {
    case RankMethod.POKEDEX_NUMBER:
      result = a.id - b.id
      break

    case RankMethod.LAST_MODIFICATION:
      const dap = new Date(a.manual?.portraits.modifiedDate)
      const dbp = new Date(b.manual?.portraits.modifiedDate)
      const das = new Date(a.manual?.sprites.modifiedDate)
      const dbs = new Date(b.manual?.sprites.modifiedDate)
      result =
        Math.max(dbp.getTime(), dbs.getTime()) -
        Math.max(dap.getTime(), das.getTime())
      break

    case RankMethod.NAME:
      result = a.name?.localeCompare(b.name)
      break

    case RankMethod.PORTRAIT_AUTHOR:
      result = a.manual?.portraits?.creditPrimary?.name?.localeCompare(
        b.manual?.portraits?.creditPrimary?.name
          ? b.manual?.portraits?.creditPrimary?.name
          : ""
      )
      break

    case RankMethod.SPRITE_AUTHOR:
      result = a.manual?.sprites?.creditPrimary?.name?.localeCompare(
        b.manual?.sprites?.creditPrimary?.name
          ? b.manual?.sprites?.creditPrimary?.name
          : ""
      )
      break

    case RankMethod.PORTRAIT_BOUNTY:
      a.forms.forEach((f) => {
        f.portraits.bounty.exists
          ? aBounties.push(f.portraits.bounty.exists)
          : null
        f.portraits.bounty.full ? aBounties.push(f.portraits.bounty.full) : null
        f.portraits.bounty.incomplete
          ? aBounties.push(f.portraits.bounty.incomplete)
          : null
      })

      b.forms.forEach((f) => {
        f.portraits.bounty.exists
          ? bBounties.push(f.portraits.bounty.exists)
          : null
        f.portraits.bounty.full ? bBounties.push(f.portraits.bounty.full) : null
        f.portraits.bounty.incomplete
          ? bBounties.push(f.portraits.bounty.incomplete)
          : null
      })
      result = Math.max(...bBounties) - Math.max(...aBounties)
      break

    case RankMethod.SPRITE_BOUNTY:
      a.forms.forEach((f) => {
        f.sprites.bounty.exists ? aBounties.push(f.sprites.bounty.exists) : null
        f.sprites.bounty.full ? aBounties.push(f.sprites.bounty.full) : null
        f.sprites.bounty.incomplete
          ? aBounties.push(f.sprites.bounty.incomplete)
          : null
      })

      b.forms.forEach((f) => {
        f.sprites.bounty.exists ? bBounties.push(f.sprites.bounty.exists) : null
        f.sprites.bounty.full ? bBounties.push(f.sprites.bounty.full) : null
        f.sprites.bounty.incomplete
          ? bBounties.push(f.sprites.bounty.incomplete)
          : null
      })
      result = Math.max(...bBounties) - Math.max(...aBounties)
      break

    default:
      result = 0
      break
  }
  const r = result ? result : 0
  return r
}
