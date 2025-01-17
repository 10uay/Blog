import { Sidebar, SidebarItemGroup } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  HiChartPie,
  HiUser,
  HiAnnotation,
  HiOutlineUserGroup,
  HiDocumentText,
  HiArrowSmRight,
} from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/user/userSlice";
import { LuPanelLeftClose, LuPanelRightClose } from "react-icons/lu";



export default function DashSidebar() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const [tab, setTab] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      await fetch("https://blog-louay-api.onrender.com/api/auth/sign-out");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={`p-3 w-fit cursor-pointer lg:hidden`}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        {openDrawer ? (
          <LuPanelLeftClose className="text-2xl" />
        ) : (
          <LuPanelRightClose className="text-2xl" />
        )}
      </div>
      <div
        className={` lg:relative lg:left-0 absolute ${
          openDrawer ? "left-0" : "-left-80"
        } transition-all duration-300 ease-out z-10`}
      >
        <Sidebar>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                as={Link}
                icon={HiChartPie}
                active={tab === "dashComp"}
                to="/dashboard?tab=dashboard"
                className="relative"
              >
                Dashboard
                <span className="bg-slate-600 text-white py-1 px-2 text-sm absolute right-2 top-[50%] translate-y-[-50%] rounded dark:bg-white dark:text-black">
                  {currentUser.isAdmin ? "Admin" : "User"}
                </span>
              </Sidebar.Item>
              <Sidebar.Item
                as={Link}
                icon={HiUser}
                active={tab === "profile"}
                to="/dashboard?tab=profile"
              >
                Profile
              </Sidebar.Item>
              {currentUser.isAdmin && (
                <>
                  <Sidebar.Item
                    as={Link}
                    icon={HiDocumentText}
                    active={tab === "posts"}
                    to="/dashboard?tab=posts"
                  >
                    Posts
                  </Sidebar.Item>
                  <Sidebar.Item
                    as={Link}
                    icon={HiOutlineUserGroup}
                    active={tab === "users"}
                    to="/dashboard?tab=users"
                  >
                    Users
                  </Sidebar.Item>
                  <Sidebar.Item
                    as={Link}
                    icon={HiAnnotation}
                    active={tab === "comments"}
                    to="/dashboard?tab=comments"
                  >
                    Comments
                  </Sidebar.Item>
                </>
              )}
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                icon={HiArrowSmRight}
                onClick={handleSignOut}
                className="cursor-pointer"
              >
                Sign Out
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
    </>
  );
}
