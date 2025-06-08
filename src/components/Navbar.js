const Navbar = () => {
    return (
      <div className="w-full h-16 bg-gray-900 text-white flex items-center justify-between px-6 shadow-md">
        <h1 className="text-lg font-bold">App Navbar</h1>
        <div className="flex space-x-4">
          <button className="hover:text-gray-400">Profile</button>
          <button className="hover:text-gray-400">Logout</button>
        </div>
      </div>
    );
  };

  export default Navbar;

// import React from "react";
// import { FaUserCircle } from "react-icons/fa";

// const Navbar = () => {
//   return (
//     <div className="bg-gray-800 h-16 w-full flex justify-end items-center pr-6 shadow-md">
//       <FaUserCircle className="text-white text-3xl cursor-pointer" />
//     </div>
//   );
// };

// export default Navbar;
