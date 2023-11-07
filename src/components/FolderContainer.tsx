import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import cx from 'classnames';

const FolderContainer = ({
	title = null,
	children
}: {
	title?: string,
	children: ReactNode,
}) => {

	const listVariant = {
		hidden: {
			x: '.75rem', //move out of the site
			opacity: 0,
		},
		visible: {
			x: 0, // bring it back to nrmal
			opacity: 1,
		},
	};

	return (
		<motion.div
			className={cx(
				"flex flex-shrink-0 flex-col",
				"bg-gray/40 backdrop-blur-sm",
				"rounded-xl",
				"p-5",
				"h-full",
			)}
			variants={listVariant}
		>
			{title != null ?
				<div className="mb-5">
					<h3 className="text-xl font-semibold">
						{title}
					</h3>
				</div>
			: null}

			<div className="h-full grid grid-flow-col responsive-grid-rows gap-5">
				{children}
			</div>
		</motion.div>
	);

};

export default FolderContainer;