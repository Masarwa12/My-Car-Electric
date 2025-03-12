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
                    <p>Welcome, {user?.FirstName} 👋</p>                  
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
                    <button onClick={() => setButtonPopup(true)}>Profile</button>
                    <Link to="/MyVehicles" onClick={(e) => { e.preventDefault();  //מונע ניווט מיידי
                          setNavigateAfterPopup(true); }} >                                           
                        My Vehicles</Link>  
                    <button onClick={Btnlogout} className="logout-btn">Log Out</button>
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
              <button className="my-vehicle-btn" onClick={handlePopupClose}>My Vehicle List</button>
        </Popup>
      
    </div>
  )
}
