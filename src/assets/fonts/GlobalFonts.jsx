import { createGlobalStyle } from "styled-components";
const styled = { createGlobalStyle };
const TYPEFACE = "SEBANG_Gothic_Bold";

const GlobalFonts = styled.createGlobalStyle`
  @font-face {
    font-family: "SEBANG_Gothic_Bold";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2104@1.0/SEBANG_Gothic_Bold.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  body * {
    font-family: ${TYPEFACE};
  }
`;

export default GlobalFonts;
