import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // ייבוא מודולים
import "leaflet/dist/leaflet.css"; // ייבוא CSS
import L from "leaflet"; // ייבוא מודול

      //https://openchargemap.org/site/profile/applications  API

// אייקון מותאם אישית
const customIcon = new L.Icon({ 
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});

// מיקום ברירת מחדל - תל אביב
const defaultCenter = [32.0853, 34.7818];

const ChargingStationsMap = () => {
  const [stations, setStations] = useState([]);
  const [filterType, setFilterType] = useState("all"); // ברירת מחדל - כל הסוגים

  // שליפת עמדות טעינה מה-API
  useEffect(() => {
    fetch("https://api.openchargemap.io/v3/poi/?output=json&countrycode=IL&key=78217f80-0c29-43d8-84f2-d9c771ede310")
      .then((res) => res.json()) 
      .then((data) =>                            //78217f80-0c29-43d8-84f2-d9c771ede310

        setStations( 
          data.map((station, index) => ({ // עיבוד המידע
            id: index, // מזהה ייחודי
            name: station.AddressInfo.Title, // שם העמדה
            lat: station.AddressInfo.Latitude, // קוו רוח
            lng: station.AddressInfo.Longitude, // קו אורך
            type: station.Connections?.[0]?.CurrentType?.Title || "Unknown" // סוג AC או DC
          }))
        )
      )
      .catch((error) => console.error("Error fetching stations:", error));
  }, []);

  // סינון עמדות טעינה לפי סוג (AC/DC)
  const filteredStations = stations.filter((station) => {
    if (filterType === "all") return true;
    return station.type.includes(filterType);
  });

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>🔌 מפה של עמדות טעינה</h2>

      {/* תפריט סינון */}
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <select onChange={(e) => setFilterType(e.target.value)} value={filterType}>
          <option value="all">🔋 כל העמדות</option>
          <option value="AC">⚡ AC (זרם חילופין)</option>
          <option value="DC">⚡ DC (טעינה מהירה)</option>
        </select>
        <label style={{padding: "10px"}}>:סינון לפי סוג טעינה   </label>
      </div>

      {/* מפה */}  
      <MapContainer center={defaultCenter} zoom={12} style={{ right:"30%", height: "80vh", width: "80vw" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {filteredStations.map((station) => (
          <Marker key={station.id} position={[station.lat, station.lng]} icon={customIcon}>
            <Popup>
              <h3>{station.name}</h3>
              <p>סוג טעינה: {station.type}</p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                📍 לנווט לכאן
              </a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ChargingStationsMap;
