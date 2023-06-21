import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
import SportsEsportsIcon from "@mui/icons-material/SportsEsports"
import TwitterIcon from "@mui/icons-material/Twitter"
import GitHubIcon from "@mui/icons-material/GitHub"
import InfoIcon from "@mui/icons-material/Info"
import { Link } from "react-router-dom"

export function Bar() {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Link to={"/"}>
          <IconButton size="large" color="inherit">
            <HomeIcon />
            <Typography variant="h6">PMD Collab</Typography>
          </IconButton>
        </Link>

        <IconButton
          size="large"
          color="inherit"
          href="https://discord.gg/skytemple"
        >
          <SportsEsportsIcon />
          <Typography variant="h6">Discord</Typography>
        </IconButton>

        <IconButton
          size="large"
          color="inherit"
          href="https://twitter.com/PMD_Spritebot"
        >
          <TwitterIcon />
          <Typography variant="h6">Twitter</Typography>
        </IconButton>
        <IconButton
          size="large"
          color="inherit"
          href="https://twitter.com/PMD_Spritebot"
        >
          <GitHubIcon />
          <Typography variant="h6">Github</Typography>
        </IconButton>
        <Link to={"/About"}>
          <IconButton size="large" color="inherit">
            <InfoIcon />
            <Typography variant="h6">About</Typography>
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  )
}
