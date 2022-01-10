export default function ProjectSummery({ proj }) {
  console.log(proj.projectName);
  console.log(proj);

  return (
    <div className="projectabout">
      <h2>{proj.projectName}</h2>
      <div>
        <p>DueDate: {proj.dueDate}</p>
        <p>category: {proj.category}</p>
      </div>
      <p>{proj.about}</p>
      <h3>Assigned to:</h3>
      {proj.CoWorkersList.map((user) => (
        <div key={user.id} className="avatar">
          <img src={user.photoURL} alt="Assigend user" className="" />
        </div>
      ))}
    </div>
  );
}
