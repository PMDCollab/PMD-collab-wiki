import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { Monster, MonsterForm, MonsterFormPortraits, MonsterFormSprites, Phase, useCarrouselQuery } from "../generated/graphql"
import { RankMethod } from "../types/enum"
import PokemonThumbnail from "./pokemon-thumbnail"
import { Button, Grid, Skeleton } from "@mui/material"
import { getFormBounty, getMonsterBounty, groupBy } from "../util"
import { Filter } from '../types/params'
import { generateCredits } from './generate-credits'
import { Context } from '../Home'
import ErrorPage from '../ErrorPage'

export type MonsterFormWithRef = { form: MonsterForm, monster: Monster, formIndex: number } // TODO: don't merge with existing form

export type PhaseInfo = { type: 'sprites' | 'portraits', phase: Phase | null }
function getFilterType(filter: Filter): PhaseInfo {
  const type = filter.endsWith('Sprites') ? 'sprites' : 'portraits';
  switch (true) {
    case filter.startsWith("fullyFeatured"):
      return { type, phase: Phase.Full };
    case filter.startsWith("existing"):
      return { type, phase: Phase.Exists };
    case filter.startsWith("incomplete"):
      return { type, phase: Phase.Incomplete };
    default:
      return { type, phase: null };
  }
}

