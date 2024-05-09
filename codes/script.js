// Scroll nav bar e links
document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll('.nav a, .secti');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                smoothScrollTo(targetSection.offsetTop - navHeight);
            }
        });
    });

    function smoothScrollTo(targetPosition) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 500; // Tempo de duração da animação em milissegundos
        const increments = 20;
        let currentTime = 0;

        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        function animateScroll() {
            currentTime += increments;
            const newPosition = easeInOutQuad(currentTime, startPosition, distance, duration);
            window.scrollTo(0, newPosition);

            if (currentTime < duration) {
                requestAnimationFrame(animateScroll);
            }
        }

        animateScroll();
    }
});



// Adicionar classe a Nav ao scrollar
window.addEventListener('scroll', function () {
    var nav = document.querySelector('.nav');
    if (window.scrollY >= 60) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});



// Hamburguer Menu
document.addEventListener('DOMContentLoaded', function () {
    const hamburgers = document.querySelectorAll('.hamburger');
    const menu = document.querySelector('.menu');
    const galeriaExibition = document.querySelector(".galery-exibition");

    function toggleOverflowClass() {
        // Verifica se a largura da tela é maior que 768px e se a galeria não está ativa
        if (window.innerWidth > 768 && !galeriaExibition.classList.contains('visible')) {
            hamburgers.forEach(hamburger => {
                hamburger.classList.remove('active');
            });
            if (menu) {
                menu.classList.remove('active');
                document.documentElement.classList.remove('overflow-hidden');
            }
        }
    }

    // Adiciona um ouvinte de evento de redimensionamento para verificar automaticamente a largura da tela
    window.addEventListener('resize', toggleOverflowClass);

    // Adiciona o ouvinte de evento de clique para cada hamburguer
    hamburgers.forEach(hamburger => {
        hamburger.addEventListener('click', function () {
            this.classList.toggle('active');
            if (menu) {
                menu.classList.toggle('active');
                document.documentElement.classList.toggle('overflow-hidden');
            }
        });
    });
});



// Carregar Mais
document.addEventListener("DOMContentLoaded", function () {
    const loadMoreButton = document.getElementById("carregarMais");
    const cards = document.querySelectorAll(".card");
    const cardsPorLinha = 4; // Define o número de cards por linha

    // Oculta todos os cards exceto os quatro primeiros
    for (let i = cardsPorLinha; i < cards.length; i++) {
        cards[i].style.display = "none";
    }

    // Função para carregar mais cards
    function carregarMais() {
        // Oculta o texto "Carregar mais"
        loadMoreButton.textContent = "";

        // Adiciona a classe de loading ao botão
        loadMoreButton.classList.add('loading');

        // Encontra o índice do último card visível
        let ultimoCardVisivelIndex = -1;
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].style.display !== "none") {
                ultimoCardVisivelIndex = i;
            }
        }

        // Calcula o índice do primeiro card a ser exibido na próxima linha
        const indiceInicioProximaLinha = ultimoCardVisivelIndex + 1;
        const indiceFimProximaLinha = indiceInicioProximaLinha + cardsPorLinha;

        // Simula um atraso de 1 segundo para demonstrar a animação de loading
        setTimeout(function () {
            // Exibe os próximos cards da próxima linha ou as próximas quatro colunas
            for (let i = indiceInicioProximaLinha; i < indiceFimProximaLinha && i < cards.length; i++) {
                cards[i].style.display = "block";
            }

            // Oculta o botão "Carregar mais" se todos os cards estiverem visíveis
            if (document.querySelectorAll(".card[style='display: none;']").length === 0) {
                loadMoreButton.style.display = "none";

                // Cria e exibe a mensagem "Exibindo todos os resultados"
                const mensagem = document.createElement("p");
                mensagem.textContent = "Exibindo todos os resultados!";
                document.querySelector(".projets").appendChild(mensagem);
            }

            // Remove a classe de loading do botão
            loadMoreButton.classList.remove('loading');

            // Mostra o texto "Carregar mais" novamente
            loadMoreButton.textContent = "Carregar mais";
        }, 1000); // Tempo simulado de carregamento em milissegundos
    }

    // Adiciona um evento de clique ao botão "Carregar mais"
    loadMoreButton.addEventListener("click", carregarMais);
});



