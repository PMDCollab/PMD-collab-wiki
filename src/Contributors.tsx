import {
  Box,
  Container,
  Link,
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
        <Container>
          <TableContainer>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h5">Name</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h5">Contact</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h5">Discord Username</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {credits?.map((credit) => (
                <TableRow key={credit.id}>
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
                  <TableCell align="center">
                    <Typography variant="h6">{credit.discordHandle}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableContainer>
        </Container>
      </Container>
    </Box>
  )
}
