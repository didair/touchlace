
const Grid = (props) => {
	return (
		<div
			className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-9"
			{...props}
		/>
	);
};

export default Grid;