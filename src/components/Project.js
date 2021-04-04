import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import TestWiseApi from "../api/testWise";
import Loading from "../components/Loading";
import CreateFeatureModal from "../components/CreateFeatureModal/CreateFeatureModal";

const Project = (props) => {
  const { isLoading, getAccessTokenSilently } = useAuth0();
  const [project, setProject] = useState({});
  const [featureModalShown, setFeatureModalShown] = useState(false);
  const [featureDescription, setFeatureDescription] = useState("");
  const [reload, setReload] = useState(false);

  const showFeatureModal = () => {
    setFeatureModalShown(!featureModalShown);
  };

  useEffect(() => {
    const loadProject = async () => {
      if (!isLoading) {
        const token = await getAccessTokenSilently();
        const projectId = props.match.params.id;

        try {
          const res = await TestWiseApi.get(`/api/projects/${projectId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setProject(res.data);
        } catch (e) {
          console.log(`Error fetching project: ${e}`);
        }

        // TODO - Use react/redux for API calls
        // TODO - Need to set up authentication/authorization to work with redux first
        // console.log("Attempting to call the API");
        // dispatch(fetchOrganization(orgId));
      }
    };

    loadProject();
  }, [isLoading, getAccessTokenSilently, reload]);

  const addFeature = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();

    try {
      await TestWiseApi.post(
        `/api/features`,
        {
          description: featureDescription,
          project_id: project.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFeatureModalShown(false);
      setReload(true);
    } catch (e) {
      console.log(`Error creating an organization: ${e}`);
    }
  };

  const setDescription = (e) => {
    setFeatureDescription(e.target.value);
  };

  const features = project.features
    ? project.features.map((feature) => {
        return (
          <div key={feature.id}>
            <h3>
              <Link to={`/feature/${feature.id}`}>{feature.description}</Link>
            </h3>
          </div>
        );
      })
    : null;

  return (
    <div className="project-data">
      {/* <div>Project ID: {project.id}</div> */}
      <div>Project Name: {project.name}</div>
      <div>Project Description: {project.description}</div>
      <button onClick={showFeatureModal}>Create new Feature</button>
      <div className="features">{features}</div>
      <CreateFeatureModal
        featureModalShown={featureModalShown}
        closeModal={showFeatureModal}
        createNewFeature={addFeature}
        setFeatureDescription={setDescription}
      />
    </div>
  );
};

export default withAuthenticationRequired(Project, {
  onRedirecting: () => <Loading />,
});
