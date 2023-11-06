import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { deleteUser, addUserWithID } from '../../services/user'; // Importa las funciones necesarias

const UsersList = () => {
 const [users, setUsers] = useState<any>([]);

 useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchUsers();
 }, []);

 const handleDelete = async (id:any) => {
  try {
    await deleteUser(id);
    setUsers(users.filter((user: { uid: any; }) => user.uid !== id));
  } catch (error) {
    console.error(error);
  }
 };

 const handleUpdate = async (id:any, data:any) => {
  try {
    await addUserWithID(data, id);
    setUsers(users.map((user: { uid: any; }) => user.uid === id ? { ...user, ...data } : user));
  } catch (error) {
    console.error(error);
  }
 };

 return (
  <table>
    <thead>
      <tr>
        <th>Username</th>
        <th>Email</th>
        <th>Display Name</th>
        <th>Email Verified</th>
        <th>Phone Number</th>
        <th>Photo URL</th>
        <th>Rol</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user: { uid: React.Key | null | undefined;role:string; username: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; email: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; displayName: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; emailVerified: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; phoneNumber: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; photoURL: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }) => (
        <tr key={user.uid}>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.displayName}</td>
          <td>{user.emailVerified}</td>
          <td>{user.phoneNumber}</td>
          <td>{user.photoURL}</td>
          <td>{user.role}</td>
          <td>
            <button onClick={() => handleDelete(user.uid)}>Delete</button>
            <button onClick={() => handleUpdate(user.uid, { /* new data */ })}>Update</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
 );
};

export default UsersList;
