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
      <p style={{ fontSize: "0.7em", marginBottom: "0rem" }}>Rank by</p>
      <select
        style={{ borderWidth: "2px", height: "40px", fontSize: "0.7em" }}
        value={props.rankBy}
        id="default_select"
        onChange={(e) => {
          const rankMethod = e.target.value as RankMethod
          const methodToSetCheckbox: Partial<Record<RankMethod, Dispatch<SetStateAction<boolean>>>> = {
            [RankMethod.LAST_MODIFICATION]: props.setShowLastModification,
            [RankMethod.POKEDEX_NUMBER]: props.setShowIndex,
            [RankMethod.PORTRAIT_AUTHOR]: props.setPortraitAuthor,
            [RankMethod.SPRITE_AUTHOR]: props.setSpriteAuthor,
            [RankMethod.PORTRAIT_BOUNTY]: props.setShowPortraitBounty,
            [RankMethod.SPRITE_BOUNTY]: props.setShowSpriteBounty,
          };
          methodToSetCheckbox[rankMethod]?.(true);

          props.setRankBy(rankMethod);
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
