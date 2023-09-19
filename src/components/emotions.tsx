import { Grid, Paper, Typography } from "@mui/material"
import { MonsterHistory, Portrait } from "../generated/graphql"
import Lock from "./lock"

export default function Emotions({
  emotions,
  history
}: {
  emotions: Portrait[]
  history: MonsterHistory[]
}) {
  return (
    <Grid container spacing={2} sx={{ mt: 3 }}>
      {[...emotions]
        .sort((a, b) => a.emotion.localeCompare(b.emotion))
        .map(({ emotion, url, locked }) => {
          return (
            <Grid item key={emotion}>
              <Paper elevation={2}>
                <img
                  src={url}
                  style={{ height: "80px", imageRendering: "pixelated" }}
                />
                <Grid
                  container
                  justifyContent="center"
                  alignItems="start"
                  sx={{ maxWidth: "80px" }}
                >
                  <Lock
                    locked={locked}
                    history={history.filter((e) =>
                      e.modifications.includes(emotion)
                    )}
                  />
                  <Typography
                    align="center"
                    color="grayText"
                    noWrap
                    sx={{ width: "60px" }}
                  >
                    {emotion}
                  </Typography>
                </Grid>
              </Paper>
            </Grid>
          )
        })}
    </Grid>
  )
}
