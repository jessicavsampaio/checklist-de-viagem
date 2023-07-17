const form = document.querySelector("#novoItem");
const list = document.querySelector("#lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((element) => {
    criaElemento(element);
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements["nome"];
    const quantidade = evento.target.elements["quantidade"];
    const existe = itens.find(elemento => elemento.nome === nome.value);
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    };

    if (existe) {
        itemAtual.id = existe.id;

        atualizaElemento(itemAtual);

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;
        criaElemento(itemAtual);
        itens.push(itemAtual);
    }
    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = "";
    quantidade.value = "";
})

function criaElemento(item) {
    const newLi = document.createElement("li");
    const newStrong = document.createElement("strong");

    
    newLi.appendChild(botaoConcluido());
    newLi.classList.add("item");
    newStrong.innerHTML = item.quantidade;
    newStrong.dataset.id = item.id;
    newLi.appendChild(newStrong);
    newLi.innerHTML += item.nome;

    newLi.appendChild(botaoDeleta(item.id));
    list.appendChild(newLi);
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "x";
    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id);
    })

    return elementoBotao;
}

function deletaElemento(tag, id) {
    tag.remove();
    itens.splice(itens.findIndex( elemento => elemento.id === id ), 1);

    localStorage.setItem("itens", JSON.stringify(itens));
}

function botaoConcluido() {
    const elementoCheckbox = document.createElement("input");
    elementoCheckbox.type = "checkbox";

    return elementoCheckbox;
}