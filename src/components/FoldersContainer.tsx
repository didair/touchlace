import { ReactNode, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const FoldersContainer = ({ children }: { children: ReactNode }) => {
	const location = useLocation();
	const element = useRef<HTMLDivElement>(null);
	const interval = 75; // In ms

	const animateChildrenIn = () => {
		element.current?.querySelectorAll('.folder').forEach((folder, index) => {
			setTimeout(function () { // Stagger effect
				folder.classList.remove('should-animate');
			}, index * interval);
		});
	};

	useEffect(() => {
		if (element.current != null) {
			animateChildrenIn();
		}
	}, [location]);

	return (
		<div className="h-full w-min px-8 py-4 flex gap-x-10" ref={element}>
			{children}
		</div>
	);
};

export default FoldersContainer;