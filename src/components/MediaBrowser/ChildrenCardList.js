import cx from 'classnames';
import { useMemo } from 'react';
import { useDispatch } from "react-redux";
import { navigateDirectory, playChild } from "services/mediabrowser/slice";
import Icon from 'components/Icon';

const ChildrenCardList = ({ directory, entity }) => {
	const dispatch = useDispatch();

	const placeholderIcon = (child) => {
		const media_class = child.children_media_class != null ? child.children_media_class : child.media_class;
		if (media_class == 'playlist') {
			return 'music';
		}

		if (media_class == 'album') {
			return 'compact-disc';
		}

		if (media_class == 'track') {
			return 'file-audio';
		}

		if (media_class == 'genre' || media_class == 'podcast') {
			return 'radio';
		}

		if (media_class == 'artist') {
			return 'user';
		}
	};

	const onChildClick = (child) => {
		if (child.can_expand) {
			dispatch(navigateDirectory({ child, entity }));

			return true;
		}

		if (child.can_play) {
			dispatch(playChild({ entity, child }));
		}
	};

	return (
		<div className="grid grid-cols-4 gap-6">
			{directory.children?.map((child, index) => {
				let service = null;
				if (child.thumbnail?.indexOf('spotify') > -1) {
					service = 'Spotify';
				}

				if (child.thumbnail?.indexOf('sonos') > -1) {
					service = 'Sonos';
				}

				return (
					<div
						onClick={() => onChildClick(child)}
						key={child.media_content_id + '-' + index}
						className="cursor-pointer rounded-lg p-4 bg-gray/10 hover:bg-gray/20 transition-colors"
					>
						<div
							className="w-full aspect-square bg-cover bg-no-repeat bg-center rounded-md mb-2 flex items-center justify-center"
							style={{ backgroundImage: `url(${child.thumbnail})` }}
						>
							{!child.can_expand && child.can_play ?
								<div
									className={cx(
										'w-14 h-14',
										'rounded-full',
										'bg-bright-green',
										'text-dark',
										'text-2xl',
										'flex',
										'items-center justify-center',
										'transition-colors',
									)}
								>
									<Icon name="play" />
								</div>
							: null}

							{child.thumbnail == null ?
								<div className="text-5xl">
									<Icon name={placeholderIcon(child)} />
								</div>
							: null}
						</div>

						{service != null ?
							<div className="text-xs">
								{service}
							</div>
						: null}

						<div className="font-semibold">
							{child.title}
						</div>
					</div>
				);
			})}
		</div>
	);

};

export default ChildrenCardList;