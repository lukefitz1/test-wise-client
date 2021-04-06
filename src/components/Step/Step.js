import React, { useState } from "react";
import "./Step.css";

const Step = ({ onChangeEvent, value, defaultSelectValue }) => {
  // const [steps, setSteps] = useState({ steps: [] });

  return (
    <div>
      <select defaultValue={defaultSelectValue}>
        <option value="given">Given</option>
        <option value="when">When</option>
        <option value="then">Then</option>
        <option value="and">And</option>
        <option value="but">But</option>
      </select>
      <input
        name="given"
        type="text"
        // placeholder="Given"
        value={value}
        onChange={onChangeEvent}
      />
    </div>
  );
};

export default Step;
