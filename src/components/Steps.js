import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import TestWiseApi from "../api/testWise";
import Loading from "../components/Loading";

const Steps = () => {
  const { isLoading, getAccessTokenSilently } = useAuth0();
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      if (!isLoading) {
        try {
          const token = await getAccessTokenSilently();

          const res = await TestWiseApi.get("/api/steps", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setSteps(res.data);
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

  const renderedResults = steps.map((step) => {
    return (
      <div key={step.id}>
        {step.keyword} {step.step}
      </div>
    );
  });

  return <div>{renderedResults}</div>;
};

export default withAuthenticationRequired(Steps, {
  onRedirecting: () => <Loading />,
});
