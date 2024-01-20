import { Checkbox, FormControlLabel, Grid, Typography } from "@mui/material"
import { Parameters, PhaseCategory } from '../Home'
import { Dispatch, SetStateAction } from "react"
import { Toggle, UseState, toggleToName } from '../types/params'

interface Props {
  toggleState: UseState<Record<Toggle, boolean>>
  filterParameters: Parameters<PhaseCategory>[]
  splitForms: boolean
  setSplitForms: Dispatch<SetStateAction<boolean>>
  unnecessaryState: UseState<boolean>
  showFormState: UseState<boolean>
}
export default function DisplayParameters({
  toggleState: [toggles, setToggle], filterParameters,
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
      {[Object.entries(toggles)].map((params, i) =>
        <Grid item key={i + 1}>
          <Typography sx={{ fontWeight: "bold" }}>{!i ? "Toggles" : "Filters"}</Typography>
          {params.map(([toggle, isShowing]) => (
            <FormControlLabel
              label={<Typography color="text.secondary">{toggleToName[toggle as Toggle]}</Typography>}
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
              key={toggle}
            />
          ))}
        </Grid>
      )}
    </Grid>
  )
}
