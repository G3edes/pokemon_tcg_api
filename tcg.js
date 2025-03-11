'use strict'

async function pesquisarFotos(card) {
    let pokemontcg = String(card).toLocaleLowerCase()
    const url = `https://api.codetabs.com/v1/proxy/?quest=api.pokemontcg.io/v2/cards?q=name:${pokemontcg}`
    const response = await fetch(url)
    const data = await response.json()
    return data.data
}

function criarImagem(carta) {
    const galeria = document.getElementById('galeria')
    const novocard= document.createElement('div')
    novocard.classList.add('card')
    const novaImg = document.createElement('img')
    novaImg.src = `https://api.codetabs.com/v1/proxy/?quest=${carta.images.small}`
    novaImg.alt = carta.name; 
    novocard.appendChild(novaImg)
    galeria.appendChild(novocard)
}

async function preencherFotos() {
    const card = document.getElementById('pokemon').value
    const fotos = await pesquisarFotos(card)
    const galeria = document.getElementById('galeria')
    galeria.replaceChildren() 
    if (fotos && fotos.length > 0) {
        fotos.forEach(criarImagem)
    } else {
        galeria.innerHTML = '<p>Card não encontrado!</p>'
    }
}
document.getElementById('pesquisar').addEventListener('click', preencherFotos)
