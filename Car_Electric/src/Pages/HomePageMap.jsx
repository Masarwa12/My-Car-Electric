import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ChargingStationsMap from './API/ChargingStationsMap ';
import Popup from './Popup/Popup';
import '../Pages/Style/HomePage.css';

export default function HomePageMap() {
    const  Navigate = useNavigate();    
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('loggedInUser'))); // שמירת המידע של המשתמש
            
useEffect(() => { // בדיקה אם יש משתמש מחובר
    if (!user) {  // אם אין משתמש מחובר
        const storedUser = JSON.parse(localStorage.getItem('loggedInUser')); // קריאה מהאחסון המקומי
        if (storedUser) {
            setUser(storedUser);
        } else {
            Navigate('/'); // במידה ואין משתמש, חזור לדף ההתחברות
        }
    }
}, [user, Navigate]);

    
    const [vehicles, setVehicles] = useState([]); // רשימת כל הרכבים
    const [selectedVehicle, setSelectedVehicle] = useState(null); // רכב שנבחר
    const [buttonPopup, setButtonPopup] = useState(false); // פופאפ פתיחה/סגירה
    const [navigateAfterPopup, setNavigateAfterPopup] = useState(false); // ניווט לאחר סגירת הפופאפ

    useEffect(() => { // בדיקה אם יש רכבים באחסון המקומי
        if (user) {
            // קריאה לאחסון המקומי של רכבי המשתמש
            const storedVehicles = JSON.parse(localStorage.getItem(`vehicles_${user.Email}`)) || []; // מפתח ייחודי למשתמש
            setVehicles(storedVehicles); // עדכון הרשימה בהתאם למה שנמצא באחסון המקומי

            if (storedVehicles.length > 0) { // אם יש רכבים באחסון המקומי
                setSelectedVehicle(storedVehicles[0]); // ברירת מחדל: הרכב הראשון
            }
        }
    }, [user]);
    const handleVehicleChange = (event) => {
        const vehicleId = event.target.value; // מזהה הרכב שנבחר
        const selected = vehicles.find(v => v.ID === vehicleId); // מציאת הרכב ברשימת הרכבים                
        setSelectedVehicle(selected); // עדכון הרכב שנבחר 
    };
        
    const   Btnlogout = () => {
        localStorage.removeItem("loggedInUser");
        Navigate('/');
    }
          
    const navigateToProfile = () => {
        Navigate('/Profile', { state: user });
        
      };

      const handlePopupClose = () => { // סגירת הפופאפ
          if (navigateAfterPopup) {
              Navigate('/MyVehicles');
              setNavigateAfterPopup(false); // איפוס הערך לפני השימוש הבא
          }
      };
  return (
    <div className="homepage-container">
            {/* תפריט עליון */}
            <div className="top-menu">
                <div className="user-info">
                    <p> <i class="bi bi-person-circle">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                 <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>Welcome, {user?.FirstName}</i></p>                  
                </div>
                <div className="menu-buttons"> 
                <select onChange={handleVehicleChange} value={selectedVehicle?.ID || ''}>
                        <option value="" disabled hidden>Select a Vehicle</option>
                        {vehicles.map(vehicle => (
                            <option key={vehicle.ID} value={vehicle.ID}>
                                {vehicle.Make} {vehicle.Model}
                            </option>
                        ))}
                    </select>
                    <button onClick={() => setButtonPopup(true)} ><i class="bi bi-person-circle">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                 <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg></i>Profile</button>
                    <Link to="/MyVehicles" onClick={(e) => { e.preventDefault();  //מונע ניווט מיידי
                          setNavigateAfterPopup(true); }} >   <i class="bi bi-ev-front"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-ev-front" viewBox="0 0 16 16">
                          <path d="M9.354 4.243a.19.19 0 0 0-.085-.218.186.186 0 0 0-.23.034L6.051 7.246a.188.188 0 0 0 .136.316h1.241l-.673 2.195a.19.19 0 0 0 .085.218c.075.043.17.03.23-.034l2.88-3.187a.188.188 0 0 0-.137-.316H8.572z"/>
                          <path d="M4.819 2A2.5 2.5 0 0 0 2.52 3.515l-.792 1.848a.8.8 0 0 1-.38.404c-.5.25-.855.715-.965 1.262L.05 8.708a2.5 2.5 0 0 0-.049.49v.413c0 .814.39 1.543 1 1.997V13.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1.338c1.292.048 2.745.088 4 .088s2.708-.04 4-.088V13.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1.892c.61-.454 1-1.183 1-1.997v-.413q0-.248-.049-.49l-.335-1.68a1.8 1.8 0 0 0-.964-1.261.8.8 0 0 1-.381-.404l-.792-1.848A2.5 2.5 0 0 0 11.181 2H4.82ZM3.44 3.91A1.5 1.5 0 0 1 4.82 3h6.362a1.5 1.5 0 0 1 1.379.91l.792 1.847a1.8 1.8 0 0 0 .853.904c.222.112.381.32.43.564l.336 1.679q.03.146.029.294v.413a1.48 1.48 0 0 1-1.408 1.484c-1.555.07-3.786.155-5.592.155s-4.037-.084-5.592-.155A1.48 1.48 0 0 1 1 9.611v-.413q0-.148.03-.294l.335-1.68a.8.8 0 0 1 .43-.563c.383-.19.685-.511.853-.904z"/>
                        </svg>My Vehicles</i>                                         
                        </Link>  
                    <button onClick={Btnlogout} className="logout-btn"><i class="bi bi-box-arrow-right">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
  <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
</svg></i>Log Out</button>
                </div>
            </div>
            {/* מפה עם עמדות טעינה */}
        <div className="map-container">
         <ChargingStationsMap />
        </div>
        {/* פופאפ פרופיל */}
       <Popup trigger={buttonPopup} setTrigger={setButtonPopup}> 
              <h3>Profile</h3>
              <p>First Name: {user.FirstName}</p>
              <p>Last Name: {user.LastName}</p>
              <p>Email: {user.Email}</p>
                <p>Password: {user.Password}</p>
                <button className="edit-profile-btn" onClick={navigateToProfile}>Edit Profile</button>
        </Popup>
        {/* פופאפ רכבים */}
        <Popup trigger={navigateAfterPopup} setTrigger={setNavigateAfterPopup}>
              <h3>My Vehicle</h3>
              {selectedVehicle ? (
                    <>
                        <p>Vehicle ID: {selectedVehicle.ID}</p>
                        <p>Make: {selectedVehicle.Make}</p>
                        <p>Model: {selectedVehicle.Model}</p>
                        <p>Year: {selectedVehicle.Year}</p>
                    </>
                ) : (
                    <p>No vehicle selected</p>
                )}
              <button className="my-vehicle-btn" onClick={handlePopupClose}>   <i class="bi bi-ev-front"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-ev-front" viewBox="0 0 16 16">
                          <path d="M9.354 4.243a.19.19 0 0 0-.085-.218.186.186 0 0 0-.23.034L6.051 7.246a.188.188 0 0 0 .136.316h1.241l-.673 2.195a.19.19 0 0 0 .085.218c.075.043.17.03.23-.034l2.88-3.187a.188.188 0 0 0-.137-.316H8.572z"/>
                          <path d="M4.819 2A2.5 2.5 0 0 0 2.52 3.515l-.792 1.848a.8.8 0 0 1-.38.404c-.5.25-.855.715-.965 1.262L.05 8.708a2.5 2.5 0 0 0-.049.49v.413c0 .814.39 1.543 1 1.997V13.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1.338c1.292.048 2.745.088 4 .088s2.708-.04 4-.088V13.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1.892c.61-.454 1-1.183 1-1.997v-.413q0-.248-.049-.49l-.335-1.68a1.8 1.8 0 0 0-.964-1.261.8.8 0 0 1-.381-.404l-.792-1.848A2.5 2.5 0 0 0 11.181 2H4.82ZM3.44 3.91A1.5 1.5 0 0 1 4.82 3h6.362a1.5 1.5 0 0 1 1.379.91l.792 1.847a1.8 1.8 0 0 0 .853.904c.222.112.381.32.43.564l.336 1.679q.03.146.029.294v.413a1.48 1.48 0 0 1-1.408 1.484c-1.555.07-3.786.155-5.592.155s-4.037-.084-5.592-.155A1.48 1.48 0 0 1 1 9.611v-.413q0-.148.03-.294l.335-1.68a.8.8 0 0 1 .43-.563c.383-.19.685-.511.853-.904z"/>
                        </svg> My Vehicle List</i></button>
        </Popup>
      
    </div>
  )
}
