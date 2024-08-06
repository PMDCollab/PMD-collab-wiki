import { RankMethod } from './enum';

/**
 * Toggles define what information is displayed in thumbnails for each monster.
 */
export type Toggle = 'index' | 'portraitAuthor' | 'spriteAuthor' | 'lastModification' | 'portraitBounty' | 'spriteBounty';

export const toggles: Toggle[] = [
  'index',
  'portraitAuthor',
  'spriteAuthor',
  'lastModification',
  'portraitBounty',
  'spriteBounty'
];

export const rankMethodToToggle: Record<Exclude<RankMethod, RankMethod.NAME>, Toggle> = {
  [RankMethod.POKEDEX_NUMBER]: 'index',
  [RankMethod.PORTRAIT_AUTHOR]: 'portraitAuthor',
  [RankMethod.SPRITE_AUTHOR]: 'spriteAuthor',
  [RankMethod.LAST_MODIFICATION]: 'lastModification',
  [RankMethod.PORTRAIT_BOUNTY]: 'portraitBounty',
  [RankMethod.SPRITE_BOUNTY]: 'spriteBounty'
} as const;

export const toggleNames: Record<Toggle, string> = {
  index: "Index",
  portraitAuthor: "Portrait Author",
  spriteAuthor: "Sprite Author",
  lastModification: "Last Change",
  portraitBounty: "Portrait Bounty",
  spriteBounty: "Sprite Bounty"
} as const;

/**
 * Filters define which monsters will show based on which sprites and/or portraits are requested.
 * Filters operate individually from sprites and portraits. If unchecked, then all are allowed.
 * If any sprite filters are checked, only monsters with that sprite filter (one is OK) are allowed.
 * If any portrait filters are checked, only monsters with that portrait filter (one is OK) are allowed.
 */
export type Filter = Exclude<`${'fullyFeatured' | 'existing' | 'incomplete' | 'missing'}${'Sprites' | 'Portraits'}`, 'missingSprites'>;

export const filters: Filter[] = [
  'fullyFeaturedPortraits',
  'existingPortraits',
  'incompletePortraits',
  'missingPortraits',
  'fullyFeaturedSprites',
  'existingSprites',
  'incompleteSprites',
  // 'missingSprites'
];


// TODO: i probably don't need a record since i'm just referring to the phase
export const filterNames: Record<Filter, string> = {
  fullyFeaturedPortraits: "Fully-Featured",
  existingPortraits: "Existing",
  incompletePortraits: "Incomplete",
  missingPortraits: "Missing",
  fullyFeaturedSprites: "Fully-Featured",
  existingSprites: "Existing",
  incompleteSprites: "Incomplete",
  // missingSprites: "Missing"
};

/**
 * i'm just putting this here because i like grouping state into maps and it makes things nicer for me
 */
export type MiscParams = 'creditsMode' | 'splitForms' | 'showUnnecessary' | 'showFormName';

export const miscParams: MiscParams[] = [
  'creditsMode',
  'splitForms',
  'showUnnecessary',
  'showFormName'
];

/**
 * Takes a URLSearchParams object and parses state into a map containing the specified keys.
 * @param searchParams the URLSearchParams object to get from
 * @param targets the keys to put into the map
 * @param callback the callback that parses the param string into the value type
 * @returns a map that basically does all of the stuff i just described
 */
export function paramsToMap<K extends string, V>(searchParams: URLSearchParams, targets: K[], callback: (url: string | null) => V): Map<K, V> {
  return new Map<K, V>(targets.map(target => [target, callback(searchParams.get(target))]));
}

export function paramsToObject<K extends string, V>(searchParams: URLSearchParams, targets: K[], callback: (url: string | null) => V): Record<K, V> {
  return targets.reduce((object, target) => (object[target] = callback(searchParams.get(target)), object), {} as Record<K, V>)
}