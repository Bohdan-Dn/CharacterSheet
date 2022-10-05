import spellsData from './data/spells.json' assert {type: 'json'};
function getSpellsRequest(lvl) {
    for (let i = 0; i < spellsData.length; i++) {
        if (spellsData[i].level == lvl) {
            DOM.spellListAdd[lvl].insertAdjacentHTML('beforeend', `<li class="spells__item-add">${spellsData[i].name}</li>`);
        };
    };
}


for (let lvl = 0; lvl < DOM.spellsAdd.length; lvl++) {
    DOM.spellsAdd[lvl].addEventListener('click', function () {
        this.nextElementSibling.classList.toggle('_active');
        if (this.innerText == 'Add') {
            this.innerText = 'Close';
        } else {
            this.innerText = 'Add';
        }
    });
    getSpellsRequest(lvl);
};