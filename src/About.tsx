import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Link,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material"
import { Bar } from "./components/bar"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import EditIcon from "@mui/icons-material/Edit"
import ShuffleIcon from "@mui/icons-material/Shuffle"
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset"
import CheckIcon from "@mui/icons-material/Check"
import XIcon from "@mui/icons-material/Close"
import MovieIcon from "@mui/icons-material/Movie"

export default function About() {
  return (
    <Box>
      <Bar />
      <Container
        maxWidth="xl"
        sx={{ backgroundColor: "rgba(255,255,255,.9)", p: 4 }}
      >
        <Typography variant="h4" gutterBottom>
          About PMDCollab SpriteCollab
        </Typography>

        <Typography variant="h5" gutterBottom>
          Terms of Use
        </Typography>
        <Container>
          <Grid container spacing={2} justifyContent="space-around">
            <Grid>
              <Card>
                <CardContent>
                  <Typography align="center" variant="h5">
                    You may
                  </Typography>
                </CardContent>
                <CardActions>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckIcon color="success" />
                      </ListItemIcon>
                      <Typography>
                        Use these sprites in a ROMhack, fangame, sprite
                        comic, etc.
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckIcon color="success" />
                      </ListItemIcon>
                      <Typography>
                        Use these sprites as profile pictures, Discord
                        emotes, etc.
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckIcon color="success" />
                      </ListItemIcon>
                      <Typography>
                        Make edits or recolors of these sprites.
                      </Typography>
                    </ListItem>
                  </List>
                </CardActions>
              </Card>
            </Grid>
            <Grid>
              <Card>
                <CardContent>
                  <Typography align="center" variant="h5">
                    Do not
                  </Typography>
                </CardContent>
                <CardActions>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <XIcon color="error" />
                      </ListItemIcon>
                      <Typography>
                        Sell the things you make with these sprites.
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <XIcon color="error" />
                      </ListItemIcon>
                      <Typography>
                        Use these sprites without giving credit.
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <XIcon color="error" />
                      </ListItemIcon>
                      <Typography>
                        Claim that you created sprites that you did not
                        make.
                      </Typography>
                    </ListItem>
                  </List>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
        <Typography gutterBottom>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Legalese version
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                You are free to use, copy, redistribute, or modify sprites and
                portraits from this repository for your own projects and
                contributions. When using portraits or sprites from this
                repository, you must credit the contributors for each portrait and
                sprite you use. This information can be found on the page for each
                sprite.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Typography>

        <Typography variant="h5" gutterBottom>
          FAQ
        </Typography>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            What is PMDCollab?
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              PMDCollab is a collaborative project providing tools and resources
              to help fans of Pokémon Mystery Dungeon create their own ROMhacks,
              fangames, sprite comics, and more. This project, SpriteCollab,
              aims to be a central resource for PMD-styled portrait art and
              top-down dungeon sprites for Pokémon of all generations.
            </Typography>
            <Grid
              container
              spacing={2}
              justifyContent="space-around"
              sx={{ pt: 4 }}
            >
              <Grid>
                <Card>
                  <CardContent>
                    <Typography variant="h5" gutterBottom align="center">
                      Portraits
                    </Typography>
                    <Typography align="center">
                      <img
                        src="https://spriteserver.pmdcollab.org/assets/portrait_recolor-0025-0000-0001.png"
                        style={{ maxWidth: "30vw" }}
                      />
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid>
                <Card>
                  <CardContent>
                    <Typography variant="h5" gutterBottom align="center">
                      Sprites
                    </Typography>
                    <Typography align="center">
                      <img
                        src="https://spriteserver.pmdcollab.org/assets/sprite_recolor-0025-0000-0001.png"
                        style={{ maxWidth: "30vw" }}
                      />
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Where did these sprites come from?
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              The sprites and portraits in this repository includes both sprites
              made by Chunsoft for the original games and custom, fan-made
              sprites. Specific artist credits can be found on the pages for
              each sprite.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            I can make sprites! How can I help?
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              If you have created or want to learn how to create sprites,
              you can join the #sprite-asset-help channel of the{" "}
              <Link href="https://discord.gg/skytemple">
                SkyTemple discord server
              </Link>
              . Talk to the artists there and they'll help walk you through the
              process of adding sprites to the repository.
            </Typography>
            <Typography>
              Many of the artists there also take commissions for sprites, so if
              you need sprites for a specific Pokémon that isn't currently in
              the repository, you can commission someone to make them for you as
              well.
            </Typography>
            <Typography>
              If you're just interested in making sprites that fit the general style, you may find this {" "}
              <Link href="https://docs.google.com/presentation/d/1cuDMUz4fI1pAoS7Pp_VzlKmbx0u0C34SfJ3F6Gczt6Q/edit?usp=sharing">
                guidebook on how to make PMD-style sprites
              </Link>{" "}
              by veteran spriter Emmuffin useful.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            What other cool stuff do you guys do?
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Here's some of our favorites!</Typography>

            <List>
              <ListItem>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText>
                  <Link href="https://skytemple.org">SkyTemple</Link>, a tool to
                  make ROMhacks of Pokémon Mystery Dungeon: Explorers of Sky
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <ShuffleIcon />
                </ListItemIcon>
                <ListItemText>
                  <Link href="https://projectpokemon.org/home/files/file/4235-skytemple-randomizer/">
                    SkyTemple Randomizer
                  </Link>
                  , a program that randomizes all of the Pokémon in Explorers of
                  Sky.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <EditIcon />
                  <VideogameAssetIcon />
                </ListItemIcon>
                <ListItemText>
                  <Link href="https://github.com/audinowho/PMDODump">PMDO</Link>
                  , a Pokémon Mystery Dungeon fangame and fangame engine
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <MovieIcon />
                </ListItemIcon>
                <ListItemText>
                  <Link href="https://www.youtube.com/@mysterymail300">
                    Mystery Mail
                  </Link>
                  , a recurring event where participants make a section of an Explorers of Sky cutscene before passing it off to the next participant.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText>
                  <Link href="https://projectpokemon.org/home/forums/topic/59548-dreamnexus-a-rom-editor-for-pok%C3%A9mon-mystery-dungeon-rescue-team-dx/">
                    DreamNexus
                  </Link>
                  , a ROM editor for Rescue Team DX
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <VideogameAssetIcon />
                </ListItemIcon>
                <ListItemText>
                  <Link href="https://www.pmuniverse.net/">
                    PMU
                  </Link>
                  , a Pokémon Mystery Dungeon MMO
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <VideogameAssetIcon />
                </ListItemIcon>
                {/* I couldn't find a website or discord server or really anything to link for them. :/ If you find one feel free to add it */}
                <ListItemText>
                  <Link href="https://discord.gg/QhfKcSdxWd">
                    PMR
                  </Link>
                  , a Pokémon Mystery Dungeon action RPG
                </ListItemText>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      </Container>
    </Box>
  )
}
