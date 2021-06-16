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

const despesaOptions = `
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
`;

const receitasOptions = `
  <option value="Investimento">Investimento</option>
  <option value="Presente">Presente</option>
  <option value="Bônus">Bônus</option>
  <option value="Outros">Outros</option>

`;

const modalTemplate = (name, action, title, options) => {
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
          ${options}
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

modalTemplate("despesa", "add", "Adicionar", despesaOptions);
modalTemplate("despesa", "edit", "Editar", despesaOptions);

modalTemplate("receita", "add", "Adicionar", receitasOptions);
modalTemplate("receita", "edit", "Editar", receitasOptions);

const overlay = document.querySelector(".overlay");

const closeModalBtn = document.querySelectorAll(".modal--close");

// Despesas

const openAddDespesa = document.getElementById("btn--despesa");
const modalAddDespesa = document.querySelector(".modal--add--despesa");
const modalEditDespesa = document.querySelector(".modal--edit--despesa");

// Receitas
const openAddReceita = document.getElementById("btn--receita");
const modalAddReceita = document.querySelector(".modal--add--receita");
const modalEditReceita = document.querySelector(".modal--edit--receita");

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
    closeModal(
      modalAddDespesa,
      modalEditDespesa,
      modalAddReceita,
      modalEditDespesa
    )
  )
);

openAddReceita.addEventListener("click", () => openModal(modalAddReceita));

let despesas = [];

let receitas = [];

// Deletar receita/despesa
const deleteItem = (name, arr) => {
  let deleteBtns = document.querySelectorAll(`.${name}__delete`);
  deleteBtns.forEach((btn, i) => {
    btn.onclick = () => {
      arr.splice(i, 1);
      let cells = document.querySelectorAll(`.${name}--${i}`);
      cells.forEach((cell) => {
        cell.remove();
      });
      displayRow("despesas", "despesa", despesas);
    };
  });
};

// Renderizar tabela de despesas
const displayRow = (title, name, arr) => {
  const table = document.querySelector(`.table--${title}`);

  if (arr.length > 0) {
    table.innerHTML = "";
    table.innerHTML = `              
      <tr>
        <th>Valor</th>
        <th>Categoria</th>
        <th>Data</th>
        <th>Ações</th>
      </tr>
      `;

    arr.forEach((item, i) => {
      let newRow = document.querySelector(`.table--${title}`).insertRow();
      newRow.innerHTML = `
                  <td class="${name}--${i}" >R$ ${item.valor}</td>
                  <td class="${name}--${i}">${item.categoria}</td>
                  <td class="${name}--${i}">${item.data}</td>
                  <td class="action__cell ${name}--${i}">
                    <img class="${name}__edit action__icon" src="icons/pencil.svg"/>
                    <img class="${name}__delete action__icon" src="icons/close.svg"/>
                  </td>
                  `;
    });

    deleteItem("despesa", despesas);
    deleteItem("receita", receitas);
    editDespesa();
    editReceita();
  } else {
    table.style.display = "none";
  }
};

/* --- Despesas --- */

// Add inputs
const btnAddDespesa = document.getElementById("btn--add--despesa");
const inputAddValorDespesa = document.getElementById(
  "input__despesa__add--value"
);
const inputAddDataDespesa = document.getElementById(
  "input__despesa__add--payment--date"
);
const inputAddCategoriaDespesa = document.getElementById(
  "input__despesa__add--category"
);
const inputAddDescricaoDespesa = document.getElementById(
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

// Adicionar Despesa

btnAddDespesa.addEventListener("click", (e) => {
  e.preventDefault();

  let despesa = {
    valor: inputAddValorDespesa.value,
    categoria: inputAddCategoriaDespesa.value,
    data: inputAddDataDespesa.value,
    descricao: inputAddDescricaoDespesa.value,
  };
  despesas.push(despesa);

  displayRow("despesas", "despesa", despesas);
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
  displayRow("despesas", "despesa", despesas);
});

/*--- Receitas --- */

// Add inputs
const btnAddReceita = document.getElementById("btn--add--receita");
const inputAddValorReceita = document.getElementById(
  "input__receita__add--value"
);
const inputAddDataReceita = document.getElementById(
  "input__receita__add--payment--date"
);
const inputAddCategoriaReceita = document.getElementById(
  "input__receita__add--category"
);
const inputAddDescricaoReceita = document.getElementById(
  "input__receita__add--description"
);

// Edit inputs
const editValorReceita = document.getElementById("input__receita__edit--value");
const editDataReceita = document.getElementById(
  "input__receita__edit--payment--date"
);
const editCategoriaReceita = document.getElementById(
  "input__receita__edit--category"
);
const editDescricaoReceita = document.getElementById(
  "input__despesa__edit--description"
);

// Adicionar receita
btnAddReceita.addEventListener("click", (e) => {
  e.preventDefault();

  let receita = {
    valor: inputAddValorReceita.value,
    categoria: inputAddCategoriaReceita.value,
    data: inputAddDataReceita.value,
    descricao: inputAddDescricaoReceita.value,
  };
  receitas.push(receita);

  displayRow("receitas", "receita", receitas);
  closeModal(modalAddReceita);
});

// Editar despesa
let editReceitaId;

const editReceita = () => {
  let editReceitaBtn = document.querySelectorAll(".receita__edit");
  editReceitaBtn.forEach((btn, i) => {
    btn.onclick = () => {
      editReceitaId = i;
      openModal(modalEditReceita);
      editValorReceita.value = receitas[i].valor;
      editDataReceita.value = receitas[i].data;
      editCategoriaReceita.value = receitas[i].categoria;
      editDescricaoReceita.value = receitas[i].descricao;
    };
  });
};

const btnConfirmEditReceita = document.getElementById("btn--edit--receita");
btnConfirmEditReceita.addEventListener("click", (e) => {
  e.preventDefault();
  editedReceita = {
    valor: editValorReceita.value,
    categoria: editCategoriaReceita.value,
    data: editDataReceita.value,
    descricao: editDescricaoReceita.value,
  };
  receitas.splice(editReceitaId, 1, editedReceita);
  closeModal(modalEditReceita);
  displayRow("receitas", "receita", receitas);
});
