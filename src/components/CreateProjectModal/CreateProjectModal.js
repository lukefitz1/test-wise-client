import React, { useState } from "react";
import "./CreateProjectModal.css";

const CreateProjectModal = ({
  projectModalShown,
  closeModal,
  createNewProject,
  setProjName,
  setProjDesc,
}) => {
  // const createProject = () => {};
  const showHideClassName = projectModalShown
    ? "modal display-block"
    : "modal display-none";

  return (
    <div>
      {projectModalShown && (
        <div className={showHideClassName}>
          <section className="modal-main">
            <h2>Add Project</h2>
            <form className="project-add" onSubmit={createNewProject}>
              <label htmlFor="project-name">Project Name:</label>
              <input
                name="project-name"
                type="text"
                placeholder="Project Name"
                onChange={setProjName}
              />
              <label htmlFor="project-description">Project Description:</label>
              <input
                name="project-description"
                type="text"
                placeholder="Project Description"
                onChange={setProjDesc}
              />
              <button type="submit">Create New Project</button>
              <button type="button" onClick={closeModal}>
                Close
              </button>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};

export default CreateProjectModal;
