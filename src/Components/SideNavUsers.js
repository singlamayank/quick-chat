import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactButton from './ContactButton';
import { setSelectedUser } from '../Redux/chatActions';

function SideNavUsers() {
    const {users, currentUser, selectedUser} = useSelector(state => state);
    const filteredUsers = users.filter((item) => item?.id !== currentUser?.id);
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

export default SideNavUsers