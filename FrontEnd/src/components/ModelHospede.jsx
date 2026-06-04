import React from 'react'
import '../public/cssComponent/modelHospede.css'

const ModalHospede = ({ open, onClose, onHospedeCriado }) => {
    const [nome, setNome] = React.useState("");
    const [cpf, setCpf] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [telefone, setTelefone] = React.useState("");
    const [nacionalidade, setNacionalidade] = React.useState("");

    if(!open) {
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:3000/api/hospedes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome,
                cpf,
                email,
                telefone,
                nacionalidade
            })
        });

        if (res.ok) {
            const novoHospede = await res.json();
            console.log("Hóspede cadastrado com sucesso:", novoHospede);
            await onHospedeCriado();
            onClose();
        } else {
            console.error("Erro ao cadastrar hóspede");
        }
    }

  return (
     <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Cadastrar Hóspede</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />

          <input
            type="text"
            placeholder="Nacionalidade"
            value={nacionalidade}
            onChange={(e) => setNacionalidade(e.target.value)}
          />

          <div className="modal-actions">
            <button
              type="button"
              className="cancel"
              onClick={onClose}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="save"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalHospede
