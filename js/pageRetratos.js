import { imagensRetratos } from './data.js';

export function createRetratosSection() {
    const sectionPrincipal = document.getElementById("sectionPrincipal");
    
    sectionPrincipal.innerHTML = `
        <div class="retratos-container">
            <h1 class="retratos-title">Portfólio de Retratos</h1>
            <div class="retratos-grid">
                ${imagensRetratos.map(url => `
                    <div class="retrato-item">
                        <img src="${url}" alt="Foto de Retrato" class="retrato-image">
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    setTimeout(() => {
        document.querySelectorAll('.retrato-item').forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate-in');
            }, index * 100);
        });
    }, 100);
}