import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import TestWiseApi from "../api/testWise";
import Loading from "../components/Loading";

const Features = () => {
  const { isLoading, getAccessTokenSilently } = useAuth0();
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      if (!isLoading) {
        try {
          const token = await getAccessTokenSilently();

          const res = await TestWiseApi.get("/api/features", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setFeatures(res.data);
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

  const orderSteps = (testSteps) => {
    const steps = testSteps.sort((a, b) => {
      return a.order < b.order ? -1 : 1;
    });

    return steps;
  };

  const renderedResults = features.map((feature) => {
    return (
      <div key={feature.id}>
        Feature: {feature.description}
        {feature.scenarios.map((scenario) => {
          return (
            <div key={scenario.id}>
              Scenario: {scenario.name}
              {orderSteps(scenario.steps).map((step) => {
                return (
                  <p key={step.id}>
                    - {step.keyword} {step.step}
                  </p>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  });

  return <div>{renderedResults}</div>;
};

export default withAuthenticationRequired(Features, {
  onRedirecting: () => <Loading />,
});
