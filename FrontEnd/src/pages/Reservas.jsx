import React, { useEffect, useState } from "react";
import ModalReserva from "../components/ModalReserva";
import "../public/cssPages/reservas.css";

const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const [abrirModal, setAbrirModal] = useState(false);

  useEffect(() => {
    buscarReservas();
  }, []);

  const buscarReservas = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/reservas");
      const data = await response.json();

      console.log("Reservas recebidas:", data);

      setReservas(data);
    } catch (error) {
      console.error("Erro ao buscar reservas:", error);
    }
  };

  const alterarStatus = async (id, status) => {
  try {
    await fetch(`http://localhost:3000/api/reservas/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    buscarReservas();
  } catch (error) {
    console.error("Erro ao alterar status:", error);
  }
};

  return (
    <div className="reservas-page">
      <div className="reservas-header">
        <div>
          <h1>Reservas</h1>
          <p>Reservas confirmadas e pendentes</p>
        </div>

        <div className="header-actions">
          <span className="status-live">● AO VIVO</span>
        </div>
      </div>

      <div className="reservas-card">
        <div className="card-header">
          <h2>Reservas Futuras</h2>

          <button
            className="btn-nova-reserva"
            onClick={() => setAbrirModal(true)}
          >
            + Nova Reserva
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Hóspede</th>
              <th>Quarto</th>
              <th>Entrada</th>
              <th>Saída</th>
              <th>Noites</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {reservas.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  Nenhuma reserva cadastrada
                </td>
              </tr>
            ) : (
              reservas.map((reserva) => (
                <tr key={reserva.id}>
                  <td>
                    <div className="hospede-info">
                      <div className="avatar">
                        {reserva.hospede?.nome ? `H${reserva.hospedeId}` : "HP"}
                      </div>

                      <span>
                        {reserva.hospede?.nome
                          ? `Hóspede: ${reserva.hospede.nome}`
                          : "Hóspede não informado"}
                      </span>
                    </div>
                  </td>

                  <td>
                    {reserva.quarto?.numero
                      ? `Quarto ${reserva.quarto.numero}`
                      : reserva.quartoId
                      ? `Quarto #${reserva.quartoId}`
                      : "Quarto não informado"}
                  </td>

                      <td>{reserva.dataEntrada}</td>
                      <td>{reserva.dataSaida}</td>
                      <td>{reserva.numNoites}</td>
                      <td>R$ {reserva.valorTotal || reserva.total}</td>

                      <td>
                          <select
                              className={`select-status ${reserva.status}`}
                              value={reserva.status || "pendente"}
                              onChange={(e) =>
                                  alterarStatus(reserva.id, e.target.value)
                              }
                          >
                              <option value="pendente">Pendente</option>
                              <option value="confirmada">Confirmada</option>
                              <option value="cancelada">Cancelada</option>
                          </select>
                      </td>
                  </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ModalReserva
        open={abrirModal}
        onClose={() => setAbrirModal(false)}
        onReservaCadastrada={buscarReservas}
      />
    </div>
  );
};

export default Reservas;