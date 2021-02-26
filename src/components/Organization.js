import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import jwt_decode from "jwt-decode";
import { connect, useDispatch } from "react-redux";
import TestWiseApi from "../api/testWise";
import Loading from "./Loading";
import { fetchOrganization, storeLoginData } from "../redux/actions";
import CreateProjectModal from "./CreateProjectModal/CreateProjectModal";

const Organization = (props) => {
  const { isLoading, getAccessTokenSilently } = useAuth0();
  const [organization, setOrganization] = useState([]);
  const dispatch = useDispatch();
  const [projectModalShown, setProjectModalShown] = useState(false);

  const showProjectModal = () => {
    setProjectModalShown(!projectModalShown);
  };

  // START HERE
  // WORKING ON STORING THE ACCESS TOKEN IN REDUX
  // useEffect(() => {
  //   const loadLoginData = async () => {
  //     const token = await getAccessTokenSilently();
  //     dispatch(storeLoginData(token));
  //   };

  //   loadLoginData();
  // }, [getAccessTokenSilently]);

  useEffect(() => {
    const loadOrganization = async () => {
      if (!isLoading) {
        const token = await getAccessTokenSilently();
        const decodedToken = jwt_decode(token);
        const orgId = decodedToken["https://test-wise-api/organizationId"];

        try {
          const res = await TestWiseApi.get(`/api/organizations/${orgId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setOrganization(res.data);
        } catch (e) {
          console.log(`Error fetching organization: ${e}`);
        }

        // TODO - Use react/redux for API calls
        // TODO - Need to set up authentication/authorization to work with redux first
        // console.log("Attempting to call the API");
        // dispatch(fetchOrganization(orgId));
      }
    };

    loadOrganization();
  }, [isLoading, getAccessTokenSilently, dispatch]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const projects = organization.projects
    ? organization.projects.map((project) => {
        return (
          <div key={project.id}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </div>
        );
      })
    : null;

  return (
    <div>
      <h1>{organization.name}</h1>
      <button onClick={showProjectModal}>Create new project</button>
      <div className="projects">{projects}</div>
      <CreateProjectModal projectModalShown={projectModalShown} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { org: state.organization };
};

export default connect(mapStateToProps, { fetchOrganization })(
  withAuthenticationRequired(Organization, {
    onRedirecting: () => <Loading />,
  })
);

// export default withAuthenticationRequired(Organization, {
//   onRedirecting: () => <Loading />,
// });
