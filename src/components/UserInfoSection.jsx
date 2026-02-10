import React, { useEffect } from 'react'
import './UserInfoSection.css'

function UserInfoSection() {
  useEffect(() => {
    // Get IP address
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        const ipElement = document.getElementById('ip');
        if (ipElement) {
          ipElement.textContent = data.ip;
        }
      })
      .catch(error => {
        const ipElement = document.getElementById('ip');
        if (ipElement) {
          ipElement.textContent = 'Unable to retrieve';
        }
      });

    // Get geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationElement = document.getElementById('location');
          if (locationElement) {
            locationElement.textContent = `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;
          }
        },
        (error) => {
          const locationElement = document.getElementById('location');
          if (locationElement) {
            locationElement.textContent = 'Permission denied or unavailable';
          }
        }
      );
    } else {
      const locationElement = document.getElementById('location');
      if (locationElement) {
        locationElement.textContent = 'Geolocation not supported';
      }
    }
  }, []);

  return (
    <section id="user-info" className="section">
      <div className="container">
        <h2 className="section-title">User Information</h2>
        <div className="section-content">
          <div className="user-info-grid">
            <div className="info-card">
              <h3>🌐 Browser Details</h3>
              <p><strong>User Agent:</strong> {navigator.userAgent}</p>
              <p><strong>Browser:</strong> {navigator.appName}</p>
              <p><strong>Platform:</strong> {navigator.platform}</p>
              <p><strong>Language:</strong> {navigator.language}</p>
              <p><strong>Cookies Enabled:</strong> {navigator.cookieEnabled ? 'Yes' : 'No'}</p>
              <p><strong>Online Status:</strong> {navigator.onLine ? 'Online' : 'Offline'}</p>
            </div>
            <div className="info-card">
              <h3>💻 System Information</h3>
              <p><strong>Screen Resolution:</strong> {window.screen.width} x {window.screen.height}</p>
              <p><strong>Color Depth:</strong> {window.screen.colorDepth} bits</p>
              <p><strong>Pixel Ratio:</strong> {window.devicePixelRatio}</p>
              <p><strong>Viewport Size:</strong> {window.innerWidth} x {window.innerHeight}</p>
              <p><strong>Available Memory:</strong> {navigator.deviceMemory ? navigator.deviceMemory + ' GB' : 'Not available'}</p>
              <p><strong>Hardware Concurrency:</strong> {navigator.hardwareConcurrency || 'Not available'} cores</p>
            </div>
            <div className="info-card">
              <h3>📍 Location & Network</h3>
              <p><strong>Timezone:</strong> {Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
              <p><strong>Date/Time:</strong> {new Date().toLocaleString()}</p>
              <p><strong>Connection Type:</strong> {navigator.connection ? navigator.connection.effectiveType : 'Not available'}</p>
              <p><strong>Network Speed:</strong> {navigator.connection ? navigator.connection.downlink + ' Mbps' : 'Not available'}</p>
              <p><strong>Geolocation:</strong> <span id="location">Checking...</span></p>
              <p><strong>IP Address:</strong> <span id="ip">Checking...</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UserInfoSection 