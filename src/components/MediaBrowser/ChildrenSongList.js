import cx from 'classnames';
import { capitalize } from 'lib/text';
import { playChild } from 'services/mediabrowser/slice';
import Icon from 'components/Icon';
import { useDispatch } from 'react-redux';

const ChildrenSongList = ({ entity, directory }) => {
	const dispatch = useDispatch();

	const onPlayChild = (child) => {
		dispatch(playChild({ entity, child }))
	};

	return (
		<div>
			<div className="flex my-6 gap-x-6">
				<div
					className="flex-shrink-0 h-48 w-48 bg-cover bg-no-repeat bg-center rounded-md"
					style={{ backgroundImage: `url(${directory.thumbnail})` }}
				/>

				<div className="flex flex-col justify-between">
					<div className="flex-1">
						<div className="text-sm font-bold mb-2">
							{capitalize(directory.media_class)}
						</div>

						<div className="text-6xl font-bold">
							{directory.title}
						</div>
					</div>

					<div>
						<div
							className={cx(
								'cursor-pointer',
								'w-14 h-14',
								'rounded-full',
								'bg-bright-green/90',
								'hover:bg-bright-green',
								'text-dark',
								'text-2xl',
								'flex',
								'items-center justify-center',
								'transition-colors',
							)}
							onClick={() => onPlayChild(directory)}
						>
							<Icon name="play" />
						</div>
					</div>
				</div>
			</div>

			<div className="-mx-3">
				{directory.children.map((child, index) => {
					return (
						<div
							onClick={() => onPlayChild(child)}
							className="py-2 px-3 flex items-center rounded-md hover:bg-gray/20 transition-colors cursor-pointer"
							key={child.media_content_id + '-' + index}
						>
							<div
								className="w-14 aspect-square bg-cover bg-no-repeat bg-center rounded-md"
								style={{ backgroundImage: `url(${child.thumbnail})` }}
							/>

							<div className="ml-4 flex-1">
								<strong className="font-semibold">
									{child.title}
								</strong>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);

};

export default ChildrenSongList;