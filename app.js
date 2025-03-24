const modeBtn = document.getElementById('modeChange');
const modeIcon = document.querySelector('#modeChange img');

modeBtn.addEventListener('click', () => {
    let icon = modeIcon.getAttribute('src');

    if (icon === './assets/images/icon-moon.svg') {
        modeIcon.setAttribute('src', './assets/images/icon-sun.svg');
        modeBtn.style.background = 'var(--neutral-700)';
    } else {
        modeIcon.setAttribute('src', './assets/images/icon-moon.svg');
        modeBtn.style.background = 'var(--neutral-100)';
    }
});

const fetchExtension = async () => {
    try {
        const data = await fetch('./data.json');
        const json = await data.json();
        return json; // Ensure the fetched data is returned
    } catch (error) {
        console.error(error);
        return []; // Return an empty array on error
    }
};

const createExtension = (extension) => {
    const extensionGrid = document.getElementById('grid');
    extensionGrid.innerHTML = ''; // Clear the grid before adding new items

    extension.forEach(ext => {
        const griditem = document.createElement('div');
        griditem.innerHTML = `
            <span class="top">
                <img src="${ext.logo}" alt="icon">
                <span>
                    <h2>${ext.name}</h2>
                    <p>${ext.description}</p>
                </span>
            </span>
            <span class="bottom">
                <span>Remove</span>
                <span class="${ext.isActive} active"></span>
            </span>
        `;
        extensionGrid.appendChild(griditem);
    });
};

const initialize = async () => {
    const init = await fetchExtension();
    createExtension(init);
};

initialize();

const allbtn = document.getElementById('all');
const activebtn = document.getElementById('active');
const inactivebtn = document.getElementById('inactive');

allbtn.addEventListener('click', async () => {
    const data = await fetchExtension();
    createExtension(data); // Show all extensions

    allbtn.classList.add('active');
    activebtn.classList.remove('active');
    inactivebtn.classList.remove('active');
});

activebtn.addEventListener('click', async () => {
    const data = await fetchExtension();
    const activeExtensions = data.filter(ext => ext.isActive === true); // Ensure boolean comparison
    createExtension(activeExtensions);
    allbtn.classList.remove('active');
    activebtn.classList.add('active');
    inactivebtn.classList.remove('active');
});

inactivebtn.addEventListener('click', async () => {
    const data = await fetchExtension();
    const inactiveExtensions = data.filter(ext => ext.isActive === false); // Ensure boolean comparison
    createExtension(inactiveExtensions);
    allbtn.classList.remove('active');
    activebtn.classList.remove('active');
    inactivebtn.classList.add('active');
});