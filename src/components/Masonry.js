import { useEffect, useRef, useState } from 'react';
import Isotope from "isotope-layout";

const Masonry = (props) => {
	const isotope = useRef();
	const [filterKey, setFilterKey] = useState('*');

	useEffect(() => {
		isotope.current = new Isotope('.grid', {
			itemSelector: '.card',
			layoutMode: 'masonry',
			masonry: {
				columnWidth: 160,
				gutter: 12,
			},
		});

		return () => isotope.current.destroy();
	}, []);

	useEffect(() => {
		filterKey === '*'
			? isotope.current.arrange({ filter: `*` })
			: isotope.current.arrange({ filter: `.${filterKey}` })
	}, [filterKey]);

	const handleFilterKeyChange = (key) => () => setFilterKey(key);

	return (
		<>
			<ul className="mb-4 flex gap-4">
				<li onClick={handleFilterKeyChange('*')} className="cursor-pointer">Show all</li>
				<li onClick={handleFilterKeyChange('switch')} className="cursor-pointer">Switches</li>
				<li onClick={handleFilterKeyChange('light')} className="cursor-pointer">Lights</li>
			</ul>

			<div className="grid">
				{props.children}
			</div>
		</>
	);
};

export default Masonry;