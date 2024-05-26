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
  const [credits, setCredits] = useState<Credit[]>([])
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
                </TableRow>
              </TableHead>
              <TableBody>
                {credits
                  .filter(
                    ({ name, discordHandle }) =>
                      (name || discordHandle) &&
                      !discordHandle?.includes("Deleted User")
                  )
                  .sort((a, b) => {
                    const nameA = a.name || a.discordHandle || ""
                    const nameB = b.name || b.discordHandle || ""
                    return nameA.localeCompare(nameB)
                  })
                  .map(({ name, id, discordHandle, contact }) => (
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
                            <Typography variant="h6">{contact}</Typography>
                          </Link>
                        ) : (
                          contact && (
                            <Typography variant="h6">{contact}</Typography>
                          )
                        )}
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
