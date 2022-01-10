import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "react-modal";
import Select from "react-select";
//hooks
import { useCollection } from "../hooks/useCollection";
import { useDoc } from "../hooks/useDoc";
import { useDeleteDoc } from "../hooks/useDeleteDoc";
import { useAuthContext } from "../../src/hooks/useAuthContext";
//styles
import "./dashboard.css";
import arrow from "../assets/arrow-right-solid.svg";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
//import chroma from "chroma-js";
//img
import trsh from "../assets/Trash.png";

export default function Dashboard() {
  const { user } = useAuthContext();

  const [projId, setProjId] = useState(null);
  const { documents, error } = useCollection("projects");
  const { Doc } = useDoc("projects", projId);
  const { deleteProject } = useDeleteDoc("projects", projId);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  Modal.setAppElement(".App");

  //delete proj

  const deleteProj = () => {
    setProjId("");
    setmodalIsOpen(!modalIsOpen);
    console.log(Doc);
    deleteProject();
  };
  //Modal
  const openModal = (id) => {
    setProjId(id);
    setmodalIsOpen(!modalIsOpen);
  };

  const closeModal = () => {
    setProjId("");
    setmodalIsOpen(!modalIsOpen);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      //background: "grey",
    },
  };

  //select status ["Working on it", "Stuck", "Done"]
  const options = [
    { value: "Working on it", label: "Working on it" },
    { value: "Stuck", label: "Stuck" },
    { value: "Done", label: "Done" },
  ];

  const updateStatus = async (updateProjectId, currentOption) => {
    const ref = doc(db, "projects", updateProjectId);
    updateDoc(ref, { status: currentOption.value });
  };

  return (
    <div className="project-Container">
      {Doc && (
        <Modal isOpen={modalIsOpen} style={customStyles}>
          {/*DocError && <div>{DocError}</div>*/}
          <p>Are you sure you want to delete "{Doc.projectName}"?</p>
          <div className="modalBtn">
            <button onClick={() => deleteProj()} className="primeryBTN">
              Yes, Delete
            </button>
            <button onClick={() => closeModal()} className="btn">
              No, Close
            </button>
          </div>
        </Modal>
      )}

      {error && <div>There is no projects Yet! go on and create one.</div>}
      {documents &&
        documents.map((project) => (
          <div id={project.id} key={project.id} className="project">
            <div className="status-trash-Div">
              {user.uid === project.createdBy.id && (
                <button
                  className="openModalBTN"
                  onClick={() => openModal(`${project.id}`)}
                >
                  <img src={trsh} alt="delete project" />
                </button>
              )}
              {console.log(project.status)}

              <form className="status-form">
                <label>
                  <span>Status:</span>
                  <Select
                    options={options}
                    onChange={(currentOption) =>
                      updateStatus(`${project.id}`, currentOption)
                    }
                    defaultValue={[
                      { value: project.status, label: project.status },
                    ]}
                    //  styles={customStylesSelect}
                  />
                </label>
              </form>
            </div>
            <div>
              <h3>{project.projectName}</h3>
              {/* <p>{project.about}</p>*/}
              <p>
                <span>Department: </span>
                {project.category}
              </p>
              <p>
                <span>DueDate: </span>
                {project.dueDate}
              </p>

              <ul>
                {project.CoWorkersList.map((user) => (
                  <li className="avatar" key={user.id}>
                    <img src={user.photoURL} alt="users pic" />
                  </li>
                ))}
              </ul>
              <Link to={`/project/${project.id}`}>
                <div className="arrow-container">
                  <img src={arrow} alt="about project" className="arrow" />
                </div>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}
