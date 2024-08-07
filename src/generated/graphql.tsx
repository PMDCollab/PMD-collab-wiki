import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

/** An action mapped uniquely to an ID. */
export type ActionId = {
  __typename?: 'ActionId';
  id: Scalars['Int'];
  name: Scalars['String'];
};

/** Configuration for this instance of SpriteCollab. */
export type Config = {
  __typename?: 'Config';
  /** A mapping of actions to EoS action indices. */
  actionMap: Array<ActionId>;
  /** A list of known action. The position is the ID of the action. */
  actions: Array<Scalars['String']>;
  /** Returns a list, that for each phase contains a list of actions (by index) that need to exist for this phase to be considered completed. */
  completionActions: Array<Array<Scalars['Int']>>;
  /** Returns a list, that for each phase contains a list of emotions (by index) that need to exist for this phase to be considered completed. */
  completionEmotions: Array<Array<Scalars['Int']>>;
  /** A list of known emotions. The position is the ID of the emotion. */
  emotions: Array<Scalars['String']>;
  /** The portrait width and height in pixels. */
  portraitSize: Scalars['Int'];
  /** How many portraits per row a portrait sheet contains. */
  portraitTileX: Scalars['Int'];
  /** How many rows a portrait sheet contains. */
  portraitTileY: Scalars['Int'];
};

/** A sprite, which is a copy of another sprite. */
export type CopyOf = {
  __typename?: 'CopyOf';
  /** Action of this sprite. */
  action: Scalars['String'];
  /** Which action this sprite is a copy of. */
  copyOf: Scalars['String'];
  /** Whether or not this sprite is locked and requires special permissions to be updated. */
  locked: Scalars['Boolean'];
};

export type Credit = {
  __typename?: 'Credit';
  /** Contact information for this author. */
  contact?: Maybe<Scalars['String']>;
  /**
   * This used to return the Discord handle of this author, if applicable and possible. It will now always return null.
   * @deprecated This is no longer implemented and will always return null. It may or may not be re-introduced in future versions.
   */
  discordHandle?: Maybe<Scalars['String']>;
  /** Discord ID or absentee ID. Guaranteed to be an ASCII string. */
  id: Scalars['String'];
  /** The human-readable name of the author. Guaranteed to be an ASCII string. */
  name?: Maybe<Scalars['String']>;
};

/** A known license from a common list of options. */
export type KnownLicense = {
  __typename?: 'KnownLicense';
  license: KnownLicenseType;
};

/** A known license from a common list of options. */
export enum KnownLicenseType {
  /** Licensed under Creative Commons Attribution-NonCommercial 4.0 International */
  CcByNc4 = 'CC_BY_NC4',
  /** Original license: When using, you must credit the contributors. */
  Pmdcollab1 = 'PMDCOLLAB1',
  /** License for works between May 2023 - March 2024: You are free to use, copy redistribute or modify sprites and portraits from this repository for your own projects and contributions. When using portraits or sprites from this repository, you must credit the contributors for each portrait and sprite you use. */
  Pmdcollab2 = 'PMDCOLLAB2',
  /** The license could not be determined. */
  Unknown = 'UNKNOWN',
  /** The license is not specified / the work is unlicensed. */
  Unspecified = 'UNSPECIFIED'
}

/** The license that applies to the image of a sprite action or portrait emotion. */
export type License = KnownLicense | OtherLicense;

export type Meta = {
  __typename?: 'Meta';
  /** Version of this API. */
  apiVersion: Scalars['String'];
  /** Git Commit (https://github.com/PMDCollab/SpriteCollab/) currently checked out to serve the assets. */
  assetsCommit: Scalars['String'];
  /** Date of the last commit in the assets repository (https://github.com/PMDCollab/SpriteCollab) that is currently checked out. */
  assetsUpdateDate: Scalars['DateTime'];
  /** Version of spritecollab-srv serving this API. */
  serverVersion: Scalars['String'];
  /** Date that the server last checked for updates. */
  updateCheckedDate: Scalars['DateTime'];
};

