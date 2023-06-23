/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** DateTime */
  DateTimeUtc: any
}

/** An action mapped uniquely to an ID. */
export type ActionId = {
  __typename?: "ActionId"
  id: Scalars["Int"]
  name: Scalars["String"]
}

/** Configuration for this instance of SpriteCollab. */
export type Config = {
  __typename?: "Config"
  /** A mapping of actions to EoS action indices. */
  actionMap: Array<ActionId>
  /** A list of known action. The position is the ID of the action. */
  actions: Array<Scalars["String"]>
  /**
   * Returns a list, that for each phase contains a list of actions (by index) that
   * need to exist for this phase to be considered completed.
   */
  completionActions: Array<Array<Scalars["Int"]>>
  /**
   * Returns a list, that for each phase contains a list of emotions (by index)
   * that need to exist for this phase to be considered completed.
   */
  completionEmotions: Array<Array<Scalars["Int"]>>
  /** A list of known emotions. The position is the ID of the emotion. */
  emotions: Array<Scalars["String"]>
  /** The portrait width and height in pixels. */
  portraitSize: Scalars["Int"]
  /** How many portraits per row a portrait sheet contains. */
  portraitTileX: Scalars["Int"]
  /** How many rows a portrait sheet contains. */
  portraitTileY: Scalars["Int"]
}

/** A sprite, which is a copy of another sprite. */
export type CopyOf = {
  __typename?: "CopyOf"
  /** Action of this sprite. */
  action: Scalars["String"]
  /** Which action this sprite is a copy of. */
  copyOf: Scalars["String"]
  /** Whether or not this sprite is locked and requires special permissions to be updated. */
  locked: Scalars["Boolean"]
}

export type Credit = {
  __typename?: "Credit"
  /** Contact information for this author. */
  contact?: Maybe<Scalars["String"]>
  /**
   * Discord name and discriminator in the form Name#Discriminator (eg.
   * Capypara#7887), if this is a credit for a Discord profile, and the server can
   * resolve the ID to a Discord profile.
   */
  discordHandle?: Maybe<Scalars["String"]>
  /** Discord ID or absentee ID. Guaranteed to be an ASCII string. */
  id: Scalars["String"]
  /** The human-readable name of the author. Guaranteed to be an ASCII string. */
  name?: Maybe<Scalars["String"]>
}

export type Meta = {
  __typename?: "Meta"
  /** Version of this API. */
  apiVersion: Scalars["String"]
  /** Git Commit (https://github.com/PMDCollab/SpriteCollab/) currently checked out to serve the assets. */
  assetsCommit: Scalars["String"]
  /**
   * Date of the last commit in the assets repository
   * (https://github.com/PMDCollab/SpriteCollab) that is currently checked out.
   */
  assetsUpdateDate: Scalars["DateTimeUtc"]
  /** Version of spritecollab-srv serving this API. */
  serverVersion: Scalars["String"]
  /** Date that the server last checked for updates. */
  updateCheckedDate: Scalars["DateTimeUtc"]
}

export type Monster = {
  __typename?: "Monster"
  /** All forms that exist for this monster. */
  forms: Array<MonsterForm>
  /** Get a specific form for this monster. */
  get?: Maybe<MonsterForm>
  /** ID of this monster. */
  id: Scalars["Int"]
  /**
   * Manually enter the path to a monster, seperated by /. This should match the
   * path as it is stored in SpriteCollab, however the path passed in might be
   * collapsed until a unique form is found.
   */
  manual?: Maybe<MonsterForm>
  /** Human-readable name of this monster. */
  name: Scalars["String"]
  /** Raw ID of this monster, as a string. This is a 4-character numeric string, padded with leading zeroes. */
  rawId: Scalars["String"]
}

export type MonsterGetArgs = {
  female: Scalars["Boolean"]
  formId: Scalars["Int"]
  shiny: Scalars["Boolean"]
}

export type MonsterManualArgs = {
  path: Scalars["String"]
}

