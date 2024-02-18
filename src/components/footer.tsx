import { Container, Grid, Link, Typography } from "@mui/material"
import { Meta } from "../generated/graphql"

export function Footer({ meta: { assetsUpdateDate, updateCheckedDate, assetsCommit } }: { meta: Meta }) {
  return (
    <Container component="footer" sx={{ mt: 4 }}>
      <Grid container spacing={2} justifyContent="space-around">
        <Grid item>
          <Typography color="GrayText">
            Last update: {new Date(assetsUpdateDate).toLocaleString()}
          </Typography>
        </Grid>
        <Grid item>
          <Typography color="GrayText">
            Last Check for updates: {new Date(updateCheckedDate).toLocaleString()}
          </Typography>
        </Grid>
        <Grid item>
          <Link
            target="_blank"
            href={`https://github.com/PMDCollab/SpriteCollab/commit/${assetsCommit}`}
          >
            Last Commit
          </Link>
        </Grid>
      </Grid>
    </Container>
  )
}
