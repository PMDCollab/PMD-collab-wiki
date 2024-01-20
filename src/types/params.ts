import { Dispatch, SetStateAction } from 'react';
import { RankMethod } from './enum';

// Fixes Object.entries keys displaying the wrong type
declare global {
  interface ObjectConstructor {
    entries<T extends object>(o: T): { [K in keyof T]: [K, T[K]]; }[keyof T][];
  }
}

export type UseState<T> = [T, Dispatch<SetStateAction<T>>];
export type Toggle = "index" | "portraitAuthor" | "spriteAuthor" | "lastModification" | "portraitBounty" | "spriteBounty";

export const rankMethodToToggle: Record<Exclude<RankMethod, RankMethod.NAME>, Toggle> = {
  [RankMethod.POKEDEX_NUMBER]: "index",
  [RankMethod.PORTRAIT_AUTHOR]: "portraitAuthor",
  [RankMethod.SPRITE_AUTHOR]: "spriteAuthor",
  [RankMethod.LAST_MODIFICATION]: "lastModification",
  [RankMethod.PORTRAIT_BOUNTY]: "portraitBounty",
  [RankMethod.SPRITE_BOUNTY]: "spriteBounty",
};

export const toggleToName: Record<Toggle, string> = {
  index: "Index",
  portraitAuthor: "Portrait Author",
  spriteAuthor: "Sprite Author",
  lastModification: "Last Change",
  portraitBounty: "Portrait Bounty",
  spriteBounty: "Sprite Bounty"
} as const;

export type Filter = `${"fullyFeatured" | "existing" | "incomplete"}${"Sprites" | "Portraits"}`

export const filterToName: Record<Filter, string> = {
  fullyFeaturedPortraits: "Fully-Featured Portraits",
  fullyFeaturedSprites: "Fully-Featured Sprites",
  existingPortraits: "Existing Portraits",
  existingSprites: "Existing Sprites",
  incompletePortraits: "Incomplete Portraits",
  incompleteSprites: "Incomplete Sprites"
}