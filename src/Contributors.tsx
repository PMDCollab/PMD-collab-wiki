import {
  Box,
  Container,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material"
import { Bar } from "./components/bar"
import { Credit, useContributorsQuery } from "./generated/graphql"
import { useEffect, useState } from "react"

export default function Contributors() {
  const [credits, setCredits] = useState<Credit[]>([]);
  const { data } = useContributorsQuery({ errorPolicy: "ignore" })

  useEffect(() => {
    if (data?.credit) {
      setCredits(data.credit)
    }
  }, [data])

  return (
    <Box>
      <Bar />
      <Container maxWidth="xl" sx={{ backgroundColor: "rgba(255,255,255,.9)" }}>
        {!credits.length ? (
          <Typography variant="h5" align="center">
            Loading...
          </Typography>
        ) : (
          <TableContainer>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <Typography variant="h5">Name</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h5">Contact</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h5">Guild Points</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {credits.filter(({ name, discordHandle }) =>
                  (name || discordHandle) &&
                  !discordHandle?.includes("Deleted User"))
                  .sort((a, b) => (b.reputation ?? 0) - (a.reputation ?? 0))
                  .map(({ name, id, discordHandle, contact, reputation }) => (
                    <TableRow
                      key={id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">
                        <Typography variant="h6">
                          {name ?? discordHandle}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        {contact?.includes("http") ? (
                          <Link href={contact}>
                            <Typography variant="h6">
                              {contact}
                            </Typography>
                          </Link>
                        ) : contact && (
                          <Typography variant="h6">{contact}</Typography>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="h6">
                          {reputation ?? "???"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Box>
  )
}
