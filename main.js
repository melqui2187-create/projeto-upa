// ==============================
// INICIALIZAÇÃO
// ==============================

// Assim que o site carrega, essa função é chamada
// Ela vai mostrar todos os pacientes já salvos
mostrarFila();


// ==============================
// FUNÇÃO: PEGAR PACIENTES
// ==============================

function pegarPacientes() {

    // Pega do localStorage os dados salvos com a chave "pacientes"
    let pacientes = localStorage.getItem("pacientes");

    // Se existir algo salvo, converte de JSON para array
    // Se não existir, retorna um array vazio
    return pacientes ? JSON.parse(pacientes) : [];
}


// ==============================
// FUNÇÃO: SALVAR PACIENTES
// ==============================

function salvarPacientes(lista) {

    // Converte a lista de pacientes (array) para JSON
    // e salva no localStorage com a chave "pacientes"
    localStorage.setItem("pacientes", JSON.stringify(lista));
}


// ==============================
// FUNÇÃO: ORDENAR POR PRIORIDADE
// ==============================

function ordenarPacientes(lista) {

    // Define a ordem de prioridade (triagem)
    // Quanto menor o número, maior a prioridade
    const ordem = {
        "Vermelha": 0, // mais urgente
        "Amarela": 1,
        "Verde": 2     // menos urgente
    };

    // Ordena o array baseado nessa prioridade
    return lista.sort((a, b) => ordem[a.prioridade] - ordem[b.prioridade]);
}


// ==============================
// FUNÇÃO: CADASTRAR PACIENTE
// ==============================

function cadastrarPaciente() {

    // Pega os valores digitados no formulário
    let nome = document.getElementById("nome").value;
    let idade = document.getElementById("idade").value;
    let sintoma = document.getElementById("sintoma").value;
    let prioridade = document.getElementById("prioridade").value;

    // Verifica se algum campo está vazio
    if (!nome || !idade || !sintoma || !prioridade) {
        alert("Preencha todos os campos!");
        return; // Para a execução
    }

    // Pega a lista atual de pacientes
    let pacientes = pegarPacientes();

    // Cria um objeto com os dados do paciente
    let paciente = {
        nome,
        idade,
        sintoma,
        prioridade
    };

    // Adiciona o novo paciente na lista
    pacientes.push(paciente);

    // Salva a lista atualizada no localStorage
    salvarPacientes(pacientes);

    // Limpa os campos do formulário
    limparCampos();

    // Atualiza a tela mostrando a fila
    mostrarFila();
}


// ==============================
// FUNÇÃO: MOSTRAR FILA
// ==============================

function mostrarFila() {

    // Pega os pacientes salvos
    let pacientes = pegarPacientes();

    // Ordena por prioridade antes de mostrar
    pacientes = ordenarPacientes(pacientes);

    // Pega os elementos HTML onde será exibido
    let fila = document.getElementById("fila");
    let total = document.getElementById("total");

    // Limpa o conteúdo atual da fila
    fila.innerHTML = "";

    // Mostra o total de pacientes
    total.textContent = pacientes.length;

    // Percorre todos os pacientes
    pacientes.forEach((p, index) => {

        // Define a cor da prioridade
        let cor = {
            "Vermelha": "red",
            "Amarela": "orange",
            "Verde": "green"
        }[p.prioridade];

        // Adiciona o paciente na tela (HTML dinâmico)
        fila.innerHTML += `
        <div style="border-left: 5px solid ${cor}; margin:10px; padding:10px;">
            <p><strong>${p.nome}</strong> (${p.idade} anos)</p>
            <p>${p.sintoma}</p>
            <p>${p.prioridade}</p>
            <button onclick="removerPaciente(${index})">Remover</button>
        </div>
        `;
    });
}


// ==============================
// FUNÇÃO: REMOVER PACIENTE
// ==============================

function removerPaciente(index) {

    // Pega a lista atual
    let pacientes = pegarPacientes();

    // Remove o paciente pelo índice (posição no array)
    pacientes.splice(index, 1);

    // Salva a lista atualizada
    salvarPacientes(pacientes);

    // Atualiza a tela
    mostrarFila();
}


// ==============================
// FUNÇÃO: CHAMAR PRÓXIMO
// ==============================

function chamarProximo() {

    // Pega a lista de pacientes
    let pacientes = pegarPacientes();

    // Se não tiver ninguém na fila
    if (pacientes.length === 0) {
        alert("Fila vazia!");
        return;
    }

    // Ordena por prioridade
    pacientes = ordenarPacientes(pacientes);

    // Remove o primeiro da fila (mais prioritário)
    let proximo = pacientes.shift();

    // Mostra quem está sendo chamado
    alert("Chamando: " + proximo.nome);

    // Salva a lista atualizada
    salvarPacientes(pacientes);

    // Atualiza a tela
    mostrarFila();
}


// ==============================
// FUNÇÃO: LIMPAR CAMPOS
// ==============================

function limparCampos() {

    // Reseta todos os inputs do formulário
    document.getElementById("nome").value = "";
    document.getElementById("idade").value = "";
    document.getElementById("sintoma").value = "";
    document.getElementById("prioridade").value = "";
}