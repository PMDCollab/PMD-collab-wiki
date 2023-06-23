import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
import SportsEsportsIcon from "@mui/icons-material/SportsEsports"
import TwitterIcon from "@mui/icons-material/Twitter"
import GitHubIcon from "@mui/icons-material/GitHub"
import InfoIcon from "@mui/icons-material/Info"
import GroupIcon from "@mui/icons-material/Group"
import { Link } from "react-router-dom"

export function Bar() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  return (
    <AppBar position="relative">
      <Toolbar>
        <Link to={"/"}>
          <IconButton size="large" color="inherit">
            <HomeIcon />
            {!isMobile ? (
              <Typography variant="h6" ml={0.5}>
                PMD Collab
              </Typography>
            ) : null}
          </IconButton>
        </Link>

        <IconButton
          size="large"
          color="inherit"
          href="https://discord.gg/skytemple"
        >
          <SportsEsportsIcon />
          {!isMobile ? (
            <Typography variant="h6" ml={0.5}>
              Discord
            </Typography>
          ) : null}
        </IconButton>

        <IconButton
          size="large"
          color="inherit"
          href="https://twitter.com/PMD_Spritebot"
        >
          <TwitterIcon />
          {!isMobile ? (
            <Typography variant="h6" ml={0.5}>
              Twitter
            </Typography>
          ) : null}
        </IconButton>
        <IconButton
          size="large"
          color="inherit"
          href="https://github.com/PMDCollab/SpriteCollab"
        >
          <GitHubIcon />
          {!isMobile ? (
            <Typography variant="h6" ml={0.5}>
              Github
            </Typography>
          ) : null}
        </IconButton>
        <Link to={"/About"}>
          <IconButton size="large" color="inherit">
            <InfoIcon />
            {!isMobile ? (
              <Typography variant="h6" ml={0.5}>
                About
              </Typography>
            ) : null}
          </IconButton>
        </Link>
        <Link to={"/Contributors"}>
          <IconButton size="large" color="inherit">
            <GroupIcon />
            {!isMobile ? (
              <Typography variant="h6" ml={0.5}>
                Contributors
              </Typography>
            ) : null}
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  )
}
