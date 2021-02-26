import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import TestWiseApi from "../api/testWise";
import Loading from "../components/Loading";

const Scenarios = () => {
  const { isLoading, getAccessTokenSilently } = useAuth0();
  const [scenarios, setScenarios] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      if (!isLoading) {
        try {
          const token = await getAccessTokenSilently();

          const res = await TestWiseApi.get("/api/scenarios", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setScenarios(res.data);
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

  const renderedResults = scenarios.map((scenario) => {
    return (
      <div key={scenario.id}>
        Scenario: {scenario.name}
        {scenario.steps.map((step) => {
          return (
            <p key={step.id}>
              - {step.keyword} {step.step}
            </p>
          );
        })}
      </div>
    );
  });

  return <div>{renderedResults}</div>;
};

export default withAuthenticationRequired(Scenarios, {
  onRedirecting: () => <Loading />,
});
