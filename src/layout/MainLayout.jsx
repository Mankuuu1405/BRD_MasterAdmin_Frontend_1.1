import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const MainLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">

      {/* SIDEBAR */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* PAGE CONTENT */}
      <div className="flex-1 min-h-screen bg-gray-100">

        {/* HEADER */}
        <Header onMenu={() => setOpen(true)}  />

        {/* BODY */}
        <div className="px-4 md:px-10 py-5">
          {children}
        </div>

      </div>
    </div>
  );
};

export default MainLayout;
