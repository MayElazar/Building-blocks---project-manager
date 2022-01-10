//styles
import { useState } from "react";
import "./OnlineUsers.css";

//hooks
import { useCollection } from "../hooks/useCollection";
//import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

//outside lib
import moment from "moment";

function OnlineUsers() {
  //const { user } = useAuthContext();
  const { isPending } = useLogout();
  const { error, documents } = useCollection("users");
  const [displayList, setDisplayList] = useState("hidden");
  const [SlideList, setSlideList] = useState("slideDown");
  function displayListFunc() {
    console.log(displayList);
    displayList === "hidden"
      ? setDisplayList("show")
      : setDisplayList("hidden");
    SlideList === "slideDown"
      ? setSlideList("slide")
      : setSlideList("slideDown");
  }

  return (
    <div
      className={`onlineUsers ${SlideList}`}
      onClick={() => displayListFunc()}
    >
      <div className="onlineUsers-headline">Contacts</div>
      <div className={`usersListDisplay ${displayList}`}>
        {error && <div>{error}</div>}
        {documents &&
          documents.map((user) => (
            <div key={user.id} className="usersList">
              <div className="nameAndImg">
                <div className="avatar">
                  <img src={user.photoURL} alt="user profile pic" />
                </div>
                <div>{user.displayName}</div>
                {user.online && <span className="onlineMark"></span>}
                {!user.online && <span className="offlineMark"></span>}
              </div>
              {isPending && (
                <>
                  {user.online === false && (
                    <div className="lastActive">
                      {"Active " +
                        moment(user.timeStemp.toDate()).fromNow().toString()}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default OnlineUsers;
