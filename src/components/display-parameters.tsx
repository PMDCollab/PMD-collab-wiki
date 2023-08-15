import { Checkbox, FormControlLabel, Grid, Typography } from "@mui/material"
import { Parameters, PhaseCategory } from '../Home'
import { RankMethod } from "../types/enum"
import { Dispatch, SetStateAction } from "react"

interface Props {
  showParameters: Record<string, Parameters<RankMethod>>
  filterParameters: Parameters<PhaseCategory>[]
  splitForms: boolean
  setSplitForms: Dispatch<SetStateAction<boolean>>
}
export default function DisplayParameters({ showParameters, filterParameters, splitForms, setSplitForms }: Props) {
  return (
    <Grid container spacing={2}>
      <Grid item key={0}>
        <FormControlLabel
          label={<Typography color="text.secondary">Split Forms</Typography>}
          control={
            <Checkbox
              checked={splitForms}
              onChange={(e) => {
                setSplitForms(e.target.checked)
              }}
            />
          }
        />
      </Grid>
      {[Object.values(showParameters), filterParameters].map((params, i) =>
        <Grid item key={i + 1}>
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
