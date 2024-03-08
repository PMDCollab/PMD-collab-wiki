import { useEffect, useMemo, useState } from "react"
import { Monster, MonsterForm, Phase, useCarrouselQuery } from "../generated/graphql"
import { RankMethod } from "../types/enum"
import PokemonThumbnail from "./pokemon-thumbnail"
import { Box, Grid, Link, Skeleton, Typography } from "@mui/material"
import { getFormBounty, getMonsterBounty, groupBy } from "../util"
import { Filter, Toggle } from '../types/params'

export type MonsterFormWithRef = MonsterForm & { monster: Monster, formIndex: number } // TODO: don't merge with existing form

function getFilterType(filter: Filter): { type: 'sprites' | 'portraits', phase: Phase } {
  const type = filter.endsWith('Sprites') ? 'sprites' : 'portraits';
  switch (true) {
    case filter.startsWith("fullyFeatured"):
      return { type, phase: Phase.Full };
    case filter.startsWith("existing"):
      return { type, phase: Phase.Exists };
    default:
      return { type, phase: Phase.Incomplete };
  }
}

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
      return Math.max(new Date(dbp ?? 0).getTime(), new Date(dbs ?? 0).getTime()) -
        Math.max(new Date(dap ?? 0).getTime(), new Date(das ?? 0).getTime());
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
        ? getFormBounty(b, 'portraits') - getFormBounty(a, 'portraits')
        : getMonsterBounty(b.monster, 'portraits', showUnnecessary) -
        getMonsterBounty(a.monster, 'portraits', showUnnecessary)
    case RankMethod.SPRITE_BOUNTY:
      return splitForms
        ? getFormBounty(b, 'sprites') - getFormBounty(a, 'sprites')
        : getMonsterBounty(b.monster, 'sprites', showUnnecessary) -
        getMonsterBounty(a.monster, 'sprites', showUnnecessary)
  }
}

function filterMonsterForms(
  forms: MonsterFormWithRef[],
  splitForms: boolean,
  showUnnecessary: boolean,
  currentText: string,
  filters: Map<Filter, boolean>,
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
  const { portraits: portraitFilters = [], sprites: spriteFilters = [] } = groupBy([...filters.entries()]
    .filter(([_, isShowing]) => isShowing)
    .map(([filter]) => getFilterType(filter)),
    (filter) => filter.type);
  // TODO: make this a bit nicer i kinda dont like having to write 4 different filters
  if (portraitFilters.length || spriteFilters.length) {
    forms = splitForms
      ? forms.filter((form) =>
        (!portraitFilters.length || portraitFilters.some(({ phase }) => phase == form.portraits.phase))
        && (!spriteFilters.length || spriteFilters.some(({ phase }) => phase == form.sprites.phase)))
      : forms.filter(({ monster: { forms } }) =>
        (!portraitFilters.length || portraitFilters.some(({ phase }) =>
          forms.some(form => (showUnnecessary || form.portraits.required) && phase == form.portraits.phase)))
        && (!spriteFilters.length || spriteFilters.some(({ phase }) =>
          forms.some(form => (showUnnecessary || form.sprites.required) && phase == form.sprites.phase))));
  }
  return forms
    .filter(({ portraits, sprites }) => !splitForms || portraits.required || sprites.required || showUnnecessary)
    .sort((a, b) => rankMonsters(rankBy, a, b, splitForms, showUnnecessary) ?? 0);
}

interface Props {
  currentText: string
  rankBy: RankMethod
  ids: number[]
  toggles: Map<Toggle, boolean>
  filters: Map<Filter, boolean>
  splitForms: boolean
  showUnnecessary: boolean
  showForms: boolean
  creditsMode: boolean
}
export default function PokemonCarousel({
  currentText,
  rankBy,
  ids,
  toggles,
  filters,
  splitForms,
  showUnnecessary,
  showForms,
  creditsMode
}: Props) {
  const [limitedLoad, setLimitedLoad] = useState<boolean>(true);
  const creditedMonsState = useState(new Set<string>());
  const {
    portraitAuthor,
    spriteAuthor,
    portraitBounty,
    spriteBounty,
    lastModification
  } = Object.fromEntries(toggles);
  const withPortraitPhases = [...filters.entries()].some(([filter, isShowing]) => isShowing && getFilterType(filter).type == "portraits")
  const withSpritePhases = [...filters.entries()].some(([filter, isShowing]) => isShowing && getFilterType(filter).type == "sprites")
  const withCredits = portraitAuthor || spriteAuthor || !!currentText || splitForms
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
    setLimitedLoad(loading && (data ?? true) && limitedLoad)
  }, [data])
  const visibleMonsters = useMemo(() => {
    const monsterForms = (data?.monster.flatMap((monster) =>
      splitForms ? monster.forms?.map((form, formIndex) => ({ ...form, monster, formIndex })) ?? [] :
        monster.manual ? { ...monster.manual, monster, formIndex: 0 } : {}
    ) ?? []) as MonsterFormWithRef[];
    // TODO: move to object containing instead of making new one
    const monsters = filterMonsterForms(
      monsterForms,
      splitForms,
      showUnnecessary,
      currentText,
      filters,
      rankBy
    )
    return monsters;
  }, [data, splitForms, currentText, filters, rankBy])

  if (error) return <Box textAlign='center' alignItems='center'>
    <h1>Uh Oh!</h1>
    <Typography>
      Looks like the server ran into an error. This typically happens when our sprite server is down, and we'll try to get it back up as soon as possible.
    </Typography>
    <Typography>
      If this problem still occurs, check server uptime at <Link href="https://status.pmdcollab.org/">PMDCollab Status</Link>.
    </Typography>
  </Box>

  return (
    <Grid container spacing={2} justifyContent={"center"}>
      {loading
        ? Array.from({ length: 100 }, (_, i) => <Grid item key={i}>
          <Skeleton width={80} height={111} variant="rectangular" />
        </Grid>)

        : visibleMonsters.map((form, i) => (!limitedLoad || i < 151) && (
          <Grid item key={i}>
            <PokemonThumbnail
              infoKey={form.monster.rawId}
              form={form}
              isSpeciesThumbnail={splitForms}
              toggles={toggles}
              showForms={showForms}
              creditsMode={creditsMode}
              creditedMonsState={creditedMonsState}
            />
          </Grid>
        ))}
    </Grid>
  )
}
