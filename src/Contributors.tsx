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
import { useMemo } from "react"

export default function Contributors() {
  const { data } = useContributorsQuery({ errorPolicy: "ignore" });
  const credits = useMemo<Credit[]>(() => data?.credit ?? [], [data]);

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
                  .filter(({ name }) => name)
                  .sort((a, b) => (a.name || "").localeCompare(b.name || ""))
                  .map(({ name, id, contact }) => (
                    <TableRow
                      key={id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">
                        <Typography variant="h6">
                          {name}
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
