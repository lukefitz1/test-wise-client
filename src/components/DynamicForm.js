import React, { useState } from "react";
import Step from "../components/Step/Step";

const DynamicForm = () => {
  const [values, setValues] = useState({ val: [] });

  function createInputs() {
    return values.val.map((el, i) => (
      <div key={i}>
        {/* <input type="text" value={el || ""} onChange={handleChange.bind(i)} /> */}
        <Step
          value={el || ""}
          onChangeEvent={handleChange.bind(i)}
          defaultSelectValue="given"
        />
        <input type="button" value="remove" onClick={removeClick.bind(i)} />
      </div>
    ));
  }

  function handleChange(event) {
    let vals = [...values.val];
    vals[this] = event.target.value;
    setValues({ val: vals });
  }

  const addClick = () => {
    setValues({ val: [...values.val, ""] });
  };

  const removeClick = () => {
    let vals = [...values.val];
    vals.splice(this, 1);
    setValues({ val: vals });
  };

  return (
    <div>
      <div>
        <section className="scenario-form">
          <h2>Dynamic Scenario</h2>
          <form className="scenario-add">
            <div>
              <label htmlFor="scenario-name">Scenario Name:</label>
              <input
                name="scenario-name"
                type="text"
                placeholder="Scenario Name"
                // onChange={setScenName}
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
                // onChange={setScenDesc}
              />
            </div>
            {createInputs()}
            <input type="button" value="add more" onClick={addClick} />
          </form>
        </section>
      </div>
    </div>
  );
};

export default DynamicForm;
