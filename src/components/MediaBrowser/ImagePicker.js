import { useEffect } from 'react';
import { getBaseURI } from 'lib/config';
import { useDispatch, useSelector } from 'react-redux';
import { browseMedia } from 'services/mediabrowser/slice';

const ImagePicker = ({ onSelect }) => {
	const dispatch = useDispatch();
	const currentDirectory = useSelector((state) => state.mediaBrowser.currentDirectory);

	useEffect(() => {
		dispatch(browseMedia());
	}, []);

	const onChildClick = (child) => {
		onSelect(child.media_content_id);
	};

	if (currentDirectory == null) {
		return (
			<div>
				Loading media...
			</div>
		);
	}

	return (
		<div className="flex gap-5">
			{currentDirectory.children?.map((child, index) => {
				return (
					<div
						onClick={() => onChildClick(child)}
						key={child.media_content_id + '-' + index}
						className="cursor-pointer rounded-lg p-4 bg-gray/10 hover:bg-gray/20 transition-colors w-40"
					>
						<div
							className="w-full aspect-square bg-cover bg-no-repeat bg-center rounded-md mb-2"
							style={{ backgroundImage: `url(${getBaseURI() + child.url})` }}
						/>

						<div className="font-semibold truncate">
							{child.title}
						</div>
					</div>
				);
			})}
		</div>
	);

};

export default ImagePicker;