/**
 * A SkyTemple Discord Server Guild Point bounty that will be rewarded, if the
 * portrait or sprite has transitioned into a phase.
 */
export type MonsterBounty = {
  __typename?: "MonsterBounty"
  /** Amount of points to reward if the phase changes to Exists. */
  exists?: Maybe<Scalars["Int"]>
  /** Amount of points to reward if the phase changes to Full. */
  full?: Maybe<Scalars["Int"]>
  /** Amount of points to reward if the phase changes to Incomplete. */
  incomplete?: Maybe<Scalars["Int"]>
  /** If true, SpriteBot will not automatically hand out the Guild Point bounty. */
  modreward: Scalars["Boolean"]
  other: Array<OtherBounty>
}

export type MonsterForm = {
  __typename?: "MonsterForm"
  /** Whether or not this form is canon. */
  canon: Scalars["Boolean"]
  /** Human-readable full name of this form (excluding the monster name itself). */
  fullName: Scalars["String"]
  /**
   * The path to this form (including the monster ID) as it's specified in the
   * SpriteCollab tracker.json file and repository file structure.
   */
  fullPath: Scalars["String"]
  /** Whether or not this form is considered for a female monsters. */
  isFemale: Scalars["Boolean"]
  /** Whether or not this form is considered for a shiny. */
  isShiny: Scalars["Boolean"]
  /** The ID of the monster, that this form belongs to. */
  monsterId: Scalars["Int"]
  /** Human-readable name of this form. */
  name: Scalars["String"]
  /**
   * The path to this form (without the monster ID) as it's specified in the
   * SpriteCollab tracker.json file and repository file structure.
   */
  path: Scalars["String"]
  /** Portraits for this form. */
  portraits: MonsterFormPortraits
  /** Sprites for this form. */
  sprites: MonsterFormSprites
}

export type MonsterFormPortraits = {
  __typename?: "MonsterFormPortraits"
  /** Guild Point bounty for this portrait set. */
  bounty: MonsterBounty
  /** Primary artist credits. */
  creditPrimary?: Maybe<Credit>
  /** All other artists credited. */
  creditSecondary: Array<Credit>
  /** A single portrait for a given emotion. */
  emotion?: Maybe<Portrait>
  /** A single flipped portrait for a given emotion. */
  emotionFlipped?: Maybe<Portrait>
  /** A list of all existing portraits for the emotions. */
  emotions: Array<Portrait>
  /** A list of all existing flipped portraits for the emotions. */
  emotionsFlipped: Array<Portrait>
  /** The date and time this portrait set was last updated. */
  modifiedDate?: Maybe<Scalars["DateTimeUtc"]>
  /** Current completion phase of the portraits. */
  phase: Phase
  /** Current completion phase of the portraits (raw ID). */
  phaseRaw: Scalars["Int"]
  /** A single portrait. Return the 'Normal' portrait if avalaible, but may return another one if not present. */
  previewEmotion?: Maybe<Portrait>
  /** URL to a SpriteBot format recolor sheet. */
  recolorSheetUrl: Scalars["String"]
  /** Whether or not this form should have portraits. */
  required: Scalars["Boolean"]
  /** URL to a SpriteBot format sheet of all portraits. */
  sheetUrl: Scalars["String"]
}

export type MonsterFormPortraitsEmotionArgs = {
  emotion: Scalars["String"]
}

export type MonsterFormPortraitsEmotionFlippedArgs = {
  emotion: Scalars["String"]
}