export type Monster = {
  __typename?: 'Monster';
  /** All forms that exist for this monster. */
  forms: Array<MonsterForm>;
  /** Get a specific form for this monster. */
  get?: Maybe<MonsterForm>;
  /** ID of this monster. */
  id: Scalars['Int'];
  /** Manually enter the path to a monster, seperated by /. This should match the path as it is stored in SpriteCollab, however the path passed in might be collapsed until a unique form is found. */
  manual?: Maybe<MonsterForm>;
  /** Human-readable name of this monster. */
  name: Scalars['String'];
  /** Raw ID of this monster, as a string. This is a 4-character numeric string, padded with leading zeroes. */
  rawId: Scalars['String'];
};


export type MonsterGetArgs = {
  female: Scalars['Boolean'];
  formId: Scalars['Int'];
  shiny: Scalars['Boolean'];
};


export type MonsterManualArgs = {
  path: Scalars['String'];
};

/** A SkyTemple Discord Server Guild Point bounty that will be rewarded, if the portrait or sprite has transitioned into a phase. */
export type MonsterBounty = {
  __typename?: 'MonsterBounty';
  /** Amount of points to reward if the phase changes to Exists. */
  exists?: Maybe<Scalars['Int']>;
  /** Amount of points to reward if the phase changes to Full. */
  full?: Maybe<Scalars['Int']>;
  /** Amount of points to reward if the phase changes to Incomplete. */
  incomplete?: Maybe<Scalars['Int']>;
  /** If true, SpriteBot will not automatically hand out the Guild Point bounty. */
  modreward: Scalars['Boolean'];
  other: Array<OtherBounty>;
};

export type MonsterForm = {
  __typename?: 'MonsterForm';
  /** Whether or not this form is canon. */
  canon: Scalars['Boolean'];
  /** Human-readable full name of this form (excluding the monster name itself). */
  fullName: Scalars['String'];
  /** The path to this form (including the monster ID) as it's specified in the SpriteCollab tracker.json file and repository file structure. */
  fullPath: Scalars['String'];
  /** Whether or not this form is considered for a female monsters. */
  isFemale: Scalars['Boolean'];
  /** Whether or not this form is considered for a shiny. */
  isShiny: Scalars['Boolean'];
  /** The ID of the monster, that this form belongs to. */
  monsterId: Scalars['Int'];
  /** Human-readable name of this form. */
  name: Scalars['String'];
  /** The path to this form (without the monster ID) as it's specified in the SpriteCollab tracker.json file and repository file structure. */
  path: Scalars['String'];
  /** Portraits for this form. */
  portraits: MonsterFormPortraits;
  /** Sprites for this form. */
  sprites: MonsterFormSprites;
};

/** Portraits for a single monster form. */
export type MonsterFormPortraits = {
  __typename?: 'MonsterFormPortraits';
  /** Guild Point bounty for this portrait set. */
  bounty: MonsterBounty;
  /** Primary artist credits. */
  creditPrimary?: Maybe<Credit>;
  /** All other artists credited. */
  creditSecondary: Array<Credit>;
  /** A single portrait for a given emotion. */
  emotion?: Maybe<Portrait>;
  /** A single flipped portrait for a given emotion. */
  emotionFlipped?: Maybe<Portrait>;
  /** A list of all existing portraits for the emotions. */
  emotions: Array<Portrait>;
  /** A list of all existing flipped portraits for the emotions. */
  emotionsFlipped: Array<Portrait>;
  /** List of all modifications made to those portraits since its creation. */
  history: Array<MonsterHistory>;
  /** Returns a URL to retrieve the credits text file for the portraits for this form. */
  historyUrl?: Maybe<Scalars['String']>;
  /** The date and time this portrait set was last updated. */
  modifiedDate?: Maybe<Scalars['DateTime']>;
  /** Current completion phase of the portraits. */
  phase: Phase;
  /** Current completion phase of the portraits (raw ID). */
  phaseRaw: Scalars['Int'];
  /** A single portrait. Return the 'Normal' portrait if avalaible, but may return another one if not present. */
  previewEmotion?: Maybe<Portrait>;
  /** URL to a SpriteBot format recolor sheet. */
  recolorSheetUrl: Scalars['String'];
  /** Whether or not this form should have portraits. */
  required: Scalars['Boolean'];
  /** URL to a SpriteBot format sheet of all portraits. */
  sheetUrl: Scalars['String'];
};