// Abrir e Fechar Galery
document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card");
    const galeriaExibition = document.querySelector(".galery-exibition");
    const closeButton = document.getElementById("close");
    const exibitionImgs = document.querySelector('.exibition-imgs');


    // Definir o estilo padrão da galeria como position: absolute
    galeriaExibition.style.position = "absolute";

    // Função para abrir a galeria com transição
    function abrirGaleria(index) {

        // Adicione a classe para controle do overflow do HTML
        document.documentElement.classList.add('overflow-hidden');

        // Exibir a div galeria-exibition com transição de 0.5 segundos
        galeriaExibition.style.transition = "opacity 0.5s, transform 0.5s"; // Adicionar transições de opacidade e transformação
        galeriaExibition.style.visibility = "visible";
        galeriaExibition.style.position = "fixed";
        galeriaExibition.style.opacity = 1; // Definir opacidade para 1 para exibir
        galeriaExibition.classList.add("visible"); // Adicionar classe para controle do zoom

        // Definir o índice do card atual
        cardIndex = index;

        // Contar o número de itens antes do índice atual
        let itemsBefore = 0;
        for (let i = 0; i < index; i++) {
            if (!cards[i].classList.contains("hidden")) {
                itemsBefore++;
            }
        }

        // Calcular o valor de translateX considerando os itens antes do índice atual
        const currentItemTranslateX = -itemsBefore * 100 + "%";

        // Aplicar o valor de translateX ao carrossel
        galeriaExibition.querySelector('.carousel-content-cards').style.transform = `translateX(${currentItemTranslateX})`;
    }

    // Função para fechar a galeria com transição inversa
    function fecharGaleria() {
        // Remova a classe para controle do overflow do HTML
        document.documentElement.classList.remove('overflow-hidden');

        // Ocultar a div galeria-exibition com transição de 0.5 segundos
        galeriaExibition.style.transition = "opacity 0.5s, transform 0.5s"; // Adicionar transições de opacidade e transformação
        galeriaExibition.style.opacity = 0; // Definir opacidade para 0 para ocultar
        galeriaExibition.classList.remove("visible"); // Remover classe para controle do zoom
        setTimeout(() => {
            galeriaExibition.style.visibility = "hidden";
        }, 500); // Definir tempo de espera para ocultar a galeria após a transição
    }

    // Ocultar a div galeria-exibition por padrão
    galeriaExibition.style.visibility = "hidden";
    galeriaExibition.style.opacity = 0; // Definir opacidade inicial

    // Adicionar evento de clique para cada card
    cards.forEach((card, index) => {
        card.addEventListener("click", () => {
            abrirGaleria(index);
        });
    });

    // Adicionar evento de clique para a div galery-exibition
    galeriaExibition.addEventListener("click", (event) => {
        // Se o clique não for em um card dentro da galeria e não for no elemento com a classe "exibition-imgs", feche a galeria
        if (!event.target.closest(".card-galery") && !event.target.closest(".exibition-imgs")) {
            fecharGaleria();
        }
    });

    // Adicionar evento de clique para o botão close
    closeButton.addEventListener("click", fecharGaleria);

    // Adicionar evento de teclado para fechar a galeria ao pressionar "Esc"
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && galeriaExibition.style.visibility === 'visible' && exibitionImgs.style.display === 'none') {
            fecharGaleria();
        }
    });
});