export type MonsterFormSprites = {
  __typename?: "MonsterFormSprites"
  /** A single sprite for a given action. */
  action?: Maybe<SpriteUnion>
  /** A list of all existing sprites for the actions. */
  actions: Array<SpriteUnion>
  /** URL to the AnimData XML file for this sprite set. */
  animDataXml?: Maybe<Scalars["String"]>
  /** Guild Point bounty for this sprite set. */
  bounty: MonsterBounty
  /** Primary artist credits. */
  creditPrimary?: Maybe<Credit>
  /** All other artists credited. */
  creditSecondary: Array<Credit>
  /** The date and time this sprite set was last updated. */
  modifiedDate?: Maybe<Scalars["DateTimeUtc"]>
  /** Current completion phase of the sprites. */
  phase: Phase
  /** Current completion phase of the sprites (raw ID). */
  phaseRaw: Scalars["Int"]
  /** URL to a SpriteBot format recolor sheet. */
  recolorSheetUrl?: Maybe<Scalars["String"]>
  /** Whether or not this form should have sprites. */
  required: Scalars["Boolean"]
  /** URL to a SpriteBot format ZIP archive of all sprites. */
  zipUrl?: Maybe<Scalars["String"]>
}

export type MonsterFormSpritesActionArgs = {
  action: Scalars["String"]
}

/** A bounty for a non-standard phase. */
export type OtherBounty = {
  __typename?: "OtherBounty"
  bounty: Scalars["Int"]
  phase: Scalars["Int"]
}

/** The current phase of the sprite or portrait. */
export enum Phase {
  Exists = "EXISTS",
  Full = "FULL",
  Incomplete = "INCOMPLETE",
  /** Returned if the phase value is non-standard. Use phaseRaw to get the raw ID. */
  Unknown = "UNKNOWN"
}

/** A single portrait for a single emotion. */
export type Portrait = {
  __typename?: "Portrait"
  /** Name of the emotion. */
  emotion: Scalars["String"]
  /** Whether or not this sprite is locked and requires special permissions to be updated. */
  locked: Scalars["Boolean"]
  /** URL to the portraits. */
  url: Scalars["String"]
}

export type Query = {
  __typename?: "Query"
  /**
   * Version of this API.
   * @deprecated Use `meta` instead.
   */
  apiVersion: Scalars["String"]
  /** Configuration for this instance of SpriteCollab. */
  config: Config
  /** Retrieve a list of credits. */
  credit: Array<Credit>
  /** Meta information about the server and state of the assets. */
  meta: Meta
  /** Retrieve a list of monsters. */
  monster: Array<Monster>
  /** Search for a credit entry by (parts) of the ID, the author name or the contact info. Results are sorted by best match. */
  searchCredit: Array<Credit>
  /** Search for a monster by (parts) of its name. Results are sorted by best match. */
  searchMonster: Array<Monster>
}

export type QueryMonsterArgs = {
  filter?: InputMaybe<Array<Scalars["Int"]>>
}

export type QuerySearchCreditArgs = {
  query: Scalars["String"]
}

export type QuerySearchMonsterArgs = {
  monsterName: Scalars["String"]
}

/** A single sprite for a single action. */
export type Sprite = {
  __typename?: "Sprite"
  /** Action of this sprite. */
  action: Scalars["String"]
  /** URL to the sprite sheet containing the actual frames for the animation. */
  animUrl: Scalars["String"]
  /** Whether or not this sprite is locked and requires special permissions to be updated. */
  locked: Scalars["Boolean"]
  /** URL to the sprite sheet containing the sprite offset pixels for each frame. */
  offsetsUrl: Scalars["String"]
  /** URL to the sprite sheet containing the shadow placeholders for each frame. */
  shadowsUrl: Scalars["String"]
}

/**
 * A single sprite for a single action that is either a copy of another sprite (as
 * defined in the AnimData.xml) or has it's own sprite data.
 */
export type SpriteUnion = CopyOf | Sprite

export type MyBountyFragment = {
  __typename?: "MonsterBounty"
  incomplete?: number | null
  exists?: number | null
  full?: number | null
}

export type CarrouselQueryVariables = Exact<{
  ids: Array<Scalars["Int"]> | Scalars["Int"]
}>

