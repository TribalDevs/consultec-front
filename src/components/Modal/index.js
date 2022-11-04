import { Button } from "components/Buttons";
import Icon from "components/icon";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import "./styles.sass";
export const Modal = (props) => {
  const {
    title,
    show,
    onClose,
    onConfirm,
    children,
    size = "small",
    removeCloseButton,
  } = props;
  useEffect(() => {
    let body = document.querySelector("body");
    if (show) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [show]);
  return (
    <div className="modal__container" hidden={!show} size={size}>
      <div className="modal__content">
        <div className="modal__header">
          <h4>{title ? title : "Modal"}</h4>
          <div className="modal__close" onClick={onClose}>
            <Icon nameIcon="FaTimes" />
          </div>
        </div>
        <div className="modal__body" id="modal__body">
          {children}
        </div>
        <div className="modal__footer">
          {!removeCloseButton && (
            <Button
              type="tertiary"
              modifiers={["small", "autoWidth"]}
              onClick={onClose}
              text="Cerrar"
              disableLocales
            />
          )}

          {/* {onConfirm ? onConfirm : null} */}
        </div>
      </div>
    </div>
  );
};
Modal.propTypes = {
  title: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  children: PropTypes.node,
  size: PropTypes.string,
};
Modal.defaultProps = {
  title: "Modal",
  show: false,
  onClose: () => {},
  onConfirm: null,
  children: null,
  size: "small",
};
