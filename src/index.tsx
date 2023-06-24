/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react"
import ReactDOM from "react-dom/client"
import Home from "./Home"
import { HashRouter, Routes, Route } from "react-router-dom"
import PokemonPage from "./components/pokemon-page"
import NotFound from "./NotFound"
import About from "./About"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { KeysDocument, KeysQueryResult } from "./generated/graphql"
import { ThemeProvider } from "@emotion/react"
import { CssBaseline, createTheme } from "@mui/material"
import "./index.css"
import Contributors from "./Contributors"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

const cache = new InMemoryCache()
const defaultTheme = createTheme({ typography: { fontFamily: "wonderMail" } })

const client = new ApolloClient({
  uri: "https://spriteserver.pmdcollab.org/graphql",
  cache: cache
})

async function initialize() {
  const result = (await client.query({
    query: KeysDocument
  })) as KeysQueryResult
  if (result.data) {
    const assetsCommit = localStorage.getItem("assetsCommit")
    if (assetsCommit !== result.data.meta.assetsCommit) {
      localStorage.setItem("assetsCommit", result.data.meta.assetsCommit)
    }
    const sortedMonsters = result.data?.monster
      .slice()
      .sort((a, b) => a.id - b.id)
    root.render(
      <React.StrictMode>
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <ApolloProvider client={client}>
            <HashRouter>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      meta={result.data.meta}
                      ids={sortedMonsters.map((m) => m.id)}
                    />
                  }
                />
                {sortedMonsters.map((m, i) => (
                  <Route
                    key={m.rawId}
                    path={`/${m.rawId}`}
                    element={
                      <PokemonPage
                        infoKey={m.id}
                        rawId={m.rawId}
                        prevIndex={sortedMonsters[i - 1]?.rawId}
                        nextIndex={sortedMonsters[i + 1]?.rawId}
                      />
                    }
                  />
                ))}
                <Route path="/About" element={<About />} />
                <Route path="/Contributors" element={<Contributors />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </HashRouter>
          </ApolloProvider>
        </ThemeProvider>
      </React.StrictMode>
    )
  }
}

if (navigator.serviceWorker) {
  navigator.serviceWorker.register(process.env.PUBLIC_URL + "sw.js")
}

initialize()
