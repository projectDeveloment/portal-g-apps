// Configuración global de la aplicación 
const appConfig = {
    // Información del portal
    portal: {
        title: "Portal de aplicaciones G-apps",
        logoPath: "assets/logo.png"
    },

    // Duración de la animación del splash (en milisegundos)
    splashDuration: 4000,

    // Lista de aplicaciones con gradientes
    applications: [
        {
            id: "dcs",
            name: "DCS",
            description: "Gestión de control documental",
            icon: "assets/icons/logo.png",
            iconType: "image",
            url: "http://g-apps.g-one.corp:1013",
            gradient: "linear-gradient(135deg, #E31E24 0%, #FF6B6B 100%)"  
        },
        {
            id: "NSG",
            name: "Nomina y servicios generales",
            description: "Gestion de nomina y recursos humanos",
            icon: "assets/icons/nomina_app-64.png",
            iconType: "image",
            url: "",
            gradient: "linear-gradient(135deg, #dbe4dfff 0%, #3b584aff 100%)"  
        },
        {
            id: "incidents",
            name: "Relaciones laborales",
            description: "Gestión de incidencias y asistencia",
            icon: "assets/icons/icono-lab-64x64.png",
            iconType: "image",
            url: "http://localhost:4200/incidents",
            gradient: "linear-gradient(135deg, #ffffffff 0%, #ffffffff 100%)"  
        },
        {
            id: "metaparts",
            name: "MetaParts",
            description: "Plan de producción y etiquetas",
            icon: "assets/icons/metaparts-64x64.png",
            iconType: "image",
            url: "",
            gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        },
        {
            id: "e-learning",
            name: "E-Learning",
            description: "Cursos y capacitaciones internos",
            icon: "assets/icons/logo.png",
            iconType: "image",
            url: "",
            gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"  
        },
        {
            id: "txone",
            name: "TX-ONE",
            description: "Control de presupuestos y gastos",
            icon: "assets/icons/logo.png",
            iconType: "image",
            url: "http://g-apps.g-one.corp:3004",
            gradient: "linear-gradient(135deg, #1879cdff 0%, #1809e8ff 100%)"  
        }
    ]
};

// Funcion para generar dinmicamente las tarjetas de aplicaciones
function generateAppCards() {
    const container = document.querySelector('.apps-container');
    container.innerHTML = ''; // Limpiar contenedor

    appConfig.applications.forEach(app => {
        const card = document.createElement('a');
        card.href = app.url;
        card.className = 'app-card';
        card.setAttribute('data-app', app.id);

     
        let iconContent;
        if (app.iconType === 'image') 
            iconContent = `<img src="${app.icon}" alt="${app.name}" class="app-icon-img">`;
        

        // Aplicar gradiente personalizado si existe
        let iconStyle = '';
        if (app.gradient) 
            iconStyle = `style="background: ${app.gradient};"`;
        

        // Generar la estructura HTML con gradiente personalizado
        card.innerHTML = `
            <div class="app-icon-wrapper">
                <div class="icon-glow"></div>
                <div class="app-icon" ${iconStyle}>
                    ${iconContent}
                </div>
            </div>
            <h3>${app.name}</h3>
            <p>${app.description}</p>
        `;

        container.appendChild(card);
    });
}

// Inicializar la carga en el DOM
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar información del portal
    document.querySelector('.portal-header h1').textContent = appConfig.portal.title;
    
    // Generar tarjetas de aplicaciones
    generateAppCards();
    
    // Reinicializar animaciones hover después de generar tarjetas
    setTimeout(initializeCardAnimations, 4500);
});

function initializeCardAnimations() {
    const cards = document.querySelectorAll('.app-card');
    
    cards.forEach(card => {
        const icon = card.querySelector('.app-icon');
        
        card.addEventListener('mouseenter', function() {
            anime({
                targets: icon,
                rotate: [0, 360],
                scale: [1, 1.2, 1],
                duration: 600,
                easing: 'easeInOutQuad'
            });
        });

        card.addEventListener('click', function(e) {
            e.preventDefault();
            
            anime({
                targets: this,
                scale: [1, 0.95, 1],
                duration: 300,
                easing: 'easeInOutQuad'
            });

            setTimeout(() => {
                window.location.href = this.href;
            }, 300);
        });
    });
}