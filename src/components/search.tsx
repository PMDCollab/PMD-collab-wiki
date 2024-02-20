import { TextField } from "@mui/material"
import { UseState } from '../util'

export default function Search({ textState: [currentText, setCurrentText] }: { textState: UseState<string> }) {
  return (
    <TextField
      sx={{ backgroundColor: "white" }}
      fullWidth
      label="Mewtwo... Emmuffin... 151..."
      value={currentText}
      onChange={async ({ target: { value } }) => setCurrentText(value)}
    />
  )
}
