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
  const [credits, setCredits] = useState<Credit[]>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loading, error, data } = useContributorsQuery()

  useEffect(() => {
    if (!error) {
      setCredits(data?.credit)
    }
  }, [data])

  return (
    <Box>
      <Bar />
      <Container maxWidth="xl" sx={{ backgroundColor: "rgba(255,255,255,.9)" }}>
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
                ?.filter((credit) => credit.name)
                .map((credit) => (
                  <TableRow
                    key={credit.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">
                      <Typography variant="h6">{credit.name}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      {credit.contact ? (
                        <Link href={credit.contact}>
                          <Typography variant="h6">{credit.contact}</Typography>
                        </Link>
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  )
}
