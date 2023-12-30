/* eslint-disable no-case-declarations */
import { useEffect, useMemo, useState } from "react"
import { Monster, MonsterForm, useCarrouselQuery } from "../generated/graphql"
import { RankMethod } from "../types/enum"
import PokemonThumbnail from "./pokemon-thumbnail"
// import IntermediateComponent from './intermediate-component'
import { Grid, Skeleton, Typography } from "@mui/material"
import {
  getFormMaxPortraitBounty,
  getFormMaxSpriteBounty,
  getMonsterMaxPortraitBounty,
  getMonsterMaxSpriteBounty
} from "../util"
import { Parameters, PhaseCategory } from "../Home"

export type MonsterFormWithRef = MonsterForm & { monster: Monster, formIndex: number }

function rankMonsters(
  rankBy: RankMethod,
  a: MonsterFormWithRef,
  b: MonsterFormWithRef,
  splitForms: boolean,
  showUnnecessary: boolean
) {
  switch (rankBy) {
    case RankMethod.POKEDEX_NUMBER:
      return a.monster.id - b.monster.id;
    case RankMethod.LAST_MODIFICATION:
      const { portraits: { modifiedDate: dap }, sprites: { modifiedDate: das } } = a;
      const { portraits: { modifiedDate: dbp }, sprites: { modifiedDate: dbs } } = b;
      return Math.max(new Date(dbp).getTime(), new Date(dbs).getTime()) -
        Math.max(new Date(dap).getTime(), new Date(das).getTime());
    case RankMethod.NAME:
      return a.monster.name.localeCompare(b.monster.name)
    case RankMethod.PORTRAIT_AUTHOR:
      const aName = a.portraits.creditPrimary?.name
      const bName = b.portraits.creditPrimary?.name
      if (!aName || !bName) return aName ? -1 : 1
      return aName.localeCompare(bName)
    case RankMethod.SPRITE_AUTHOR:
      const aNameSprite = a.sprites.creditPrimary?.name
      const bNameSprite = b.sprites.creditPrimary?.name
      if (!aNameSprite || !bNameSprite) return aNameSprite ? -1 : 1
      return aNameSprite.localeCompare(bNameSprite)
    case RankMethod.PORTRAIT_BOUNTY:
      return splitForms
        ? getFormMaxPortraitBounty(b) - getFormMaxPortraitBounty(a)
        : getMonsterMaxPortraitBounty(b.monster, showUnnecessary) -
        getMonsterMaxPortraitBounty(a.monster, showUnnecessary)
    case RankMethod.SPRITE_BOUNTY:
      return splitForms
        ? getFormMaxSpriteBounty(b) - getFormMaxSpriteBounty(a)
        : getMonsterMaxSpriteBounty(b.monster, showUnnecessary) -
        getMonsterMaxSpriteBounty(a.monster, showUnnecessary)
  }
}

function filterMonsterForms(
  forms: MonsterFormWithRef[],
  splitForms: boolean,
  showUnnecessary: boolean,
  currentText: string,
  filterParameters: Parameters<PhaseCategory>[],
  rankBy: RankMethod
) {
  // Although not a lot of time is spent filtering out it would be better to avoid unnecessary checks here -sec
  const lowerCaseText = currentText.toLowerCase();
  if (lowerCaseText) forms = forms.filter(splitForms
    ? ({ monster: { name, id }, portraits, sprites }) =>
      name.toLowerCase().includes(lowerCaseText) ||
      portraits.creditPrimary?.name
        ?.toLowerCase()
        .includes(lowerCaseText) ||
      portraits.creditSecondary.some(({ name }) =>
        name?.toLowerCase().includes(lowerCaseText)
      ) ||
      sprites.creditPrimary?.name
        ?.toLowerCase()
        .includes(lowerCaseText) ||
      sprites.creditSecondary.some(({ name }) =>
        name?.toLowerCase().includes(lowerCaseText)
      ) ||
      id.toString().includes(lowerCaseText)
    : ({ monster: { name, forms, id } }) =>
      name.toLowerCase().includes(lowerCaseText) ||
      forms.some(
        ({ portraits: { creditPrimary: cpp, creditSecondary: csp },
          sprites: { creditPrimary: cps, creditSecondary: css } }) =>
          cpp?.name?.toLowerCase().includes(lowerCaseText) ||
          cps?.name?.toLowerCase().includes(lowerCaseText) ||
          csp.some(({ name }) => name?.toLowerCase().includes(lowerCaseText)) ||
          css.some(({ name }) => name?.toLowerCase().includes(lowerCaseText))
      ) ||
      id.toString().includes(lowerCaseText))
  const activeFilters = filterParameters.filter(({ state: [active] }) => active);
  if (activeFilters.length) forms = forms.filter(
    splitForms
      ? (form) => activeFilters.some(
        ({ value: { type, phase } }) => phase == form[type].phase
      )
      : ({ monster: { forms } }) => activeFilters.some(({ value: { type, phase } }) =>
        forms.some(form => (showUnnecessary || form[type].required) && phase == form[type].phase)
      )
  )
  return forms
    .filter(
      ({ portraits, sprites }) =>
        !splitForms || portraits.required || sprites.required || showUnnecessary
    )
    .sort((a, b) => rankMonsters(rankBy, a, b, splitForms, showUnnecessary) ?? 0)
}

