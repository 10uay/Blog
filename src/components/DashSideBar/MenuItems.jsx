import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  HiChartPie,
  HiUser,
  HiAnnotation,
  HiOutlineUserGroup,
  HiDocumentText,
  HiArrowSmRight,
} from "react-icons/hi";

const variants = {
  open: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: 50,
    opacity: 0,
  },
};

const items = [
  ["dashboard", <HiChartPie />],
  ["profile", <HiUser />],
  ["posts", <HiDocumentText/>],
  ["users", <HiOutlineUserGroup/>],
  ["comments", <HiAnnotation/>],
];

export default function MenuItems() {
  const [tab, setTab] = useState("");
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <motion.ul
      variants={variants}
      className="mt-44 z-10 flex flex-col gap-10 items-start justify-center ml-10 w-full capitalize text-lg"
    >
      {items.map((item, index) => (
        <motion.li
          key={index}
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`${
            tab === item[0] ? "border-white border rounded" : "disActive"
          } text-white cursor-pointer py-2 px-5 min-w-40`}
        >
          <Link
            to={`/dashboard?tab=${item[0]}`}
            className="flex items-center gap-4"
          >
            <span>{item[1]}</span>
            {item[0]}
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  );
}