// Elemento Card
document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector('.carousel-container-galery');
    const cards = document.querySelectorAll(".card");
    const galeriaExibition = document.querySelector(".galery-exibition .carousel-content-cards");
    const setaEsquerda = document.querySelector(".seta-esquerda");
    const setaDireita = document.querySelector(".seta-direita");

    let cardIndex; // Declarando a variável cardIndex

    // Função para mostrar o card atual
    function mostrarCardAtual() {
        const cardsGalery = document.querySelectorAll(".aditinal-information");
        cardsGalery.forEach((card, index) => {
            if (index === cardIndex) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
            // Diminuir o tamanho de todos os cards, exceto o atual
            card.style.transform = index === cardIndex ? "scale(0.87)" : "scale(0.5)";
        });
    }

    // Definir o estilo padrão do overflow
    container.style.overflow = "hidden";

    cards.forEach((card, index) => {
        // Extrair informações relevantes do card
        const title = card.querySelector(".desc .subtitle").textContent;
        const description = card.querySelector(".desc .text.short").textContent;
        const details = card.querySelector(".desc .details").textContent;
        const imgSrc = card.querySelector(".main-image").src;
        const additionalImages = card.querySelectorAll(".gallery img:not(.main-image)");

        // Criar um novo elemento para a galeria de exibição
        const cardGaleryItem = document.createElement("div");
        cardGaleryItem.classList.add("aditinal-information");

        // Inserir as informações relevantes dentro do novo elemento
        cardGaleryItem.innerHTML = `
    <div class="colum">
        <div class="cont-gal">
            <div class="gallery">
                <img class="main-image" src="${imgSrc}" alt="">
                    ${getAdditionalImagesHTML(additionalImages)}
            </div>
            <button class="prev">&#10094;</button>
            <button class="next">&#10095;</button>
        </div>
        <h3 class="title-card">${title}</h3>
        <p class="desc">${description}</p>
        <div class="atributes">
            ${card.querySelector(".atributes").innerHTML}
        </div>
    </div>
    <div class="colum">
        <h4 class="subtitle">Detalhes:</h4>
        <p class="details">${details}</p>
    </div>
    `;

        // Adicionar o novo elemento à galeria de exibição
        galeriaExibition.appendChild(cardGaleryItem);

        // Ocultar as partes sobressalentes nos cards principais
        card.querySelector(".text.short").classList.add("hide-in-galery");
        card.querySelector(".atributes").classList.add("hide-in-galery");

        // Adicionar evento de clique para abrir a galeria de exibição quando o card é clicado
        card.addEventListener("click", () => {
            cardIndex = index; // Definir o índice do card atual
            mostrarCardAtual();
        });
    });


    // Mostrar o primeiro item por padrão
    mostrarCardAtual();

    // Adicionar evento de clique para a seta esquerda
    setaEsquerda.addEventListener("click", () => {
        cardIndex--;
        if (cardIndex < 0) {
            cardIndex = cards.length - 1; // Voltar ao último card se estiver no primeiro
        }
        mostrarCardAtual();
        // Deslocar o conteúdo para a esquerda
        galeriaExibition.style.transform = `translateX(-${cardIndex * 100}%)`;
        // Aumentar o tamanho do card
        galeriaExibition.children[cardIndex].style.transform = "scale(0.87)";
    });


    // Adicionar evento de clique para a seta direita
    setaDireita.addEventListener("click", () => {
        cardIndex++;
        if (cardIndex >= cards.length) {
            cardIndex = 0; // Voltar ao primeiro card se estiver no último
        }
        mostrarCardAtual();
        // Deslocar o conteúdo para a direita
        galeriaExibition.style.transform = `translateX(-${cardIndex * 100}%)`;
        // Aumentar o tamanho do card
        galeriaExibition.children[cardIndex].style.transform = "scale(0.87)";
    });

    // Função para obter o HTML das imagens adicionais
    function getAdditionalImagesHTML(images) {
        let html = "";
        images.forEach((image) => {
            html += `<img src="${image.src}" alt="">`;
        });
        return html;
    }
});



