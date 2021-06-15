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

/* --- Modals --- */

const mainDiv = document.querySelector(".app");

const modalTemplate = (name, action, title) => {
  const modal = `
  <div class="card modal modal--${action}--${name} hidden">
  <div class="card--title">
    <h2>${title} ${name}</h2>  
    <button id="btn--close--${name}" class="modal--close">&times;</button>
  </div>
    <form action="#" class="${action}__form">

      <div class="field">
        <label  for="value">Valor</label>
        <input id="input__${name}__${action}--value" class="input__${name}" type="number">
      </div>

      <div class="field">  
        <label for="payment__date">Data</label>
        <input id="input__${name}__${action}--payment--date" class="input__${name}" type="date">
      </div>

      <div class="field">
        <label for="category">Categoria</label>
        <select name="category" id="input__${name}__${action}--category">
          <option value="Alimentação">Alimentação</option>
          <option value="Educação">Educação</option>
          <option value="Eletrônicos">Eletrônicos</option>
          <option value="Lazer">Lazer</option>
          <option value="Saúde">Saúde</option>
          <option value="Serviços">Serviços</option>
          <option value="Supermercado">Supermercado</option>
          <option value="Transporte">Transporte</option>
          <option value="Vestuário">Vestuário</option>
          <option value="Viagem">Viagem</option>
        </select>
      </div>

      <div class="field">
        <label  for="description">Descrição</label>
        <input id="input__${name}__${action}--description" class="input__${name}" type="text">
      </div>
    </form>
    <a href=""><button id="btn--${action}--${name}" class="btn btn--default btn--${name}">${title} ${name}</button></a>
  </div>
  `;
  mainDiv.insertAdjacentHTML("beforeend", modal);
};

modalTemplate("despesa", "add", "Adicionar");
modalTemplate("despesa", "edit", "Editar");

const overlay = document.querySelector(".overlay");

// Despesas

const openAddDespesa = document.getElementById("btn--despesa");
const closeModalBtn = document.querySelectorAll(".modal--close");
const modalAddDespesa = document.querySelector(".modal--add--despesa");
const modalEditDespesa = document.querySelector(".modal--edit--despesa");

// Receitas
const openAddReceita = document.getElementById("btn--receita");
const closeAddReceita = document.getElementById("btn--close--receita");
const modalAddReceita = document.querySelector(".modal--receita");

const openModal = (modal) => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = (...modals) => {
  modals.forEach((modal) => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  });
};

openAddDespesa.addEventListener("click", () => openModal(modalAddDespesa));
closeModalBtn.forEach((btn) =>
  btn.addEventListener("click", () =>
    closeModal(modalAddDespesa, modalEditDespesa)
  )
);

openAddReceita.addEventListener("click", () => openModal(modalAddReceita));

/* --- Despesas --- */

// Add inputs
const btnAddDespesa = document.getElementById("btn--add--despesa");
const addValorDespesa = document.getElementById("input__despesa__add--value");
const addDataDespesa = document.getElementById(
  "input__despesa__add--payment--date"
);
const addCategoriaDespesa = document.getElementById(
  "input__despesa__add--category"
);
const addDescricaoDespesa = document.getElementById(
  "input__despesa__add--description"
);

// Edit inputs
const editValorDespesa = document.getElementById("input__despesa__edit--value");
const editDataDespesa = document.getElementById(
  "input__despesa__edit--payment--date"
);
const editCategoriaDespesa = document.getElementById(
  "input__despesa__edit--category"
);
const editDescricaoDespesa = document.getElementById(
  "input__despesa__edit--description"
);

const tableDespesas = document.querySelector(".table--despesas");

let despesas = [];

// Renderizar tabela de despesas
const displayDespesa = (despesas) => {
  tableDespesas.innerHTML = "";
  tableDespesas.innerHTML = `              
    <tr>
      <th>Valor</th>
      <th>Categoria</th>
      <th>Data</th>
      <th>Ações</th>
    </tr>
    `;

  despesas.forEach((despesa, i) => {
    let newRow = document.querySelector(".table--despesas").insertRow();
    newRow.innerHTML = `
            <td class="despesa--${i}" >R$ ${despesa.valor}</td>
            <td class="despesa--${i}">${despesa.categoria}</td>
            <td class="despesa--${i}">${despesa.data}</td>
            <td class="action__cell despesa--${i}">
              <img class="despesa__edit action__icon" src="icons/pencil.svg"/>
              <img class="despesa__delete action__icon" src="icons/close.svg"/>
            </td>
            `;
  });
  deleteDespesa();
  editDespesa();
};

// Adicionar Despesa

btnAddDespesa.addEventListener("click", (e) => {
  e.preventDefault();
  let despesa = {
    valor: addValorDespesa.value,
    categoria: addCategoriaDespesa.value,
    data: addDataDespesa.value,
    descricao: addDescricaoDespesa.value,
  };
  despesas.push(despesa);

  displayDespesa(despesas);
  closeModal(modalAddDespesa);
});

// Editar despesa
let editDespesaId;

const editDespesa = () => {
  let editDespesaBtn = document.querySelectorAll(".despesa__edit");
  editDespesaBtn.forEach((btn, i) => {
    btn.onclick = () => {
      editDespesaId = i;
      openModal(modalEditDespesa);
      editValorDespesa.value = despesas[i].valor;
      editDataDespesa.value = despesas[i].data;
      editCategoriaDespesa.value = despesas[i].categoria;
      editDescricaoDespesa.value = despesas[i].descricao;
    };
  });
};

const btnConfirmEditDespesa = document.getElementById("btn--edit--despesa");
btnConfirmEditDespesa.addEventListener("click", (e) => {
  e.preventDefault();
  editedDespesa = {
    valor: editValorDespesa.value,
    categoria: editCategoriaDespesa.value,
    data: editDataDespesa.value,
    descricao: editDescricaoDespesa.value,
  };
  despesas.splice(editDespesaId, 1, editedDespesa);
  closeModal(modalEditDespesa);
  displayDespesa(despesas);
});

// Deletar Despesa

const deleteDespesa = () => {
  let deleteDespesaBtn = document.querySelectorAll(".despesa__delete");
  deleteDespesaBtn.forEach((btn, i) => {
    btn.onclick = () => {
      despesas.splice(i, 1);
      let cells = document.querySelectorAll(`.despesa--${i}`);
      cells.forEach((cell) => {
        cell.remove();
      });
      displayDespesa(despesas);
    };
  });
};
