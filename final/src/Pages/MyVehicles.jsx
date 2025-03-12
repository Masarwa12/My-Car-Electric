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
                <button onClick={BtnAddVehicle} className='add-button'>➕ Add a vehicle</button>
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
                                <button onClick={() => removeVehicleById(v.ID)} className='remove-button'>❌ Remove</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <button onClick={() => navigate('/HomePage')} className='back-button'>🏠 Back to HomePage</button>
            </div>         
          );          
}
