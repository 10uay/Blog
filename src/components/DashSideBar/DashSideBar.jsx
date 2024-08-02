// import { useRef } from "react";
import { motion,  useCycle } from "framer-motion";
// import { useDimensions } from "./use-dimensions";
import { MenuToggle } from "./MenuToggle";
// import { Navigation } from "./Navigation";
import MenuItems from './MenuItems'

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export default function DashSideBar() {
  const [isOpen, toggleOpen] = useCycle(false, true);
  // const containerRef = useRef(null);
  // const { height } = useDimensions(containerRef);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      // custom={height}
      // ref={containerRef}
      className=" absolute h-[100vh] min-w-60 flex flex-col items-start justify-between rounded z-10"
    >
      <motion.div
        className="bg-[#1F2937] absolute top-0 left-0 w-full h-full"
        variants={sidebar}
      ></motion.div>
      {/* <Navigation /> */}
      <MenuToggle isOpen={() => toggleOpen()} className=" ml-5 mt-6 absolute" />
      <MenuItems />
    </motion.nav>
  );
}
