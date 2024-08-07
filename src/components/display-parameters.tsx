import { Checkbox, FormControlLabel, Grid, Link, Typography } from "@mui/material"
import { filterNames, toggleNames } from '../types/params'
import { Fragment, useContext } from 'react'
import { Context } from '../Home'
import { toggleParamCallback } from '../util';

export default function DisplayParameters() {
  const {
    searchParamsState: [_, setSearchParams],
    toggleState,
    filterState,
    miscState
  } = useContext(Context)!;
  const {
    splitForms,
    showUnnecessary,
    showFormName
  } = miscState;
  return (
    <Grid container spacing={2}>
      <Grid item key={0} xs={12}>
        <Typography sx={{ fontWeight: "bold" }}>Credits <Link href="https://github.com/PMDCollab/PMD-collab-wiki/pull/100">(New!)</Link></Typography>
        <FormControlLabel
          label={<Typography color="text.secondary">Credits Mode</Typography>}
          control={<Checkbox
            checked={miscState.creditsMode}
            onChange={async e => setSearchParams(toggleParamCallback('creditsMode', e.target.checked))}
          />}
        />
      </Grid>
      <Grid item key={1} xs={12}>
        <Typography sx={{ fontWeight: "bold" }}>Forms View</Typography>
        <FormControlLabel
          label={<Typography color="text.secondary">Split Forms</Typography>}
          control={
            <Checkbox
              checked={splitForms}
              onChange={async e => {
                setSearchParams(toggleParamCallback('showFormName', e.target.checked))
                setSearchParams(toggleParamCallback('splitForms', e.target.checked))
              }}
            />
          }
        />
        <FormControlLabel
          label={<Typography color="text.secondary">Show Unnecessary Forms</Typography>}
          control={
            <Checkbox
              checked={showUnnecessary}
              onChange={async e => setSearchParams(toggleParamCallback('showUnnecessary', e.target.checked))}
            />
          }
        />
        <FormControlLabel
          label={<Typography color="text.secondary">Show Form Name</Typography>}
          control={
            <Checkbox
              disabled={!splitForms}
              checked={showFormName && splitForms}
              onChange={async (e) => setSearchParams(toggleParamCallback('showFormName', e.target.checked))}
            />
          }
        />
      </Grid>
      <Grid item key={2} xs={12}>
        <Typography sx={{ fontWeight: "bold" }}>Toggles</Typography>
        {[...toggleState.entries()].map(([toggle, isShowing]) => (
          <FormControlLabel
            label={<Typography color="text.secondary">{toggleNames[toggle]}</Typography>}
            control={
              <Checkbox
                checked={isShowing}
                onChange={async (e) => setSearchParams(toggleParamCallback(toggle, e.target.checked))}
              />
            }
            key={toggle}
          />
        ))}
      </Grid>
      <Grid item key={3} xs={12}>
        <Typography sx={{ fontWeight: "bold" }}>Filters</Typography>
        Portraits: &emsp;
        {[...filterState.entries()].map(([filter, isShowing], index) => (
          <Fragment key={filter}>
            {index == 4 && <><br />Sprites: &emsp;</>}
            <FormControlLabel
              label={<Typography color="text.secondary">{filterNames[filter]}</Typography>}
              control={
                <Checkbox
                  checked={isShowing}
                  onChange={async (e) => setSearchParams(toggleParamCallback(filter, e.target.checked))}
                />
              }
            />
          </Fragment>
        ))}
      </Grid>
    </Grid>
  )
}