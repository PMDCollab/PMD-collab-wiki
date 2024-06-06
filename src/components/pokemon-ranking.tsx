import { useContext } from "react"
import { RankMethod } from "../types/enum"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { rankMethodToToggle } from '../types/params'
import { Context } from '../Home'
import { toggleParamCallback } from '../util'

export default function PokemonRanking() {
  const {
    searchParamsState: [_, setSearchParams],
    rankState: [rankBy, setRankBy]
  } = useContext(Context)!;
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
          setSearchParams(toggleParamCallback(selectedToggle, true));
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
