import React, { useEffect, useState } from "react";
import "../public/cssComponent/modalReserva.css";

const ModalReserva = ({ open, onClose, onReservaCadastrada }) => {
  const [hospedes, setHospedes] = useState([]);
  const [quartosLivres, setQuartosLivres] = useState([]);

  const [form, setForm] = useState({
    dataEntrada: "",
    dataSaida: "",
    numNoites: "",
    valorTotal: "",
    formaPagamento: "",
    status: "pendente",
    observacoes: "",
    hospedeId: "",
    quartoId: "",
  });

  useEffect(() => {
    if (open) {
      buscarHospedes();
      buscarQuartosLivres();
    }
  }, [open]);

  useEffect(() => {
    if (form.dataEntrada && form.dataSaida) {
      const entrada = new Date(form.dataEntrada);
      const saida = new Date(form.dataSaida);

      const diferenca = saida - entrada;
      const noites = diferenca / (1000 * 60 * 60 * 24);

      setForm((prev) => ({
        ...prev,
        numNoites: noites > 0 ? noites : "",
      }));
    }
  }, [form.dataEntrada, form.dataSaida]);

  const buscarHospedes = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/hospedes");
      const data = await response.json();
      setHospedes(data);
    } catch (error) {
      console.error("Erro ao buscar hóspedes:", error);
    }
  };

  const buscarQuartosLivres = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/quartos");
      const data = await response.json();
  
          console.log("Quartos recebidos:", data);
     setQuartosLivres(data);
    } catch (error) {
      console.error("Erro ao buscar quartos:", error);
    }
  };

  const handleQuartoChange = (e) => {
  const quartoId = e.target.value;

  const quartoSelecionado = quartosLivres.find(
    (quarto) => String(quarto.id) === String(quartoId)
  );

  setForm((prev) => ({
    ...prev,
    quartoId: quartoId,
    valorTotal: quartoSelecionado ? quartoSelecionado.diaria : "",
  }));
};

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const cadastrarReserva = async (e) => {
    e.preventDefault();

    if (!form.numNoites) {
      alert("A data de saída precisa ser maior que a data de entrada.");
      return;
    }

    try {
      await fetch("http://localhost:3000/api/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      onReservaCadastrada();
      onClose();
    } catch (error) {
      console.error("Erro ao cadastrar reserva:", error);
    }
  };

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-reserva" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Nova Reserva</h2>
          <button onClick={onClose}>×</button>
        </div>

        <form onSubmit={cadastrarReserva}>
          <div className="form-grid">
            <div className="form-group">
              <label>Hóspede</label>
              <select
                name="hospedeId"
                value={form.hospedeId}
                onChange={handleChange}
                required
              >
                <option value="">Selecione o hóspede</option>

                {hospedes.map((hospede) => (
                  <option key={hospede.id} value={hospede.id}>
                    {hospede.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Quarto livre</label>
              <select
                name="quartoId"
                value={form.quartoId}
                onChange={handleQuartoChange}
                required
              >
                <option value="">Selecione o quarto</option>

                {quartosLivres.map((quarto) => (
                  <option key={quarto.id} value={quarto.id}>
                    Quarto {quarto.numero}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Data de entrada</label>
              <input
                type="date"
                name="dataEntrada"
                value={form.dataEntrada}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Data de saída</label>
              <input
                type="date"
                name="dataSaida"
                value={form.dataSaida}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Número de noites</label>
              <input
                type="number"
                name="numNoites"
                value={form.numNoites}
                readOnly
              />
            </div>

            <div className="form-group">
              <label>Valor total</label>
              <input
                type="number"
                name="valorTotal"
                value={form.valorTotal}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Forma de pagamento</label>
              <select
                name="formaPagamento"
                value={form.formaPagamento}
                onChange={handleChange}
                required
              >
                <option value="">Selecione</option>
                <option value="pix">Pix</option>
                <option value="cartao">Cartão</option>
                <option value="dinheiro">Dinheiro</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="pendente">Pendente</option>
                <option value="confirmada">Confirmada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>
          </div>

          <div className="form-group full">
            <label>Observações</label>
            <textarea
              name="observacoes"
              value={form.observacoes}
              onChange={handleChange}
              placeholder="Observações da reserva..."
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancelar" onClick={onClose}>
              Cancelar
            </button>

            <button type="submit" className="btn-salvar">
              Salvar Reserva
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalReserva;