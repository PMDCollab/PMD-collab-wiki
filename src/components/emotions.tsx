import { Grid, Paper, Typography } from "@mui/material"
import { Portrait } from "../generated/graphql"
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
                <Typography align="center">{k.emotion}</Typography>
              </Paper>
            </Grid>
          )
        })}
    </Grid>
  )
}
