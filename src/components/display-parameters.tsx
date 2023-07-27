import { Checkbox, FormControlLabel, Grid, Typography } from "@mui/material"
import { ShowParameters } from '../Home'

export default function DisplayParameters({ showParameters }: { showParameters: ShowParameters }) {
  return (
    <Grid container spacing={2}>
      <Grid item>
        {Object.values(showParameters).map(({ state: [state, setState], name }) => (
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
    </Grid>
  )
}
