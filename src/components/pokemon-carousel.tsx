/* eslint-disable no-case-declarations */
import { useMemo } from "react"
import { Monster, Phase, useCarrouselQuery } from "../generated/graphql"
import { RankMethod } from "../types/enum"
import PokemonThumbnail from "./pokemon-thumbnail"
import { Grid, Typography } from "@mui/material"
import { getMonsterMaxPortraitBounty, getMonsterMaxSpriteBounty } from '../util'

const rankMethodToRankFunction: Record<RankMethod, (a: Monster, b: Monster) => number> = {
  [RankMethod.POKEDEX_NUMBER]: (a, b) => a.id - b.id,
  [RankMethod.LAST_MODIFICATION]: (a, b) => {
    const dap = new Date(a.manual?.portraits.modifiedDate);
    const dbp = new Date(b.manual?.portraits.modifiedDate);
    const das = new Date(a.manual?.sprites.modifiedDate);
    const dbs = new Date(b.manual?.sprites.modifiedDate);
    return Math.max(dbp.getTime(), dbs.getTime()) -
      Math.max(dap.getTime(), das.getTime());
  },
  [RankMethod.NAME]: (a, b) => a.name?.localeCompare(b.name),
  [RankMethod.PORTRAIT_AUTHOR]: (a, b) => {
    const aName = a.manual?.portraits.creditPrimary?.name;
    const bName = b.manual?.portraits.creditPrimary?.name;
    return aName && bName ? aName.localeCompare(bName) : aName ? -1 : 1;
  },
  [RankMethod.SPRITE_AUTHOR]: (a, b) => {
    const aName = a.manual?.sprites.creditPrimary?.name;
    const bName = b.manual?.sprites.creditPrimary?.name;
    return aName && bName ? aName.localeCompare(bName) : aName ? -1 : 1;
  },
  [RankMethod.PORTRAIT_BOUNTY]: (a, b) =>
    getMonsterMaxPortraitBounty(b) - getMonsterMaxPortraitBounty(a),
  [RankMethod.SPRITE_BOUNTY]: (a, b) =>
    getMonsterMaxSpriteBounty(b) - getMonsterMaxSpriteBounty(a),
}

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
      (!showOnlyFullyFeaturedPortraits || k.manual?.portraits.phase === Phase.Full) &&
      (!showOnlyFullyFeaturedSprites || k.manual?.sprites.phase === Phase.Full)
    )
    .sort((a, b) => rankMethodToRankFunction[rankBy]?.(a as Monster, b as Monster) ?? 0)
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
    const monsters = (data?.monster ?? []) as Monster[]
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