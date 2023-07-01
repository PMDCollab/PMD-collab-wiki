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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loading, error, data } = useContributorsQuery({
    errorPolicy: "ignore"
  })

  useEffect(() => {
    if (data?.credit) {
      setCredits(data.credit)
    }
  }, [data])

  return (
    <Box>
      <Bar />
      <Container maxWidth="xl" sx={{ backgroundColor: "rgba(255,255,255,.9)" }}>
        {credits?.length === 0 ? (
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
                    <Typography variant="h5">Guild points</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {credits
                  ?.filter(
                    (credit) =>
                      (credit.name || credit.discordHandle) &&
                      !credit.discordHandle?.includes("Deleted User")
                  )
                  .sort((a, b) => {
                    const reputationA = a.reputation ?? 0
                    const reputationB = b.reputation ?? 0
                    return reputationB - reputationA
                  })
                  .map((credit) => (
                    <TableRow
                      key={credit.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">
                        <Typography variant="h6">
                          {credit.name ?? credit.discordHandle}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        {credit.contact && credit.contact.includes("http") ? (
                          <Link href={credit.contact}>
                            <Typography variant="h6">
                              {credit.contact}
                            </Typography>
                          </Link>
                        ) : credit.contact && (
                          <Typography variant="h6">{credit.contact}</Typography>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="h6">
                          {credit.reputation ?? "???"}
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
