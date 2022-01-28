document.getElementById('cars').addEventListener('click', onClick);

function onClick({ target }) {
    if (target.classList.contains('more')) {
        const description = target.parentElement
            .querySelector('.description');
        if (description.style.display == 'block') {
            description.style.display = 'none';
            target.textContent = 'Show more';
        } else {
            description.style.display = 'block';
            target.textContent = 'Hide';
        }
    }
}