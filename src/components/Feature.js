import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import TestWiseApi from "../api/testWise";
import Loading from "../components/Loading";
import CreateScenarioForm from "../components/CreateScenarioForm/CreateScenarioForm";

const Feature = (props) => {
  const { isLoading, getAccessTokenSilently } = useAuth0();
  const [feature, setFeature] = useState({});
  const [scenarioFormShown, setScenarioFormShown] = useState(false);
  const [reload, setReload] = useState(false);

  const [scenarioName, setScenarioName] = useState("");
  const [scenarioDescription, setScenarioDescription] = useState("");
  const [given, setGiven] = useState("");
  const [when, setWhen] = useState("");
  const [then, setThen] = useState("");

  useEffect(() => {
    const loadFeature = async () => {
      if (!isLoading) {
        const token = await getAccessTokenSilently();
        const featureId = props.match.params.id;

        try {
          const res = await TestWiseApi.get(`/api/features/${featureId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setFeature(res.data);
        } catch (e) {
          console.log(`Error fetching feature: ${e}`);
        }

        // TODO - Use react/redux for API calls
        // TODO - Need to set up authentication/authorization to work with redux first
        // console.log("Attempting to call the API");
        // dispatch(fetchOrganization(orgId));
      }
    };

    loadFeature();
  }, [isLoading, getAccessTokenSilently, reload]);

  const showNewScenarioForm = () => {
    setScenarioFormShown(!scenarioFormShown);
  };

  const setScenName = (e) => {
    setScenarioName(e.target.value);
  };

  const setScenDescription = (e) => {
    setScenarioDescription(e.target.value);
  };

  const setScenGiven = (e) => {
    setGiven(e.target.value);
  };

  const setScenWhen = (e) => {
    setWhen(e.target.value);
  };

  const setScenThen = (e) => {
    setThen(e.target.value);
  };

  const createNewScenario = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    const featureId = props.match.params.id;
    console.log(`Scenario Name, Desc: ${scenarioName}, ${scenarioDescription}`);
    console.log(`Scenario Steps: ${given}, ${when}, ${then}`);
    const scenarioSteps = getScenarioSteps();

    try {
      await TestWiseApi.post(
        `/api/scenarios/create_scenario`,
        {
          name: scenarioName,
          feature_id: featureId,
          steps: scenarioSteps,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setScenarioFormShown(false);
      setReload(true);
    } catch (e) {
      console.log(`Error creating an organization: ${e}`);
    }
  };

  const getScenarioSteps = () => {
    let stepsArray = [];

    stepsArray.push(
      { keyword: "Given", step: given, order: 1 },
      { keyword: "When", step: when, order: 2 },
      { keyword: "Then", step: then, order: 3 }
    );

    return stepsArray;
  };

  const scenarios = feature.scenarios
    ? feature.scenarios.map((scenario) => {
        return (
          <div key={scenario.id}>
            <h3>Scenario: {scenario.name}</h3>
            <h5>{scenario.description}</h5>
            <div>{scenario.id}</div>
            {scenario.steps.map((step) => {
              return (
                <div key={step.id}>
                  {step.keyword} {step.step}
                </div>
              );
            })}
          </div>
        );
      })
    : null;

  return (
    <div className="feature-data">
      {/* <div>Feature ID: {feature.id}</div> */}
      <button onClick={showNewScenarioForm}>Add Scenario</button>
      <CreateScenarioForm
        scenarioFormShown={scenarioFormShown}
        createNewScenario={createNewScenario}
        setScenName={setScenName}
        setScenDesc={setScenDescription}
        setGiven={setScenGiven}
        setWhen={setScenWhen}
        setThen={setScenThen}
      />
      <div>Feature Description: {feature.description}</div>
      <div className="scenarios">{scenarios}</div>
    </div>
  );
};

export default withAuthenticationRequired(Feature, {
  onRedirecting: () => <Loading />,
});
