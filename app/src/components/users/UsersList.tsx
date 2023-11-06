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

  const handleDelete = async (id: any) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user: { uid: any; }) => user.uid !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id: any, data: any) => {
    try {
      await addUserWithID(data, id);
      setUsers(users.map((user: { uid: any; }) => user.uid === id ? { ...user, ...data } : user));
    } catch (error) {
      console.error(error);
    }
  };

  return (

    <div className="flex flex-col justify-center h-full">
      <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-100">
        <header className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Usuarios</h2>
        </header>
        <div className="p-3">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Username</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Display NAme</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Email</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Email Verified</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Phone Number</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Photo URL</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Rol</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Actions</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {users.map((user: { uid: React.Key | null | undefined; role: string; username: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; email: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; displayName: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; emailVerified: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; phoneNumber: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; photoURL: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }, index: number) => (
                  <tr key={index}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="font-medium text-gray-800">{user.username}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{user.displayName}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{user.email}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{user.emailVerified}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{user.phoneNumber}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{user.photoURL}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{user.role}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <button className="bg-blue-500 text-white px-4 py-2 mr-2" onClick={() => handleDelete(user.uid)}>Delete</button>
                      <button className="bg-green-500 text-white px-4 py-2" onClick={() => handleUpdate(user.uid, { /* new data */ })}>Update</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
