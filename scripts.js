$(document).ready(function(){
    $('#input3').inputmask("999-99-999-9999-9"); 
});

const exemplos = [
    { autor: "J.K. Rowling", titulo: "Harry Potter e a Pedra Filosofal", isbn: "978-85-325-2044-3" },
    { autor: "George Orwell", titulo: "1984", isbn: "978-04-515-2493-5" },
    { autor: "Harper Lee", titulo: "O Sol é Para Todos", isbn: "978-00-611-2008-4" },
    { autor: "J.R.R. Tolkien", titulo: "O Senhor dos Anéis", isbn: "978-02-611-0238-5" }
];

function limparFormulario() {
    document.getElementById('consultaForm').reset();
    document.getElementById('btnCancelar').hidden = true;
    document.getElementById('btnLimpar').style.display = 'none';
    document.getElementById('barraProgresso').style.display = 'none';
    document.getElementById('mensagemBusca').style.display = 'none';
    document.getElementById('exemplos').style.display = 'block'; 
}

function mostrarAjuda() {
    mostrarAlertaPersonalizado("Utilize o formulário para buscar publicações pelo autor, título ou ISBN. Preencha um dos campos e clique em Buscar.");
}

function cancelarConsulta() {
    limparFormulario();
    mostrarAlertaPersonalizado("Busca cancelada.(Tempo excedido)");
}

function buscar() {
    const inputs = document.querySelectorAll('input[type="text"]');
    let preenchido = false;
    let isbnValido = true;

    const autor = document.getElementById('input1').value.trim();
    const titulo = document.getElementById('input2').value.trim();
    const isbn = document.getElementById('input3').value.trim();

    inputs.forEach(input => {
        if (input.value.trim() !== "") {
            preenchido = true;
        }
    });

    if (isbn && !/^\d{3}-\d{2}-\d{3}-\d{4}-\d{1}$/.test(isbn)) {
        isbnValido = false;
        mostrarAlertaPersonalizado("O ISBN deve seguir o formato 999-99-999-9999-9.");
        return;
    }

    if (!preenchido) {
        mostrarAlertaPersonalizado("Por favor, preencha pelo menos um campo antes de buscar.");
        return;
    }

    if (!isbnValido) {
        return;
    }

    const resultado = exemplos.find(exemplo => {
        return (exemplo.autor === autor || exemplo.titulo === titulo || exemplo.isbn === isbn);
    });

    if (resultado) {
        mostrarAlertaPersonalizado(`Encontrado: ${resultado.autor} - ${resultado.titulo} (ISBN: ${resultado.isbn})`);
        document.getElementById('btnCancelar').hidden = true;
        return;
    }

    document.getElementById('barraProgresso').style.display = 'block';
    document.getElementById('mensagemBusca').style.display = 'block';
    const progresso = document.getElementById('progresso');
    let width = 0;
    const intervalo = setInterval(() => {
        if (width >= 100) {
            clearInterval(intervalo);
            document.getElementById('mensagemBusca').style.display = 'none';
            mostrarAlertaPersonalizado("A busca foi cancelada por não retornar resultados em 5 segundos.");
            cancelarConsulta();
        } else {
            width += 10;
            progresso.style.width = width + '%';
            progresso.textContent = width + '%';
        }
    }, 500);

    setTimeout(() => {
        if (width < 100) {
            clearInterval(intervalo);
            document.getElementById('mensagemBusca').style.display = 'none';
            mostrarAlertaPersonalizado("A busca foi cancelada por não retornar resultados em 5 segundos.");
            cancelarConsulta();
        }
    }, 5000);

    document.getElementById('btnCancelar').hidden = false;

}

function verificarFormulario() {
    const inputs = document.querySelectorAll('input[type="text"]');
    let preenchido = false;

    inputs.forEach(input => {
        if (input.value.trim() !== "") {
            preenchido = true;
        }
    });

    document.getElementById('btnLimpar').style.display = preenchido ? 'inline-block' : 'none';
}

function mostrarAlertaPersonalizado(mensagem) {
    document.getElementById('customAlertMessage').textContent = mensagem;
    document.getElementById('customAlert').style.display = 'flex';
}

function fecharAlertaPersonalizado() {
    document.getElementById('customAlert').style.display = 'none';
}