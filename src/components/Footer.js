import { useSelector } from "react-redux";
import cx from 'classnames';

import Badge from "./Badge";
import Entities from "./Entities";

const Footer = () => {
	const topBarEntities = useSelector((state) => state.settings.topEntities);

	return (
		<div
			className={cx(
				"w-full h-16",
				"border-t border-gray",
				"flex items-center",
				"gap-x-2 px-8",
				"bg-gray/20 backdrop-blur-sm",
				"overflow-y-hidden overflow-x-scroll"
			)}
		>
			{topBarEntities?.length > 0 ?
				<Entities
					entities={topBarEntities.filter((entity_id) =>
						entity_id.indexOf('sensor') > -1
					)}
				/>
			: null}

			<Badge to="/settings" icon="gear">
				Settings
			</Badge>
		</div>
	);

}

export default Footer;
