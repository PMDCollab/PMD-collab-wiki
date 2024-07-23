import { Box, Typography, Link } from '@mui/material';

export default function ErrorPage() {
  return <Box textAlign='center' alignItems='center'>
    <h1>Uh Oh!</h1>
    <Typography>
      Looks like the server ran into an error. This typically happens when our sprite server is down, and we'll try to get it back up as soon as possible.
    </Typography>
    <Typography>
      If this problem still occurs, check server uptime at <Link href="https://status.pmdcollab.org/">PMDCollab Status</Link>.
    </Typography>
  </Box>
}