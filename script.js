
const modeBtn = document.getElementById('modeChange');

const modeIcon = document.querySelector('#modeChange img')

modeBtn.addEventListener('click', ()=>{
    
    let icon = modeIcon.getAttribute('src');

    if (icon === './assets/images/icon-moon.svg') {
        modeIcon.setAttribute('src', './assets/images/icon-sun.svg');
        modeBtn.style.background = 'var(--neutral-700)'
    }else{
        
        modeIcon.setAttribute('src', './assets/images/icon-moon.svg');
        modeBtn.style.background = 'var(--neutral-100)'
    }
    
    
});
const extensionGrid = document.getElementById('grid');
extensionGrid.innerHTML = '';



const fetchExtension = async () => {
    try {
        
        const data  = await fetch('./data.json');
        const json = await data.json();

        console.log(json);

        // return json;

        json.forEach(extension => {
            const griditem = document.createElement('div')
            
                griditem.innerHTML = 
                `
                    <span class="top">
                        <img src="${extension.logo}" alt="icon">
                        <span>
                            <h2>${extension.name}</h2>
                            <p>${extension.description}</p>
                        </span>
                    </span>
        
                    <span class="bottom">
                        <span class="remove-btn">Remove</span>
        
                        <span class="${extension.isActive} active"></span>
                    </span>
            `
            extensionGrid.appendChild(griditem);
        });
        
    } catch (error) {
        console.error(error);
        return [];
    }
};

fetchExtension();


const allbtn = document.getElementById('all');
const activebtn = document.getElementById('active');
const inactivebtn = document.getElementById('inactive');

activebtn.addEventListener('click', async (active) => {
    
    const data = await fetchExtension();
    

})