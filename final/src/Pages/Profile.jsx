import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import '../Pages/Style/Profile.css';

export default function Profile() {
    const  Navigate = useNavigate();
        const {state} =useLocation();
        const [user, setUser] = useState(state || JSON.parse(localStorage.getItem('loggedInUser')));

        const [firstName, setFirstName] = useState(user.FirstName || "");
        const [lastName, setLastName] = useState(user.LastName|| "");
        const [email, setEmail] = useState(user.Email|| "");
        const [password, setPassword] = useState(user.Password|| "");
        
    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }
    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

     const handleUpdate = () => {
        
            let users = JSON.parse(localStorage.getItem('users')) ||[];

            // מצא את המשתמש לפי מייל
            let userIndex = users.findIndex(u => u.Email === user.Email);
            if (userIndex !== -1) {
                // עדכן את פרטי המשתמש
                users[userIndex] = {...users[userIndex], FirstName: firstName, LastName: lastName, Email: email ,Password:password};
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('loggedInUser', JSON.stringify(users[userIndex]));
                setUser(users[userIndex]);

                alert('Profile updated successfully!');
            } else {
                alert('User not found!');
            }
       
    }
    const BtnBack = () => {
        Navigate('/HomePage');
    }
  return (
      <div className="profile-container"> 
    <div className='profile-card'>
         <h2 className="profile-header">Edit Profile</h2>
  <div className="mb-4">
            <label className="profile-label">FirstName:</label>   
            <input className="profile-input" type="text" value={firstName} onChange={handleFirstNameChange} />
        </div>
        <div className="mb-4">
            <label className="profile-label">LastName:</label>   
            <input className="profile-input" type="text" value={lastName}     onChange={handleLastNameChange} />
        </div>
        <div className="mb-4">
            <label className="profile-label">Email:</label>   
            <input className="profile-input" type="email" value={email} onChange={handleEmailChange} />
        </div>
       <div className="mb-6">
          <label  className="profile-label">   Password:</label> 
         <input  className="profile-input" type="password" value={password} onChange={handlePasswordChange} /> 
        </div>
    <div className="profile-buttons">
        <button onClick={handleUpdate}>Update</button> 
        <button onClick={BtnBack}>Back</button>
    </div>
</div>
</div>
  )
}
