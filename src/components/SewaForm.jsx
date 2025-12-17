import { useState } from 'react';
import Swal from 'sweetalert2';

const SewaForm = ({ unit, onConfirm }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // HITUNG TOTAL LANGSUNG (TANPA useEffect)
  let totalPrice = 0;

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end >= start) {
      const diffTime = end - start;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      totalPrice = diffDays * unit.price;
    }
  }

  const handleConfirm = () => {
    if (totalPrice <= 0) {
      Swal.fire('Error', 'Tanggal tidak valid!', 'error');
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Sewa Berhasil!',
      html: `
        <p><b>Unit:</b> ${unit.name}</p>
        <p><b>Game:</b> ${unit.game}</p>
        <p><b>Total:</b> Rp${totalPrice.toLocaleString()}</p>
      `
    }).then(() => {
      onConfirm(unit.id);
    });
  };

  return (
    <div className="sewa-section">
      <h2>Sewa {unit.name}</h2>
      <p>Game Bawaan: {unit.game}</p>
      <p>Harga per Hari: Rp{unit.price.toLocaleString()}</p>

      <label>Tanggal Mulai:</label>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

      <label>Tanggal Selesai:</label>
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

      <p>
        <b>Total Harga:</b> Rp{totalPrice.toLocaleString()}
      </p>

      <button className="btn" onClick={handleConfirm}>
        Konfirmasi Sewa
      </button>
    </div>
  );
};

export default SewaForm;
