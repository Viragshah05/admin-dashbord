import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";

const jobOpening = () => {
  // const [details, setDetails] = useState({});

  // const { id } = useParams();
  // useEffect(() => {
  //   fetch(`http://localhost:5000/jobs/${id}`)
  //     .then((res) => res.json())
  //     .then((res) => setDetails(res))
  //     .catch((err) => console.error("Error", err));
  // }, [details]);
  const jobDetailsLoader = useLoaderData();
  return (
    <div>
      <h1>Job Details</h1>
      <p>
        Job Title: <br />
        {jobDetailsLoader.title}
      </p>
      <p>
        Job Salary: <br />
        {jobDetailsLoader.salary}
      </p>
    </div>
  );
};

export default jobOpening;

export const jobDetailsLoader = async ({ params }) => {
  const { id } = params;
  const response = await fetch(`http://localhost:5000/jobs/${id}`);
  return response.json();
};
