import { useState, useEffect } from 'react';
import { addUser, getUsers } from '../../services/user'; // Importa las funciones necesarias
import UsersList from './UsersList';

export default function UsersForm() {
 const [username, setUsername] = useState('');
 const [email, setEmail] = useState('');
 const [displayName, setDisplayName] = useState('');
 const [emailVerified, setEmailVerified] = useState('');
 const [phoneNumber, setPhoneNumber] = useState('');
 const [photoURL, setPhotoURL] = useState('');
 const [role, setRole] = useState(''); 
 const [users, setUsers] = useState<any>({})
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchUsers = async () => {
    try {
      const users = await getUsers();
      console.log(users);
      setUsers(users);      
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  fetchUsers();
 }, []);

 const handleSubmit = async (event:any) => {
  event.preventDefault();
  try {
    const userData = { username, email, displayName, emailVerified, phoneNumber, photoURL, role };
    const response = await addUser(userData); 
    setUsers([...users, response]);
  } catch (error) {
    console.error(error);
  }
 };

 if (loading) {
  return <>loading...</>
 }

 return (
  <>
    <hr />
    <br />
    Formulario ingreso de usuario
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Display Name" />
        <input type="text" value={emailVerified} onChange={e => setEmailVerified(e.target.value)} placeholder="Email Verified" />
        <input type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="Phone Number" />
        <input type="text" value={photoURL} onChange={e => setPhotoURL(e.target.value)} placeholder="Photo URL" />
        <select value={role} onChange={e => setRole(e.target.value)}>
         <option value="">Selecciona un rol</option>
         <option value="admin">Administrador</option>
         <option value="client">Cliente</option>
       </select>

        <button type="submit">Add User</button>
      </form>
    </div>
    <h1>Users List:</h1>
      <div>
        <UsersList/>
      </div>
  </>
 );
}
