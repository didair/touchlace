import { useEffect, useRef, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Isotope from "isotope-layout";

const Masonry = (props) => {
	const isotope = useRef();
	const container = useRef();
	const id = useMemo(() => 'grid' + uuidv4().replaceAll('-', ''), []);

	useEffect(() => {
		isotope.current = new Isotope(`#${id}`, {
			itemSelector: `#${id} > .grid-item`,
			layoutMode: 'masonry',
			masonry: {
				columnWidth: 160,
				gutter: 24,
			},
		});

		return () => isotope.current.destroy();
	}, []);

	useEffect(() => {
		if (isotope.current != null) {
			isotope.current.reloadItems();
		}
	}, [props.children.length])

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