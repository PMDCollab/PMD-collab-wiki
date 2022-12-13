import { Dispatch, SetStateAction } from "react"
import { RankMethod } from "../types/enum"

export default function PokemonRanking(props: {
  setShowIndex: Dispatch<SetStateAction<boolean>>
  setPortraitAuthor: Dispatch<SetStateAction<boolean>>
  setSpriteAuthor: Dispatch<SetStateAction<boolean>>
  setShowLastModification: Dispatch<SetStateAction<boolean>>
  setShowPortraitBounty: Dispatch<SetStateAction<boolean>>
  setShowSpriteBounty: Dispatch<SetStateAction<boolean>>
  setRankBy: Dispatch<SetStateAction<RankMethod>>
  rankBy: RankMethod
}) {
  return (
    <div
      className="nes-select is-inline"
      style={{ display: "flex", alignItems: "center", width: "initial" }}
    >
      <p style={{ fontSize: "0.7em" }}>Rank by</p>
      <select
        style={{ borderWidth: "2px", height: "40px", fontSize: "0.7em" }}
        value={props.rankBy}
        id="default_select"
        onChange={(e) => {
          const rankMethod = e.target.value as RankMethod
          switch (rankMethod) {
            case RankMethod.LAST_MODIFICATION:
              props.setShowLastModification(true)
              break

            case RankMethod.POKEDEX_NUMBER:
              props.setShowIndex(true)
              break

            case RankMethod.PORTRAIT_AUTHOR:
              props.setPortraitAuthor(true)
              break

            case RankMethod.SPRITE_AUTHOR:
              props.setSpriteAuthor(true)
              break

            case RankMethod.PORTRAIT_BOUNTY:
              props.setShowPortraitBounty(true)
              break

            case RankMethod.SPRITE_BOUNTY:
              props.setShowSpriteBounty(true)
              break

            default:
              break
          }
          props.setRankBy(rankMethod)
        }}
      >
        {(Object.values(RankMethod) as RankMethod[]).map((r) => (
          <option
            style={{ fontSize: "1.5em", fontFamily: "Press Start 2P" }}
            key={r}
            value={r}
          >
            {r}
          </option>
        ))}
      </select>
    </div>
  )
}
