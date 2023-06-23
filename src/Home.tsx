import PokemonCarousel from "./components/pokemon-carousel"
import Search from "./components/search"
import { useState } from "react"
import { RankMethod } from "./types/enum"
import DisplayParameters from "./components/display-parameters"
import PokemonRanking from "./components/pokemon-ranking"
import { Meta } from "./generated/graphql"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material"
import { Bar } from "./components/bar"
import { Footer } from "./components/footer"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

export default function Home(props: { ids: number[]; meta: Meta }) {
  const [currentText, setCurrentText] = useState("")
  const [rankBy, setRankBy] = useState<RankMethod>(RankMethod.POKEDEX_NUMBER)
  const [showPortraitAuthor, setPortraitAuthor] = useState<boolean>(false)
  const [showSpriteAuthor, setSpriteAuthor] = useState<boolean>(false)
  const [showIndex, setShowIndex] = useState<boolean>(false)
  const [showLastModification, setShowLastModification] =
    useState<boolean>(false)
  const [showPortraitBounty, setShowPortraitBounty] = useState<boolean>(false)
  const [showSpriteBounty, setShowSpriteBounty] = useState<boolean>(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  return (
    <Box>
      <Bar />
      <Container maxWidth="xl" sx={{ backgroundColor: "rgba(255,255,255,.9)" }}>
        <Typography
          variant={isMobile ? "subtitle2" : "h5"}
          align="center"
          color="text.secondary"
          gutterBottom
        >
          Free to use with credit for ROMhacks, fangames, etc. Don't use for
          commercial projects.
        </Typography>
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Typography
            variant={isMobile ? "subtitle2" : "h5"}
            align="center"
            color="text.secondary"
            gutterBottom
          >
            Search for a pokemon, artist or pokedex number ...
          </Typography>
          <Search currentText={currentText} setCurrentText={setCurrentText} />
          {!isMobile ? (
            <Accordion sx={{ mt: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography color="text.secondary">
                  Searching options
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <DisplayParameters
                  setSpriteAuthor={setSpriteAuthor}
                  setPortraitAuthor={setPortraitAuthor}
                  setShowIndex={setShowIndex}
                  setShowLastModification={setShowLastModification}
                  setShowPortraitBounty={setShowPortraitBounty}
                  setShowSpriteBounty={setShowSpriteBounty}
                  showPortraitAuthor={showPortraitAuthor}
                  showSpriteAuthor={showSpriteAuthor}
                  showIndex={showIndex}
                  showLastModification={showLastModification}
                  showPortraitBounty={showPortraitBounty}
                  showSpriteBounty={showSpriteBounty}
                />
                <PokemonRanking
                  setSpriteAuthor={setSpriteAuthor}
                  setPortraitAuthor={setPortraitAuthor}
                  setShowIndex={setShowIndex}
                  setShowLastModification={setShowLastModification}
                  setShowPortraitBounty={setShowPortraitBounty}
                  setShowSpriteBounty={setShowSpriteBounty}
                  setRankBy={setRankBy}
                  rankBy={rankBy}
                />
              </AccordionDetails>
            </Accordion>
          ) : null}
        </Container>

        <PokemonCarousel
          currentText={currentText}
          rankBy={rankBy}
          showPortraitAuthor={showPortraitAuthor}
          showSpriteAuthor={showSpriteAuthor}
          showIndex={showIndex}
          showLastModification={showLastModification}
          showPortraitBounty={showPortraitBounty}
          showSpriteBounty={showSpriteBounty}
          ids={props.ids}
        />
        <Footer meta={props.meta} />
      </Container>
    </Box>
  )
}
