const DOM = {
    formNumber: document.querySelectorAll('.form-number'),
    formText: document.querySelectorAll('.form-text'),
    spellsAdd: document.querySelectorAll('.spells__button-add'),
    spellListAdd: document.querySelectorAll('.spells__list-add'),
};

const LS = localStorage;
let formDataText = {};
let formDataNumber = {};



// Clicker number
function stepper(btn) {
    const id = btn.getAttribute('id');
    const input = btn.parentElement.querySelector('input');
    const mod = btn.parentElement.querySelector('.form-number__mod');
    const min = input.getAttribute('min');
    const max = input.getAttribute('max');
    const val = input.value;
    const newValue = (id == 'increment') ? parseInt(val) + 1 : parseInt(val) - 1;
    let modValue = Math.floor((newValue - 10) / 2);

    if (newValue >= min && newValue <= max) {
        input.value = newValue;
    };
    if (input.value.length > 2) {
        input.value = 0;
    };
    if (mod) {
        mod.innerHTML = modValue;
    };

    // Записуємо дані в LS при 'click'
    formDataNumber[input.name] = input.value;
    LS.setItem('fn', JSON.stringify(formDataNumber));
};

// Local Storage
// Text
for (let i = 0; i < DOM.formText.length; i++) {
    DOM.formText[i].addEventListener('input', function (ev) {
        formDataText[ev.target.name] = ev.target.value;
        LS.setItem('ft', JSON.stringify(formDataText));
    });

    if (LS.getItem('ft')) {
        formDataText = JSON.parse(LS.getItem('ft'));
        for (let key in formDataText) {
            if (DOM.formText[i].elements[key] !== undefined) {
                DOM.formText[i].elements[key].value = formDataText[key];
            };
        };
    };
}

// Number
for (let i = 0; i < DOM.formNumber.length; i++) {
    // Записуємо дані в LS при 'input'
    DOM.formNumber[i].addEventListener('input', getInputValue);
    function getInputValue(ev) {
        formDataNumber[ev.target.name] = ev.target.value;
        LS.setItem('fn', JSON.stringify(formDataNumber));
    }

    if (LS.getItem('fn')) {
        formDataNumber = JSON.parse(LS.getItem('fn'));
        for (let key in formDataNumber) {
            if (DOM.formNumber[i].elements[key] !== undefined) {
                DOM.formNumber[i].elements[key].value = formDataNumber[key];
                if (DOM.formNumber[i].elements[key].nextElementSibling.classList.value == 'form-number__mod') {
                    DOM.formNumber[i].elements[key].nextElementSibling.innerHTML = Math.floor((formDataNumber[key] - 10) / 2);
                }
            };
        };
    };
};


// Spells API(D&D)
const spellsURL = 'https://www.dnd5eapi.co/api/spells';

function getLvlSpells(spells, lvl) {
    for (s of spells) {
        if (s.level == lvl) {
            DOM.spellListAdd[lvl].insertAdjacentHTML('beforeend', `<li class="spells__item-add">${s.name}</li>`);
        } else if (s.level == lvl) {
            DOM.spellListAdd[lvl].insertAdjacentHTML('beforeend', `<li class="spells__item-add">${s.name}</li>`);
        } else if (s.level == lvl) {
            DOM.spellListAdd[lvl].insertAdjacentHTML('beforeend', `<li class="spells__item-add">${s.name}</li>`);
        } else if (s.level == lvl) {
            DOM.spellListAdd[lvl].insertAdjacentHTML('beforeend', `<li class="spells__item-add">${s.name}</li>`);
        } else if (s.level == lvl) {
            DOM.spellListAdd[lvl].insertAdjacentHTML('beforeend', `<li class="spells__item-add">${s.name}</li>`);
        } else if (s.level == lvl) {
            DOM.spellListAdd[lvl].insertAdjacentHTML('beforeend', `<li class="spells__item-add">${s.name}</li>`);
        }
    }
};

async function getSpellsRequest(lvl) {
    const spellsArrURL = [];
    const response = await fetch(spellsURL);
    const data = await response.json();
    const spellsArr = data.results.map(el => el.index);
    spellsArr.forEach(element => {
        spellsArrURL.push(element);
    });
    const requests = spellsArrURL.map(spell => fetch(`https://www.dnd5eapi.co/api/spells/${spell}`));
    Promise.all(requests)
        .then(responses => Promise.all(responses.map(r => r.json())))
        .then(spells => getLvlSpells(spells, lvl));
    //.then(spells => spells.forEach(spell => spell.level == 0 ? console.log(spell.name) : console.log(spell.level)));
};

for (let lvl = 0; lvl < DOM.spellsAdd.length; lvl++) {
    DOM.spellsAdd[lvl].addEventListener('click', function (e) {
        this.nextElementSibling.classList.toggle('_active');
        if (this.innerText == 'Add') {
            this.innerText = 'Close';
        } else {
            this.innerText = 'Add';
        }
    });
    getSpellsRequest(lvl);
}
