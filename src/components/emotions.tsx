import { Grid, Paper, Typography } from "@mui/material"
import { Portrait } from "../generated/graphql"
import Lock from "./lock"

export default function Emotions(props: { emotions: Portrait[] }) {
  const emotionsCopy = [...props.emotions]
  return (
    <Grid container spacing={2} sx={{ mt: 3 }}>
      {emotionsCopy
        .sort((a, b) => a.emotion.localeCompare(b.emotion))
        .map((k) => {
          return (
            <Grid item key={k.emotion}>
              <Paper elevation={2}>
                <img
                  src={k.url}
                  style={{ height: "80px", imageRendering: "pixelated" }}
                />
                <Grid
                  container
                  justifyContent="center"
                  alignItems="start"
                  sx={{ maxWidth: "80px" }}
                >
                  <Lock locked={k.locked} />
                  <Typography
                    align="center"
                    color="grayText"
                    noWrap
                    sx={{ width: "60px" }}
                  >
                    {k.emotion}
                  </Typography>
                </Grid>
              </Paper>
            </Grid>
          )
        })}
    </Grid>
  )
}
