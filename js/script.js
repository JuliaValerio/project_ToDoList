const inputTarefa = document.getElementById('tarefa');
const btnAdd = document.getElementById('btn_add');
const btnRemove = document.getElementById('btn_remove');
let ulTarefas = document.getElementById('lista_tarefa');
const btnAll = document.getElementById('btn_all');

/********************************************************************************
 *                                EventListners                                  *
 ********************************************************************************/
//botao adicionar, quando clica adiciona tarefa.
btnAdd.addEventListener('click', function () {

    inputTexto = inputTarefa.value.trim();
    if (inputTexto == '') {
        alert("Por favor digite uma tarefa!");
    } else {
        criaLI();
        inputTarefa.value = '';
    }



});

//Evento no clique dos filhos da UL
ulTarefas.addEventListener('click', function (event) {

    //concluir tarefa quando clica em sobre o texto;
    let alvo = event.target.tagName;

    switch (alvo) {
        //Caso clique no texto marca ou desmarca como concluida a tarefa.
        case 'SPAN':
            concluiTarefa(event.target);
            break;

            //Caso clique no botão exclui Tarefa
        case 'BUTTON':
            let li = event.target.parentNode;
            closeTarefa(li);
            break;

        default:
            break;
    }
});
//evento no botao Marcar Todos
btnAll.addEventListener('click', function () {

    marcarTodos(ulTarefas);

});
//evento no botao para apagar Todos
btn_remove.addEventListener('click', function () {
    ulTarefas.innerHTML = "";
});





/********************************************************************************
 *                                Funcões                                       *
 ********************************************************************************/

// Cria um novo item da lista ao clicar no botão "Adicionar"
function criaLI() {
    let novaLi = document.createElement('li');
    let botao = document.createElement('button');
    let texto = document.createElement('span');

    botao.setAttribute("id", "botao");
    texto.textContent = inputTarefa.value;
    botao.textContent = 'X';

    novaLi.appendChild(texto);
    novaLi.appendChild(botao);
    ulTarefas.appendChild(novaLi);
    botao.classList.add('btn_exit');
    novaLi.classList.add('tarefa');
    novaLi.setAttribute('draggable', 'true');
    novaLi.setAttribute('ondragstart', 'drag(event)');
    novaLi.setAttribute('id', inputTarefa.value);

}

//Remover o item da atual
function closeTarefa(li) {

    li.remove();

}

// Marca tarefa como concluida, caso esteja concluido desmarca a tarefa.
function concluiTarefa(span) {
    span.classList.toggle('riscado');
    let listaTarefas =Array.from(document.getElementsByTagName('SPAN'));
    //mudar o botao para desmarcar todas
    let todosMarcados = listaTarefas.every(function(tarefa) {
        return tarefa.classList.contains('riscado');
    });
    if (todosMarcados){
        btnAll.innerHTML = "Desmarcar todos";
    }else if(!todosMarcados){
        btnAll.innerHTML = "Marcar todos";
    }


}


//marca todas as tarefas como concluida
function marcarTodos() {
    let listaTarefas =Array.from(document.getElementsByTagName('SPAN'));
    console.log(btnAll.innerHTML);
    //marca todos
    if (btnAll.innerHTML=='Marcar todos'){
        for (i = 0; i < listaTarefas.length; i++) {
            tarefa = listaTarefas[i];
            if (!tarefa.classList.contains('riscado')) {
                concluiTarefa(tarefa);
            }
        } 
    }
    else {
        //desmarca todos
        for (i = 0; i < listaTarefas.length; i++) {
            tarefa = listaTarefas[i];
            if (tarefa.classList.contains('riscado')) {
                concluiTarefa(tarefa);
            }
        } 
    }


}



function drag(ev) {
    ev.dataTransfer.setData("id", ev.target.id);

}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("id");
    const node = ev.target.closest("LI");
    ulTarefas.insertBefore(document.getElementById(data), node);
}