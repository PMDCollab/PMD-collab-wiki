import { Box, Grid, Link, Typography } from "@mui/material"
import { Credit } from "../generated/graphql"

export default function Credits(props: {
  primary: Credit | undefined | null
  secondary: Credit[]
}) {
  return (
    <Grid container spacing={3}>
      {props.primary?.name ? (
        <Grid item>
          <Typography>by</Typography>
          <Author credit={props.primary} />
        </Grid>
      ) : null}

      {props.secondary.length !== 0 ? (
        <Grid item>
          <Typography>Others</Typography>
          <Box>
            {props.secondary.map((s) => (
              <Author credit={s} key={s.id} />
            ))}
          </Box>
        </Grid>
      ) : null}
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
