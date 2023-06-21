import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material"
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
            <Grid item>
              <Card sx={{ minWidth: 120 }} key={k.emotion}>
                <CardMedia
                  image={k.url}
                  sx={{ height: 120, imageRendering: "pixelated" }}
                ></CardMedia>
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid item>
                      <Lock locked={k.locked} />
                    </Grid>
                    <Grid item>
                      <Typography>{k.emotion}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
    </Grid>
  )
}
