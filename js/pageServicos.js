// ========== PÁGINA DE SERVIÇOS ==========
import { servicos } from './data.js';

export function createServicosSection() {
    const sectionPrincipal = document.getElementById("sectionPrincipal");
    
    sectionPrincipal.innerHTML = `
        <div class="servicos-container">
            <h1 class="servicos-title">Nossos Serviços</h1>
            <div class="servicos-grid">
                ${servicos.map((servico, index) => `
                    <div class="servico-item" data-index="${index}">
                        <div class="servico-image-container">
                            <img src="${servico.imagem}" alt="${servico.titulo}" class="servico-image">
                            <div class="servico-overlay">
                                <h3 class="servico-titulo">${servico.titulo}</h3>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Animação em cascata
    setTimeout(() => {
        const servicoItems = document.querySelectorAll('.servico-item');
        servicoItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate-in');
            }, index * 100);
        });
    }, 100);
}