// Elemento Gallery
document.addEventListener("DOMContentLoaded", function () {
    const galleries = document.querySelectorAll('.gallery');
    const prevButtons = document.querySelectorAll('.prev');
    const nextButtons = document.querySelectorAll('.next');
    const exibitionImgs = document.querySelector('.exibition-imgs');
    const gale = document.querySelector('.galery-exibition');

    // Adiciona eventos de clique para os botões "Prev" em todas as galerias
    prevButtons.forEach((prevButton, index) => {
        prevButton.addEventListener('click', function () {
            const gallery = galleries[index];
            const imageWidth = gallery.querySelector('img').clientWidth;
            const scrollAmount = gallery.scrollLeft - imageWidth;
            const totalWidth = gallery.scrollWidth;
            const threshold = 10; // Limite de rolagem para considerar o início do carrossel
            if (scrollAmount < 0) {
                gallery.scrollTo({
                    left: totalWidth - gallery.clientWidth,
                    behavior: 'smooth'
                });
            } else {
                gallery.scrollTo({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Adiciona eventos de clique para os botões "Next" em todas as galerias
    nextButtons.forEach((nextButton, index) => {
        nextButton.addEventListener('click', function () {
            const gallery = galleries[index];
            const imageWidth = gallery.querySelector('img').clientWidth;
            const scrollAmount = gallery.scrollLeft + imageWidth;
            const totalWidth = gallery.scrollWidth;
            const threshold = totalWidth - gallery.clientWidth - 10; // Limite de rolagem para considerar o fim do carrossel
            if (scrollAmount >= totalWidth) {
                gallery.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            } else {
                gallery.scrollTo({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Define padrão como 'none'
    exibitionImgs.style.display = 'none';

    // Adicionar evento de clique para cada imagem na galeria
    galleries.forEach(gallery => {
        const images = gallery.querySelectorAll('.galery-exibition img');
        images.forEach(image => {
            image.addEventListener('click', function () {
                const src = this.getAttribute('src');
                const exhibitionGallery = document.querySelector('.imgs-exi');
                exhibitionGallery.innerHTML = `<img src="${src}" alt="exibtion-galery">`;

                // Modifica o estilo para display block
                exibitionImgs.style.display = 'block';

                // Adiciona a classe overflow-hidden aos elementos htms e gale
                gale.classList.add('overflow-hidden');
            });
        });

        // Adiciona evento de clique para exibitionImgs para retornar ao 'none'
        exibitionImgs.addEventListener('click', function (event) {
            // Verifica se o clique foi dentro do elemento .imgs-exi
            if (!event.target.closest('.imgs-exi')) {
                // Remove a classe overflow-hidden dos elementos htms e gale
                gale.classList.remove('overflow-hidden');

                this.style.display = 'none';
            }
        });

        // Adiciona evento de teclado para fechar a galeria ao pressionar "Esc"
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && exibitionImgs.style.display === 'block') {
                // Remove a classe overflow-hidden dos elementos gale
                gale.classList.remove('overflow-hidden');

                exibitionImgs.style.display = 'none';
            }
        });
    });

});



// Ocultar Infos
document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card");

    // Iterar sobre cada card para desabilitar as informações
    cards.forEach((card) => {
        // Ocultar o elemento .details, se existir
        const details = card.querySelector(".details");
        if (details) {
            details.style.display = "none";
        }

        // Ocultar o elemento .atributes, se existir
        const atributes = card.querySelector(".atributes");
        if (atributes) {
            atributes.style.display = "none";
        }

        // Ocultar os botões dentro do card
        const buttons = card.querySelectorAll("button");
        buttons.forEach((button) => {
            button.style.display = "none";
        });

        // Ocultar todas as imagens na galeria, exceto a primeira
        const galleryImages = card.querySelectorAll(".gallery :not(:first-child)");
        galleryImages.forEach((image) => {
            image.style.display = "none";
        });
    });
});



// Sobre mim scroll
document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector('.carousel-container');
    const scrollOffset = 100; // Valor do deslocamento 100% do tamanho
    const extraScroll = 0; // Inclui o valor de margens e paddings

    // Adiciona a propriedade overflow: hidden ao estilo do contêiner
    container.style.overflow = 'hidden';

    let autoScrollInterval;

    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            const scrollLeft = container.scrollLeft;
            const scrollWidth = container.scrollWidth;
            const offsetWidth = container.offsetWidth;
            const newScrollLeft = Math.min(scrollLeft + offsetWidth + extraScroll, scrollWidth - offsetWidth);

            smoothScroll(container, scrollLeft, newScrollLeft, 500); // 500 é a duração da animação em milissegundos
        }, 5000); // 5000 milissegundos = 5 segundos
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    container.addEventListener('mouseenter', stopAutoScroll);
    container.addEventListener('touchstart', stopAutoScroll);

    container.addEventListener('mouseleave', startAutoScroll);
    container.addEventListener('touchend', startAutoScroll);

    startAutoScroll(); // Inicia o scroll automático

    container.addEventListener('click', (event) => {
        const scrollLeft = container.scrollLeft;
        const offsetWidth = container.offsetWidth;
        const clickX = event.clientX - container.getBoundingClientRect().left;

        if (clickX > offsetWidth / 2) {
            // Mover para a direita
            const newScrollLeft = Math.min(scrollLeft + offsetWidth + extraScroll, container.scrollWidth - offsetWidth);
            smoothScroll(container, scrollLeft, newScrollLeft, 500); // 500 é a duração da animação em milissegundos
        } else {
            // Mover para a esquerda
            const newScrollLeft = Math.max(scrollLeft - offsetWidth - extraScroll, 0);
            smoothScroll(container, scrollLeft, newScrollLeft, 500); // 500 é a duração da animação em milissegundos
        }
    });

    // Adiciona os eventos de toque para dispositivos móveis
    let startX;
    container.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX;
    });

    container.addEventListener('touchend', (event) => {
        const endX = event.changedTouches[0].clientX;
        const scrollLeft = container.scrollLeft;
        const offsetWidth = container.offsetWidth;

        if (endX > startX + offsetWidth / 2) {
            // Mover para a esquerda
            const newScrollLeft = Math.max(scrollLeft - offsetWidth - extraScroll, 0);
            smoothScroll(container, scrollLeft, newScrollLeft, 500); // 500 é a duração da animação em milissegundos
        } else if (endX < startX - offsetWidth / 2) {
            // Mover para a direita
            const newScrollLeft = Math.min(scrollLeft + offsetWidth + extraScroll, container.scrollWidth - offsetWidth);
            smoothScroll(container, scrollLeft, newScrollLeft, 500); // 500 é a duração da animação em milissegundos
        }
    });

    function smoothScroll(element, start, end, duration) {
        const startTime = performance.now();
        const animateScroll = () => {
            const now = performance.now();
            const timeElapsed = now - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutQuad(progress);
            const newScrollLeft = start + (end - start) * ease;

            element.scrollLeft = newScrollLeft;

            // Verifica se o scroll atingiu o final do conteúdo
            if (newScrollLeft + element.offsetWidth >= element.scrollWidth) {
                // Se atingir, rola o conteúdo de volta ao início
                element.scrollLeft = 0;
                // Reinicia a animação para tornar a rolagem infinita
                startTime = now;
            } else if (timeElapsed < duration) {
                // Continua a animação se ainda não atingiu a duração especificada
                requestAnimationFrame(animateScroll);
            }
        };
        animateScroll();
    }

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
});