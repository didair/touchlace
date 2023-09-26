import { motion } from 'framer-motion';
import Delay from './Delay';
import cx from 'classnames';

const FolderContainer = ({ title = null, index, children }) => {

	const motionProps = {
		initial: { opacity: 0, x: '.75rem' },
		animate: { opacity: 1, x: 0 },
		exit: { opacity: 0, x: '.75rem' },
		transition: { duration: .25 },
	};

	return (
		<Delay delay={index * 75}>
			<motion.div
				className={cx(
					"flex flex-shrink-0 flex-col",
					"bg-gray/40 backdrop-blur-sm",
					"rounded-xl",
					"p-5",
					"h-full",
				)}
				{...motionProps}
			>
				{title != null ?
					<div className="mb-5">
						<h3 className="text-xl font-semibold text-light-gray">
							{title}
						</h3>
					</div>
				: null}

				<div className="h-full grid grid-flow-col responsive-grid-rows gap-5">
					{children}
				</div>
			</motion.div>
		</Delay>
	);

};

export default FolderContainer;