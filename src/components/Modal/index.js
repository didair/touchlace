import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';

import './_modal.css';

// Reset all style applied by React Modal
ReactModal.defaultStyles.content = {};
ReactModal.defaultStyles.overlay = {};

// Set root element for accessibility
ReactModal.setAppElement('#root');

const Modal = (props) => {
	const [canClose, setCanClose] = useState(false);

	useEffect(() => {
		if (props.open) {
			setTimeout(() => {
				setCanClose(true);
			}, 1250);
		} else {
			setTimeout(() => {
				setCanClose(false);
			}, 350);
		}
	}, [props.open]);

	return (
		<ReactModal
			isOpen={props.open}
			onRequestClose={props.onClose}
			onAfterOpen={props.onOpen}
			// Animation timing
			closeTimeoutMS={300}
			className={`type-${props.type}`}
			shouldCloseOnOverlayClick={canClose}
		>
			<div className="max-h-[85vh] overflow-auto flex-1 px-10 py-7">
				{props.children}
			</div>
		</ReactModal>
	);

}

Modal.defaultProps = {
	open: false,
	title: null,
	onOpen: () => {},
	type: 'small',
};

Modal.propTypes = {
	open: PropTypes.bool.isRequired,
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
	]),
	onClose: PropTypes.func,
	onOpen: PropTypes.func,
	type: PropTypes.oneOf([
		'small',
		'big',
	]),
};

export default Modal;