import React from "react";
import "../public/cssComponent/detalhesHospede.css";

const DetalhesHospede = ({ open, hospede, onClose, onHospedeExcluido }) => {
  if (!open || !hospede) return null;

  const excluirHospede = async () => {

     const confirmar = window.confirm(
    `Deseja realmente excluir ${hospede.nome}?`
  );

  if (!confirmar) {
    return;
  }

    try {
      const res = await fetch(
        `http://localhost:3000/api/hospedes/${hospede.id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        console.error("Erro ao excluir hóspede");
        return;
      }

      await onHospedeExcluido();
      onClose();
    } catch (error) {
      console.error("Erro ao excluir hóspede:", error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="detalhes-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="detalhes-header">
          <div>
            <h2>Detalhes do Hóspede</h2>
            <span>Informações cadastrais</span>
          </div>

          <button className="btn-fechar" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="detalhes-avatar">
          {hospede.nome
            ?.split(" ")
            .map((nome) => nome[0])
            .join("")
            .slice(0, 2)}
        </div>

        <div className="detalhes-info">
          <p>
            <strong>Nome</strong>
            <span>{hospede.nome}</span>
          </p>

          <p>
            <strong>CPF</strong>
            <span>{hospede.cpf}</span>
          </p>

          <p>
            <strong>Email</strong>
            <span>{hospede.email}</span>
          </p>

          <p>
            <strong>Telefone</strong>
            <span>{hospede.telefone}</span>
          </p>

          <p>
            <strong>Nacionalidade</strong>
            <span>{hospede.nacionalidade}</span>
          </p>
        </div>

        <div className="detalhes-actions">
          <button className="btn-excluir" onClick={excluirHospede}>
            Excluir Hóspede
          </button>

          <button className="btn-editar" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetalhesHospede;