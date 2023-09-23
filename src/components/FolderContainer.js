import cx from 'classnames';

const FolderContainer = ({ title = null, children }) => {

	return (
		<div
			className={cx(
				"flex flex-shrink-0 flex-col",
				"bg-gray/40 backdrop-blur-sm",
				"rounded-xl",
				"p-5",
				"h-full",
				"transition-all",
				"ease-in-out",
				"duration-200",
				"folder should-animate",
			)}
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
		</div>
	);

};

export default FolderContainer;