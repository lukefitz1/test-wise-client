import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import TestWiseApi from "../api/testWise";
import Loading from "../components/Loading";

const Projects = () => {
  const { isLoading, getAccessTokenSilently } = useAuth0();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      if (!isLoading) {
        try {
          const token = await getAccessTokenSilently();

          const res = await TestWiseApi.get("/api/projects", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setProjects(res.data);
        } catch (e) {
          console.log(`Error: ${e}`);
        }
      }
    };

    loadData();
  }, [isLoading, getAccessTokenSilently]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const renderedResults = projects.map((project) => {
    return (
      <div key={project.id}>
        Project Name: {project.name}
        <p>{project.description}</p>
        {project.features.map((feature) => {
          return <div key={feature.id}>{feature.description}</div>;
        })}
      </div>
    );
  });

  return <div>{renderedResults}</div>;
};

export default withAuthenticationRequired(Projects, {
  onRedirecting: () => <Loading />,
});
