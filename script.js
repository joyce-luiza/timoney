/* --- Navigation Tabs */

const tabLinks = document.querySelectorAll(".tab__link");
const tabContents = document.querySelectorAll(".tab__content");

const onTabClick = (e) => {
  let activeTabs = document.querySelectorAll(".active");

  activeTabs.forEach((tab) => {
    tab.className = tab.className.replace("active", "");
  });

  e.target.parentElement.className += " active";
  document.getElementById(e.target.href.split("#")[1]).className += " active";
};

const navTab = document.getElementById("nav__tab");

navTab.addEventListener("click", onTabClick, false);

/* --- Despesas --- */

const btnAddDespesa = document.getElementById("btn--add--despesa");
const valorDespesa = document.getElementById("input__despesa--value");
const dataDespesa = document.getElementById("input__despesa--payment--date");
const categoriaDespesa = document.getElementById("input__despesa--category");
const descricaoDespesa = document.getElementById("input__despesa--description");
const tableDespesas = document.querySelector(".table--despesas");

let despesas = [];

// Renderizar tabela de despesas
const displayDespesa = (despesas) => {
  tableDespesas.innerHTML = "";
  despesas.forEach((despesa) => {
    let newRow = document.querySelector(".table--despesas").insertRow();
    newRow.innerHTML = `
          <td>R$ ${despesa.valor}</td>
          <td>${despesa.categoria}</td>
          <td>${despesa.data}</td>
          <td class="action__cell">
            <img class="despesa__edit action__icon" src="icons/pencil.svg"/>
            <img class="despesa__delete action__icon" src="icons/close.svg"/>
          </td>
          `;
  });
};

// Adicionar Despesa

btnAddDespesa.addEventListener("click", (e) => {
  e.preventDefault();
  let despesa = {
    valor: valorDespesa.value,
    categoria: categoriaDespesa.value,
    data: dataDespesa.value,
    descricao: descricaoDespesa.value,
  };
  despesas.push(despesa);

  displayDespesa(despesas);

  closeModal(modalNovaDespesa);
});

/* --- Modals --- */
const overlay = document.querySelector(".overlay");

// Despesas
const openNovaDespesa = document.getElementById("btn--despesa");
const closeNovaDespesa = document.getElementById("btn--close--despesa");
const modalNovaDespesa = document.querySelector(".modal--despesa");

// Receitas
const openNovaReceita = document.getElementById("btn--receita");
const closeNovaReceita = document.getElementById("btn--close--receita");
const modalNovaReceita = document.querySelector(".modal--receita");

const openModal = (modal) => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = (modal) => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

openNovaDespesa.addEventListener("click", () => openModal(modalNovaDespesa));
closeNovaDespesa.addEventListener("click", () => closeModal(modalNovaDespesa));

openNovaReceita.addEventListener("click", () => openModal(modalNovaReceita));
closeNovaReceita.addEventListener("click", () => closeModal(modalNovaReceita));
