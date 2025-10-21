// --- 1. FUNCIONALIDADE MODO CLARO/ESCURO ---
// --- CONFIGURAÇÕES GLOBAIS ---
const body = document.body;
const toggle = document.getElementById('mode-toggle');
const modeKey = 'portfolio-mode'; // Chave usada no localStorage

// --- 1. FUNCIONALIDADE MODO CLARO/ESCURO ---

// Aplica o modo salvo ou o padrão ao carregar a página
function applySavedMode() {
    if (!toggle) return; // Garante que o botão existe

    const savedMode = localStorage.getItem(modeKey);
    
    if (savedMode === 'light') {
        body.classList.add('light-mode');
        toggle.innerHTML = '🌙'; // Ícone da lua (modo claro ativo)
    } else {
        body.classList.remove('light-mode');
        toggle.innerHTML = '☀️'; // Ícone da lâmpada (modo escuro ativo)
    }
}

// Alterna o modo e salva a nova preferência
function toggleMode() {
    const isLight = body.classList.toggle('light-mode');
    
    if (isLight) {
        localStorage.setItem(modeKey, 'light');
        toggle.innerHTML = '🌙';
    } else {
        localStorage.setItem(modeKey, 'dark');
        toggle.innerHTML = '☀️';
    }
}

// --- 2. FUNCIONALIDADE ROLAGEM SUAVE ---

function setupSmoothScrolling() {
    document.querySelectorAll('a.scroll-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// --- 3. FUNÇÃO DO MENU RESPONSIVO (TOGGLE) ---

function setupMenuToggle() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    // Certifique-se de que o elemento que contém os links (geralmente a <ul> ou <nav>) tenha o ID 'nav-menu'
    const navLinks = navMenu ? navMenu.querySelectorAll('a') : [];

    if (!menuToggle) return;

    menuToggle.addEventListener('click', () => {
        if (navMenu) navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Fecha o menu ao clicar em qualquer link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// --- 4. FUNÇÃO DO FORMULÁRIO (MAILTO COM VALIDAÇÃO E FEEDBACK) ---

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function setupContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // VALIDAÇÃO: CAMPOS VAZIOS
        if (name === '' || email === '' || message === '') {
            alert('❌ Erro: Todos os campos (Nome, Email, Mensagem) devem ser preenchidos.');
            return;
        }

        // VALIDAÇÃO: FORMATO DO EMAIL
        if (!isValidEmail(email)) {
            alert('❌ Erro: Por favor, insira um endereço de e-mail válido (ex: usuario@dominio.com).');
            return;
        }

        // --- PREPARAÇÃO DO MAILTO ---
        
        // ATENÇÃO: SUBSTITUA 'palomaflores.dev@gmail.com' PELO SEU ENDEREÇO DE EMAIL
        const recipientEmail = 'palomaflores.dev@gmail.com'; 
        
        const subject = encodeURIComponent(`Contato do Portfólio - De: ${name}`);
        const bodyMail = encodeURIComponent(
            `Nome: ${name}\n` +
            `Email: ${email}\n\n` +
            `Mensagem:\n${message}`
        );

        const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${bodyMail}`;

        // Abre o cliente de e-mail do usuário
        window.location.href = mailtoLink;
        
        // --- SIMULAÇÃO DE ENVIO E FEEDBACK ---
        
        // Limpa os campos do formulário
        form.reset(); 

        // Exibe a mensagem de confirmação
        alert('✅ Mensagem enviada com sucesso! Seu cliente de e-mail será aberto para a confirmação final.');
    });
}

// --- 5. FUNCIONALIDADE DE ABAS INTERATIVAS (SEÇÃO SOBRE MIM) ---

// Esta função é chamada diretamente pelo onclick="openTab(...)" no seu HTML
function openTab(evt, tabName) {
    let i, tabcontent, tabbuttons;

    // 1. Esconde todo o conteúdo da aba
    tabcontent = document.querySelectorAll(".tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }

    // 2. Remove a classe 'active' de todos os botões
    tabbuttons = document.querySelectorAll(".tab-button");
    for (i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].classList.remove("active");
    }

    // 3. Mostra o conteúdo da aba atual, adicionando a classe 'active'
    const targetContent = document.getElementById(tabName);
    if (targetContent) {
        targetContent.classList.add("active");
    }

    // 4. Adiciona a classe 'active' ao botão que foi clicado
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add("active");
    }
}
// Garante que a função openTab esteja globalmente disponível para o HTML
window.openTab = openTab;


// --- EXECUÇÃO PRINCIPAL: CHAMA TODAS AS FUNÇÕES AO CARREGAR O HTML ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializa o modo claro/escuro
    applySavedMode();
    if (toggle) {
        toggle.addEventListener('click', toggleMode);
    }

    // 2. Ativa a rolagem suave
    setupSmoothScrolling();

    // 3. Ativa a funcionalidade do formulário (com mailto)
    setupContactForm();

    // 4. ATIVA O MENU RESPONSIVO
    setupMenuToggle();
    
    // 5. INICIALIZAÇÃO DAS ABAS (DEIXA A PRIMEIRA ATIVA AO CARREGAR)
    const defaultTabContent = document.getElementById('perfil');
    const defaultTabButton = document.querySelector('.tab-button');
    if (defaultTabContent && defaultTabButton) {
        defaultTabContent.classList.add('active');
        defaultTabButton.classList.add('active');
    }
});