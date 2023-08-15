import { MonsterBounty } from "../generated/graphql"
import { Grid, Typography } from "@mui/material"

export default function Bounty({ bounty: { exists, full, incomplete } }: { bounty: MonsterBounty }) {
  if (!exists && !full && !incomplete) return null;
  return (
    <Grid container>
      {!!exists && (
        <Grid item sx={{ display: "flex", gap: "5px" }}>
          <Typography>{exists}</Typography>
          <Typography>Guild Points</Typography>
          <Typography>exists</Typography>
        </Grid>
      )}

      {!!full && (
        <Grid item sx={{ display: "flex", gap: "5px" }}>
          <Typography>{full}</Typography>
          <Typography>Guild Points</Typography>
          <Typography>full</Typography>
        </Grid>
      )}

      {!!incomplete && (
        <Grid item sx={{ display: "flex", gap: "5px" }}>
          <Typography>{incomplete}</Typography>
          <Typography>Guild Points</Typography>
          <Typography>incomplete</Typography>
        </Grid>
      )}
    </Grid>
  )
}
