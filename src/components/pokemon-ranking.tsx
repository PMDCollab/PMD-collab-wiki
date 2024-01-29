import { Dispatch, SetStateAction } from "react"
import { RankMethod } from "../types/enum"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { Toggle, rankMethodToToggle } from '../types/params'

interface Props {
  setToggles: Dispatch<SetStateAction<Map<Toggle, boolean>>>
  rankBy: RankMethod
  setRankBy: Dispatch<SetStateAction<RankMethod>>
}
export default function PokemonRanking({ setToggles, rankBy, setRankBy }: Props) {
  return (
    <FormControl sx={{ mt: 2 }} fullWidth>
      <InputLabel id="rank-by-label">Rank by</InputLabel>
      <Select
        label="Rank by"
        labelId="rank-by-label"
        id="rank-by"
        value={rankBy}
        onChange={async (e) => {
          const selectedRankMethod = e.target.value as RankMethod;
          setRankBy(selectedRankMethod);
          if (selectedRankMethod == RankMethod.NAME) return;
          const selectedToggle = rankMethodToToggle[selectedRankMethod];
          setToggles(toggle => new Map([...toggle, [selectedToggle, true]]));
        }}
      >
        {Object.values(RankMethod).map((r) => (
          <MenuItem key={r} value={r}>
            {r}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
