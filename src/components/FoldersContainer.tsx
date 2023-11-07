import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

const FoldersContainer = ({ children }: { children: ReactNode }) => {

	const boxVariant = {
		hidden: {
			transition: {
				when: "beforeChildren", //use this instead of delay
				staggerChildren: 0.1, //apply stagger on the parent tag
			},
		},
		visible: {
			transition: {
				when: "beforeChildren", //use this instead of delay
				staggerChildren: 0.1, //apply stagger on the parent tag
			},
		},
	};

	return (
		<AnimatePresence>
			<motion.div
				className="h-full w-min px-8 py-4 flex gap-x-10"
				variants={boxVariant}
				initial="hidden"
				animate="visible"
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
};

export default FoldersContainer;
