import React, { useEffect, useState, ReactElement, ReactNode } from 'react';
import ReactModal from 'react-modal';

import './_modal.css';

// Reset all style applied by React Modal
ReactModal.defaultStyles.content = {};
ReactModal.defaultStyles.overlay = {};

// Set root element for accessibility
ReactModal.setAppElement('#root');

const Modal = ({
	children = null,
	onClose = () => null,
	onOpen = () => null,
	open = false,
	title = null,
	type = 'small',
}: {
	children: ReactNode,
	onClose: Function,
	onOpen: Function,
	open: boolean,
	title?: string | ReactElement,
	type: 'small' | 'big',
}) => {
	const [canClose, setCanClose] = useState(false);

	useEffect(() => {
		if (open) {
			setTimeout(() => {
				setCanClose(true);
			}, 1250);
		} else {
			setTimeout(() => {
				setCanClose(false);
			}, 350);
		}
	}, [open]);

	return (
		<ReactModal
			isOpen={open}
			onRequestClose={onClose}
			onAfterOpen={onOpen}
			// Animation timing
			closeTimeoutMS={300}
			className={`type-${type}`}
			shouldCloseOnOverlayClick={canClose}
		>
			<div className="max-h-[85vh] overflow-auto flex-1 px-10 py-7">
				{children}
			</div>
		</ReactModal>
	);

}

export default Modal;