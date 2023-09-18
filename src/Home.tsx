import PokemonCarousel from "./components/pokemon-carousel"
import Search from "./components/search"
import { Dispatch, SetStateAction, useState } from "react"
import { RankMethod } from "./types/enum"
import DisplayParameters from "./components/display-parameters"
import PokemonRanking from "./components/pokemon-ranking"
import { Meta, Phase } from "./generated/graphql"
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

export interface Parameters<T> {
  state: [boolean, Dispatch<SetStateAction<boolean>>]
  name: string
  value: T
}
export interface PhaseCategory {
  type: 'sprites' | 'portraits'
  phase: Phase
}

export default function Home({ ids, meta }: { ids: number[]; meta: Meta }) {
  const [currentText, setCurrentText] = useState("");
  const [rankBy, setRankBy] = useState<RankMethod>(RankMethod.POKEDEX_NUMBER);
  const [splitForms, setSplitForms] = useState<boolean>(false);
  const [showUnnecessary, setShowUnnecessary] = useState<boolean>(false);
  const [showForms, setShowForms] = useState<boolean>(false);
  const showParameters: Record<string, Parameters<RankMethod>> = {
    index: { state: useState<boolean>(false), name: "Index", value: RankMethod.POKEDEX_NUMBER },
    portraitAuthor: { state: useState<boolean>(false), name: "Portrait Author", value: RankMethod.PORTRAIT_AUTHOR },
    spriteAuthor: { state: useState<boolean>(false), name: "Sprite Author", value: RankMethod.SPRITE_AUTHOR },
    lastModification: { state: useState<boolean>(false), name: "Last Change", value: RankMethod.LAST_MODIFICATION },
    portraitBounty: { state: useState<boolean>(false), name: "Portrait Bounty", value: RankMethod.PORTRAIT_BOUNTY },
    spriteBounty: { state: useState<boolean>(false), name: "Sprite Bounty", value: RankMethod.SPRITE_BOUNTY }
  };
  const filterParameters = ['sprites', 'portraits'].flatMap(type => {
      const typeUpper = type[0].toUpperCase() + type.slice(1);
      return [
        { state: useState<boolean>(false), name: `Fully-Featured ${typeUpper}`, value: { type, phase: Phase.Full } },
        { state: useState<boolean>(false), name: `Existing ${typeUpper}`, value: { type, phase: Phase.Exists } },
        { state: useState<boolean>(false), name: `Incomplete ${typeUpper}`, value: { type, phase: Phase.Incomplete } },
      ] as Parameters<PhaseCategory>[];
    })

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
                showParameters={showParameters}
                filterParameters={filterParameters}
                splitForms={splitForms}
                setSplitForms={setSplitForms}
                showUnnecessary={showUnnecessary}
                setShowUnnecessary={setShowUnnecessary}
                showForms={showForms}
                setShowForms={setShowForms} />
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
          filterParameters={filterParameters}
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
