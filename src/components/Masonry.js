import { useEffect, useRef, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Isotope from "isotope-layout";

const Masonry = (props) => {
	const isotope = useRef();
	const container = useRef();
	const id = useMemo(() => 'grid' + uuidv4().replaceAll('-', ''), []);

	const reloadItems = () => {
		if (isotope.current != null) {
			console.log('rooms change', isotope.current)
			isotope.current.shuffle();
		}
	};

	useEffect(() => {
		isotope.current = new Isotope(`#${id}`, {
			itemSelector: `#${id} > .grid-item`,
			layoutMode: 'masonry',
			masonry: {
				columnWidth: 160,
				gutter: 24,
			},
			getSortData: {
				index: '[data-index] parseInt'
			},
			sortBy: 'index',
		});

		window.addEventListener('roomschange', reloadItems);

		return () => {
			window.removeEventListener('roomschange', reloadItems);
			isotope.current.destroy();
		};
	}, []);

	useEffect(() => reloadItems, [props.children.length])

	// useEffect(() => {
	// 	filterKey === '*'
	// 		? isotope.current.arrange({ filter: `*` })
	// 		: isotope.current.arrange({ filter: `.${filterKey}` })
	// }, [filterKey]);

	// const handleFilterKeyChange = (key) => () => setFilterKey(key);

	return (
		<div ref={container} className="grid" id={id}>
			{props.children}
		</div>
	);
};

export default Masonry;