
function allowDrop(event) {
    event.preventDefault();
}


function drag(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
}


function drop(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData("text/plain");
    const produtoDiv = document.getElementById(id);
    const nome = produtoDiv.querySelector('p:nth-child(2)').innerText.split(': ')[1];
    const valor = parseFloat(produtoDiv.querySelector('p:nth-child(3)').innerText.split(': ')[1].replace('R$', '').replace(',', '.'));
    const quantidade = parseInt(produtoDiv.querySelector('p:nth-child(4)').innerText.split(': ')[1]);

    adicionarProduto(nome, valor, quantidade);
}


function adicionarProduto(nome, valor, quantidade) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const produtoExistente = carrinho.find(produto => produto.nome === nome);
    
    if (produtoExistente) {
        produtoExistente.quantidade += quantidade;
    } else {
        carrinho.push({ nome, valor, quantidade });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
}


function removerProduto(nome) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho = carrinho.filter(produto => produto.nome !== nome);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
}


function exibirCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const listaProdutos = document.getElementById('lista-produtos');
    listaProdutos.innerHTML = '';

    if (carrinho.length > 0) {
        carrinho.forEach(produto => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${produto.nome} - Quantidade: ${produto.quantidade} - Valor: R$ ${(produto.valor * produto.quantidade).toFixed(2)}
                <button onclick="removerProduto('${produto.nome}')">Remover</button>
            `;
            listaProdutos.appendChild(li);
        });
    } else {
        listaProdutos.innerHTML = 'SEU CARRINHO ESTÁ VAZIO!';
    }
}

document.addEventListener('DOMContentLoaded', exibirCarrinho);
