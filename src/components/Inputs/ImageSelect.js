import { useState } from 'react';
import Modal from 'components/Modal';
import Icon from 'components/Icon';
import ImagePicker from 'components/MediaBrowser/ImagePicker';

const ImageSelect = (props) => {
	const [open, setOpen] = useState(false);

	const onImageSelect = (media_content_id) => {
		props.onSelect(media_content_id);
		setOpen(false);
	};

	return (
		<div className="form-element mb-4 last-of-type:mb-0">
			<Modal type="big" open={open} onClose={() => setOpen(false)}>
				<ImagePicker onSelect={onImageSelect} />
			</Modal>

			<label className="font-bold mb-2 flex items-center">
				Entity image

				<span className="ml-2 cursor-pointer" onClick={() => setOpen(true)}>
					<Icon name="pen" />
				</span>
			</label>

			{props.settings != null && props.settings.backgroundUrl != null ?
				<div
					className="w-24 aspect-square bg-cover bg-no-repeat bg-center rounded-md mb-2"
					style={{ backgroundImage: `url(${props.settings.backgroundUrl})` }}
				/>
			: null}
		</div>
	);

};

export default ImageSelect;