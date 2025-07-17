// ========== MAIN.JS - ARQUIVO PRINCIPAL ==========
// Imports dos módulos
import { createRetratosSection } from './pageRetratos.js';
import { createSobreSection } from './pageSobre.js';
import { createServicosSection } from './pageServicos.js';
import { createAlbumSection } from './pageAlbum.js';
import { createCasamentoSection } from './pageCasamento.js';
import { createGastronomicoSection } from './pageGastronomico.js';
import { createCorporativoSection } from './pageCorporativo.js';


let botaoSobre = document.querySelector(".sobre");
let sectionPrincipal = document.getElementById("sectionPrincipal");
let imagemSection = document.querySelector(".hero-image");
let botaoH1 = document.getElementById("h1Index");
let divMenu = document.querySelector(".hero-content");
let linkCss = document.getElementById("linkCSS");


function restoreMainSection() {
    sectionPrincipal.innerHTML = `
        <img src="https://static.wixstatic.com/media/ef3021_dcd2225ea30943dabaf9be7f0b7b029c~mv2.jpg/v1/fill/w_851,h_830,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/ef3021_dcd2225ea30943dabaf9be7f0b7b029c~mv2.jpg" alt="Eduardo Ramos Photography" class="hero-image">
        <div class="hero-content">
            <h1 class="hero-title">EDUARDO RAMOS</h1>
            <a href="#agendar" class="agendar-btn">Agendar</a>
        </div>
    `;
    divMenu = document.querySelector(".hero-content");
    imagemSection = document.querySelector(".hero-image");
}

function toggleMenu() {
    document.querySelector('.hamburger').classList.toggle('active');
    document.getElementById('mobileMenu').classList.toggle('active');
    document.body.classList.toggle('body-menu-open');
}

function navigateFromMobile(action) {
    toggleMenu();
    
    switch(action) {
        case 'sobre':
            createSobreSection();
            linkCss.href = "/css/paginaSobre.css";
            break;
        case 'servicos':
            createServicosSection();
            linkCss.href = "/css/serviços.css";
            break;
        case 'album':
            createAlbumSection();
            linkCss.href = "/css/paginaAlbum.css";
            break;
        case 'home':
            restoreMainSection();
            linkCss.href = "/css/paginaPrincipal.css";
            break;
        case 'retratos':
            createRetratosSection();
            linkCss.href = "/css/paginaRetratos.css";
            break;

        case 'casamento':
            createCasamentoSection();
            linkCss.href = "/css/paginaCasamento.css";
            break;
        
        case 'gastronomico':
            createGastronomicoSection();
            linkCss.href = "/css/paginaGastronomico.css";
            break;
        
        case 'corporativo':
            createCorporativoSection();
            linkCss.href = "/css/paginaCorporativo.css";
            break;

        default:
            console.log('Ação não implementada:', action);
    }
}


if (botaoSobre) {
    botaoSobre.addEventListener("click", function() {
        createSobreSection();
        linkCss.href = "/css/paginaSobre.css";
    });
}

document.addEventListener('DOMContentLoaded', function() {
    
    const navRetratos = document.getElementById('navRetratos');
    if (navRetratos) {
        navRetratos.addEventListener('click', function(e) {
            e.preventDefault();
            createRetratosSection();
            linkCss.href = "/css/paginaRetratos.css";
        });
        
    const navCasamento = document.getElementById('navCasamento');
    if (navCasamento) {
        navCasamento.addEventListener('click', function(e) {
            e.preventDefault();
            createCasamentoSection();
            linkCss.href = "/css/paginaCasamento.css";
        });    
    }

    const navGastronomico = document.getElementById('navGastronomico');
    if (navGastronomico) {
        navGastronomico.addEventListener('click', function(e) {
            e.preventDefault();
            createGastronomicoSection();
            linkCss.href = "/css/paginaGastronomico.css";
        });    
    }
    const navCorporativo = document.getElementById('navCorporativo');
    if (navCorporativo) {
        navCorporativo.addEventListener('click', function(e) {
            e.preventDefault();
            createCorporativoSection();
            linkCss.href = "/css/paginaCorporativo.css";
        });    
    }    

    }

    
    document.querySelectorAll('.sobre').forEach(botao => {
        botao.addEventListener("click", function() {
            createSobreSection();
            linkCss.href = "/css/paginaSobre.css";
        });
    });
    
    document.querySelectorAll('.serviços, .servicos').forEach(botao => {
        botao.addEventListener("click", function() {
            createServicosSection();
            linkCss.href = "/css/serviços.css";
        });
    });

    document.querySelectorAll('.album').forEach(botao => {
        botao.addEventListener("click", function() {
            createAlbumSection();
            linkCss.href = "/css/paginaAlbum.css";
        });
    });
    
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        const mobileButtons = mobileMenu.querySelectorAll('.botoesIndex');
        
        mobileButtons.forEach(button => {
            const buttonText = button.textContent.trim().toLowerCase();
            
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                switch(buttonText) {
                    case 'sobre':
                        navigateFromMobile('sobre');
                        break;
                    case 'serviços':
                        navigateFromMobile('servicos');
                        break;
                    case 'retratos':
                        navigateFromMobile('retratos');
                        break;
                    case 'álbum de clientes':
                        navigateFromMobile('album');
                        break;
                    
                    case 'casamento':
                        navigateFromMobile('casamento');
                        break;
                    
                    case 'gastronomico':
                        navigateFromMobile('gastronomico');
                        break;
                    
                    case 'corporativo':
                        navigateFromMobile('corporativo');
                        break;
                }
            });
        });
    }
});

if (botaoH1) {
    botaoH1.addEventListener("click", function() {
        restoreMainSection();
        linkCss.href = "/css/paginaPrincipal.css";
    });
}

window.toggleMenu = toggleMenu;