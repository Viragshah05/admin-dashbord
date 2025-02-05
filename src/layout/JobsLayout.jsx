import React from "react";
import { Outlet } from "react-router-dom";
import Job from "../pages/Jobs";

const JobsLayout = () => {
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default JobsLayout;