/** Portraits for a single monster form. */
export type MonsterFormPortraitsEmotionArgs = {
  emotion: Scalars['String'];
};


/** Portraits for a single monster form. */
export type MonsterFormPortraitsEmotionFlippedArgs = {
  emotion: Scalars['String'];
};

/** Sprites for a single monster form. */
export type MonsterFormSprites = {
  __typename?: 'MonsterFormSprites';
  /** A single sprite for a given action. */
  action?: Maybe<SpriteUnion>;
  /** A list of all existing sprites for the actions. */
  actions: Array<SpriteUnion>;
  /** URL to the AnimData XML file for this sprite set. */
  animDataXml?: Maybe<Scalars['String']>;
  /** Guild Point bounty for this sprite set. */
  bounty: MonsterBounty;
  /** Primary artist credits. */
  creditPrimary?: Maybe<Credit>;
  /** All other artists credited. */
  creditSecondary: Array<Credit>;
  /** List of all modifications made to those sprites since its creation. */
  history: Array<MonsterHistory>;
  /** Returns a URL to retrieve the credits text file for the sprites for this form. */
  historyUrl?: Maybe<Scalars['String']>;
  /** The date and time this sprite set was last updated. */
  modifiedDate?: Maybe<Scalars['DateTime']>;
  /** Current completion phase of the sprites. */
  phase: Phase;
  /** Current completion phase of the sprites (raw ID). */
  phaseRaw: Scalars['Int'];
  /** URL to a SpriteBot format recolor sheet. */
  recolorSheetUrl?: Maybe<Scalars['String']>;
  /** Whether or not this form should have sprites. */
  required: Scalars['Boolean'];
  /** URL to a SpriteBot format ZIP archive of all sprites. */
  zipUrl?: Maybe<Scalars['String']>;
};


/** Sprites for a single monster form. */
export type MonsterFormSpritesActionArgs = {
  action: Scalars['String'];
};

/** An entry in the history log for a monster sprite or portrait. */
export type MonsterHistory = {
  __typename?: 'MonsterHistory';
  /** The author that contributed for this history entry. */
  credit?: Maybe<Credit>;
  /** The license applying to this modification. */
  license: License;
  /** A list of emotions or actions that were changed in this history entry. */
  modifications: Array<Scalars['String']>;
  /** The date of the history entry submission. */
  modifiedDate: Scalars['DateTime'];
  /** True if the credit for this history entry was marked as no longer relevant for the current portraits or sprites. */
  obsolete: Scalars['Boolean'];
};

/** A bounty for a non-standard phase. */
export type OtherBounty = {
  __typename?: 'OtherBounty';
  bounty: Scalars['Int'];
  phase: Scalars['Int'];
};

/** An unknown license. The name is the identifier for the license. */
export type OtherLicense = {
  __typename?: 'OtherLicense';
  name: Scalars['String'];
};

/** The current phase of the sprite or portrait. */
export enum Phase {
  Exists = 'EXISTS',
  Full = 'FULL',
  Incomplete = 'INCOMPLETE',
  /** Returned if the phase value is non-standard. Use phaseRaw to get the raw ID. */
  Unknown = 'UNKNOWN'
}

