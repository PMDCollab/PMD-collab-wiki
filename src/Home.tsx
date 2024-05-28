import PokemonCarousel from "./components/pokemon-carousel"
import Search from "./components/search"
import { createContext, useState } from "react"
import { RankMethod } from "./types/enum"
import DisplayParameters from "./components/display-parameters"
import PokemonRanking from "./components/pokemon-ranking"
import { Meta } from "./generated/graphql"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Link,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material"
import { Bar } from "./components/bar"
import { Footer } from "./components/footer"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { Filter, Toggle } from "./types/params"
import { useSearchParams } from 'react-router-dom'
import { UseState } from './util'

export const Context = createContext<{
  toggleState: UseState<Map<Toggle, boolean>>
  filterState: UseState<Map<Filter, boolean>>
  creditsModeState: UseState<boolean>
  splitFormState: UseState<boolean>
  unnecessaryState: UseState<boolean>
  showFormState: UseState<boolean>
  rankState: UseState<RankMethod>
} | null>(null);

export default function Home({ ids, meta }: { ids: number[]; meta: Meta }) {
  // TODO: the amount of state here is horrendous i'm sure there's a better way to do this
  const textState = useState(""), [currentText] = textState;
  const rankState = useState<RankMethod>(RankMethod.POKEDEX_NUMBER);
  // TODO: maybe destructure early i might not need the state
  const creditsModeState = useState<boolean>(false), [creditsMode, setCreditsMode] = creditsModeState;
  const splitFormState = useState<boolean>(false)
  const unnecessaryState = useState<boolean>(false)
  const showFormState = useState<boolean>(false)
  const toggleState = useState(new Map<Toggle, boolean>([
    ['index', false],
    ['portraitAuthor', false],
    ['spriteAuthor', false],
    ['lastModification', false],
    ['portraitBounty', false],
    ['spriteBounty', false]
  ]));
  const filterState = useState(new Map<Filter, boolean>([
    ['fullyFeaturedPortraits', false],
    ['existingPortraits', false],
    ['incompletePortraits', false],
    ['fullyFeaturedSprites', false],
    ['existingSprites', false],
    ['incompleteSprites', false]
  ]));
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [searchParams] = useSearchParams();

  return (
    <Context.Provider value={{
      toggleState, filterState, creditsModeState,
      splitFormState, unnecessaryState, showFormState, rankState
    }}>
      <Box>
        <Bar />
        <Container maxWidth="xl" sx={{ backgroundColor: "rgba(255,255,255,.9)" }}>
          {searchParams.get("beta") == "true" && <FormControlLabel
            sx={{ position: 'absolute' }}
            label={<Typography color="text.secondary">Credits Mode</Typography>}
            control={<Checkbox
              checked={creditsMode}
              onChange={async e => setCreditsMode(e.target.checked)}
            />}
          />}
          <Typography
            variant={isMobile ? "subtitle2" : "h5"}
            align="center"
            color="text.secondary"
            gutterBottom
          >
            Free to use <strong><Link href='#/About' className='with-credit'>WITH CREDIT</Link></strong> for ROMhacks, fangames, etc. Don't use for
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
            <Search textState={textState} />
            <Accordion sx={{ mt: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography color="text.secondary">
                  Searching options
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <DisplayParameters/>
                <PokemonRanking />
              </AccordionDetails>
            </Accordion>
          </Container>

          <PokemonCarousel
            currentText={currentText}
            ids={ids}
          />
          <Footer meta={meta} />
        </Container>
      </Box>
    </Context.Provider>
  )
}
