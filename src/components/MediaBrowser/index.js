import { useEffect } from 'react';
import { useCallEntityServiceMutation } from 'services/states/api';
import ChildrenCardList from './ChildrenCardList';
import ChildrenSongList from './ChildrenSongList';
import { useDispatch, useSelector } from 'react-redux';
import { navigateDirectory } from 'services/mediabrowser/slice';

const MediaBrowser = ({ entity }) => {
	const dispatch = useDispatch();
	const [callService] = useCallEntityServiceMutation();
	const currentDirectory = useSelector((state) => state.mediaBrowser.currentDirectory);

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

		// fetchData(child);
	};

	useEffect(() => {
		dispatch(navigateDirectory({
			child: null,
			entity,
		}));
	}, []);

	// console.log('current', currentDirectory);

	if (currentDirectory == null) {
		return (
			<div>
				Loading media...
			</div>
		);
	}

	return (
		<div>
			{currentDirectory.can_play ?
				<ChildrenSongList
					entity={entity}
					directory={currentDirectory}
				/>
			: null}

			{!currentDirectory.can_play ?
				<ChildrenCardList
					entity={entity}
					directory={currentDirectory}
				/>
			: null}
		</div>
	);

};

export default MediaBrowser;