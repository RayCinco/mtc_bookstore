import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { createContext, useState, useContext, cloneElement } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.2)",
    zIndex: 1000,
    transition: "all 0.5s",
  },
  modal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "2.5rem 3rem",
    minWidth: "320px",
    maxWidth: "90vw",
    transition: "all 0.5s",
  },
  closeBtn: {
    background: "none",
    border: "none",
    padding: "0.4rem",
    borderRadius: "8px",
    position: "absolute",
    top: "0.6rem",
    right: "1.3rem",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  closeIcon: {
    width: "1.5rem",
    height: "1.5rem",
    color: "#666",
  },
};

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;
  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);
  if (name !== openName) return null;
  return createPortal(
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal} ref={ref}>
        <button style={modalStyles.closeBtn} onClick={close}>
          <HiXMark style={modalStyles.closeIcon} />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
