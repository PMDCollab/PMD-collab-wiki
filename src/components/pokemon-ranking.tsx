import { Dispatch, SetStateAction } from "react"
import { RankMethod } from "../types/enum"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { ShowParameters } from '../Home'

interface Props {
  showParameters: ShowParameters
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
          const selectedRankMethod = e.target.value as RankMethod
          Object.values(showParameters)
            .find(({ rankMethod }) => rankMethod == selectedRankMethod)
            ?.state[1](true);
          setRankBy(selectedRankMethod)
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