/** A single portrait for a single emotion. */
export type Portrait = {
  __typename?: 'Portrait';
  /** Name of the emotion. */
  emotion: Scalars['String'];
  /** Whether or not this sprite is locked and requires special permissions to be updated. */
  locked: Scalars['Boolean'];
  /** URL to the portraits. */
  url: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Configuration for this instance of SpriteCollab. */
  config: Config;
  /** Retrieve a list of credits. */
  credit: Array<Credit>;
  /** Meta information about the server and state of the assets. */
  meta: Meta;
  /** Retrieve a list of monsters. */
  monster: Array<Monster>;
  /** Search for a credit entry by (parts) of the ID, the author name or the contact info. Results are sorted by best match. */
  searchCredit: Array<Credit>;
  /** Search for a monster by (parts) of its name. Results are sorted by best match. */
  searchMonster: Array<Monster>;
};


export type QueryMonsterArgs = {
  filter?: InputMaybe<Array<Scalars['Int']>>;
};


export type QuerySearchCreditArgs = {
  query: Scalars['String'];
};


export type QuerySearchMonsterArgs = {
  monsterName: Scalars['String'];
};

/** A single sprite for a single action. */
export type Sprite = {
  __typename?: 'Sprite';
  /** Action of this sprite. */
  action: Scalars['String'];
  /** URL to the sprite sheet containing the actual frames for the animation. */
  animUrl: Scalars['String'];
  /** Whether or not this sprite is locked and requires special permissions to be updated. */
  locked: Scalars['Boolean'];
  /** URL to the sprite sheet containing the sprite offset pixels for each frame. */
  offsetsUrl: Scalars['String'];
  /** URL to the sprite sheet containing the shadow placeholders for each frame. */
  shadowsUrl: Scalars['String'];
};

/** A single sprite for a single action that is either a copy of another sprite (as defined in the AnimData.xml) or has it's own sprite data. */
export type SpriteUnion = CopyOf | Sprite;

export type MyBountyFragment = { __typename?: 'MonsterBounty', incomplete?: number | null, exists?: number | null, full?: number | null };

export type CreditableHistoryFragment = { __typename?: 'MonsterHistory', modifications: Array<string>, obsolete: boolean, credit?: { __typename?: 'Credit', name?: string | null, id: string, discordHandle?: string | null, contact?: string | null } | null };

export type FormFragment = { __typename?: 'MonsterForm', fullName?: string, portraits: { __typename?: 'MonsterFormPortraits', modifiedDate?: any | null, required?: boolean, phase?: Phase, previewEmotion?: { __typename?: 'Portrait', url: string } | null, bounty?: { __typename?: 'MonsterBounty', incomplete?: number | null, exists?: number | null, full?: number | null }, creditPrimary?: { __typename?: 'Credit', name?: string | null } | null, creditSecondary?: Array<{ __typename?: 'Credit', name?: string | null }>, history: Array<{ __typename?: 'MonsterHistory', modifications: Array<string>, obsolete: boolean, credit?: { __typename?: 'Credit', name?: string | null, id: string, discordHandle?: string | null, contact?: string | null } | null }> }, sprites: { __typename?: 'MonsterFormSprites', modifiedDate?: any | null, required?: boolean, phase?: Phase, bounty?: { __typename?: 'MonsterBounty', incomplete?: number | null, exists?: number | null, full?: number | null }, creditPrimary?: { __typename?: 'Credit', name?: string | null } | null, creditSecondary?: Array<{ __typename?: 'Credit', name?: string | null }>, history: Array<{ __typename?: 'MonsterHistory', modifications: Array<string>, obsolete: boolean, credit?: { __typename?: 'Credit', name?: string | null, id: string, discordHandle?: string | null, contact?: string | null } | null }>, actions?: Array<{ __typename?: 'CopyOf', action: string } | { __typename?: 'Sprite', action: string }> } };