export type CarrouselQuery = {
  __typename?: "Query"
  monster: Array<{
    __typename?: "Monster"
    id: number
    name: string
    rawId: string
    forms: Array<{
      __typename?: "MonsterForm"
      portraits: {
        __typename?: "MonsterFormPortraits"
        bounty: {
          __typename?: "MonsterBounty"
          incomplete?: number | null
          exists?: number | null
          full?: number | null
        }
      }
      sprites: {
        __typename?: "MonsterFormSprites"
        bounty: {
          __typename?: "MonsterBounty"
          incomplete?: number | null
          exists?: number | null
          full?: number | null
        }
      }
    }>
    manual?: {
      __typename?: "MonsterForm"
      portraits: {
        __typename?: "MonsterFormPortraits"
        phase: Phase
        modifiedDate?: any | null
        creditPrimary?: { __typename?: "Credit"; name?: string | null } | null
        previewEmotion?: { __typename?: "Portrait"; url: string } | null
      }
      sprites: {
        __typename?: "MonsterFormSprites"
        phase: Phase
        modifiedDate?: any | null
        creditPrimary?: { __typename?: "Credit"; name?: string | null } | null
      }
    } | null
  }>
}

export type ContributorsQueryVariables = Exact<{ [key: string]: never }>

export type ContributorsQuery = {
  __typename?: "Query"
  credit: Array<{
    __typename?: "Credit"
    id: string
    name?: string | null
    contact?: string | null
    discordHandle?: string | null
  }>
}

export type KeysQueryVariables = Exact<{ [key: string]: never }>

export type KeysQuery = {
  __typename?: "Query"
  meta: {
    __typename?: "Meta"
    apiVersion: string
    serverVersion: string
    assetsCommit: string
    assetsUpdateDate: any
    updateCheckedDate: any
  }
  monster: Array<{ __typename?: "Monster"; id: number; rawId: string }>
}

export type MyCreditFragment = {
  __typename?: "Credit"
  name?: string | null
  contact?: string | null
  id: string
  discordHandle?: string | null
}

export type PokemonQueryVariables = Exact<{
  id: Scalars["Int"]
}>

export type PokemonQuery = {
  __typename?: "Query"
  monster: Array<{
    __typename?: "Monster"
    id: number
    name: string
    forms: Array<{
      __typename?: "MonsterForm"
      path: string
      name: string
      fullName: string
      portraits: {
        __typename?: "MonsterFormPortraits"
        sheetUrl: string
        recolorSheetUrl: string
        modifiedDate?: any | null
        bounty: {
          __typename?: "MonsterBounty"
          incomplete?: number | null
          exists?: number | null
          full?: number | null
        }
        emotions: Array<{
          __typename?: "Portrait"
          emotion: string
          url: string
          locked: boolean
        }>
        emotionsFlipped: Array<{
          __typename?: "Portrait"
          emotion: string
          url: string
          locked: boolean
        }>
        creditPrimary?: {
          __typename?: "Credit"
          name?: string | null
          contact?: string | null
          id: string
          discordHandle?: string | null
        } | null
        creditSecondary: Array<{
          __typename?: "Credit"
          name?: string | null
          contact?: string | null
          id: string
          discordHandle?: string | null
        }>
      }
      sprites: {
        __typename?: "MonsterFormSprites"
        zipUrl?: string | null
        animDataXml?: string | null
        modifiedDate?: any | null
        recolorSheetUrl?: string | null
        creditPrimary?: {
          __typename?: "Credit"
          name?: string | null
          contact?: string | null
          id: string
          discordHandle?: string | null
        } | null
        creditSecondary: Array<{
          __typename?: "Credit"
          name?: string | null
          contact?: string | null
          id: string
          discordHandle?: string | null
        }>
        actions: Array<
          | { __typename?: "CopyOf"; action: string; copyOf: string }
          | {
              __typename?: "Sprite"
              action: string
              animUrl: string
              offsetsUrl: string
              shadowsUrl: string
              locked: boolean
            }
        >
        bounty: {
          __typename?: "MonsterBounty"
          incomplete?: number | null
          exists?: number | null
          full?: number | null
        }
      }
    }>
  }>
}

