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
  /** DateTime */
  DateTimeUtc: any;
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
  /**
   * Returns a list, that for each phase contains a list of actions (by index) that
   * need to exist for this phase to be considered completed.
   */
  completionActions: Array<Array<Scalars['Int']>>;
  /**
   * Returns a list, that for each phase contains a list of emotions (by index)
   * that need to exist for this phase to be considered completed.
   */
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

export type Credit = {
  __typename?: 'Credit';
  /** Contact information for this author. */
  contact?: Maybe<Scalars['String']>;
  /** Discord ID or absentee ID. Guaranteed to be an ASCII string. */
  id: Scalars['String'];
  /** The human-readable name of the author. Guaranteed to be an ASCII string. */
  name?: Maybe<Scalars['String']>;
};

export type Monster = {
  __typename?: 'Monster';
  /** All forms that exist for this monster. */
  forms: Array<MonsterForm>;
  /** Get a specific form for this monster. */
  get?: Maybe<MonsterForm>;
  /** The id of this monster. */
  id: Scalars['Int'];
  /**
   * Manually enter the path to a monster, seperated by /. This should match the
   * path as it is stored in SpriteCollab, however the path passed in might be
   * collapsed until a unique form is found.
   */
  manual?: Maybe<MonsterForm>;
  /** The name of this monster. */
  name?: Maybe<Scalars['String']>;
};


export type MonsterGetArgs = {
  female: Scalars['Boolean'];
  formId: Scalars['Int'];
  shiny: Scalars['Boolean'];
};


export type MonsterManualArgs = {
  path: Scalars['String'];
};

/**
 * A SkyTemple Discord Server Guild Point bounty that will be rewarded, if the
 * portrait or sprite has transitioned into a phase.
 */
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
  /** Whether or not this form is considered for a female monsters. */
  isFemale: Scalars['Boolean'];
  /** Whether or not this form is considered for a shiny. */
  isShiny: Scalars['Boolean'];
  /** The full path to this form as it's specified in the SpriteCollab JSON file and repository file structure. */
  path: Scalars['String'];
  /** Portraits for this form. */
  portraits: MonsterFormPortraits;
  /** Sprites for this form. */
  sprites: MonsterFormSprites;
};

export type MonsterFormPortraits = {
  __typename?: 'MonsterFormPortraits';
  /** Guild Point bounty for this portrait set. */
  bounty: MonsterBounty;
  /** Primary artist credits. */
  creditPrimary: Credit;
  /** All other artists credited. */
  creditSecondary: Array<Credit>;
  /** A single portrait for a given emotion. */
  emotion?: Maybe<Portrait>;
  /** A list of all existing flipped portraits for the emotions. */
  emotionFlipped?: Maybe<Portrait>;
  /** A list of all existing portraits for the emotions. */
  emotions: Array<Portrait>;
  /** A single flipped portrait for a given emotion. */
  emotionsFlipped: Array<Portrait>;
  /** The date and time this portrait set was last updated. */
  modifiedDate: Scalars['DateTimeUtc'];
  /** Current completion phase of the portraits. */
  phase: Phase;
  /** Current completion phase of the portraits (raw ID). */
  phaseRaw: Scalars['Int'];
  /** URL to a SpriteBot format recolor sheet. */
  recolorSheetUrl: Scalars['String'];
  /** Whether or not this form should have portraits. */
  required: Scalars['Boolean'];
  /** URL to a SpriteBot format sheet of all portraits. */
  sheetUrl: Scalars['String'];
};


export type MonsterFormPortraitsEmotionArgs = {
  emotion: Scalars['String'];
};


export type MonsterFormPortraitsEmotionFlippedArgs = {
  emotion: Scalars['String'];
};

export type MonsterFormSprites = {
  __typename?: 'MonsterFormSprites';
  /** A single sprite for a given action. */
  action?: Maybe<Sprite>;
  /** A list of all existing sprites for the actions. */
  actions: Array<Sprite>;
  /** Guild Point bounty for this sprite set. */
  bounty: MonsterBounty;
  /** Primary artist credits. */
  creditPrimary: Credit;
  /** All other artists credited. */
  creditSecondary: Array<Credit>;
  /** The date and time this sprite set was last updated. */
  modifiedDate: Scalars['DateTimeUtc'];
  /** Current completion phase of the sprites. */
  phase: Phase;
  /** Current completion phase of the sprites (raw ID). */
  phaseRaw: Scalars['Int'];
  /** URL to a SpriteBot format recolor sheet. */
  recolorSheetUrl: Scalars['String'];
  /** Whether or not this form should have sprites. */
  required: Scalars['Boolean'];
  /** URL to a SpriteBot format ZIP archive of all sprites. */
  zipUrl: Scalars['String'];
};


export type MonsterFormSpritesActionArgs = {
  action: Scalars['String'];
};


export type MonsterFormSpritesActionsArgs = {
  action: Scalars['String'];
};

/** A bounty for a non-standard phase. */
export type OtherBounty = {
  __typename?: 'OtherBounty';
  bounty: Scalars['Int'];
  phase: Scalars['Int'];
};

/** The current phase of the sprite or portrait. */
export enum Phase {
  Exists = 'EXISTS',
  Full = 'FULL',
  Incomplete = 'INCOMPLETE',
  /** Returned if the phase value is non-standard. Use phase_raw to get the raw ID. */
  Unknown = 'UNKNOWN'
}

/** A single portrait for a single emotion. */
export type Portrait = {
  __typename?: 'Portrait';
  emotion: Scalars['String'];
  url: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Version of this API. */
  apiVersion: Scalars['String'];
  /** Configuration for this instance of SpriteCollab. */
  config: Array<Config>;
  /** Retrieve a list of credits. */
  credit: Array<Credit>;
  /** Retrieve a list of monsters. */
  monster: Array<Monster>;
  /** Search for a credit entry by (parts) of the ID, the author name or the contact info. */
  searchCredit: Array<Credit>;
  /** Search for a monster by (parts) of its name. */
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
  action: Scalars['String'];
  url: Scalars['String'];
};

export type CarrouselQueryVariables = Exact<{ [key: string]: never; }>;


export type CarrouselQuery = { __typename?: 'Query', monster: Array<{ __typename?: 'Monster', id: number, name?: string | null, manual?: { __typename?: 'MonsterForm', portraits: { __typename?: 'MonsterFormPortraits', modifiedDate: any, creditPrimary: { __typename?: 'Credit', name?: string | null }, emotion?: { __typename?: 'Portrait', url: string } | null }, sprites: { __typename?: 'MonsterFormSprites', modifiedDate: any, creditPrimary: { __typename?: 'Credit', name?: string | null } } } | null }> };

export type KeysQueryVariables = Exact<{ [key: string]: never; }>;


export type KeysQuery = { __typename?: 'Query', monster: Array<{ __typename?: 'Monster', id: number }> };


export const CarrouselDocument = gql`
    query Carrousel {
  monster {
    id
    name
    manual(path: "/") {
      portraits {
        creditPrimary {
          name
        }
        modifiedDate
        emotion(emotion: "Normal") {
          url
        }
      }
      sprites {
        creditPrimary {
          name
        }
        modifiedDate
      }
    }
  }
}
    `;

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
 *   },
 * });
 */
export function useCarrouselQuery(baseOptions?: Apollo.QueryHookOptions<CarrouselQuery, CarrouselQueryVariables>) {
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
export const KeysDocument = gql`
    query Keys {
  monster {
    id
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