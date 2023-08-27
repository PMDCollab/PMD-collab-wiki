import { Box, Grid, Link, Typography } from "@mui/material"
import { Credit } from "../generated/graphql"

export default function Credits({
  primary,
  secondary
}: {
  primary: Credit | undefined | null
  secondary: Credit[]
}) {
  return (
    <Grid container spacing={3} sx={{ mt: 1 }}>
      {primary?.name && (
        <Grid item>
          <Typography>by</Typography>
          <Author credit={primary} />
        </Grid>
      )}

      {secondary.length != 0 && (
        <Grid item>
          <Typography>Others</Typography>
          <Box>
            {secondary.map((s, i) => (
              <Author credit={s} key={i} />
            ))}
          </Box>
        </Grid>
      )}
    </Grid>
  )
}

export function Author({ credit }: { credit: Credit | undefined | null }) {
  return (
    <Box key={credit?.id}>
      {credit?.name ? (
        <Link href={credit?.contact ? credit?.contact : ""} target="_blank">
          {credit?.name}
        </Link>
      ) : (
        <Typography>{credit?.discordHandle}</Typography>
      )}
    </Box>
  )
}
