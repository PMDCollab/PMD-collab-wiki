import { Checkbox, FormControlLabel, Grid, Typography } from "@mui/material"
import { Dispatch, SetStateAction } from "react"
import { Filter, Toggle, UseState, filterToName, toggleToName } from '../types/params'

interface Props {
  toggleState: UseState<Record<Toggle, boolean>>
  filterState: UseState<Record<Filter, boolean>>
  splitForms: boolean
  setSplitForms: Dispatch<SetStateAction<boolean>>
  unnecessaryState: UseState<boolean>
  showFormState: UseState<boolean>
}
export default function DisplayParameters({
  toggleState: [toggles, setToggle], filterState: [filters, setFilter],
  splitForms, setSplitForms,
  unnecessaryState: [showUnnecessary, setShowUnnecessary],
  showFormState: [showForms, setShowForms],
}: Props) {
  return (
    <Grid container spacing={2}>
      <Grid item key={0}>
        <Typography sx={{ fontWeight: "bold" }}>Forms View</Typography>
        <FormControlLabel
          label={<Typography color="text.secondary">Split Forms</Typography>}
          control={
            <Checkbox
              checked={splitForms}
              onChange={async (e) => {
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
              onChange={async (e) => {
                setShowUnnecessary(e.target.checked);
              }}
            />
          }
        />
        <FormControlLabel
          label={<Typography color="text.secondary">Show Form Name</Typography>}
          control={
            <Checkbox
              disabled={!splitForms}
              checked={showForms && splitForms}
              onChange={async (e) => {
                setShowForms(e.target.checked);
              }}
            />
          }
        />
      </Grid>
      {/* TODO: add filter params back */}
      <Grid item >
        <Typography sx={{ fontWeight: "bold" }}>Toggles</Typography>
        {Object.entries(toggles).map(([toggle, isShowing]) => (
          <FormControlLabel
            label={<Typography color="text.secondary">{toggleToName[toggle]}</Typography>}
            control={
              <Checkbox
                checked={isShowing}
                onChange={async (e) => {
                  setToggle(toggles => ({
                    ...toggles,
                    [toggle]: e.target.checked
                  }))
                }}
              />
            }
          />
        ))}
      </Grid>
      <Grid item>
        <Typography sx={{ fontWeight: "bold" }}>Filters</Typography>
        {Object.entries(filters).map(([filter, isShowing]) => (
          <FormControlLabel
            label={<Typography color="text.secondary">{filterToName[filter]}</Typography>}
            control={
              <Checkbox
                checked={isShowing}
                onChange={async (e) => {
                  setFilter(filters => ({
                    ...filters,
                    [filter]: e.target.checked
                  }))
                }}
              />
            }
          />
        ))}
      </Grid>
    </Grid>
  )
}
