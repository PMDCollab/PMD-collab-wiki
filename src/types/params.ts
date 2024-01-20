import { Dispatch, SetStateAction } from 'react';
import { RankMethod } from './enum';

export type UseState<T> = [T, Dispatch<SetStateAction<T>>];
export type Toggle = keyof typeof toggleToName;

export const rankMethodToToggle: Record<Exclude<RankMethod, RankMethod.NAME>, Toggle> = {
  [RankMethod.POKEDEX_NUMBER]: "index",
  [RankMethod.PORTRAIT_AUTHOR]: "portraitAuthor",
  [RankMethod.SPRITE_AUTHOR]: "spriteAuthor",
  [RankMethod.LAST_MODIFICATION]: "lastModification",
  [RankMethod.PORTRAIT_BOUNTY]: "portraitBounty",
  [RankMethod.SPRITE_BOUNTY]: "spriteBounty"
};

export const toggleToName = {
  index: "Index",
  portraitAuthor: "Portrait Author",
  spriteAuthor: "Sprite Author",
  lastModification: "Last Change",
  portraitBounty: "Portrait Bounty",
  spriteBounty: "Sprite Bounty"
} as const;