import React, { useEffect, useState } from 'react'
import '../Pages/Style/MyVehicles.css';
import { useNavigate } from 'react-router-dom';

export default function MyVehicles() {
    const [vehicle, Setvehicle] = useState({ID: null,Make:null,Model:null,Year:null});  
    const [user, setUser] = useState(null); // סטייט למשתמש המחובר
    const navigate = useNavigate(); 
    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem('loggedInUser')); // קריאה מהאחסון המקומי
      if(storedUser){
        setUser(storedUser);
      }
      else{
        alert('Please login first') // אם אין משתמש מחובר
    }
    }, [])

    useEffect(() => {
        vehicle.ID
    }, [vehicle])
   
    
    
    if (!user) { // אם אין משתמש מחובר
        return <p>Please login to manage your vehicles.</p>;
    }
    let vehicles =  JSON.parse(localStorage.getItem(`vehicles_${user.Email}`)) || [];

        // עדכון ערכים לפי הקלט של המשתמש
    const handleChange = (e) => {
        Setvehicle({ ...vehicle, [e.target.name]: e.target.value });
        
    };
    const BtnAddVehicle = () => {
        if (!vehicle.Make || !vehicle.Model || !vehicle.Year || !vehicle.ID) {
            alert("Please fill in all fields.");
            return;
        }
            // בדוק אם מזהה כבר קיים
            if (vehicles.some(v => v.ID === vehicle.ID)) {
            alert("ID already exists! Please use a unique ID.");
            return;
        }
        
        const updatedVehicles = [...vehicles, vehicle];
        localStorage.setItem(`vehicles_${user.Email}`, JSON.stringify(updatedVehicles));
        Setvehicle(updatedVehicles);
        console.log(JSON.stringify(vehicle)+"  1");                   
        console.log("Vehicle added successfully");   
      
        }

        const removeVehicleById = (vehicleId) => {                    
            vehicles = vehicles.filter((v) => v.ID !== vehicleId);
            localStorage.setItem(`vehicles_${user.Email}`, JSON.stringify(vehicles));
            Setvehicle(vehicles)
            console.log("Vehicle removed successfully");

          };

          return (
            <div className='container'>
             <h2 className='header'> My Vehicles Page</h2> <br /> 
             <div className='form-container'>
             <h2>Add New Vehicle</h2>             
                <input id='id' type="number" name="ID" placeholder="ID"  onChange={handleChange} className='input' /><br />
                <input type="text" name="Make" placeholder="Make"  onChange={handleChange} className='input' /><br />
                <input type="text" name="Model" placeholder="Model" onChange={handleChange} className='input' /><br />
                <input type="number" name="Year" placeholder="Year" onChange={handleChange} className='input' /><br />
                <button onClick={BtnAddVehicle} className='add-button'><i class="bi bi-plus">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
        </svg>Add Vehicle</i></button>
            </div>

            <div className='list-container'>
                <h3>📋 Vehicle list</h3>
                {vehicles.length === 0 ? (
                    <p className='no-vehicles '>No vehicles in the list 🚘</p>
                ) : (
                    <ul className='list'>
                        {vehicles.map((v) => (
                            <li key={v.ID} className='list-item'>
                                <p>🔹 {v.Make} {v.Model}</p> <br />
                                🆔 ID: {v.ID} | 🏎 Year: {v.Year} <br />
                                <button onClick={() => removeVehicleById(v.ID)} className='remove-button'><i class="bi bi-x"> Remove
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                </svg></i></button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <button onClick={() => navigate('/HomePage')} className='back-button'><i class="bi bi-house">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
        </svg>Back to HomePage</i></button>
            </div>         
          );          
}