export type CarrouselQueryVariables = Exact<{
  ids: Array<Scalars['Int']> | Scalars['Int'];
  withPortraitBounty: Scalars['Boolean'];
  withSpriteBounty: Scalars['Boolean'];
  withModifiedDate: Scalars['Boolean'];
  withPortraitPhases: Scalars['Boolean'];
  withSpritePhases: Scalars['Boolean'];
  withCredits: Scalars['Boolean'];
  withForms: Scalars['Boolean'];
  withSplitForms: Scalars['Boolean'];
  withCreditableHistory: Scalars['Boolean'];
  withSpriteActions: Scalars['Boolean'];
}>;


export type CarrouselQuery = { __typename?: 'Query', monster: Array<{ __typename?: 'Monster', id: number, name: string, rawId: string, forms?: Array<{ __typename?: 'MonsterForm', fullName?: string, portraits: { __typename?: 'MonsterFormPortraits', modifiedDate?: any | null, required?: boolean, phase?: Phase, previewEmotion?: { __typename?: 'Portrait', url: string } | null, bounty?: { __typename?: 'MonsterBounty', incomplete?: number | null, exists?: number | null, full?: number | null }, creditPrimary?: { __typename?: 'Credit', name?: string | null } | null, creditSecondary?: Array<{ __typename?: 'Credit', name?: string | null }>, history: Array<{ __typename?: 'MonsterHistory', modifications: Array<string>, obsolete: boolean, credit?: { __typename?: 'Credit', name?: string | null, id: string, discordHandle?: string | null, contact?: string | null } | null }> }, sprites: { __typename?: 'MonsterFormSprites', modifiedDate?: any | null, required?: boolean, phase?: Phase, bounty?: { __typename?: 'MonsterBounty', incomplete?: number | null, exists?: number | null, full?: number | null }, creditPrimary?: { __typename?: 'Credit', name?: string | null } | null, creditSecondary?: Array<{ __typename?: 'Credit', name?: string | null }>, history: Array<{ __typename?: 'MonsterHistory', modifications: Array<string>, obsolete: boolean, credit?: { __typename?: 'Credit', name?: string | null, id: string, discordHandle?: string | null, contact?: string | null } | null }>, actions?: Array<{ __typename?: 'CopyOf', action: string } | { __typename?: 'Sprite', action: string }> } }>, manual?: { __typename?: 'MonsterForm', fullName?: string, portraits: { __typename?: 'MonsterFormPortraits', modifiedDate?: any | null, required?: boolean, phase?: Phase, creditPrimary?: { __typename?: 'Credit', name?: string | null } | null, previewEmotion?: { __typename?: 'Portrait', url: string } | null, bounty?: { __typename?: 'MonsterBounty', incomplete?: number | null, exists?: number | null, full?: number | null }, creditSecondary?: Array<{ __typename?: 'Credit', name?: string | null }>, history: Array<{ __typename?: 'MonsterHistory', modifications: Array<string>, obsolete: boolean, credit?: { __typename?: 'Credit', name?: string | null, id: string, discordHandle?: string | null, contact?: string | null } | null }> }, sprites: { __typename?: 'MonsterFormSprites', modifiedDate?: any | null, required?: boolean, phase?: Phase, creditPrimary?: { __typename?: 'Credit', name?: string | null } | null, bounty?: { __typename?: 'MonsterBounty', incomplete?: number | null, exists?: number | null, full?: number | null }, creditSecondary?: Array<{ __typename?: 'Credit', name?: string | null }>, history: Array<{ __typename?: 'MonsterHistory', modifications: Array<string>, obsolete: boolean, credit?: { __typename?: 'Credit', name?: string | null, id: string, discordHandle?: string | null, contact?: string | null } | null }>, actions?: Array<{ __typename?: 'CopyOf', action: string } | { __typename?: 'Sprite', action: string }> } } | null }> };

export type ContributorsQueryVariables = Exact<{ [key: string]: never; }>;


export type ContributorsQuery = { __typename?: 'Query', credit: Array<{ __typename?: 'Credit', id: string, name?: string | null, contact?: string | null, discordHandle?: string | null }> };

