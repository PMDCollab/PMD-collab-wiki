import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import Home from './Home';
import { HashRouter, Routes, Route } from 'react-router-dom';
import PokemonPage from './components/pokemon-page';
import About from './About';
import {ApolloClient,InMemoryCache,ApolloProvider} from "@apollo/client";
import { KeysDocument, KeysQueryResult } from './generated/graphql'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          feed: {
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: false,
            // Concatenate the incoming list items with
            // the existing list items.
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          }
        }
      }
    }
  })
})


async function initialize(){
  const result = await client.query({query: KeysDocument}) as KeysQueryResult
  
  root.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <HashRouter>
            <Routes>
              <Route path='/' element={<Home ids={result.data!.monster.map(m=>m.id)}/>}/>
              {result.data?.monster.map(m=> <Route key={m.id} path={`/${m}`} element={<PokemonPage infoKey={m.id}/>}/>)}
              <Route path='/About' element={<About/>}/>
            </Routes>
        </HashRouter>
      </ApolloProvider>
    </React.StrictMode>)
}

initialize()