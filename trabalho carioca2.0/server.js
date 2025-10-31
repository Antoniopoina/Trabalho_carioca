// Array para simular o banco de dados (BD temporário)
let pacientes = [
    { id: 1, nome: "Ana Silva", cpf: "111.222.333-44", idade: 25 },
    { id: 2, nome: "Bruno Costa", cpf: "555.666.777-88", idade: 40 }
];
let proximoId = 3;

const form = document.getElementById('cadastroForm');
const tabelaBody = document.getElementById('pacientesTableBody');

// --- RENDER (Read) ---
function renderizarPacientes() {
    tabelaBody.innerHTML = '';
    
    if (pacientes.length === 0) {
        tabelaBody.innerHTML = `<tr><td colspan="4" style="text-align: center;">Nenhum paciente cadastrado.</td></tr>`;
        return;
    }

    pacientes.forEach(paciente => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${paciente.nome}</td>
            <td>${paciente.cpf}</td>
            <td>${paciente.idade}</td>
            <td>
                <button class="acao-btn editar-btn" data-id="${paciente.id}">Editar</button>
                <button class="acao-btn excluir-btn" data-id="${paciente.id}">Excluir</button>
            </td>
        `;
        tabelaBody.appendChild(tr);
    });
}

// --- CREATE/UPDATE ---
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const id = document.getElementById('pacienteId').value;
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const idade = parseInt(document.getElementById('idade').value);

    if (id) {
        // Lógica de UPDATE
        const index = pacientes.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
            pacientes[index] = { id: parseInt(id), nome, cpf, idade };
        }
    } else {
        // Lógica de CREATE
        const novoPaciente = {
            id: proximoId++,
            nome,
            cpf,
            idade
        };
        pacientes.push(novoPaciente);
    }

    form.reset();
    document.getElementById('pacienteId').value = '';
    document.getElementById('concluirBtn').innerText = 'CONCLUIR';
    renderizarPacientes();
});

// --- DELETE, UPDATE (seleção) ---
tabelaBody.addEventListener('click', function(event) {
    const target = event.target;
    const pacienteId = parseInt(target.getAttribute('data-id'));

    if (target.classList.contains('excluir-btn')) {
        // Lógica de DELETE
        excluirPaciente(pacienteId);
    } else if (target.classList.contains('editar-btn')) {
        // Lógica para carregar os dados no formulário para edição
        carregarParaEdicao(pacienteId);
    }
});

function excluirPaciente(id) {
    if (confirm("Tem certeza que deseja excluir este paciente?")) {
        pacientes = pacientes.filter(p => p.id !== id);
        renderizarPacientes();
    }
}

function carregarParaEdicao(id) {
    const paciente = pacientes.find(p => p.id === id);
    if (paciente) {
        document.getElementById('pacienteId').value = paciente.id;
        document.getElementById('nome').value = paciente.nome;
        document.getElementById('cpf').value = paciente.cpf;
        document.getElementById('idade').value = paciente.idade;
        document.getElementById('concluirBtn').innerText = 'SALVAR EDIÇÃO';
    }
}

// Inicializa a tabela ao carregar a página
document.addEventListener('DOMContentLoaded', renderizarPacientes);