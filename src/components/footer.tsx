import { Box, Grid, Link, Typography } from "@mui/material"
import { Meta } from "../generated/graphql"

export function Footer(props: { meta: Meta }) {
  return (
    <Box component="footer" sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item>
          <Typography>
            Last update:
            {new Date(props.meta.assetsUpdateDate).toLocaleString()}
          </Typography>
        </Grid>
        <Grid item>
          <Typography>
            Last Check for updates:
            {new Date(props.meta.updateCheckedDate).toLocaleString()}
          </Typography>
        </Grid>
        <Grid item>
          <Link
            target="_blank"
            href={`https://github.com/PMDCollab/SpriteCollab/commit/${props.meta.assetsCommit}`}
          >
            Last Commit
          </Link>
        </Grid>
      </Grid>
    </Box>
  )
}
