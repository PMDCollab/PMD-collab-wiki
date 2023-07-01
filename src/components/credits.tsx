import { Box, Grid, Link, Typography } from "@mui/material"
import { Credit } from "../generated/graphql"

export default function Credits(props: {
  primary: Credit | undefined | null
  secondary: Credit[]
}) {
  return (
    <Grid container spacing={3} sx={{ mt: 1 }}>
      {props.primary?.name && (
        <Grid item>
          <Typography>by</Typography>
          <Author credit={props.primary} />
        </Grid>
      )}

      {props.secondary.length && (
        <Grid item>
          <Typography>Others</Typography>
          <Box>
            {props.secondary.map((s, i) => (
              <Author credit={s} key={i} />
            ))}
          </Box>
        </Grid>
      )}
    </Grid>
  )
}

function Author(props: { credit: Credit | undefined | null }) {
  return (
    <Box key={props.credit?.id}>
      {props.credit?.name ? (
        <Link
          href={props.credit?.contact ? props.credit?.contact : ""}
          target="_blank"
        >
          {props.credit?.name}
        </Link>
      ) : (
        <Typography>{props.credit?.discordHandle}</Typography>
      )}
    </Box>
  )
}
