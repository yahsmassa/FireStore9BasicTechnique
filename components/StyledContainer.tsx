import { styled, Card } from "@mui/material";

export const Container = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "white",
  margin: "15px 30px",
  "@media screen and (max-width: 900px)": {
    margin: 0,
  },
}));

export const CenterContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
}));

export const CustomCard = styled(Card)(() => ({
  marginLeft: 20,
  width: 600,
  "@media screen and (max-width: 900px)": {
    marginLeft: 0,
    marginTop: 10,
    padding: 20,
    width: "auto",
  },
}));

export const RowContainer = styled("div")(() => ({
  display: "flex",
  margin: "0 20px",
  "@media screen and (max-width: 900px)": {
    flexDirection: "column",
  },
}));
