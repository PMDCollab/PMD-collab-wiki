import { TextField } from "@mui/material"

export default function Search(props: {
  currentText: string
  setCurrentText: React.Dispatch<React.SetStateAction<string>>
}) {
  return (
    <TextField
      sx={{ backgroundColor: "white" }}
      fullWidth
      label="Mewtwo... Emmuffin... 151..."
      value={props.currentText}
      onChange={(e) => {
        props.setCurrentText(e.target.value)
      }}
    />
  )
}
