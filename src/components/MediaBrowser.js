import { getHassConnection } from 'lib/hass';
import { capitalize } from 'lib/text';
import { useEffect, useRef, useState } from 'react';
import { useCallEntityServiceMutation } from 'services/states/api';
import Icon from './Icon';

const MediaBrowser = ({ entity }) => {
	const hassConnection = useRef(null);
	const [callService] = useCallEntityServiceMutation();
	const [parent, setParent] = useState(null);
	const [currentDirectory, setDirectory] = useState(null);

	async function fetchData(child = null) {
		const connection = hassConnection.current;

		let message = {
			type: 'media_player/browse_media',
			entity_id: entity.entity_id,
		};

		if (child != null) {
			if (currentDirectory == null || child.media_content_id == '') {
				setParent(null);
			} else {
				setParent(currentDirectory);
			}

			if (child.media_content_id != '') {
				message.media_content_id = child.media_content_id;
				message.media_content_type = child.media_content_type;
			}
		}

		const result = await connection.sendMessagePromise(message);

		if (result != null) {
			setDirectory(result);
		}
	};

	const playChild = (child) => {
		callService({
			entity_id: entity.entity_id,
			domain: 'media_player',
			service: 'play_media',
			fields: {
				media_content_id: child.media_content_id,
				media_content_type: child.media_content_type,
			},
		});
	};

	const onChildClick = (child) => {
		if (!child.can_expand && child.can_play) {
			playChild(child);

			return true;
		}

		fetchData(child);
	};

	useEffect(() => {
		getHassConnection().then((response) => {
			hassConnection.current = response;
			if (response == null) {
				console.error('MEDIABROWSER: COULD NOT FETCH HASS CONNECTION');
				return;
			}

			// setParent(null);
			// setDirectory(null);
			if (currentDirectory == null) {
				fetchData();
			}
		});
	}, []);

	if (currentDirectory == null) {
		return (
			<div>
				Loading media...
			</div>
		);
	}

	// console.log('current', currentDirectory);

	return (
		<div>
			{parent != null ?
				<div className="border-b border-b-light-gray py-4 mb-4">
					<div onClick={() => onChildClick(parent)}>
						BACK
					</div>
				</div>
				: null}

			{currentDirectory.can_play ?
				<div className="flex my-6 gap-x-6">
					<div
						className="flex-shrink-0 h-48 w-48 bg-cover bg-no-repeat bg-center rounded-md"
						style={{ backgroundImage: `url(${currentDirectory.thumbnail})` }}
					/>

					<div className="flex flex-col justify-between">
						<div className="flex-1">
							<div className="text-sm font-bold mb-2">
								{capitalize(currentDirectory.media_class)}
							</div>

							<div className="text-6xl font-bold">
								{currentDirectory.title}
							</div>
						</div>

						<div>
							<div className="cursor-pointer w-14 h-14 rounded-full bg-bright-green/90 hover:bg-bright-green text-dark text-2xl flex items-center justify-center transition-colors">
								<Icon name="play" />
							</div>
						</div>
					</div>
				</div>
				: null}

			<div className="grid grid-cols-4 gap-6">
				{currentDirectory.children?.map((child, index) => {
					return (
						<div
							onClick={() => onChildClick(child)}
							key={child.media_content_id + '-' + index}
							className="cursor-pointer rounded-lg p-4 bg-gray/10 hover:bg-gray/20 transition-colors"
						>
							<div
								className="w-full aspect-square bg-cover bg-no-repeat bg-center rounded-md mb-2"
								style={{ backgroundImage: `url(${child.thumbnail})` }}
							/>

							<div className="font-semibold">
								{child.title}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);

};

export default MediaBrowser;