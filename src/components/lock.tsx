import { Typography } from "@mui/material"
import { MonsterHistory } from "../generated/graphql"
import { Fragment } from "react"
import { formatDate } from "../util"
import { Author } from "./credits"
import { LightTooltip } from "./pokemon-informations"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"

export default function Lock({
  locked,
  history
}: {
  locked: boolean
  history: MonsterHistory[]
}) {
  return (
    <LightTooltip
      title={
        <>
          {history.map((e, i) => (
            <div key={i} style={{ display: "flex", gap: "10px" }}>
              <Typography>{formatDate(e.modifiedDate)}</Typography>:
              <Author credit={e.credit} />
            </div>
          ))}
          <Typography>
            {locked
              ? "This is locked and requires special permissions to be updated"
              : "This is unlocked, updates do not require special permissions"}
          </Typography>
        </>
      }
    >
      <InfoOutlinedIcon color={locked ? "error" : "success"} fontSize="small" />
    </LightTooltip>
  )
}
