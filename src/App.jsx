import { useState } from "react";
import "./App.css";

function App() {
  const destinations = [
    {
      id: 1,
      name: "Rim",
      country: "Italija",
      image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
      description:
        "Rim je idealan za ljubitelje istorije, kulture, arhitekture i italijanske kuhinje.",
      activities: ["Koloseum", "Fontana di Trevi", "Vatikan", "Piazza Navona"],
      price: 420,
    },
    {
      id: 2,
      name: "Pariz",
      country: "Francuska",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      description:
        "Pariz je odličan izbor za city break, muzeje, šetnje i romantična putovanja.",
      activities: ["Ajfelova kula", "Luvr", "Monmartr", "Krstarenje Senom"],
      price: 520,
    },
    {
      id: 3,
      name: "Santorini",
      country: "Grčka",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
      description:
        "Santorini je destinacija za odmor, more, zalaske sunca i opušteno putovanje.",
      activities: ["Oia", "Crvena plaža", "Fira", "Krstarenje ostrvom"],
      price: 650,
    },
  ];

  const [selectedDestination, setSelectedDestination] = useState(destinations[0]);
  const [days, setDays] = useState(3);
  const [travelType, setTravelType] = useState("Kultura");
  const [budget, setBudget] = useState("Srednji");
  const [showPlan, setShowPlan] = useState(false);

  const generatePlan = () => {
    setShowPlan(true);
  };

  const totalPrice = selectedDestination.price + days * 45;

  return (
    <div className="app">
      <nav className="navbar">
        <h2>TravelMate</h2>
        <ul>
          <li><a href="#home">Početna</a></li>
          <li><a href="#destinations">Destinacije</a></li>
          <li><a href="#planner">Planiranje</a></li>
          <li><a href="#about">O projektu</a></li>
          <li><a href="#contact">Kontakt</a></li>
        </ul>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Planiraj putovanje</h1>
          <p>
            TravelMate ti pomaže da brzo izabereš destinaciju, organizuješ
            aktivnosti i dobiješ okvirnu procenu troškova putovanja.
          </p>
          <a href="#planner" className="hero-btn">Započni planiranje</a>
        </div>
      </section>

      <section className="section" id="destinations">
        <h2>Popularne destinacije</h2>
        <p className="section-text">
          Izaberi jednu od ponuđenih destinacija i pogledaj osnovne informacije,
          aktivnosti i predlog plana putovanja.
        </p>

        <div className="cards">
          {destinations.map((destination) => (
            <div
              className={
                selectedDestination.id === destination.id
                  ? "card active-card"
                  : "card"
              }
              key={destination.id}
              onClick={() => setSelectedDestination(destination)}
            >
              <img src={destination.image} alt={destination.name} />
              <div className="card-content">
                <h3>{destination.name}</h3>
                <p>{destination.country}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="planner-section" id="planner">
        <div className="planner-box">
          <div className="planner-form">
            <h2>Kreiraj plan putovanja</h2>

            <label>Destinacija</label>
            <select
              value={selectedDestination.id}
              onChange={(e) => {
                const destination = destinations.find(
                  (item) => item.id === Number(e.target.value)
                );
                setSelectedDestination(destination);
              }}
            >
              {destinations.map((destination) => (
                <option key={destination.id} value={destination.id}>
                  {destination.name}
                </option>
              ))}
            </select>

            <label>Broj dana</label>
            <input
              type="number"
              min="1"
              max="14"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
            />

            <label>Tip putovanja</label>
            <select
              value={travelType}
              onChange={(e) => setTravelType(e.target.value)}
            >
              <option>Kultura</option>
              <option>Odmor</option>
              <option>Avantura</option>
              <option>City break</option>
            </select>

            <label>Budžet</label>
            <select value={budget} onChange={(e) => setBudget(e.target.value)}>
              <option>Niski</option>
              <option>Srednji</option>
              <option>Visoki</option>
            </select>

            <button onClick={generatePlan}>Generiši plan</button>
          </div>

          <div className="planner-preview">
            <img src={selectedDestination.image} alt={selectedDestination.name} />
            <h3>{selectedDestination.name}</h3>
            <p>{selectedDestination.description}</p>
          </div>
        </div>
      </section>

      {showPlan && (
        <section className="section plan-section">
          <h2>Tvoj predlog putovanja</h2>

          <div className="plan-grid">
            <div className="plan-card">
              <h3>Osnovne informacije</h3>
              <p><strong>Destinacija:</strong> {selectedDestination.name}</p>
              <p><strong>Tip putovanja:</strong> {travelType}</p>
              <p><strong>Broj dana:</strong> {days}</p>
              <p><strong>Budžet:</strong> {budget}</p>
            </div>

            <div className="plan-card">
              <h3>Preporučene aktivnosti</h3>
              <ul>
                {selectedDestination.activities.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            </div>

            <div className="plan-card">
              <h3>Procena troškova</h3>
              <p>
                Okvirni trošak putovanja iznosi:
              </p>
              <h2>{totalPrice} €</h2>
              <p className="small-text">
                Cena je informativna i zavisi od sezone, smeštaja i načina
                prevoza.
              </p>
            </div>
          </div>
        </section>
      )}


      <section className="section contact" id="contact">
        <h2>Kontakt / Feedback</h2>
        <p>
          Ostavite komentar ili predlog za unapređenje aplikacije.
        </p>

        <form>
          <input type="text" placeholder="Ime i prezime" />
          <input type="email" placeholder="Email adresa" />
          <textarea placeholder="Vaša poruka"></textarea>
          <button type="button">Pošalji</button>
        </form>
      </section>

      <footer>
        <p>© 2026 TravelMate</p>
      </footer>
    </div>
  );
}

export default App;