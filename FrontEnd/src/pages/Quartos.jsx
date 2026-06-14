import React, { useEffect, useState } from "react";
import "../public/cssPages/quartos.css";

const Quartos = () => {
  const [quartos, setQuartos] = useState([]);

  useEffect(() => {
    buscarQuartos();
  }, []);

  const buscarQuartos = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/quartos/todos");
      const data = await response.json();
      setQuartos(data);
    } catch (error) {
      console.error("Erro ao buscar quartos:", error);
    }
  };

  const corStatus = (status) => {
    switch (status) {
      case "Disponível":
        return "quarto-livre";
      case "Ocupado":
        return "quarto-ocupado";
      case "Limpeza":
        return "quarto-limpeza";
      case "Reservado":
        return "quarto-reservado";
      default:
        return "quarto-livre";
    }
  };

  const quartosPorAndar = quartos.reduce((acc, quarto) => {
    if (!acc[quarto.andar]) {
      acc[quarto.andar] = [];
    }

    acc[quarto.andar].push(quarto);
    return acc;
  }, {});

  return (
    <div className="quartos-page">
      <div className="quartos-header">
        <div>
          <h1>Quartos</h1>
          <p>Mapa de status em tempo real</p>
        </div>

        <button className="btn-checkin">+ Check-in Rápido</button>
      </div>

      <section className="mapa-card">
        <div className="mapa-topo">
          <h2>▦ Mapa de Quartos</h2>

          <div className="legenda">
            <span className="legenda-item livre">Livre</span>
            <span className="legenda-item ocupado">Ocupado</span>
            <span className="legenda-item limpeza">Limpeza</span>
            <span className="legenda-item reservado">Reservado</span>
          </div>
        </div>

        {Object.keys(quartosPorAndar).map((andar) => (
          <div className="andar-bloco" key={andar}>
            <h3>ANDAR {andar}</h3>

            <div className="quartos-grid">
              {quartosPorAndar[andar].map((quarto) => (
                <div
                  key={quarto.id}
                  className={`quarto-card ${corStatus(quarto.status)}`}
                >
                  <strong>{quarto.numero}</strong>
                  <span>{quarto.tipo}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Quartos;