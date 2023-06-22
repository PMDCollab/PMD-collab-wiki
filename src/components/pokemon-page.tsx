import PokemonInformations from "./pokemon-informations"
import { ReactElement, useState, SyntheticEvent } from "react"
import { Link } from "react-router-dom"
import { MonsterForm, usePokemonQuery } from "../generated/graphql"
import { Bar } from "./bar"
import { Box, Container, Grid, Tab, Tabs, Typography } from "@mui/material"

export default function PokemonPage(props: {
  infoKey: number
  prevIndex: string | undefined
  nextIndex: string | undefined
  rawId: string
}) {
  const { loading, error, data } = usePokemonQuery({
    variables: { id: props.infoKey }
  })

  const [value, setValue] = useState(0)

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(parseInt(newValue))
  }

  interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    )
  }

  const tablist = new Array<ReactElement>()
  const tabPanelList = new Array<ReactElement>()

  const prevLink = props.prevIndex ? (
    <Link to={`/${props.prevIndex}`}>
      <Typography variant="h5" color="text.secondary">
        {"<"} {props.prevIndex}
      </Typography>
    </Link>
  ) : null
  const nextLink = props.nextIndex ? (
    <Link to={`/${props.nextIndex}`}>
      <Typography variant="h5" color="text.secondary">
        {props.nextIndex} {">"}
      </Typography>
    </Link>
  ) : null

  data?.monster[0]?.forms.forEach((form, i) => {
    tablist.push(
      <Tab
        key={form.path}
        sx={{ textTransform: "none" }}
        label={
          <Typography variant="h6" color="text.primary">
            {form.fullName}
          </Typography>
        }
      />
    )
    tabPanelList.push(
      <TabPanel key={`${form.path}`} value={value} index={i}>
        <PokemonInformations
          info={form as MonsterForm}
          infoKey={props.infoKey}
        />
      </TabPanel>
    )
  })

  return (
    <Box>
      <Bar />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {loading ? <Typography variant="h4">loading...</Typography> : null}
        {error ? <Typography variant="h4">error</Typography> : null}
        <Grid container>
          <Grid item xs={1}>
            {prevLink}
          </Grid>
          <Grid item xs={10}>
            <Typography align="center" variant="h5" fontWeight="bold">
              {props.rawId} {data?.monster[0].name}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            {nextLink}
          </Grid>
        </Grid>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 3 }}>
          <Tabs value={value} onChange={handleChange}>
            {tablist}
          </Tabs>
        </Box>
        {tabPanelList}
      </Container>
    </Box>
  )
}
