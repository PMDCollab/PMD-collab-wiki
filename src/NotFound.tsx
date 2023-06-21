import { Box } from "@mui/material"
import { Bar } from "./components/bar"

export default function NotFound() {
  return (
    <Box>
      <Bar />
      <h1 className="nes-text is-primary">404 not found</h1>
      <p>
        There's no content here. Please note that pokemon index are zero-padded.
        If you are looking for mew, the url will be{" "}
        <a href={"/#/0151"}>{window.location.hostname + "/#/0151"} </a>
        and not {window.location.hostname + "/#/151"}.
      </p>
    </Box>
  )
}
