import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactButton from "./ContactButton";
import { setSelectedUser } from "../Redux/chatActions";

function SideNavUsers() {
  const { users, currentUser, selectedUser, chats } = useSelector(
    (state) => state
  );
  const filteredTopUserIdsFromChats = React.useMemo(
    () =>
      chats?.reduce((ids, item) => {
        if (
          ids?.findIndex((i) => i === item.receiver_id) === -1 &&
          item.receiver_id !== currentUser.id
        ) {
          return [...ids, item.receiver_id];
        }
        return [...ids];
      }, []),
    [chats, currentUser?.id]
  );
  const filteredTopUsers = filteredTopUserIdsFromChats?.map((item) =>
    users.find((user) => item === user.id)
  );
  const filteredUsers = React.useMemo(() => {
    let topUsers = [...(filteredTopUsers || [])];
    users.forEach((usr) => {
      if (
        topUsers.findIndex((i) => i.id === usr.id) === -1 &&
        usr.id !== currentUser.id
      ) {
        topUsers.push(usr);
      }
    });
    return topUsers;
  }, [currentUser?.id, filteredTopUsers, users]);
  const dispatch = useDispatch();
  return filteredUsers.map((user) => (
    <ContactButton
      key={user.id.toString()}
      userData={user}
      selected={selectedUser?.id === user?.id}
      onClick={() => dispatch(setSelectedUser(user))}
    />
  ));
}

export default SideNavUsers;
