import { createPortal } from 'react-dom';

const ReactPortal = ({ children, wrapperId }) => {
  createPortal(children, document.getElementById(wrapperId));
};

export default ReactPortal;
