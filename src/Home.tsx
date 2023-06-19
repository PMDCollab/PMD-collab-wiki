import "./style/app.css"
import "nes.css/css/nes.min.css"
import PokemonCarousel from "./components/pokemon-carousel"
import Search from "./components/search"
import { useState } from "react"
import Buttons from "./components/buttons"
import { RankMethod } from "./types/enum"
import DisplayParameters from "./components/display-parameters"
import PokemonRanking from "./components/pokemon-ranking"
import { Meta } from "./generated/graphql"

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
  return (
    <div className="App">
      <Buttons />
      <div
        className="nes-container"
        style={{
          height: "90vh",
          backgroundColor: "rgba(255,255,255,0.85)",
          display: "flex",
          flexFlow: "column",
          alignItems: "center",
          gap: "10px",
          paddingBottom: "0rem"
        }}
      >
        <div>
          <h1 className="nes-text is-primary" style={{ margin: "auto" }}>
            PMDCollab Sprite Project
          </h1>
          <h5 style={{ margin: "auto" }}>
            Free to use with credit for ROMhacks, fangames, etc. Don't use for
            commercial projects.
          </h5>
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap"
          }}
        >
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

          <Search currentText={currentText} setCurrentText={setCurrentText} />

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
        </div>
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
        <div style={{ display: "flex", fontSize: "8px", gap: "20px" }}>
          <p>
            Last update:{" "}
            {new Date(props.meta.assetsUpdateDate).toLocaleString()}
          </p>
          <p>
            Last Check for updates:{" "}
            {new Date(props.meta.updateCheckedDate).toLocaleString()}
          </p>
          <a
            target="_blank"
            href={`https://github.com/PMDCollab/SpriteCollab/commit/${props.meta.assetsCommit}`}
          >
            Last Commit
          </a>
        </div>
      </div>
    </div>
  )
}
