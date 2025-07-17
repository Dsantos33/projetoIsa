// ========== PÁGINA DE ÁLBUM ==========
import { albuns } from './data.js';

export function createAlbumSection() {
    const sectionPrincipal = document.getElementById("sectionPrincipal");
    
    sectionPrincipal.innerHTML = `
        <div class="album-container">
            <h1 class="album-title">Álbum de Clientes</h1>
            <div class="album-grid">
                ${albuns.map((album, index) => `
                    <div class="album-item" data-index="${index}">
                        <div class="album-image-container">
                            <img src="${album.imagem}" alt="${album.titulo}" class="album-image">
                            <div class="album-overlay">
                                <p class="album-categoria">${album.categoria}</p>
                                <h3 class="album-item-title">${album.titulo}</h3>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Animação em cascata
    setTimeout(() => {
        const albumItems = document.querySelectorAll('.album-item');
        albumItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate-in');
            }, index * 100);
        });
    }, 100);
}