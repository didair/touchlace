import { AnimatePresence } from "framer-motion";
import { ReactNode, Children, cloneElement } from "react";

const FoldersContainer = ({ children }: { children: ReactNode }) => {
	const childrenArray = Children.toArray(children);

	return (
		<AnimatePresence>
			<div className="h-full w-min px-8 py-4 flex gap-x-10">
				{Children.map(childrenArray, (child, index) => {
					return cloneElement(child, {
						index,
					});
				})}
			</div>
		</AnimatePresence>
	);
};

export default FoldersContainer;