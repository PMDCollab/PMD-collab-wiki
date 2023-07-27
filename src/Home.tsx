import PokemonCarousel from "./components/pokemon-carousel"
import Search from "./components/search"
import { Dispatch, SetStateAction, useState } from "react"
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

export type ShowParameters = Record<string, {
  state: [boolean, Dispatch<SetStateAction<boolean>>],
  rankMethod?: RankMethod,
  name: string
}>
export default function Home({ ids, meta }: { ids: number[]; meta: Meta }) {
  const [currentText, setCurrentText] = useState("")
  const [rankBy, setRankBy] = useState<RankMethod>(RankMethod.POKEDEX_NUMBER)
  const showParameters: ShowParameters = {
    index: { state: useState<boolean>(false), rankMethod: RankMethod.POKEDEX_NUMBER, name: "Index" },
    portraitAuthor: { state: useState<boolean>(false), rankMethod: RankMethod.PORTRAIT_AUTHOR, name: "Portrait Author" },
    spriteAuthor: { state: useState<boolean>(false), rankMethod: RankMethod.SPRITE_AUTHOR, name: "Sprite Author" },
    lastModification: { state: useState<boolean>(false), rankMethod: RankMethod.LAST_MODIFICATION, name: "Last Change" },
    portraitBounty: { state: useState<boolean>(false), rankMethod: RankMethod.PORTRAIT_BOUNTY, name: "Portrait Bounty" },
    spriteBounty: { state: useState<boolean>(false), rankMethod: RankMethod.SPRITE_BOUNTY, name: "Sprite Bounty" },
    fullyFeaturedSprites: { state: useState<boolean>(false), name: "Fully-Featured Portraits" },
    fullyFeaturedPortraits: { state: useState<boolean>(false), name: "Fully-Featured Sprites" },
  }
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
          Free to use <strong>WITH CREDIT</strong> for ROMhacks, fangames, etc. Don't use for
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
          {!isMobile && (
            <Accordion sx={{ mt: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography color="text.secondary">
                  Searching options
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <DisplayParameters showParameters={showParameters} />
                <PokemonRanking
                  showParameters={showParameters}
                  setRankBy={setRankBy}
                  rankBy={rankBy}
                />
              </AccordionDetails>
            </Accordion>
          )}
        </Container>

        <PokemonCarousel
          currentText={currentText}
          rankBy={rankBy}
          showParameters={showParameters}
          ids={ids}
        />
        <Footer meta={meta} />
      </Container>
    </Box>
  )
}
