import { useEffect } from 'react';
import ChildrenCardList from './ChildrenCardList';
import ChildrenSongList from './ChildrenSongList';
import { useDispatch, useSelector } from 'react-redux';
import { navigateDirectory } from 'services/mediabrowser/slice';

const MediaBrowser = ({ entity }) => {
	const dispatch = useDispatch();
	const currentDirectory = useSelector((state) => state.mediaBrowser.currentDirectory);

	useEffect(() => {
		dispatch(navigateDirectory({
			child: null,
			entity,
		}));
	}, []);

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