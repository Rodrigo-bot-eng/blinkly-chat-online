document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os itens de status que podem ser clicados
    const statusItems = document.querySelectorAll('#status .status-item');
    
    // Seleciona os elementos do visualizador de status
    const viewerOverlay = document.getElementById('status-viewer-overlay');
    const closeViewerButton = viewerOverlay.querySelector('.close-status-viewer');
    const viewerImage = document.getElementById('viewer-image');
    const viewerAvatar = document.getElementById('viewer-avatar');
    const viewerName = document.getElementById('viewer-name');
    const viewerTime = document.getElementById('viewer-time');
    
    // Função para abrir o visualizador de status
    const openStatusViewer = (item) => {
        // Pega os dados do item de status clicado
        const name = item.dataset.name;
        const time = item.dataset.time;
        const imgSrc = item.dataset.img;
        const avatarSrc = item.querySelector('.status-avatar').src;

        // Atualiza o conteúdo do visualizador
        viewerName.textContent = name;
        viewerTime.textContent = time;
        viewerImage.src = imgSrc;
        viewerAvatar.src = avatarSrc;
        
        // Exibe o visualizador
        viewerOverlay.classList.remove('hidden');

        // Adiciona a classe 'viewed' ao item e muda a cor da borda
        if (!item.classList.contains('viewed')) {
            item.classList.add('viewed');
            // Opcional: mover o item para a seção de "vistos"
            const viewedSection = document.querySelector('.viewed-updates');
            if (viewedSection) {
                // Remove o item da lista atual e o adiciona à lista de vistos
                const parent = item.parentNode;
                parent.removeChild(item);
                viewedSection.appendChild(item);
            }
        }
    };

    // Função para fechar o visualizador de status
    const closeStatusViewer = () => {
        viewerOverlay.classList.add('hidden');
        // Limpa a imagem para evitar que a antiga apareça rapidamente
        viewerImage.src = ''; 
    };

    // Adiciona o evento de clique para cada item de status
    statusItems.forEach(item => {
        item.addEventListener('click', () => {
            openStatusViewer(item);
        });
    });

    // Adiciona o evento de clique para o botão de fechar
    closeViewerButton.addEventListener('click', closeStatusViewer);
});
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os itens de status que podem ser clicados
    const statusItems = document.querySelectorAll('#status .status-item');
    
    // Seleciona os elementos do visualizador de status
    const viewerOverlay = document.getElementById('status-viewer-overlay');
    // A classe do botão de fechar mudou no novo HTML
    const closeViewerButton = viewerOverlay.querySelector('.close-status-viewer'); 
    const viewerImage = document.getElementById('viewer-image');
    const viewerAvatar = document.getElementById('viewer-avatar');
    const viewerName = document.getElementById('viewer-name');
    const viewerTime = document.getElementById('viewer-time');
    
    // Função para abrir o visualizador de status
    const openStatusViewer = (item) => {
        // Pega os dados do item de status clicado
        const name = item.dataset.name;
        const time = item.dataset.time;
        const imgSrc = item.dataset.img;
        // A classe do avatar mudou, então buscamos a imagem dentro do item
        const avatarSrc = item.querySelector('.status-avatar').src;

        // Atualiza o conteúdo do visualizador
        viewerName.textContent = name;
        viewerTime.textContent = time;
        viewerImage.src = imgSrc;
        viewerAvatar.src = avatarSrc;
        
        // Exibe o visualizador
        viewerOverlay.classList.remove('hidden');

        // Adiciona a classe 'viewed' ao item para mudar a cor da borda
        if (!item.classList.contains('viewed')) {
            item.classList.add('viewed');
        }
    };

    // Função para fechar o visualizador de status
    const closeStatusViewer = () => {
        viewerOverlay.classList.add('hidden');
        // Limpa a imagem para evitar que a antiga apareça rapidamente
        viewerImage.src = ''; 
    };

    // Adiciona o evento de clique para cada item de status
    statusItems.forEach(item => {
        item.addEventListener('click', () => {
            openStatusViewer(item);
        });
    });

    // Adiciona o evento de clique para o botão de fechar
    if(closeViewerButton) {
        closeViewerButton.addEventListener('click', closeStatusViewer);
    }
});

document.addEventListener('DOMContentLoaded', () => {

    // Efeito de letras flutuantes ao clicar
    const body = document.body;

    function addFloatingLetter(event) {
        const letter = document.createElement('span');
        letter.className = 'floating-letter';
        letter.textContent = 'b';
        letter.style.left = `${event.clientX}px`;
        letter.style.top = `${event.clientY}px`;
        body.appendChild(letter);

        // Remove a letra depois da animação
        letter.addEventListener('animationend', () => {
            letter.remove();
        });
    }

    body.addEventListener('click', addFloatingLetter);

    // Funcionalidade do botão de status (três pontos)
    const statusSettingsButton = document.querySelector('#status .header-icons ion-icon[name="ellipsis-vertical"]');
    if (statusSettingsButton) {
        statusSettingsButton.addEventListener('click', (event) => {
            // Previne a propagação do clique para o body, evitando o efeito de letras
            event.stopPropagation(); 
            // Redireciona para a página de configurações de status
            window.location.href = 'status_settings.html'; 
        });
    }

    // Funcionalidade de adicionar status (seu status)
    const myStatusContainer = document.querySelector('.status-content');
    if (myStatusContainer) {
        myStatusContainer.addEventListener('click', (event) => {
            // Previne a propagação do clique para o body
            event.stopPropagation();
            alert('Você clicou para adicionar um novo status!');
            // Você pode substituir o alert por uma navegação para a página de criação de status
            // Exemplo: window.location.href = 'new_status.html';
        });
    }
});