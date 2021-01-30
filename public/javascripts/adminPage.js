const addProjectButtonDiv = document.querySelector('#addProjectButtonDiv');

const addButton = document.querySelector('#addProjectButton');
const closeButton = document.querySelector('#addProjectClose');

const addProjectSpinner = document.querySelector('#addProject-spinner');


addButton.addEventListener('click', ()=>{
    addButton.classList.add('d-none');
    closeButton.classList.add('d-none');
    addProjectSpinner.classList.remove('d-none');
})