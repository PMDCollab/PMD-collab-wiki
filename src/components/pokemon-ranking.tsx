import { Dispatch, SetStateAction } from "react"
import { RankMethod } from "../types/enum"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { Parameters } from '../Home'

interface Props {
  showParameters: Record<string, Parameters<RankMethod>>
  rankBy: RankMethod
  setRankBy: Dispatch<SetStateAction<RankMethod>>
}
export default function PokemonRanking({ showParameters, rankBy, setRankBy }: Props) {
  return (
    <FormControl sx={{ mt: 2 }} fullWidth>
      <InputLabel id="rank-by-label">Rank by</InputLabel>
      <Select
        label="Rank by"
        labelId="rank-by-label"
        id="rank-by"
        value={rankBy}
        onChange={(e) => {
          const selectedRankMethod = e.target.value as RankMethod;
          Object.values(showParameters)
            .find(({ value }) => value == selectedRankMethod)
            ?.state[1](true);
          setRankBy(selectedRankMethod);
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
