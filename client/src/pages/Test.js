import React from 'react';
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
          <button>Get Started</button>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <h3>Organize</h3>
          <p>Keep your notes organized with tags and categories.</p>
        </div>
        <div className="feature">
          <h3>Sync</h3>
          <p>Access your notes from anywhere, anytime. Sync across devices.</p>
        </div>
        <div className="feature">
          <h3>Search</h3>
          <p>Effortlessly find any note using our powerful search feature.</p>
        </div>
      </section>

      {/* Add more sections or content as needed */}
    </div>
  );
}

export default HomePage;
