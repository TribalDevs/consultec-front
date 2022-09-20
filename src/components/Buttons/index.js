import styled from "styled-components";
import { applyStyleModifiers } from "styled-components-modifiers";

import { typeScale, primaryFont } from "utils";

export const BUTTON_MODIFIERS = {
  small: () => `
      padding: 8px 1rem;
      font-size: ${typeScale.paragraph};
      `,
  large: () => `
      padding: 12px 20px;
      font-size: ${typeScale.smallParagraph};
  `,
  form: () => `
    padding: 10px 18px;
    font-size: ${typeScale.smallParagraph};
  `,
  autoWidth: () => `
    width: fit-content;
  `,
  delete: () => `
    background-color: #ff0000;  
    color: #fff;
    border: none;
    &:hover {
      background-color: #f44336;
      color: #fff;
      border: none;
    }
  `,
  formButton: () => `
    margin-top: 0 !important;
    `,
};
const Button = styled.button`
  border: none;
  padding: 12px 15px;
  min-width: 110px;
  font-size: 1rem;
  line-height: 1rem;
  border-radius: 2px;
  transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;
  font-family: ${primaryFont};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    cursor: not-allowed;
    &:hover {
      background-color: inherit;
    }
  }
`;
export const PrimaryButton = styled(Button)`
  background-color: ${(props) => props.theme.buttons.primary.background};
  color: ${(props) => props.theme.buttons.primary.color};
  .loader__container__small {
    border: 4px solid ${(props) => props.theme.buttons.primary.color};
  }
  &:hover {
    background-color: ${(props) =>
      props.theme.buttons.primary.hover.background};
    color: ${(props) => props.theme.buttons.primary.hover.color};
  }
  &:disabled {
    cursor: not-allowed;
    &:hover {
      background-color: ${(props) => props.theme.buttons.primary.background};
      color: ${(props) => props.theme.buttons.primary.color};
    }
  }
  ${applyStyleModifiers(BUTTON_MODIFIERS)}
`;
export const PrimaryButtonAlt = styled(PrimaryButton)`
  &:hover {
    color: ${(props) => props.theme.buttons.primary.hover.alt};
  }
`;
export const SecondaryButton = styled(Button)`
  background-color: ${(props) => props.theme.buttons.secondary.background};
  color: ${(props) => props.theme.buttons.secondary.color};

  &:hover {
    background-color: ${(props) =>
      props.theme.buttons.secondary.hover.background};
    color: ${(props) => props.theme.buttons.secondary.hover.color};
  }
  &:disabled {
    cursor: not-allowed;
    &:hover {
      background-color: ${(props) => props.theme.buttons.secondary.background};
      color: ${(props) => props.theme.buttons.secondary.color};
    }
  }
  ${applyStyleModifiers(BUTTON_MODIFIERS)}
`;
export const TertiaryButton = styled(Button)`
  background-color: ${(props) => props.theme.buttons.tertiary.background};
  color: ${(props) => props.theme.buttons.tertiary.color};

  &:hover {
    background-color: ${(props) =>
      props.theme.buttons.tertiary.hover.background};
    color: ${(props) => props.theme.buttons.tertiary.hover.color};
  }
  &:disabled {
    cursor: not-allowed;
    &:hover {
      background-color: ${(props) => props.theme.buttons.tertiary.background};
      color: ${(props) => props.theme.buttons.tertiary.color};
    }
  }
  ${applyStyleModifiers(BUTTON_MODIFIERS)}
`;
export const TogglerButton = styled(Button)`
  transition: opacity 0.2s ease-in-out;
  font-size: 0.7rem;
  border-radius: 3px;
  padding: 0.45rem 0.6rem;
  box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.1);
  min-width: 40px;

  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;
