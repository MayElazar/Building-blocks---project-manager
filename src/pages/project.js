import { useParams } from "react-router-dom";
import { Comments } from "../components/comments";
import ProjectSummery from "../components/projectSummery";
import { useDoc } from "../hooks/useDoc";
//styles
import "./project.css";

export default function Project() {
  const { id } = useParams();
  console.log(id);
  const { error, Doc } = useDoc("projects", id);

  return (
    <div className="projectContainer">
      {error && <div>{error}</div>}
      {!Doc && <div>Loading...</div>}
      {Doc && (
        <>
          <ProjectSummery proj={Doc} />
          <Comments proj={Doc} />
        </>
      )}
    </div>
  );
}
