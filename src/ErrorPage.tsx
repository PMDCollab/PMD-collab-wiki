import { Box, Typography, Link } from '@mui/material';

export default function ErrorPage() {
  return <Box textAlign='center' alignItems='center' sx={{ background: "rgba(255,255,255,0.8)" }}>
    <h1>Uh Oh!</h1>
    <Typography>
      Looks like the server ran into an error. This typically happens when our sprite server is down, and we'll try to get it back up as soon as possible.
    </Typography>
    <Typography>
      If this problem still occurs, check <Link href="https://discord.gg/skytemple">our discord</Link> for updates.
    </Typography>
  </Box>
}