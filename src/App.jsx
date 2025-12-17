import { useState } from 'react';
import './styles.css';

const ps4UnitsData = [
  { id: 1, name: 'PS4 #1', game: 'FIFA 23', price: 70000, available: true },
  { id: 2, name: 'PS4 #2', game: 'GTA V', price: 75000, available: true },
  { id: 3, name: 'PS4 #3', game: 'Spider-Man', price: 70000, available: true },
  { id: 4, name: 'PS4 #4', game: 'Call of Duty', price: 80000, available: true },
  { id: 5, name: 'PS4 #5', game: 'God of War', price: 85000, available: true },
  { id: 6, name: 'PS4 #6', game: 'Horizon', price: 80000, available: true }
];

const WHATSAPP_NUMBER = '62895403010139';

const HandleWhatsApp = (unit) => {
  const message = `
Halo, saya mau sewa ${unit.name}
Harga: Rp ${unit.price.toLocaleString()} / jam
Game: ${unit.games.join(', ')}
Apakah masih tersedia?
  `;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(url, '_blank');
};

function App() {
  const [units, setUnits] = useState(ps4UnitsData);
  const [SelectedUnit, setSelectedUnit] = useState(null);
  const [Closing, SetClosing] = useState(false);
  const [OpenDetail, SetOpenDetail] = useState(null);

  const HandleConfirm = (id) => {
    setUnits(units.map((u) => (u.id === id ? { ...u, available: false } : u)));
    setSelectedUnit(null);
  };

  const CloseModal = () => {
    SetClosing(true);
    setTimeout(() => {
      setSelectedUnit(null);
      SetClosing(false);
    }, 300);
  };

  const PsUnits = [
    {
      id: 1,
      name: 'PS4 - Unit 1',
      image: '/ps/ps1.jpg',
      games: ['PES 2021', 'GTA V', 'FIFA 23'],
      price: 15000,
      status: 'available'
    },
    {
      id: 2,
      name: 'PS4 - Unit 2',
      image: '/ps/ps1.jpg',
      games: ['God of War', 'Mortal Kombat 11'],
      price: 15000,
      status: 'rented'
    },
    {
      id: 3,
      name: 'PS4 - Unit 3',
      image: '/ps/ps1.jpg',
      games: ['Red Dead Redemption 2', 'GTA V'],
      price: 15000,
      status: 'available'
    },
    {
      id: 4,
      name: 'PS4 - Unit 4',
      image: '/ps/ps1.jpg',
      games: ['FIFA 23', 'PES 2021'],
      price: 15000,
      status: 'available'
    },
    {
      id: 5,
      name: 'PS4 - Unit 5',
      image: '/ps/ps1.jpg',
      games: ['Tekken 7', 'Naruto Storm 4'],
      price: 15000,
      status: 'rented'
    },
    {
      id: 6,
      name: 'PS4 - Unit 6',
      image: '/ps/ps1.jpg',
      games: ['Call of Duty', 'Battlefield'],
      price: 15000,
      status: 'available'
    }
  ];

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          {/* KIRI: LOGO + NAMA */}
          <div className="header-left">
            <img src="public/logo_ps.jpg" alt="Logo Rental PS4" className="logo-img" />
            <h1>PLAYBOX AWAKJEUT</h1>
          </div>

          {/* KANAN: NAVIGASI */}
          <div className="header-right">
            <nav className="nav">
              <a href="#" className="active">
                Home
              </a>
              <a href="#">Daftar PS</a>
              <a href="#">Kontak</a>
            </nav>
          </div>
        </div>
      </header>

      <header className="header">{/* header kamu */}</header>

      <section className="hero">
        <div className="hero-inner">
          <h2>
            PLAYBOX AWAKJEUT
            <br />
            Rental PS4
          </h2>

          <p>Main puas bareng teman. Unit terbatas, game lengkap, harga jelas.</p>

          <a href="#unit" className="hero-btn">
            Lihat Unit PS
          </a>
        </div>
      </section>

      <section id="unit" className="unit-section">
        <h2>Unit PS4 Tersedia</h2>
        <p className="subtitle">Pilih unit favoritmu dan langsung main</p>
        <div className="unit-grid">
          {PsUnits.map((ps) => (
            <div className="unit-card">
              <img src={ps.image} alt={ps.name} className="unit-img" />

              <h3>{ps.name}</h3>

              <span className={`status ${ps.status === 'available' ? 'ready' : 'busy'}`}>
                {ps.status === 'available' ? 'Tersedia' : 'Disewa'}
              </span>

              <p className="price">Rp {ps.price.toLocaleString()} / jam</p>

              <button className="detail-btn" onClick={() => setSelectedUnit(ps)}>
                Lihat Detail
              </button>

              {OpenDetail === ps.id && (
                <div className="detail-box">
                  <p>{ps.desc}</p>
                  <ul>
                    {ps.games.map((g, i) => (
                      <li key={i}>{g}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button disabled={ps.status !== 'available'} onClick={() => HandleWhatsApp(ps)}>
                Sewa Sekarang
              </button>
            </div>
          ))}
        </div>
      </section>
      {SelectedUnit && (
        <div className={`modal-overlay ${Closing ? 'fade-out' : ''}`} onClick={CloseModal}>
          <div
            className={`modal modal-animate ${Closing ? 'zoom-out' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={CloseModal}>
              ✕
            </button>

            <img src={SelectedUnit.image} alt={SelectedUnit.name} className="modal-img" />

            <h2>{SelectedUnit.name}</h2>

            <span className={`status ${SelectedUnit.status === 'available' ? 'ready' : 'busy'}`}>
              {SelectedUnit.status === 'available' ? 'Tersedia' : 'Sedang Disewa'}
            </span>

            <p className="price">Rp {SelectedUnit.price.toLocaleString()} / jam</p>

            <p>{SelectedUnit.desc}</p>

            <h4>Game tersedia:</h4>
            <ul>
              {SelectedUnit.games.map((g, i) => (
                <li key={i}>{g}</li>
              ))}
            </ul>

            <button
              className="modal-sewa"
              disabled={SelectedUnit.status !== 'available'}
              onClick={() => HandleWhatsApp(SelectedUnit)}
            >
              Sewa Sekarang
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
