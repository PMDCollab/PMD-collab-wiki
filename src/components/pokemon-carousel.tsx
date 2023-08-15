/* eslint-disable no-case-declarations */
import { useMemo } from "react"
import { Monster, MonsterForm, useCarrouselQuery } from "../generated/graphql"
import { RankMethod } from "../types/enum"
import PokemonThumbnail from "./pokemon-thumbnail"
import { Grid, Typography } from "@mui/material"
import { getFormMaxPortraitBounty, getFormMaxSpriteBounty, getMonsterMaxPortraitBounty, getMonsterMaxSpriteBounty } from '../util'
import { Parameters, PhaseCategory } from '../Home'

export type MonsterFormWithRef = MonsterForm & { monster: Monster }

function rankMonsters(rankBy: RankMethod, a: MonsterFormWithRef, b: MonsterFormWithRef, splitForms: boolean) {
  switch (rankBy) {
    case RankMethod.POKEDEX_NUMBER:
      return a.monster.id - b.monster.id;
    case RankMethod.LAST_MODIFICATION:
      const dap = new Date(a.portraits.modifiedDate);
      const dbp = new Date(b.portraits.modifiedDate);
      const das = new Date(a.sprites.modifiedDate);
      const dbs = new Date(b.sprites.modifiedDate);
      return Math.max(dbp.getTime(), dbs.getTime()) -
        Math.max(dap.getTime(), das.getTime());
    case RankMethod.NAME:
      return a.monster.name.localeCompare(b.monster.name);
    case RankMethod.PORTRAIT_AUTHOR:
      const aName = a.portraits.creditPrimary?.name;
      const bName = b.portraits.creditPrimary?.name;
      if (!aName || !bName) return aName ? -1 : 1;
      return aName.localeCompare(bName)
    case RankMethod.SPRITE_AUTHOR:
      const aNameSprite = a.sprites.creditPrimary?.name;
      const bNameSprite = b.sprites.creditPrimary?.name;
      if (!aNameSprite || !bNameSprite) return aNameSprite ? -1 : 1;
      return aNameSprite.localeCompare(bNameSprite);
    case RankMethod.PORTRAIT_BOUNTY:
      return splitForms ?
        getFormMaxPortraitBounty(b) - getFormMaxPortraitBounty(a) :
        getMonsterMaxPortraitBounty(b.monster) - getMonsterMaxPortraitBounty(a.monster);
    case RankMethod.SPRITE_BOUNTY:
      return splitForms ?
        getFormMaxSpriteBounty(b) - getFormMaxSpriteBounty(a) :
        getMonsterMaxSpriteBounty(b.monster) - getMonsterMaxSpriteBounty(a.monster);
  }
}

function filterMonsterForms(
  forms: MonsterFormWithRef[],
  splitForms: boolean,
  currentText: string,
  filterParameters: Parameters<PhaseCategory>[],
  rankBy: RankMethod
) {
  const lowerCaseText = currentText.toLowerCase()
  return forms
    .filter(splitForms ? ({ monster: { name, id }, portraits, sprites }) =>
      name.toLowerCase().includes(lowerCaseText) ||
      portraits.creditPrimary?.name?.toLowerCase().includes(lowerCaseText) ||
      portraits.creditSecondary.some(({ name }) => name?.toLowerCase().includes(lowerCaseText)) ||
      sprites.creditPrimary?.name?.toLowerCase().includes(lowerCaseText) ||
      sprites.creditSecondary.some(({ name }) => name?.toLowerCase().includes(lowerCaseText)) ||
      id.toString().includes(lowerCaseText) :
      ({ monster: { name, forms, id } }) =>
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
    .filter(splitForms ? form => {
      const activeFilters = filterParameters.filter(({ state: [active] }) => active);
      return !activeFilters.length || activeFilters.some(({ value: { type, phase } }) => phase == form[type].phase)
    } : ({ monster: { forms } }) => {
      const activeFilters = filterParameters.filter(({ state: [active] }) => active);
      return !activeFilters.length ||
        activeFilters.some(({ value: { type, phase } }) => forms.some(form => phase == form[type].phase))
    })
    .sort((a, b) => rankMonsters(rankBy, a, b, splitForms) ?? 0)
}

interface Props {
  currentText: string
  rankBy: RankMethod
  ids: number[]
  showParameters: Record<string, Parameters<RankMethod>>
  filterParameters: Parameters<PhaseCategory>[]
  splitForms: boolean
}
export default function PokemonCarousel({ currentText, rankBy, ids, showParameters, filterParameters, splitForms }: Props) {
  const doesShowParameters = Object.fromEntries(Object.entries(showParameters).map(param => [param[0], param[1].state[0]]));
  const { portraitAuthor, spriteAuthor, portraitBounty, spriteBounty, lastModification } = doesShowParameters;
  const withPortraitPhases = filterParameters.some(x => x.state[0] && x.value.type == 'portraits');
  const withSpritePhases = filterParameters.some(x => x.state[0] && x.value.type == 'sprites');
  const withCredits = portraitAuthor || spriteAuthor || currentText !== "" || splitForms;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loading, error, data, refetch, fetchMore } = useCarrouselQuery({
    variables: {
      ids,
      withPortraitBounty: portraitBounty || rankBy == RankMethod.PORTRAIT_BOUNTY,
      withSpriteBounty: spriteBounty  || rankBy == RankMethod.SPRITE_BOUNTY,
      withModifiedDate: lastModification || rankBy == RankMethod.LAST_MODIFICATION,
      withPortraitPhases,
      withSpritePhases,
      withSplitForms: splitForms,
      withCredits: withCredits ||
        rankBy == RankMethod.PORTRAIT_AUTHOR ||
        rankBy == RankMethod.SPRITE_AUTHOR ||
        splitForms,
      withForms:
        withCredits ||
        withPortraitPhases ||
        withSpritePhases
    }
  })
  const visibleMonsters = useMemo(() => {
    const monsters = (data?.monster.flatMap(monster =>
      splitForms ?
        monster.forms?.map(form => ({ ...form, monster })) ?? [] :
        monster.manual ? ({ ...monster.manual, monster }) : {}
    ) ?? []) as MonsterFormWithRef[];
    return filterMonsterForms(
      monsters,
      splitForms,
      currentText,
      filterParameters,
      rankBy
    )
  }, [
    data,
    splitForms,
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

  return <Grid container spacing={2} justifyContent={"center"}>
    {visibleMonsters.map((form, i) =>
      <Grid item key={i}>
        <PokemonThumbnail
          infoKey={form.monster.rawId}
          form={form}
          isSpeciesThumbnail={!splitForms}
          doesShowParameters={doesShowParameters}
        />
      </Grid>
    )}
  </Grid>
}