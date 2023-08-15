import { Checkbox, FormControlLabel, Grid, Typography } from "@mui/material"
import { Parameters, PhaseCategory } from '../Home'
import { RankMethod } from "../types/enum"

interface Props {
  showParameters: Record<string, Parameters<RankMethod>>
  filterParameters: Parameters<PhaseCategory>[]
}
export default function DisplayParameters({ showParameters, filterParameters }: Props) {
  return (
    <Grid container spacing={2}>
      {[Object.values(showParameters), filterParameters].map((params, i) =>
        <Grid item key={i}>
          {params.map(({ state: [state, setState], name }) => (
            <FormControlLabel
              label={<Typography color="text.secondary">{name}</Typography>}
              control={
                <Checkbox
                  checked={state}
                  onChange={(e) => {
                    setState(e.target.checked)
                  }}
                />
              }
              key={name}
            />
          ))}
        </Grid>
      )}
    </Grid>
  )
}
