import React, {  useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import '../Pages/Style/Register.css';
export default function Register() {
    const [user, setUser] = useState({FirstName:"",LastName:"",Email:"",Password:""}); // משתנה מצב של המשתמש
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(false); // הודעת שגיאה אם המייל כבר קיים

    
    const BtnRegister= () => {
        let users =  JSON.parse(localStorage.getItem("users")) || []; // רשימת המשתמשים
        
          // בדיקה אם כל השדות מלאים
        if (!user.FirstName || !user.LastName|| !user.Email || !user.Password) {
            setErrorMessage("Please fill in all fields.");
            return;
        }
            // בדוק אם מזהה כבר קיים
            if (users.some(us => us.Email === user.Email)) {
                setErrorMessage("Email already exists. Please use a different email.");
                return;
        }
        // הוספת המשתמש החדש לרשימה
        users.push(user);
        // שמירת הרשימה המעודכנת
        localStorage.setItem("users", JSON.stringify(users));
        // שמירת המייל שנרשם כדי שיופיע אוטומטית בדף ההתחברות
        localStorage.setItem("registeredEmail", user.Email);
            navigate('/');
        }
    
  return (
    <div>
       <div className="register-container">
            <div className="register-card">
                <h2 className="register-header">Register</h2>

        FirstName: <input type="text"   className="register-input"
        onChange={e => { let newUser ={...user,FirstName: e.target.value};
            setUser(newUser)
        }}/>
        <br />
        LastName: <input type="text"  className="register-input"
         onChange={e => { let newUser ={...user,LastName: e.target.value};
            setUser(newUser)
        }}/>
        <br />
        Email: <input type="text"  className="register-input"
          onChange={e => { let newUser ={...user,Email: e.target.value};
            setUser(newUser)
        }}/> <br />
        Password: <input type="password"  className="register-input"
         onChange={e =>{  let newUser ={...user,Password: e.target.value};
            setUser(newUser)
        }} />  <br />
          {errorMessage && <p className="error-message">{errorMessage}</p>} {/* הצגת שגיאה אם יש */}
        <br />
        <button onClick={BtnRegister} className="register-button">Register</button>
        <br />
        <p> Already have an account?
        <a href="" onClick={()=>{ navigate('/')}} className="login-link"> Login </a>
        </p>
        </div>
    </div>
    </div>
  )
}
