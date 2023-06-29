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
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import StorageIcon from "@mui/icons-material/Storage"

export default function About() {
  return (
    <Box>
      <Bar />
      <Container
        maxWidth="xl"
        sx={{ backgroundColor: "rgba(255,255,255,.9)", p: 4 }}
      >
        <Typography variant="h4" gutterBottom>
          Everything about Pokemon Mystery Dungeon Collaborative Project
        </Typography>
        <Typography gutterBottom>
          Below you'll find answers to the questions we get asked the most.
        </Typography>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            What is PMD Collab ?
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              PMDCollab is a collaborative project providing tools and resources
              to help fans of Pokémon Mystery Dungeon create their own ROMhacks,
              fangames, sprite comics, and more. This project (SpriteCollab)
              aims to be a central resource for PMD-styled portrait art and
              top-down dungeon sprites for Pokémon of all generations.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            What can I use these sprites for? (Terms of Use)
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
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
                            <ErrorOutlineIcon color="error" />
                          </ListItemIcon>
                          <Typography>
                            Sell the things you make with these sprites.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <ErrorOutlineIcon color="error" />
                          </ListItemIcon>
                          <Typography>
                            Use these sprites without giving credit.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <ErrorOutlineIcon color="error" />
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
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Legal version
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
            How can I help?
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              There's a{" "}
              <Link href="https://docs.google.com/presentation/d/1cuDMUz4fI1pAoS7Pp_VzlKmbx0u0C34SfJ3F6Gczt6Q/edit?usp=sharing">
                How to Make PMD Sprites
              </Link>{" "}
              guide. If you have created or want to learn how to create sprites,
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
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            What other cool stuff do you guys do?
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Here's some of our favorites !</Typography>

            <List>
              <ListItem>
                <ListItemIcon>
                  <StorageIcon />
                </ListItemIcon>
                <ListItemText>
                  <Link href="https://spriteserver.pmdcollab.org/">
                    SpriteServer
                  </Link>
                  , a GraphQL server that distributes all data gathered in the{" "}
                  <Link href="https://github.com/PMDCollab/SpriteCollab">
                    SpriteCollab github repository
                  </Link>
                </ListItemText>
              </ListItem>
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
                  <VideogameAssetIcon />
                </ListItemIcon>
                <ListItemText>
                  <Link href="https://github.com/audinowho/PMDODump">PMDO</Link>
                  , a Pokémon Mystery Dungeon fangame and fangame engine
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
                  <Link href="https://pokemon-auto-chess.com">
                    Pokemon Auto Chess
                  </Link>
                  , an Auto Chess web based fan game
                </ListItemText>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            How is pokemon data structured ?
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              There are 2 types of assets for each pokemons:
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

                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon color="success" />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography>Portraits are 40x40 images</Typography>
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon color="success" />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography>
                            Each portrait contains 16 colors or less
                          </Typography>
                        </ListItemText>
                      </ListItem>
                    </List>
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
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon color="success" />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography>8 directions always included</Typography>
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon color="success" />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography>
                            "Dungeon" animations always available. It includes
                            Walk, Attack, Sleep, Hurt, Idle, Swing, Double, Hop
                            Charge and Rotate
                          </Typography>
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <ErrorOutlineIcon color="error" />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography>
                            No strict frame size (width/height) limitations
                          </Typography>
                        </ListItemText>
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Container>
    </Box>
  )
}
