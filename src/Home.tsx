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
import { Filter, Toggle } from "./types/params"

export default function Home({ ids, meta }: { ids: number[]; meta: Meta }) {
  const [currentText, setCurrentText] = useState("");
  const [rankBy, setRankBy] = useState<RankMethod>(RankMethod.POKEDEX_NUMBER);
  const splitFormState = useState<boolean>(false), [splitForms] = splitFormState;
  const unnecessaryState = useState<boolean>(false), [showUnnecessary] = unnecessaryState;
  const showFormState = useState<boolean>(false), [showForms] = showFormState;
  const toggleState = useState(new Map<Toggle, boolean>([
    ["index", false],
    ["portraitAuthor", false],
    ["spriteAuthor", false],
    ["lastModification", false],
    ["portraitBounty", false],
    ["spriteBounty", false]
  ])), [toggles, setToggles] = toggleState;
  const filterState = useState(new Map<Filter, boolean>([
    ['fullyFeaturedPortraits', false],
    ['existingPortraits', false],
    ['incompletePortraits', false],
    ['fullyFeaturedSprites', false],
    ['existingSprites', false],
    ['incompleteSprites', false]
  ])), [filters] = filterState;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
                <DisplayParameters
                  toggleState={toggleState}
                  filterState={filterState}
                  splitFormState={splitFormState}
                  unnecessaryState={unnecessaryState}
                  showFormState={showFormState}
                />
                <PokemonRanking
                  setToggles={setToggles}
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
          toggles={toggles}
          filters={filters}
          splitForms={splitForms}
          showUnnecessary={showUnnecessary}
          showForms={showForms}
          ids={ids}
        />
        <Footer meta={meta} />
      </Container>
    </Box>
  )
}
