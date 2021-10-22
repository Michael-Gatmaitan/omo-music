import './CloseButton.css';

const CloseButton = ({ value, closeFunction }) => (
  <div className="close-modal" onClick={ _ => closeFunction(false) }>
    {value || "Close"}
  </div>
);

export default CloseButton;