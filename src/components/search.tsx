import { TextField } from "@mui/material"

export default function Search({currentText, setCurrentText}: {
  currentText: string
  setCurrentText: React.Dispatch<React.SetStateAction<string>>
}) {
  return (
    <TextField
      sx={{ backgroundColor: "white" }}
      fullWidth
      label="Mewtwo... Emmuffin... 151..."
      value={currentText}
      onChange={(e) => {
        setCurrentText(e.target.value)
      }}
    />
  )
}
