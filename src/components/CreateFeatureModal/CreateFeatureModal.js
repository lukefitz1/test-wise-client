import React, { useState } from "react";
import "./CreateFeatureModal.css";

const CreateFeatureModal = ({
  featureModalShown,
  closeModal,
  createNewFeature,
  setFeatureDescription,
}) => {
  const showHideClassName = featureModalShown
    ? "modal display-block"
    : "modal display-none";

  return (
    <div>
      {featureModalShown && (
        <div className={showHideClassName}>
          <section className="modal-main">
            <h2>Add Project</h2>
            <form className="feature-add" onSubmit={createNewFeature}>
              <label htmlFor="feature-desc">Feature Description:</label>
              <input
                name="feature-desc"
                type="text"
                placeholder="Feature Description"
                onChange={setFeatureDescription}
              />
              <button type="submit">Create New Feature</button>
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

export default CreateFeatureModal;
