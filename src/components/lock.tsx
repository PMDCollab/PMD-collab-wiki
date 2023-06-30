import LockIcon from "@mui/icons-material/Lock"
import { Tooltip } from "@mui/material"

export default function Lock(props: { locked: boolean }) {
  if (props.locked) {
    return (
      <Tooltip title="This is locked and requires special permissions to be updated">
        <LockIcon color="error" fontSize="small" />
      </Tooltip>
    )
  } else {
    return (
      <Tooltip title="This is unlocked, update do not require special permissions">
        <LockIcon color="success" fontSize="small" />
      </Tooltip>
    )
  }
}