export type KeysQueryVariables = Exact<{ [key: string]: never; }>;


export type KeysQuery = { __typename?: 'Query', meta: { __typename?: 'Meta', apiVersion: string, serverVersion: string, assetsCommit: string, assetsUpdateDate: any, updateCheckedDate: any }, monster: Array<{ __typename?: 'Monster', id: number, rawId: string }> };

export type MyCreditFragment = { __typename?: 'Credit', name?: string | null, contact?: string | null, id: string, discordHandle?: string | null };

export type MyHistoryFragment = { __typename?: 'MonsterHistory', modifiedDate: any, modifications: Array<string>, obsolete: boolean, credit?: { __typename?: 'Credit', name?: string | null, contact?: string | null, id: string, discordHandle?: string | null } | null };

export type PokemonQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PokemonQuery = { __typename?: 'Query', monster: Array<{ __typename?: 'Monster', id: number, name: string, forms: Array<{ __typename?: 'MonsterForm', path: string, name: string, fullName: string, portraits: { __typename?: 'MonsterFormPortraits', required: boolean, sheetUrl: string, recolorSheetUrl: string, modifiedDate?: any | null, history: Array<{ __typename?: 'MonsterHistory', modifiedDate: any, modifications: Array<string>, obsolete: boolean, credit?: { __typename?: 'Credit', name?: string | null, contact?: string | null, id: string, discordHandle?: string | null } | null }>, bounty: { __typename?: 'MonsterBounty', incomplete?: number | null, exists?: number | null, full?: number | null }, emotions: Array<{ __typename?: 'Portrait', emotion: string, url: string, locked: boolean }>, emotionsFlipped: Array<{ __typename?: 'Portrait', emotion: string, url: string, locked: boolean }>, creditPrimary?: { __typename?: 'Credit', name?: string | null, contact?: string | null, id: string, discordHandle?: string | null } | null, creditSecondary: Array<{ __typename?: 'Credit', name?: string | null, contact?: string | null, id: string, discordHandle?: string | null }> }, sprites: { __typename?: 'MonsterFormSprites', required: boolean, zipUrl?: string | null, animDataXml?: string | null, modifiedDate?: any | null, recolorSheetUrl?: string | null, history: Array<{ __typename?: 'MonsterHistory', modifiedDate: any, modifications: Array<string>, obsolete: boolean, credit?: { __typename?: 'Credit', name?: string | null, contact?: string | null, id: string, discordHandle?: string | null } | null }>, creditPrimary?: { __typename?: 'Credit', name?: string | null, contact?: string | null, id: string, discordHandle?: string | null } | null, creditSecondary: Array<{ __typename?: 'Credit', name?: string | null, contact?: string | null, id: string, discordHandle?: string | null }>, actions: Array<{ __typename?: 'CopyOf', action: string, copyOf: string } | { __typename?: 'Sprite', action: string, animUrl: string, offsetsUrl: string, shadowsUrl: string, locked: boolean }>, bounty: { __typename?: 'MonsterBounty', incomplete?: number | null, exists?: number | null, full?: number | null } } }> }> };

export const MyBountyFragmentDoc = gql`
    fragment myBounty on MonsterBounty {
  incomplete
  exists
  full
}
    `;
export const CreditableHistoryFragmentDoc = gql`
    fragment creditableHistory on MonsterHistory {
  credit {
    name
    id
    discordHandle
    contact
  }
  modifications
  obsolete
}
    `;
