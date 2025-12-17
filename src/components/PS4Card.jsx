const PS4Card = ({ unit, onSelect }) => {
  return (
    <div
      className={`ps4-card ${!unit.available ? 'disabled' : ''}`}
      onClick={() => unit.available && onSelect(unit)}
    >
      <h3>{unit.name}</h3>
      <p className="game">🎮 {unit.game}</p>
      <p className="price">Rp{unit.price.toLocaleString()} / hari</p>

      <span className={`badge ${unit.available ? 'available' : 'rented'}`}>
        {unit.available ? 'Tersedia' : 'Sedang Disewa'}
      </span>
    </div>
  );
};

export default PS4Card;