// TODO: test performance for returning a comparator instead of the function being the comparator
function rankMonsters(
  rankBy: RankMethod,
  splitForms: boolean,
  showUnnecessary: boolean
): (a: MonsterFormWithRef, b: MonsterFormWithRef) => number {
  switch (rankBy) {
    case RankMethod.POKEDEX_NUMBER:
      return (a, b) => a.monster.id - b.monster.id;
    case RankMethod.LAST_MODIFICATION:
      return (a, b) => {
        const { portraits: { modifiedDate: dap }, sprites: { modifiedDate: das } } = a.form;
        const { portraits: { modifiedDate: dbp }, sprites: { modifiedDate: dbs } } = b.form;
        return Math.max(new Date(dbp ?? 0).getTime(), new Date(dbs ?? 0).getTime()) -
          Math.max(new Date(dap ?? 0).getTime(), new Date(das ?? 0).getTime());
      }
    case RankMethod.NAME:
      return (a, b) => a.monster.name.localeCompare(b.monster.name);
    case RankMethod.PORTRAIT_AUTHOR:
      return (a, b) => {
        const aName = a.form.portraits.creditPrimary?.name;
        const bName = b.form.portraits.creditPrimary?.name;
        if (!aName || !bName) return aName ? -1 : 1;
        return aName.localeCompare(bName);
      }
    case RankMethod.SPRITE_AUTHOR:
      return (a, b) => {
        const aNameSprite = a.form.sprites.creditPrimary?.name
        const bNameSprite = b.form.sprites.creditPrimary?.name
        if (!aNameSprite || !bNameSprite) return aNameSprite ? -1 : 1
        return aNameSprite.localeCompare(bNameSprite)
      }
    case RankMethod.PORTRAIT_BOUNTY:
      return (a, b) => splitForms
        ? getFormBounty(b.form, 'portraits') - getFormBounty(a.form, 'portraits')
        : getMonsterBounty(b.monster, 'portraits', showUnnecessary) -
        getMonsterBounty(a.monster, 'portraits', showUnnecessary)
    case RankMethod.SPRITE_BOUNTY:
      return (a, b) => splitForms
        ? getFormBounty(b.form, 'sprites') - getFormBounty(a.form, 'sprites')
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
  if (lowerCaseText) {
    if (splitForms) {
      forms = forms.filter(({ monster: { name, id }, form: { portraits, sprites } }) =>
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
        id.toString().includes(lowerCaseText));
    } else {
      forms = forms.filter(({ monster: { name, forms, id } }) =>
        name.toLowerCase().includes(lowerCaseText) ||
        forms.some(
          ({ portraits: { creditPrimary: cpp, creditSecondary: csp },
            sprites: { creditPrimary: cps, creditSecondary: css } }) =>
            cpp?.name?.toLowerCase().includes(lowerCaseText) ||
            cps?.name?.toLowerCase().includes(lowerCaseText) ||
            csp.some(({ name }) => name?.toLowerCase().includes(lowerCaseText)) ||
            css.some(({ name }) => name?.toLowerCase().includes(lowerCaseText))
        ) ||
        id.toString().includes(lowerCaseText));
    }
  }
  // declare filters
  const { portraits: portraitFilters = [], sprites: spriteFilters = [] } = groupBy([...filters.entries()]
    .filter(([_, isShowing]) => isShowing)
    .map(([filter]) => getFilterType(filter)),
    (filter) => filter.type);
  // TODO: null means checking for missing (i.e. no emotions/actions) so bother capypara until he adds it to spriteserver
  // TODO: move this to some other file maybe
  const phaseMatches = (target: MonsterFormPortraits | MonsterFormSprites) =>
    ({ phase }: Pick<PhaseInfo, 'phase'>): boolean => {
      if (phase !== null) return phase === target.phase;
      if ('previewEmotion' in target) return !target.previewEmotion?.url;
      // TODO: remove cast here that typescript can't find
      return !(target as MonsterFormSprites).actions?.length;
    }
  if (portraitFilters.length || spriteFilters.length) {
    if (splitForms) {
      forms = forms.filter(({ form }) =>
        (!portraitFilters.length || portraitFilters.some(phaseMatches(form.portraits)))
        && (!spriteFilters.length || spriteFilters.some(phaseMatches(form.sprites))));
    } else {
      forms = forms.filter(({ monster: { forms } }) =>
        (!portraitFilters.length || portraitFilters.some(({ phase }) =>
          forms.some(form => (showUnnecessary || form.portraits.required) && phaseMatches(form.portraits)({ phase }))))
        && (!spriteFilters.length || spriteFilters.some(({ phase }) =>
          forms.some(form => (showUnnecessary || form.sprites.required) && phaseMatches(form.sprites)({ phase })))));
    }
  }
  return forms
    .filter(({ form: { portraits, sprites } }) => !splitForms || portraits.required || sprites.required || showUnnecessary)
    .sort(rankMonsters(rankBy, splitForms, showUnnecessary));
}

interface Props {
  currentText: string
  ids: number[]
}
export default function PokemonCarousel({
  currentText,
  ids
}: Props) {
  const {
    filterState,
    toggleState,
    miscState,
    rankState: [rankBy],
  } = useContext(Context)!;
  const [limitedLoad, setLimitedLoad] = useState(true);
  const creditedMonsRef = useRef<Record<string, HTMLInputElement | null>>({});
  // @ts-ignore
  window.x = creditedMonsRef;
  const {
    portraitAuthor,
    spriteAuthor,
    portraitBounty,
    spriteBounty,
    lastModification
  } = Object.fromEntries(toggleState);
  const {
    splitForms,
    creditsMode,
    showUnnecessary
  } = miscState;
  const withPortraitPhases = [...filterState.entries()].some(([filter, isShowing]) => isShowing && getFilterType(filter).type == "portraits")
  const withSpritePhases = [...filterState.entries()].some(([filter, isShowing]) => isShowing && getFilterType(filter).type == "sprites")
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
        splitForms ||
        creditsMode,
      withForms:
        withCredits ||
        withPortraitPhases ||
        withSpritePhases ||
        portraitBounty ||
        spriteBounty ||
        creditsMode,
      withCreditableHistory: creditsMode, // TODO: remove flag so that history fetching is done in generate-credits.ts
      withSpriteActions: filterState.get('missingSprites')!,
    }
  });
  useEffect(() => {
    setLimitedLoad(loading && (data ?? true) && limitedLoad)
  }, [data])
  const visibleMonsters = useMemo(() => {
    const monsterForms = (data?.monster.flatMap((monster) =>
      splitForms ? monster.forms?.map((form, formIndex) => ({ form, monster, formIndex })) ?? [] :
        monster.manual ? { form: monster.manual, monster, formIndex: 0 } : {}
    ) ?? []) as MonsterFormWithRef[];
    // TODO: move to object containing instead of making new one
    const monsters = filterMonsterForms(
      monsterForms,
      splitForms,
      showUnnecessary,
      currentText,
      filterState,
      rankBy
    )
    return monsters;
  }, [data, splitForms, currentText, filterState, rankBy]);

  if (error) return <ErrorPage />

  return <>
    {creditsMode && <div>
      {!splitForms && <h3>WARNING: Split Forms is not enabled. You will only generate credits for the main form of each sprite. (i.e. shinies not included)</h3>}
      <Button variant="contained" onClick={() => generateCredits(visibleMonsters, creditedMonsRef.current!)} style={{ margin: '10px' }}>Download Credits!</Button>
    </div>}
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
              isSpeciesThumbnail={!splitForms}
              creditedMonsRef={creditedMonsRef}
            />
          </Grid>
        ))}
    </Grid>
  </>
}