interface Props {
  currentText: string
  rankBy: RankMethod
  ids: number[]
  showParameters: Record<string, Parameters<RankMethod>>
  filterParameters: Parameters<PhaseCategory>[]
  splitForms: boolean
  showUnnecessary: boolean
  showForms: boolean
}
export default function PokemonCarousel({
  currentText,
  rankBy,
  ids,
  showParameters,
  filterParameters,
  splitForms,
  showUnnecessary,
  showForms
}: Props) {
  const [limitedLoad, setLimitedLoad] = useState<boolean>(true);
  const doesShowParameters = Object.fromEntries(
    Object.entries(showParameters).map(([paramType, { state: [showParam] }]) => [paramType, showParam])
  )
  const {
    portraitAuthor,
    spriteAuthor,
    portraitBounty,
    spriteBounty,
    lastModification
  } = doesShowParameters
  const withPortraitPhases = filterParameters.some(
    ({ state: [filterPhases], value: { type } }) => filterPhases && type == "portraits"
  )
  const withSpritePhases = filterParameters.some(
    ({ state: [filterPhases], value: { type } }) => filterPhases && type == "sprites"
  )
  const withCredits =
    portraitAuthor || spriteAuthor || currentText !== "" || splitForms
  // TODO: use refetch and fetchMore options in carrousel query to save time -sec
  const { loading, error, data } = useCarrouselQuery({
    variables: {
      ids,
      withPortraitBounty:
        portraitBounty || rankBy == RankMethod.PORTRAIT_BOUNTY,
      withSpriteBounty: spriteBounty || rankBy == RankMethod.SPRITE_BOUNTY,
      withModifiedDate:
        lastModification || rankBy == RankMethod.LAST_MODIFICATION,
      withPortraitPhases,
      withSpritePhases,
      withSplitForms: splitForms,
      withCredits:
        withCredits ||
        rankBy == RankMethod.PORTRAIT_AUTHOR ||
        rankBy == RankMethod.SPRITE_AUTHOR ||
        splitForms,
      withForms:
        withCredits ||
        withPortraitPhases ||
        withSpritePhases ||
        portraitBounty ||
        spriteBounty
    }
  })
  useEffect(() => {
    setLimitedLoad((loading && data && limitedLoad) ?? true)
  }, [data])
  const visibleMonsters = useMemo(() => {
    const monsterForms = (data?.monster.flatMap((monster) =>
      splitForms ? monster.forms?.map((form, formIndex) => ({ ...form, monster, formIndex })) ?? [] :
        monster.manual ? { ...monster.manual, monster, formIndex: 0 } : {}
    ) ?? []) as MonsterFormWithRef[];
    const filters = filterMonsterForms(
      monsterForms,
      splitForms,
      showUnnecessary,
      currentText,
      filterParameters,
      rankBy
    )
    return filters;
  }, [data, splitForms, currentText, filterParameters, rankBy])

  if (error) return <Typography>Error</Typography>
  return (
    <Grid container spacing={2} justifyContent={"center"}>
      {loading
        ? Array.from({ length: 100 }, (_, i) => <Grid item key={i}>
          <Skeleton width={80} height={111} variant="rectangular" />
        </Grid>)
        // : <IntermediateComponent
        // visibleMonsters={visibleMonsters}
        // splitForms={splitForms}
        // doesShowParameters={doesShowParameters}
        // showForms={showForms} />}

        : visibleMonsters.map((form, i) => (!limitedLoad || i < 151) && (
          <Grid item key={i}>
            <PokemonThumbnail
                infoKey={form.monster.rawId}
                form={form}
                isSpeciesThumbnail={!splitForms}
                doesShowParameters={doesShowParameters}
                showForms={showForms}
              />
          </Grid>
        ))}
    </Grid>
  )
}
