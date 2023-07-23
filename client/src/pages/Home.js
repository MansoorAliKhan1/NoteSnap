// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Home.css'

// function Home() {
//   return (
//     // <div className="home-container">
//     //   <h1>Welcome to the Home Page</h1>
//     //   <div className="button-container">
//     //     <Link to="/register" className="home-button">SignUp</Link>
//     //     <Link to="/login" className="home-button">LogIn</Link>
//     //   </div>
//     // </div>
    
//   );
// }

// export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import './dummy.css'; // Import your CSS file

function HomePage() {
  return (
    <div className="homepage">
      <header className="header">
        <h1>NoteSnap</h1>
        <nav>
          {/* Add navigation links if required */}
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h2>Take Notes Effortlessly</h2>
          <p>With NoteSnap, never forget important things again.</p>
          <Link to='/Login' style={{textDecoration:"none"}} className='button'>Get Started</Link>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <h3>Organize</h3>
          <p>Keep your notes organized with NoteSnap</p>
        </div>
        <div className="feature">
          <h3>Access</h3>
          <p>Access your notes from anywhere, anytime</p>
        </div>
        <div className="feature">
          <h3>Update</h3>
          <p>Effortlessly find any note and Update it in real time</p>
        </div>
      </section>

      {/* Add more sections or content as needed */}
    </div>
  );
}

export default HomePage;
