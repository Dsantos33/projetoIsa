// ========== PÁGINA SOBRE ==========
import { comentarios } from './data.js';

let currentComment = 0;

export function createSobreSection() {
    const sectionPrincipal = document.getElementById("sectionPrincipal");
    
    sectionPrincipal.innerHTML = `
        <div class="sobre-container">
            <div class="sobre-content">
                <img src="https://static.wixstatic.com/media/ef3021_a1bbb31fe1cc456dae65513cf1957a61~mv2.jpg/v1/fill/w_491,h_764,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/ef3021_a1bbb31fe1cc456dae65513cf1957a61~mv2.jpg" alt="Eduardo Ramos" class="sobre-image">
                <div class="sobre-text-container">
                    <h1 class="sobre-title">Sobre Mim</h1>
                    <p class="sobre-text">
                        Sou o Eduardo Ramos, fotógrafo há mais de 8 anos, e sempre acreditei que a fotografia vai muito além de uma imagem bonita. Ela é uma forma de contar histórias, registrar sentimentos e eternizar momentos únicos.
                    </p>
                    <p class="sobre-text">
                        Desde o início da minha trajetória, busco me conectar de verdade com cada cliente, entendendo suas ideias, expectativas e desejos para que o resultado final seja algo autêntico e especial. Sou uma pessoa alegre, comunicativa e criativa, e acredito que essas qualidades me ajudam a criar um ambiente leve e descontraído durante as sessões.
                    </p>
                    <p class="sobre-text">
                        Faço questão de ser atencioso e receptivo, porque sei que cada detalhe importa e que o cliente precisa se sentir à vontade e confiante. Minha maior preocupação é sempre com a experiência do cliente e com a qualidade final das fotos. Meu compromisso é entregar não apenas imagens bonitas, mas memórias que vão ser lembradas com carinho por toda a vida.
                    </p>
                </div>
            </div>
            <div class="comentarios-section">
                <h2 class="comentarios-title">O que dizem sobre meu trabalho</h2>
                <div class="comentarios-carousel">
                    <button class="carousel-nav carousel-prev" onclick="previousComment()">‹</button>
                    <div class="comentarios-container" id="comentariosContainer">
                        ${comentarios.map((comentario, index) => `
                            <div class="comentario-item">
                                <div class="comentario-rating">${comentario.rating}</div>
                                <p class="comentario-text">${comentario.texto}</p>
                                <div class="comentario-author">${comentario.autor}</div>
                                <div class="comentario-service">${comentario.servico}</div>
                            </div>
                        `).join('')}
                    </div>
                    <button class="carousel-nav carousel-next" onclick="nextComment()">›</button>
                    <div class="carousel-controls">
                        ${comentarios.map((_, index) => `
                            <div class="carousel-dot ${index === 0 ? 'active' : ''}" onclick="goToComment(${index})"></div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    currentComment = 0;
    updateCarousel();
}

export function updateCarousel() {
    const container = document.getElementById('comentariosContainer');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (container) {
        container.style.transform = `translateX(-${currentComment * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentComment);
        });
    }
}

export function nextComment() {
    currentComment = (currentComment + 1) % comentarios.length;
    updateCarousel();
}

export function previousComment() {
    currentComment = (currentComment - 1 + comentarios.length) % comentarios.length;
    updateCarousel();
}

export function goToComment(index) {
    currentComment = index;
    updateCarousel();
}

window.nextComment = nextComment;
window.previousComment = previousComment;
window.goToComment = goToComment;