export const FormFragmentDoc = gql`
    fragment form on MonsterForm {
  fullName @include(if: $withSplitForms)
  portraits {
    modifiedDate @include(if: $withSplitForms)
    required @include(if: $withForms)
    previewEmotion @include(if: $withSplitForms) {
      url
    }
    bounty @include(if: $withPortraitBounty) {
      ...myBounty
    }
    creditPrimary @include(if: $withCredits) {
      name
    }
    creditSecondary @include(if: $withCredits) {
      name
    }
    phase @include(if: $withPortraitPhases)
    history {
      ...creditableHistory @include(if: $withCreditableHistory)
    }
  }
  sprites {
    modifiedDate @include(if: $withSplitForms)
    required @include(if: $withForms)
    bounty @include(if: $withSpriteBounty) {
      ...myBounty
    }
    creditPrimary @include(if: $withCredits) {
      name
    }
    creditSecondary @include(if: $withCredits) {
      name
    }
    phase @include(if: $withSpritePhases)
    history {
      ...creditableHistory @include(if: $withCreditableHistory)
    }
    actions @include(if: $withSpriteActions) {
      ... on Sprite {
        action
      }
      ... on CopyOf {
        action
      }
    }
  }
}
    ${MyBountyFragmentDoc}
${CreditableHistoryFragmentDoc}`;
export const MyCreditFragmentDoc = gql`
    fragment myCredit on Credit {
  name
  contact
  id
  discordHandle
}
    `;
export const MyHistoryFragmentDoc = gql`
    fragment myHistory on MonsterHistory {
  credit {
    ...myCredit
  }
  modifiedDate
  modifications
  obsolete
}
    ${MyCreditFragmentDoc}`;
export const CarrouselDocument = gql`
    query Carrousel($ids: [Int!]!, $withPortraitBounty: Boolean!, $withSpriteBounty: Boolean!, $withModifiedDate: Boolean!, $withPortraitPhases: Boolean!, $withSpritePhases: Boolean!, $withCredits: Boolean!, $withForms: Boolean!, $withSplitForms: Boolean!, $withCreditableHistory: Boolean!, $withSpriteActions: Boolean!) {
  monster(filter: $ids) {
    id
    name
    rawId
    forms @include(if: $withForms) {
      ...form
    }
    manual(path: "/") @skip(if: $withSplitForms) {
      ...form
      portraits {
        modifiedDate @include(if: $withModifiedDate)
        creditPrimary {
          name
        }
        previewEmotion {
          url
        }
      }
      sprites {
        modifiedDate @include(if: $withModifiedDate)
        creditPrimary {
          name
        }
      }
    }
  }
}
    ${FormFragmentDoc}`;

/**
 * __useCarrouselQuery__
 *
 * To run a query within a React component, call `useCarrouselQuery` and pass it any options that fit your needs.
 * When your component renders, `useCarrouselQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCarrouselQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *      withPortraitBounty: // value for 'withPortraitBounty'
 *      withSpriteBounty: // value for 'withSpriteBounty'
 *      withModifiedDate: // value for 'withModifiedDate'
 *      withPortraitPhases: // value for 'withPortraitPhases'
 *      withSpritePhases: // value for 'withSpritePhases'
 *      withCredits: // value for 'withCredits'
 *      withForms: // value for 'withForms'
 *      withSplitForms: // value for 'withSplitForms'
 *      withCreditableHistory: // value for 'withCreditableHistory'
 *      withSpriteActions: // value for 'withSpriteActions'
 *   },
 * });
 */
export function useCarrouselQuery(baseOptions: Apollo.QueryHookOptions<CarrouselQuery, CarrouselQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CarrouselQuery, CarrouselQueryVariables>(CarrouselDocument, options);
      }
export function useCarrouselLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CarrouselQuery, CarrouselQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CarrouselQuery, CarrouselQueryVariables>(CarrouselDocument, options);
        }
export type CarrouselQueryHookResult = ReturnType<typeof useCarrouselQuery>;
export type CarrouselLazyQueryHookResult = ReturnType<typeof useCarrouselLazyQuery>;
export type CarrouselQueryResult = Apollo.QueryResult<CarrouselQuery, CarrouselQueryVariables>;
export const ContributorsDocument = gql`
    query Contributors {
  credit {
    id
    name
    contact
    discordHandle
  }
}
    `;

