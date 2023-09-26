import cx from 'classnames';
import { useEffect } from 'react';
import ChildrenCardList from './ChildrenCardList';
import ChildrenSongList from './ChildrenSongList';
import { useDispatch, useSelector } from 'react-redux';
import { navigateDirectory } from 'services/mediabrowser/slice';
import Icon from 'components/Icon';

const MediaBrowser = ({ entity }) => {
	const dispatch = useDispatch();
	const currentDirectory = useSelector((state) => state.mediaBrowser.currentDirectory);
	const breadcrumbs = useSelector((state) => state.mediaBrowser.breadcrumbs);

	useEffect(() => {
		dispatch(navigateDirectory({ child: null, entity }));
	}, []);

	const goChild = (child) => {
		if (child.media_content_type == 'root') {
			child = null;
		}

		dispatch(navigateDirectory({ child, entity }));
	};

	if (currentDirectory == null) {
		return (
			<div>
				Loading media...
			</div>
		);
	}

	return (
		<div>
			{breadcrumbs.length > 0 ?
				<div className="flex items-center bg-gray/10 rounded-lg p-4 mb-4">
					<div
						className={cx(
							'cursor-pointer flex items-center justify-center',
							'text-2xl',
							'rounded-full',
							'w-12 h-12',
							'bg-gray/25'
						)}
						onClick={() => goChild(breadcrumbs[breadcrumbs.length - 1])}
					>
						<Icon name="arrow-left" />
					</div>

					<div className="ml-4 flex items-center gap-x-2">
						{breadcrumbs.map((breadcrumb, index) => {
							return (
								<div
									onClick={() => goChild(breadcrumb)}
									className={cx(
										'cursor-pointer py-2 px-4',
										'bg-gray/25',
										'rounded-full',
									)}
									key={breadcrumb.media_content_id + '-' + index}
								>
									{breadcrumb.title}
								</div>
							);
						})}
					</div>
				</div>
			: null}

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