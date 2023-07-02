import { Dispatch, SetStateAction } from "react"
import { RankMethod } from "../types/enum"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

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
  const methodToSetCheckbox: Partial<
    Record<RankMethod, Dispatch<SetStateAction<boolean>>>> = {
    [RankMethod.LAST_MODIFICATION]: props.setShowLastModification,
    [RankMethod.POKEDEX_NUMBER]: props.setShowIndex,
    [RankMethod.PORTRAIT_AUTHOR]: props.setPortraitAuthor,
    [RankMethod.SPRITE_AUTHOR]: props.setSpriteAuthor,
    [RankMethod.PORTRAIT_BOUNTY]: props.setShowPortraitBounty,
    [RankMethod.SPRITE_BOUNTY]: props.setShowSpriteBounty
  }
  return (
    <FormControl sx={{ mt: 2 }} fullWidth>
      <InputLabel id="rank-by-label">Rank by</InputLabel>
      <Select
        label="Rank by"
        labelId="rank-by-label"
        id="rank-by"
        value={props.rankBy}
        onChange={(e) => {
          const rankMethod = e.target.value as RankMethod
          methodToSetCheckbox[rankMethod]?.(true)
          props.setRankBy(rankMethod)
        }}
      >
        {(Object.values(RankMethod) as RankMethod[]).map((r) => (
          <MenuItem key={r} value={r}>
            {r}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
