import { useDispatch } from "react-redux";
import { navigateDirectory } from "services/mediabrowser/slice";

const ChildrenCardList = ({ directory, entity }) => {
	const dispatch = useDispatch();

	const onChildClick = (child) => {
		dispatch(navigateDirectory({
			child,
			entity,
		}));
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
							className="w-full aspect-square bg-cover bg-no-repeat bg-center rounded-md mb-2"
							style={{ backgroundImage: `url(${child.thumbnail})` }}
						/>

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