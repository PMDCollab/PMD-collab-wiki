import { Box, Link, Typography } from "@mui/material"
import { Credit, Maybe } from "../generated/graphql"

export function CreditsPrimary({ primary }: { primary?: Maybe<Credit> }) {
  return primary ? (
    <div style={{ display: "flex", gap: "8px" }}>
      <Typography>by</Typography>
      <Author credit={primary} />
    </div>
  ) : null;
}

export function CreditsSecondary(props: { secondary: Credit[] }) {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <Typography>Others</Typography>
      {props.secondary.map((s, i) => (
        <Author credit={s} key={i} />
      ))}
    </div>
  )
}

export function Author({ credit }: { credit?: Maybe<Credit> }) {
  return (
    <Box key={credit?.id}>
      {credit?.name ? (
        <Link href={credit?.contact ?? ""} target="_blank">
          {credit?.name}
        </Link>
      ) : (
        <Typography>{credit?.discordHandle}</Typography>
      )}
    </Box>
  )
}
