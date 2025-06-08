import React from "react";
import { FaComments, FaCalendarAlt, FaBookOpen } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";


const Sidebar = ({ isChatOpen, setIsChatOpen }) => {
  const location = useLocation();
  // const [isChatOpen, setIsChatOpen] = useState(location.pathname === "/chat");


  return (
    <div className="relative">
      {/* Sidebar */}
      <div className="w-16 text-white h-screen fixed left-0 top-0 flex flex-col items-center pt-6 bg-gray-800">
        {/* Sidebar Menu */}
        <ul>
          <li
            className={`flex items-center justify-center w-full p-4 cursor-pointer 
              ${location.pathname === "/" ? "bg-gray-600" : "hover:bg-gray-700"}`}
            onClick={() => setIsChatOpen(false)}
            data-tooltip-id="chat-tooltip"
          >
            <Link to="/">
              <FaComments className="text-xl" />
            </Link>
            <Tooltip id="chat-tooltip" place="right" content="Chat" />
          </li>
          <li
            className={`flex items-center justify-center w-full p-4 cursor-pointer 
              ${location.pathname === "/events" ? "bg-gray-600" : "hover:bg-gray-700"}`}
            onClick={() => setIsChatOpen(false)}
            data-tooltip-id="events-tooltip"
          >
            <Link to="/events">
              <FaCalendarAlt className="text-xl" />
            </Link>
            <Tooltip id="events-tooltip" place="right" content="Events" />
          </li>
          <li
            className={`flex items-center justify-center w-full p-4 cursor-pointer 
              ${location.pathname === "/blogs" ? "bg-gray-600" : "hover:bg-gray-700"}`}
            onClick={() => setIsChatOpen(false)}
            data-tooltip-id="blogs-tooltip"
          >
            <Link to="/blogs">
              <FaBookOpen className="text-xl" />
            </Link>
            <Tooltip id="blogs-tooltip" place="right" content="Blogs" />
          </li>
        </ul>
      </div>

      {/* Chat Drawer (Only opens when Chat is active) */}
      {/* {isChatOpen && location.pathname === "/chat" && (
        <div
          className="chat-drawer fixed left-16 top-0 h-[100vh] w-72 text-white shadow-lg p-4 rounded-2xl mt-5"
          style={{ backgroundColor: "#a8a29e" }}
        >
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => setIsChatOpen(false)}>
              <FaArrowLeft className="text-xl hover:text-gray-400" />
            </button>
          </div>
          <h2 className="text-lg font-bold">Chat History</h2>
          <ul className="space-y-2">
           
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default Sidebar;
