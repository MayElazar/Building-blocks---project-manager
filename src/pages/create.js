import { useState, useEffect } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuthContext } from "../../src/hooks/useAuthContext";
import { useCollection } from "../../src/hooks/useCollection";

import "./create.css";

//outside lib
import moment from "moment";

//categories
const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];
export default function Create() {
  const Navigate = useNavigate();
  // const { addDocument, response } = useFirestore("projects");
  const { user } = useAuthContext();

  const { documents } = useCollection("users");
  //use state
  const [users, setUsers] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [about, setAbout] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [Category, setCategory] = useState("");
  const [CoWorkers, setCoWorkers] = useState([]);
  const [error, setError] = useState("");

  const submitFunc = async (e) => {
    e.preventDefault();

    setError("");
    if (!Category || CoWorkers < 1) {
      setError("Please fill all fields");
      return;
    }

    const CoWorkersList = CoWorkers.map((user) => {
      return {
        displayName: user.value.displayName,
        photoURL: user.value.photoURL,
        id: user.value.id,
      };
    });
    const newPoject = {
      projectName,
      about,
      category: Category.value,
      dueDate: moment(dueDate).format("DD/MM/YYYY"),
      comment: [],
      CoWorkersList: CoWorkersList,
      createdBy: { name: user.displayName, id: user.uid },
      status: "Working on it",
    };

    // await addDocument(newPoject);

    // Add a new document with a generated id.
    await addDoc(collection(db, "projects"), newPoject);
    Navigate("/");
    /* if (!response.error) {
      
    }*/
    //console.log(newPoject);
  };

  useEffect(() => {
    if (documents) {
      const CoWorkersOption = documents.map((user) => {
        return {
          value: user,
          label: user.displayName,
        };
      });
      setUsers(CoWorkersOption);

      //console.log(CoWorkers);
    }
  }, [documents]);

  return (
    <div className="createContainer">
      <div className="createProjContainer">
        <h2>Create new project</h2>
        <form onSubmit={submitFunc}>
          <label>
            <span>Project name:</span>
            <input
              type="text"
              required
              onChange={(e) => setProjectName(e.target.value)}
              value={projectName}
            />
          </label>

          <label>
            <span>About the project:</span>
            <textarea
              type="text"
              required
              onChange={(e) => setAbout(e.target.value)}
              value={about}
            ></textarea>
          </label>

          <label>
            <span>Due date:</span>
            <input
              type="date"
              required
              onChange={(e) => setDueDate(e.target.value)}
              value={dueDate}
            />
          </label>

          <label>
            <span>Category:</span>
            <Select
              options={categories}
              onChange={(currentOption) => setCategory(currentOption)}
            />
          </label>

          <label>
            <span>Assign to:</span>

            <Select
              options={users}
              onChange={(currentOption) => setCoWorkers(currentOption)}
              isMulti={true}
              //Multi={true}
            />
          </label>

          <button className="primeryBTN">Add project</button>
        </form>
        {error && <div>{error}</div>}
      </div>
    </div>
  );
}
