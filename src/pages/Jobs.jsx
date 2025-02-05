import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Jobs = () => {
  const jobsData = useLoaderData();
  return (
    <div>
      <h1>Job List</h1>
      {jobsData?.map((itm) => (
        <Link to={itm.id.toString()} key={itm.id}>
          <p>{itm.title}</p>
        </Link>
      ))}
    </div>
  );
};

export default Jobs;

export const JobLoader = async () => {
  const res = await fetch("http://localhost:5000/jobs");
  return res.json();
};
