import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import Home from './Home';
import { HashRouter, Routes, Route } from 'react-router-dom';
import PokemonPage from './components/pokemon-page';
import About from './About';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";
import { KeysDocument, KeysQueryResult } from './generated/graphql'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
})


async function initialize(){
  const result = await client.query({query: KeysDocument}) as KeysQueryResult
  
  root.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <HashRouter>
            <Routes>
              <Route path='/' element={<Home/>}/>
              {result.data?.monster.map(m=> <Route key={m.id} path={`/${m}`} element={<PokemonPage infoKey={m.id}/>}/>)}
              <Route path='/About' element={<About/>}/>
            </Routes>
        </HashRouter>
      </ApolloProvider>
    </React.StrictMode>)
}

initialize()