import React, { useState } from "react";
import "./CreateScenarioForm.css";

const CreateScenarioForm = ({
  scenarioFormShown,
  createNewScenario,
  setScenName,
  setScenDesc,
  setGiven,
  setWhen,
  setThen,
}) => {
  const showHideClassName = scenarioFormShown
    ? "display-block"
    : "display-none";

  return (
    <div>
      {scenarioFormShown && (
        <div className={showHideClassName}>
          <section className="scenario-form">
            <h2>New Scenario</h2>
            <form className="scenario-add" onSubmit={createNewScenario}>
              <div>
                <label htmlFor="scenario-name">Scenario Name:</label>
                <input
                  name="scenario-name"
                  type="text"
                  placeholder="Scenario Name"
                  onChange={setScenName}
                />
              </div>
              <div>
                <label htmlFor="scenario-description">
                  Scenario Description:
                </label>
                <input
                  name="scenario-description"
                  type="text"
                  placeholder="Scenario Description"
                  onChange={setScenDesc}
                />
              </div>
              <div>
                <select>
                  <option selected value="given">
                    Given
                  </option>
                  <option value="when">When</option>
                  <option value="Then">Then</option>
                  <option value="and">And</option>
                  <option value="but">But</option>
                </select>
                <input
                  name="given"
                  type="text"
                  placeholder="Given"
                  onChange={setGiven}
                />
              </div>
              <div>
                <select>
                  <option value="given">Given</option>
                  <option selected value="when">
                    When
                  </option>
                  <option value="then">Then</option>
                  <option value="and">And</option>
                  <option value="but">But</option>
                </select>
                <input
                  name="when"
                  type="text"
                  placeholder="When"
                  onChange={setWhen}
                />
              </div>
              <div>
                <select>
                  <option value="given">Given</option>
                  <option value="when">When</option>
                  <option selected value="then">
                    Then
                  </option>
                  <option value="and">And</option>
                  <option value="but">But</option>
                </select>
                <input
                  name="Then"
                  type="text"
                  placeholder="Then"
                  onChange={setThen}
                />
              </div>
              <button type="submit">Add Scenario</button>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};

export default CreateScenarioForm;
