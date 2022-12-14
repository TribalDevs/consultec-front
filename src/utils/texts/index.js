import styled from "styled-components";
import { applyStyleModifiers } from "styled-components-modifiers";

export const primaryFont = "'Poppins', sans-serif";

export const typeScale = {
  heroHeader: "4rem",
  smallHeroHeader: "3rem",
  header1: "1.8rem",
  header2: "1.6rem",
  header3: "1.4rem",
  header4: "1.2rem",
  header5: "1.1rem",
  paragraph: "1rem",
  smallParagraph: "0.9rem",
  helperText: "0.8rem",
  copyrightText: "0.7rem",
};
export const formatLanguageText = (text, language) => {
  if (language === "en") {
    return text.en;
  } else {
    return text.en;
  }
};
