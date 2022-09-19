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

export const HEADERS_MODIFIERS = {
  h1: () => `
        font-size: ${typeScale.header1};
        `,
  h2: () => `
        font-size: ${typeScale.header2};
        `,
  h3: () => `
        font-size: ${typeScale.header3};
        `,
  h4: () => `
        font-size: ${typeScale.header4};
        `,
  h5: () => `
        font-size: ${typeScale.header5};
        `,
  heroHeader: () => `
            font-size: ${typeScale.heroHeader};
            `,
  smallHeroHeader: () => `
            font-size: ${typeScale.smallHeroHeader};
  `,
  primaryColor: (props) => `
  color: ${props.theme.primaryColor} !important;
  font-weight: bold;
  `,
  tertiaryColor: (props) => `
  color: ${props.theme.tertiaryColor} !important;
  font-weight: bold;
  `,
  borderBottom: (props) => `
  border-bottom: 3px solid ${props.theme.borderText};
  width: fit-content;
  `,
  bold: (props) => `
  font-weight: bold;
  `,
  center: (props) => `
  text-align: center;
  `,
  link: (props) => `
    font-weight: bold;
    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  `,
  noMarginTop: (props) => `
    margin-top: 0;
  `,
};
export const HeroHeaderText = styled.h1`
  color: ${(props) => props.theme.headerHero.color};
  font-family: ${primaryFont};
  ${applyStyleModifiers(HEADERS_MODIFIERS)}
`;
export const ParagraphHeroHeader = styled.p`
  color: ${(props) => props.theme.headerHero.color};
  font-family: ${primaryFont};
  font-size: ${typeScale.header3};
  ${applyStyleModifiers(HEADERS_MODIFIERS)}
`;
export const HeaderTextColor = styled.h1`
  color: ${(props) => props.theme.textColor};
  font-family: ${primaryFont};
  ${applyStyleModifiers(HEADERS_MODIFIERS)}
`;
export const ParagraphTextColor = styled.p`
  color: ${(props) => props.theme.textColor};
  font-family: ${primaryFont};
  font-size: ${typeScale.smallParagraph};
  ${applyStyleModifiers(HEADERS_MODIFIERS)}
`;
export const ParagraphLink = styled.a`
  color: ${(props) => props.theme.textColor};
  width: auto;
  font-family: ${primaryFont};
  &:hover {
    color: ${(props) => props.theme.links.hoverColor};
    cursor: pointer;
  }
  ${applyStyleModifiers(HEADERS_MODIFIERS)}
`;
