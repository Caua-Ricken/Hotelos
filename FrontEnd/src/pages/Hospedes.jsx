import { useEffect, useState } from "react";
import ModalHospede from "../components/ModelHospede";
import DetalhesHospede from "../components/DetalhesHospede";
import "../public/cssPages/hospedes.css";

const Hospedes = () => {
  const [abrirModal, setAbrirModal] = useState(false);
  const [hospedes, setHospedes] = useState([]);


  const [detalhesHospede, setDetalhesHospede] = useState(false);
  const [hospedeSelecionado, setHospedeSelecionado] = useState(null);

  
    const buscarHospedes = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/hospedes");
        const data = await res.json();

        setHospedes(data);
      } catch (error) {
        console.error("Erro ao buscar hóspedes:", error);
      }
    };

    useEffect(() => {
        buscarHospedes();
    }, []);
 
  return (
    <>
      <div className="hospedes-card">
        <div className="hospedes-card-header">
          <h3>⦿ Hóspedes Ativos</h3>

          <div className="header-actions">
            <button
              className="btn-cadastrar"
              onClick={() => setAbrirModal(true)}
            >
              + Cadastrar Hóspede
            </button>

           
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Hóspede</th>
              <th>Quarto</th>
              <th>Check-in</th>
              <th>Checkout</th>
              <th>Tipo</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {hospedes.map((hospede) => (
              <tr key={hospede.id}>
                <td>
                  <div className="guest-info">
                    <div className="guest-avatar">
                      {hospede.nome
                        ?.split(" ")
                        .map((nome) => nome[0])
                        .join("")
                        .slice(0, 2)}
                    </div>

                    <strong>{hospede.nome}</strong>
                  </div>
                </td>

                <td>{hospede.quarto}</td>
                <td>{hospede.checkin}</td>
                <td>{hospede.checkout}</td>

                <td>
                  <span className="tag-tipo">{hospede.tipo}</span>
                </td>

                <td>
                  <span
                    className={
                      hospede.status === "Checkout Hoje"
                        ? "tag-status checkout"
                        : "tag-status ocupado"
                    }
                  >
                    {hospede.status}
                  </span>
                </td>

                <td>
                  <button className="btn-detalhes" onClick={() => {
                    setHospedeSelecionado(hospede);
                    setDetalhesHospede(true);
                  }
                  }>Detalhes</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalHospede open={abrirModal} onClose={() => setAbrirModal(false)} onHospedeCriado={buscarHospedes} />
      <DetalhesHospede open={detalhesHospede} hospede={hospedeSelecionado} onClose={() => setDetalhesHospede(false)} onHospedeExcluido={buscarHospedes} />

    </>
  );
};

export default Hospedes;