import PokemonInformations from "./pokemon-informations"
import { Link, useSearchParams } from "react-router-dom"
import { MonsterForm, usePokemonQuery } from "../generated/graphql"
import { Bar } from "./bar"
import {
  Box,
  Container,
  Divider,
  Grid,
  MenuItem,
  Select,
  Typography
} from "@mui/material"

interface Props {
  infoKey: number
  prevIndex?: string
  nextIndex?: string
  rawId: string
}
export default function PokemonPage({ infoKey, prevIndex, nextIndex, rawId }: Props) {
  const { loading, error, data } = usePokemonQuery({
    variables: { id: infoKey }
  });
  const [searchParam, setSearchParam] = useSearchParams({ form: "0" });
  const formList = data?.monster[0].forms as MonsterForm[] | undefined;
  const formIndex = parseInt(searchParam.get("form") ?? "0") ?? 0;
  const form = formList?.[formIndex] ?? formList?.[0];

  const prevLink = prevIndex && (
    <Link to={`/${prevIndex}`}>
      <Typography variant="h6" color="text.secondary">
        {"<"}
        {prevIndex}
      </Typography>
    </Link>
  )
  const nextLink = nextIndex && (
    <Link to={`/${nextIndex}`}>
      <Typography variant="h6" color="text.secondary" align="right">
        {nextIndex}
        {">"}
      </Typography>
    </Link>
  )

  return (
    <Box>
      <Bar />
      <Container
        maxWidth="xl"
        sx={{ backgroundColor: "rgba(255,255,255,.9)", pt: 2, pb: 2 }}
      >
        {loading && <Typography variant="h4">loading...</Typography>}
        {error && <Typography variant="h4">error</Typography>}
        <Grid container justifyContent="space-between">
          <Grid item xs={2}>
            {prevLink}
          </Grid>
          <Grid item xs={8}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "16px"
              }}
            >
              <Typography align="center" variant="h5" fontWeight="bold">
                {rawId} {data?.monster[0].name}
              </Typography>
              {form && (
                <Select
                  value={form.fullName}
                  onChange={(e) => {
                    if (!formList) return;
                    const formIndex = formList.findIndex(f => f.fullName === e.target.value);
                    if (formIndex == -1) return;
                    setSearchParam(param => {
                      param.set("form", formIndex.toString())
                      return param;
                    });
                  }}
                >
                  {formList?.map(({ path, fullName }) => (
                    <MenuItem
                      key={path}
                      sx={{ textTransform: "none" }}
                      value={fullName}
                    >
                      <Typography variant="h6" color="text.primary">
                        {fullName !== data?.monster[0].name
                          ? fullName.replaceAll("_", " ")
                          : "Normal"}
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
              )}
            </div>
          </Grid>
          <Grid item xs={2}>
            {nextLink}
          </Grid>
        </Grid>
        <Divider sx={{ mt: 2 }} />
        {form && (
          <PokemonInformations info={form} infoKey={infoKey} />
        )}
      </Container>
    </Box>
  )
}
