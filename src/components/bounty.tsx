import { MonsterBounty } from "../generated/graphql"
import { faCoins } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Grid, Typography } from "@mui/material"

export default function Bounty(props: { bounty: MonsterBounty }) {
  if (props.bounty.exists || props.bounty.full || props.bounty.incomplete) {
    return (
      <Grid container>
        {props.bounty.exists ? (
          <Grid item sx={{ display: "flex", gap: "5px" }}>
            <Typography>{props.bounty.exists}</Typography>
            <FontAwesomeIcon icon={faCoins} />
            <Typography>exists</Typography>
          </Grid>
        ) : null}

        {props.bounty.full ? (
          <Grid item sx={{ display: "flex", gap: "5px" }}>
            <Typography>{props.bounty.full}</Typography>
            <FontAwesomeIcon icon={faCoins} />
            <Typography>full</Typography>
          </Grid>
        ) : null}

        {props.bounty.incomplete ? (
          <Grid item sx={{ display: "flex", gap: "5px" }}>
            <Typography>{props.bounty.incomplete}</Typography>
            <FontAwesomeIcon icon={faCoins} />
            <Typography>incomplete</Typography>
          </Grid>
        ) : null}
      </Grid>
    )
  } else {
    return null
  }
}
