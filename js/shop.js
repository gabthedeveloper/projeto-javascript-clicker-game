// Variaveis do Shop
const shop = document.querySelector('#shop');
const setaVoltar = document.querySelector('#shop .voltar-shop');

// Variaveis do Menu Shop
const menuShop = document.querySelector('.menu-shop');
const menuShopOpcoes = document.querySelectorAll('.menu-shop li');
const menuShopMesoPlayer = document.querySelector('#shop .meso');
let menuSelected;

// Variaveis dos itens do Menu Shop
const itemShop = document.querySelector('.item-shop');
const descriptionItemElement = document.querySelector('.item-shop-descricao')
const selectedItens = document.querySelectorAll('.item-shop-exibir li');
const filterItens = document.querySelector('.item-shop-filter');
const filterTab = new Set(itens.map(arrayItens => arrayItens.id));

let arrayItem = 0;


/** FUNÇÕES USADAS DENTRO DE OUTRAS FUNÇÕES */

// Exibe a tela inicial do shop e reseta o filtro de itens - Usada nas funções windowShop() e returnShop();
function inicialShopScreen() {
  setaVoltar.classList.add('desativado');
  itemShop.classList.add('desativado');
  menuShopMesoPlayer.classList.add('desativado');
  menuShop.classList.remove('desativado');

  selectedItens.forEach((item) => {
    if(!item.classList.contains('nofilter')) {
      item.classList.add('nofilter')
    }
  })
}

// Mostra o item selecionado - Usado na função itemDescription()
function displaySelectedItem(action) {
  if(action === "remove") {
    selectedItens[arrayItem].children[1].classList.remove('selected');
    selectedItens[arrayItem].children[2].classList.remove('selected');
  } else if(action === "add") {
    selectedItens[arrayItem].children[1].classList.add('selected');
    selectedItens[arrayItem].children[2].classList.add('selected');
  }
}

// Exibe a descrição do item - Usada na função itemDescription()
function descriptionItem(item) {
  descriptionItemElement.innerHTML = `<span>${item.name}</span>
                              <span>${item.attribute[1]}: ${item.attribute[0]}</span>
                              <span>Level: ${item.level}</span>
                              <span>Price: ${item.price} mesos</span>
                              <img src=${item.img} alt="">
                              <button onclick="buyItem()">COMPRAR</button>`
}


/** FUNÇÕES PRINCIPAIS */

// Abre e fecha a janela do shop
function windowShop() {
  shop.classList.toggle('desativado');

  if(menuShop.classList.contains('desativado')) {
    inicialShopScreen();
    }
}

// Voltar para a janela inicial do shop 
function returnShop() {
  inicialShopScreen();
}

// Ação ao selecionar o tipo de item no shop
function selectMenu(event) {
  menuShop.classList.add('desativado'); 
  itemShop.classList.remove('desativado');
  menuSelected = event.currentTarget.getAttribute('id');
  descriptionItem(itens[0]);

  // Adiciona as tabs de filtro de acordo com o tipo do item
  filterItens.innerHTML = `<li class="all checked">All</li>`;
  filterTab.forEach((type) => {
    const arrayType = type.split('_');
    if(arrayType[0] === menuSelected) {
      filterItens.innerHTML += `<li class="${arrayType[1]}">${arrayType[1]}</li>`;
    }
  })


  // Exibe os itens de acordo com o tipo de item selecionado 
  itens.forEach((tipoItem, index) => {
    if(tipoItem.id.includes(menuSelected)) {
      selectedItens[index].classList.remove('nofilter')
    }
  });

  // Filtrar os itens
  const listFilterItens = document.querySelectorAll('.item-shop-filter li')


  function filter(event) {

  selectedItens.forEach((item) => {
    if(!item.classList.contains('nofilter')) {
      item.classList.add('nofilter')
    }
  })

    const classFilter = event.currentTarget.getAttribute('class');
    event.currentTarget.classList.add('checked');


    itens.forEach((tipoItem, index) => {
      if(classFilter.includes(tipoItem.type)) {
        selectedItens[index].classList.remove('nofilter')
      } else if(classFilter.includes('all') && tipoItem.id.includes(menuSelected)) {
        selectedItens[index].classList.remove('nofilter')
      }
    });
    
  }
  
  listFilterItens.forEach((tab) => {
    tab.addEventListener('click', filter)
  })

  // Ativar elementos
  setaVoltar.classList.remove('desativado');
  menuShopMesoPlayer.classList.remove('desativado');
}

menuShopOpcoes.forEach((menu) => {
  menu.addEventListener('click', selectMenu)
})

// Ação para filtrar os itens

// Mostra a descrição dos item quando selecionado
function itemDescription(event) {
  displaySelectedItem("remove")

  arrayItem = event.currentTarget.getAttribute('id')
  descriptionItem(itens[arrayItem])
  displaySelectedItem("add")
}

selectedItens.forEach((item) => {
  item.addEventListener('click', itemDescription)
})

// Comprar item
function buyItem() {

  if(player.meso >= itens[arrayItem].price){
    player.meso -= itens[arrayItem].price
    hud.atualizar();
    bagInventory[emptySlot()].innerHTML = `<img class="${arrayItem}" src=${itens[arrayItem].img}>`;
  }
}
