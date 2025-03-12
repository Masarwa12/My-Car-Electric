import React from 'react'
import './Popup.css'

export default function Popup(props) { 
  return ( props.trigger) ? ( // פופאפ פתיחה/סגירה
     <div className="popup">
        <div className="popup-inner">
          <button className="close-btn" onClick={()=> props.setTrigger(false)}>Close</button> 
          {props.children} {/* הצגת התוכן */}
        </div>
     </div>        
  ): '';
}
