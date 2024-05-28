import { Checkbox, FormControlLabel, Grid, Typography } from "@mui/material"
import { filterNames, toggleNames } from '../types/params'
import { Fragment, useContext } from 'react'
import { Context } from '../Home'

export default function DisplayParameters() {
  const {
    toggleState: [toggles, setToggle],
    filterState: [filters, setFilters],
    splitFormState: [splitForms, setSplitForms],
    unnecessaryState: [showUnnecessary, setShowUnnecessary],
    showFormState: [showForms, setShowForms]
  } = useContext(Context)!;
  return (
    <Grid container spacing={2}>
      <Grid item key={0}>
        <Typography sx={{ fontWeight: "bold" }}>Forms View</Typography>
        <FormControlLabel
          label={<Typography color="text.secondary">Split Forms</Typography>}
          control={
            <Checkbox
              checked={splitForms}
              onChange={async e => {
                setShowForms(e.target.checked)
                setSplitForms(e.target.checked)
              }}
            />
          }
        />
        <FormControlLabel
          label={<Typography color="text.secondary">Show Unnecessary Forms</Typography>}
          control={
            <Checkbox
              checked={showUnnecessary}
              onChange={async e => setShowUnnecessary(e.target.checked)}
            />
          }
        />
        <FormControlLabel
          label={<Typography color="text.secondary">Show Form Name</Typography>}
          control={
            <Checkbox
              disabled={!splitForms}
              checked={showForms && splitForms}
              onChange={async (e) => setShowForms(e.target.checked)}
            />
          }
        />
      </Grid>
      <Grid item key={1}>
        <Typography sx={{ fontWeight: "bold" }}>Toggles</Typography>
        {[...toggles.entries()].map(([toggle, isShowing]) => (
          <FormControlLabel
            label={<Typography color="text.secondary">{toggleNames[toggle]}</Typography>}
            control={
              <Checkbox
                checked={isShowing}
                onChange={async (e) => setToggle(prev => new Map([...prev, [toggle, e.target.checked]]))}
              />
            }
            key={toggle}
          />
        ))}
      </Grid>
      <Grid item key={2}>
        <Typography sx={{ fontWeight: "bold" }}>Filters</Typography>
        {[...filters.entries()].map(([filter, isShowing], index) => (
          <Fragment key={filter}>
            {index == 3 && <br />}
            <FormControlLabel
              label={<Typography color="text.secondary">{filterNames[filter]}</Typography>}
              control={
                <Checkbox
                  checked={isShowing}
                  onChange={async (e) => setFilters(prev => new Map([...prev, [filter, e.target.checked]]))}
                />
              }
            />
          </Fragment>
        ))}
      </Grid>
    </Grid>
  )
}
