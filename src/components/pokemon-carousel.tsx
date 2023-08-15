/* eslint-disable no-case-declarations */
import { useMemo } from "react"
import { Monster, useCarrouselQuery } from "../generated/graphql"
import { RankMethod } from "../types/enum"
import PokemonThumbnail from "./pokemon-thumbnail"
import { Grid, Typography } from "@mui/material"
import { getMonsterMaxPortraitBounty, getMonsterMaxSpriteBounty } from '../util'
import { Parameters, PhaseCategory } from '../Home'

function rankMonsters(rankBy: RankMethod, a: Monster, b: Monster) {
  switch (rankBy) {
    case RankMethod.POKEDEX_NUMBER:
      return a.id - b.id;
    case RankMethod.LAST_MODIFICATION:
      const dap = new Date(a.manual?.portraits.modifiedDate);
      const dbp = new Date(b.manual?.portraits.modifiedDate);
      const das = new Date(a.manual?.sprites.modifiedDate);
      const dbs = new Date(b.manual?.sprites.modifiedDate);
      return Math.max(dbp.getTime(), dbs.getTime()) -
        Math.max(dap.getTime(), das.getTime());
    case RankMethod.NAME:
      return a.name.localeCompare(b.name);
    case RankMethod.PORTRAIT_AUTHOR:
      const aName = a.manual?.portraits.creditPrimary?.name;
      const bName = b.manual?.portraits.creditPrimary?.name;
      if (!aName || !bName) return aName ? -1 : 1;
      return aName.localeCompare(bName)
    case RankMethod.SPRITE_AUTHOR:
      const aNameSprite = a.manual?.sprites.creditPrimary?.name;
      const bNameSprite = b.manual?.sprites.creditPrimary?.name;
      if (!aNameSprite || !bNameSprite) return aNameSprite ? -1 : 1;
      return aNameSprite.localeCompare(bNameSprite);
    case RankMethod.PORTRAIT_BOUNTY:
      return getMonsterMaxPortraitBounty(b) - getMonsterMaxPortraitBounty(a);
    case RankMethod.SPRITE_BOUNTY:
      return getMonsterMaxSpriteBounty(b) - getMonsterMaxSpriteBounty(a);
  }
}

function filterMonster(
  monsters: Monster[],
  currentText: string,
  filterParameters: Parameters<PhaseCategory>[],
  rankBy: RankMethod
) {
  const lowerCaseText = currentText.toLowerCase()
  return monsters
    .filter(({ name, forms, id }) =>
      name.toLowerCase().includes(lowerCaseText) ||
      forms.some(({ portraits: { creditPrimary, creditSecondary } }) =>
        creditPrimary?.name?.toLowerCase().includes(lowerCaseText) ||
        creditSecondary.some(({ name }) => name?.toLowerCase().includes(lowerCaseText))
      ) ||
      forms.some(({ sprites: { creditPrimary, creditSecondary } }) =>
        creditPrimary?.name?.toLowerCase().includes(lowerCaseText) ||
        creditSecondary.some(({ name }) => name?.toLowerCase().includes(lowerCaseText))
      ) ||
      id.toString().includes(lowerCaseText)
    )
    .filter(({ forms }) => {
      const activeFilters = filterParameters.filter(({ state: [active] }) => active);
      return !activeFilters.length ||
        forms.some(form => activeFilters.some(({ value: { type, phase } }) => phase == form[type].phase))
    })
    .sort((a, b) => rankMonsters(rankBy, a, b) ?? 0)
}

interface Props {
  currentText: string
  rankBy: RankMethod
  ids: number[]
  showParameters: Record<string, Parameters<RankMethod>>
  filterParameters: Parameters<PhaseCategory>[]
}
export default function PokemonCarousel({ currentText, rankBy, ids, showParameters, filterParameters }: Props) {
  const doesShowParameters = Object.fromEntries(Object.entries(showParameters).map(param => [param[0], param[1].state[0]]));
  const { portraitAuthor, spriteAuthor, portraitBounty, spriteBounty, lastModification } = doesShowParameters;
  const withPortraitPhases = filterParameters.some(x => x.state[0] && x.value.type == 'portraits');
  const withSpritePhases = filterParameters.some(x => x.state[0] && x.value.type == 'sprites');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loading, error, data, refetch, fetchMore } = useCarrouselQuery({
    variables: {
      ids,
      withPortraitBounty: portraitBounty,
      withSpriteBounty: spriteBounty,
      withModifiedDate: lastModification,
      withPortraitPhases,
      withSpritePhases,
      withCredits:
        portraitAuthor ||
        spriteAuthor ||
        currentText !== "",
      withForms:
        portraitAuthor ||
        spriteAuthor ||
        portraitBounty ||
        spriteBounty ||
        currentText !== "" ||
        withPortraitPhases ||
        withSpritePhases
    }
  })
  const visibleMonsters = useMemo(() => {
    const monsters = (data?.monster ?? []) as Monster[];
    return filterMonster(
      monsters,
      currentText,
      filterParameters,
      rankBy
    )
  }, [
    data,
    currentText,
    filterParameters,
    rankBy
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
    <Grid container spacing={2} justifyContent={"center"}>
      {visibleMonsters.map(sprite => (
        <Grid item key={sprite.id}>
          <PokemonThumbnail
            infoKey={sprite.rawId}
            info={sprite}
            doesShowParameters={doesShowParameters}
          />
        </Grid>
      ))}
    </Grid>
  )
}