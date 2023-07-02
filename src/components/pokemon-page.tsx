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
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ pt: 1 }}>{children}</Box>}
      </Box>
    )
  }

  const prevLink = props.prevIndex && (
    <Link to={`/${props.prevIndex}`}>
      <Typography variant="h6" color="text.secondary">
        {"<"}
        {props.prevIndex}
      </Typography>
    </Link>
  )
  const nextLink = props.nextIndex && (
    <Link to={`/${props.nextIndex}`}>
      <Typography variant="h6" color="text.secondary" align="right">
        {props.nextIndex}
        {">"}
      </Typography>
    </Link>
  )

  const formList = data?.monster[0]?.forms;
  const tablist = formList?.map(form => (
    <Tab
      key={form.path}
      sx={{ textTransform: "none" }}
      label={
        <Typography variant="h6" color="text.primary">
          {form.fullName}
        </Typography>
      }
    />
  ))
  const tabPanelList = formList?.map((form, i) =>
    <TabPanel key={`${form.path}`} value={value} index={i}>
      <PokemonInformations
        info={form as MonsterForm}
        infoKey={props.infoKey}
      />
    </TabPanel>
  )

  return (
    <Box>
      <Bar />
      <Container
        maxWidth="xl"
        sx={{ backgroundColor: "rgba(255,255,255,.9)", pt: 2, pb: 2 }}
      >
        {loading && <Typography variant="h4">loading...</Typography>}
        {error && <Typography variant="h4">error</Typography>}
        <Grid container justifyContent="space-between">
          <Grid item xs={2}>
            {prevLink}
          </Grid>
          <Grid item xs={8}>
            <Typography align="center" variant="h5" fontWeight="bold">
              {props.rawId} {data?.monster[0].name}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            {nextLink}
          </Grid>
        </Grid>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 3 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
          >
            {tablist}
          </Tabs>
        </Box>
        {tabPanelList}
      </Container>
    </Box>
  )
}