export const MyBountyFragmentDoc = gql`
  fragment myBounty on MonsterBounty {
    incomplete
    exists
    full
  }
`
export const MyCreditFragmentDoc = gql`
  fragment myCredit on Credit {
    name
    contact
    id
    discordHandle
  }
`
export const CarrouselDocument = gql`
  query Carrousel($ids: [Int!]!) {
    monster(filter: $ids) {
      id
      name
      rawId
      forms {
        portraits {
          bounty {
            ...myBounty
          }
        }
        sprites {
          bounty {
            ...myBounty
          }
        }
      }
      manual(path: "/") {
        portraits {
          phase
          creditPrimary {
            name
          }
          modifiedDate
          previewEmotion {
            url
          }
        }
        sprites {
          phase
          creditPrimary {
            name
          }
          modifiedDate
        }
      }
    }
  }
  ${MyBountyFragmentDoc}
`

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
 *   },
 * });
 */
export function useCarrouselQuery(
  baseOptions: Apollo.QueryHookOptions<CarrouselQuery, CarrouselQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<CarrouselQuery, CarrouselQueryVariables>(
    CarrouselDocument,
    options
  )
}
export function useCarrouselLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CarrouselQuery,
    CarrouselQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<CarrouselQuery, CarrouselQueryVariables>(
    CarrouselDocument,
    options
  )
}
export type CarrouselQueryHookResult = ReturnType<typeof useCarrouselQuery>
export type CarrouselLazyQueryHookResult = ReturnType<
  typeof useCarrouselLazyQuery
>
export type CarrouselQueryResult = Apollo.QueryResult<
  CarrouselQuery,
  CarrouselQueryVariables
>
export const ContributorsDocument = gql`
  query Contributors {
    credit {
      id
      name
      contact
      discordHandle
    }
  }
`

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
export function useContributorsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ContributorsQuery,
    ContributorsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ContributorsQuery, ContributorsQueryVariables>(
    ContributorsDocument,
    options
  )
}
export function useContributorsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ContributorsQuery,
    ContributorsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ContributorsQuery, ContributorsQueryVariables>(
    ContributorsDocument,
    options
  )
}
export type ContributorsQueryHookResult = ReturnType<
  typeof useContributorsQuery
>
export type ContributorsLazyQueryHookResult = ReturnType<
  typeof useContributorsLazyQuery
>
export type ContributorsQueryResult = Apollo.QueryResult<
  ContributorsQuery,
  ContributorsQueryVariables
>
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
`

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
export function useKeysQuery(
  baseOptions?: Apollo.QueryHookOptions<KeysQuery, KeysQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<KeysQuery, KeysQueryVariables>(KeysDocument, options)
}
export function useKeysLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<KeysQuery, KeysQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<KeysQuery, KeysQueryVariables>(
    KeysDocument,
    options
  )
}
export type KeysQueryHookResult = ReturnType<typeof useKeysQuery>
export type KeysLazyQueryHookResult = ReturnType<typeof useKeysLazyQuery>
export type KeysQueryResult = Apollo.QueryResult<KeysQuery, KeysQueryVariables>
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
  ${MyBountyFragmentDoc}
  ${MyCreditFragmentDoc}
`

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
export function usePokemonQuery(
  baseOptions: Apollo.QueryHookOptions<PokemonQuery, PokemonQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<PokemonQuery, PokemonQueryVariables>(
    PokemonDocument,
    options
  )
}
export function usePokemonLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PokemonQuery, PokemonQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<PokemonQuery, PokemonQueryVariables>(
    PokemonDocument,
    options
  )
}
export type PokemonQueryHookResult = ReturnType<typeof usePokemonQuery>
export type PokemonLazyQueryHookResult = ReturnType<typeof usePokemonLazyQuery>
export type PokemonQueryResult = Apollo.QueryResult<
  PokemonQuery,
  PokemonQueryVariables
>
