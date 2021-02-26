import React, { useState } from "react";
import "./CreateProjectModal.css";

const CreateProjectModal = ({ projectModalShown }) => {
  const createProject = () => {};

  return (
    <div>
      {projectModalShown && (
        <form className="project-add" onSubmit={createProject}>
          <label htmlFor="project-name">Project Name:</label>
          <input name="project-name" type="text" placeholder="Project Name" />
          <label htmlFor="project-description">Project Description:</label>
          <input
            name="project-description"
            type="text"
            placeholder="Project Description"
          />
          <button type="submit">Create New Project</button>
        </form>
      )}
    </div>
  );
};

export default CreateProjectModal;
