import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
// import DashSidebar from "../components/DashSidebar"
import DashSideBar from "../components/DashSideBar/DashSideBar.jsx"

import DashProfile from "../components/DashProfile"
import DashPosts from "../components/DashPosts"
import DashUsers from "../components/DashUsers"
import DashComments from "../components/DashComments"
import DashCromp from "../components/DashComp"
import { useSelector } from "react-redux";


export default function Dashboard() {
  const location = useLocation()
  const [tab, setTab] = useState('')
  const { currentUser } = useSelector((state) => state.user);


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])

  return (
    <div className="flex my-2 min-h-screen flex-col md:flex-row overflow-hidden">
      <div className=" ">
        {/* <DashSidebar /> */}
        <DashSideBar />
      </div>
      <div className="grow overflow-x-auto mt-20 md:mt-0 md:ml-20 ml-0">
        {tab === "profile" ? (
          <DashProfile />
        ) : currentUser.isAdmin && tab === "posts" ? (
          <DashPosts />
        ) : currentUser.isAdmin && tab === "users" ? (
          <DashUsers />
        ) : currentUser.isAdmin && tab === "comments" ? (
          <DashComments />
        ) : currentUser.isAdmin && tab === "dashboard" ? (
          <DashCromp />
        ) : (
          <h3 className="text-2xl mt-10 mx-auto w-fit">
            You are not allowed to access this page!
          </h3>
        )}
      </div>
    </div>
  );
}
