import styled from "styled-components";
import { applyStyleModifiers } from "styled-components-modifiers";
import { primaryFont } from "utils/texts";
import { HEADERS_MODIFIERS } from "./modifiers";
export const formatLanguageText = ({ language, en, es }) => {
  if (language === "es") {
    return es;
  }
  return en;
};
export const TextComponent = ({ language, text, type, modifiers = [] }) => {
  const content = formatLanguageText({ language, en: text.en, es: text.es });
  const Container = styled(type)`
    color: ${(props) => props.theme.textColor};
    ${applyStyleModifiers(HEADERS_MODIFIERS)}
  `;
  return <Container modifiers={[...modifiers]}>{content}</Container>;
};
