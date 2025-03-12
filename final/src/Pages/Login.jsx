import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import '../Pages/Style/Login.css';

export default  function Login() {
    const [User, setUser] = useState({Email:"",Password:""});
    const [showError, setshowError] = useState(false)
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    
      useEffect(() => {
        const registeredEmail = localStorage.getItem('registeredEmail'); // קריאה מהאחסון המקומי
        if (registeredEmail) { 
            setUser(prev => ({ ...prev, Email: registeredEmail })); // שמירת האימייל שנרשם
        }
        
      }, [])
      
      const handleRememberMe = () => {
        setRememberMe(!rememberMe);
    };
        const BtnLogin = () => {
            if(localStorage.users){
                let users = JSON.parse(localStorage.users);
                console.log(users);
                
                let user2Find = users.find(u => u.Email === User.Email && u.Password === User.Password); 
                if(user2Find !== undefined){ 
                    console.log('Login Success');
                    localStorage.setItem('loggedInUser', JSON.stringify(user2Find)); // שמירת המשתמש המחובר
                    
                    navigate('/HomePage'); 
                    setshowError(false); 
                   
                      localStorage.removeItem('registeredEmail'); // מסיר את האימייל אחרי השימוש
                   
                }
                else{
                    setshowError(true);
                     
                    }
            } else{
                setshowError(true);
                console.log('Login Failed');            
                } 
        }
    
  return (
    <div className="login-container">
    <div className="login-card">
        <h2 className="login-header">Login</h2>
       
    Email: <input type="text" className="login-input" value={User.Email}
     onChange={e => { let newUser ={...User,Email: e.target.value};
      setUser(newUser)  }} />  <br />
   
    Password: <input type="password"  className="login-input"
    onChange= {e => { let newUser ={...User,Password: e.target.value};
         setUser(newUser) }} />
          
                <br />
                {showError && <div className="login-error">Invalid Email or Password</div>}
    <br />
                <button onClick={BtnLogin} className="login-button">Login</button>
    <br />
    <p> Don't have an account? 
    <a href="" onClick={()=>{ navigate('/Register')}} className="register-link">   Register </a>    
    </p>
    </div>
    </div>
  )
}
