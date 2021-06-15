import './CloseButton.css';

const CloseButton = ({ closeFunction }) => (
  <div className="close-modal" onClick={ _ => closeFunction(false) }>
    Close
  </div>
)

export default CloseButton;