/**
 * __useContributorsQuery__
 *
 * To run a query within a React component, call `useContributorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useContributorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContributorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useContributorsQuery(baseOptions?: Apollo.QueryHookOptions<ContributorsQuery, ContributorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContributorsQuery, ContributorsQueryVariables>(ContributorsDocument, options);
      }
export function useContributorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContributorsQuery, ContributorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContributorsQuery, ContributorsQueryVariables>(ContributorsDocument, options);
        }
export type ContributorsQueryHookResult = ReturnType<typeof useContributorsQuery>;
export type ContributorsLazyQueryHookResult = ReturnType<typeof useContributorsLazyQuery>;
export type ContributorsQueryResult = Apollo.QueryResult<ContributorsQuery, ContributorsQueryVariables>;
export const KeysDocument = gql`
    query Keys {
  meta {
    apiVersion
    serverVersion
    assetsCommit
    assetsUpdateDate
    updateCheckedDate
  }
  monster {
    id
    rawId
  }
}
    `;

/**
 * __useKeysQuery__
 *
 * To run a query within a React component, call `useKeysQuery` and pass it any options that fit your needs.
 * When your component renders, `useKeysQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useKeysQuery({
 *   variables: {
 *   },
 * });
 */
export function useKeysQuery(baseOptions?: Apollo.QueryHookOptions<KeysQuery, KeysQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<KeysQuery, KeysQueryVariables>(KeysDocument, options);
      }
export function useKeysLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<KeysQuery, KeysQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<KeysQuery, KeysQueryVariables>(KeysDocument, options);
        }
export type KeysQueryHookResult = ReturnType<typeof useKeysQuery>;
export type KeysLazyQueryHookResult = ReturnType<typeof useKeysLazyQuery>;
export type KeysQueryResult = Apollo.QueryResult<KeysQuery, KeysQueryVariables>;
export const PokemonDocument = gql`
    query Pokemon($id: Int!) {
  monster(filter: [$id]) {
    id
    name
    forms {
      path
      name
      fullName
      portraits {
        required
        history {
          ...myHistory
        }
        sheetUrl
        recolorSheetUrl
        modifiedDate
        bounty {
          ...myBounty
        }
        emotions {
          emotion
          url
          locked
        }
        emotionsFlipped {
          emotion
          url
          locked
        }
        creditPrimary {
          ...myCredit
        }
        creditSecondary {
          ...myCredit
        }
      }
      sprites {
        required
        history {
          ...myHistory
        }
        zipUrl
        animDataXml
        modifiedDate
        recolorSheetUrl
        creditPrimary {
          ...myCredit
        }
        creditSecondary {
          ...myCredit
        }
        actions {
          ... on Sprite {
            action
            animUrl
            offsetsUrl
            shadowsUrl
            locked
          }
          ... on CopyOf {
            action
            copyOf
          }
        }
        bounty {
          ...myBounty
        }
      }
    }
  }
}
    ${MyHistoryFragmentDoc}
${MyBountyFragmentDoc}
${MyCreditFragmentDoc}`;

/**
 * __usePokemonQuery__
 *
 * To run a query within a React component, call `usePokemonQuery` and pass it any options that fit your needs.
 * When your component renders, `usePokemonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePokemonQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePokemonQuery(baseOptions: Apollo.QueryHookOptions<PokemonQuery, PokemonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PokemonQuery, PokemonQueryVariables>(PokemonDocument, options);
      }
export function usePokemonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PokemonQuery, PokemonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PokemonQuery, PokemonQueryVariables>(PokemonDocument, options);
        }
export type PokemonQueryHookResult = ReturnType<typeof usePokemonQuery>;
export type PokemonLazyQueryHookResult = ReturnType<typeof usePokemonLazyQuery>;
export type PokemonQueryResult = Apollo.QueryResult<PokemonQuery, PokemonQueryVariables>;