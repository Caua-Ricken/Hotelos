import React from 'react'
import '../public/cssComponent/modalQuarto.css'

const ModalQuarto = ({open, quarto, onClose}) => {
  if (!open) return null

  const reserva = quarto.reservas?.[0];
  const hospede = reserva?.hospede?.nome || "—";

  const status = quarto.status;

  const statusClass =
    status === "Disponivel"
      ? "livre"
      : status === "Ocupado"
      ? "ocupado"
      : "reservado";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-quarto" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Quarto {quarto.numero}</h2>
          <button onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div>
            <span>STATUS</span>
            <strong className={statusClass}>{status}</strong>
          </div>

          <div>
            <span>HÓSPEDE</span>
            <strong>{hospede}</strong>
          </div>

          <div>
            <span>ANDAR</span>
            <strong>{quarto.andar}º Andar</strong>
          </div>

          <div>
            <span>TIPO</span>
            <strong>{quarto.tipo}</strong>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-fechar" onClick={onClose}>
            Fechar
          </button>

          {status === "Disponivel" && (
            <button className="btn-checkin">
              ↓ Check-in
            </button>
          )}

          {status === "Ocupado" && (
            <button className="btn-checkout">
              ↑ Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ModalQuarto