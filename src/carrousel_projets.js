// Configuration des projets
const projets = [
    {
        id: 1,
        nom: "Snake",
        image: "../../Photo/snake_image.png",
        description: "Un projet classique auquel la plupart des développeurs ont été confrontés. Codé en Python, ce projet a été celui qui a initié ma passion pour l'informatique. Il aborde des concepts assez complexes, comme la programmation orientée objet, de manière très simple.",
        details: "J'ai réalisé ce projet seul et en autodidacte, après avoir appris les bases du langage Python. Ce dernier m'a permis d'acquérir des connaissances en développement orienté objet, tant au niveau de la syntaxe que des concepts, ainsi qu'en programmation Python.",
        lienGithub: "https://github.com/clementsellier/Snake-Python",
        videos: [
            { src: "../../Videos/VideoProjetSnake.mp4", description: "Code du projet" },
            { src: "../../Videos/VideoSnakeJeu.mp4", description: "Démonstration du jeu" }
        ]
    },
    {
        id: 2,
        nom: "Jeu de Monstres",
        image: "../../Photo/PhotoPartie.png",
        description: "Ce jeu a été créé dans le cadre de ma formation, afin de mettre en application nos connaissances en langage C. En binôme, il nous a été demandé de créer un jeu console basé sur le principe du Pierre, Feuille, Ciseaux.",
        details: "Dans ce jeu, nous incarnons un chevalier dont le but est de combattre des monstres, un par un, à travers plusieurs niveaux de difficulté où les ennemis deviennent progressivement plus difficiles à vaincre. Il nous a également été demandé d'utiliser des structures que nous avons abordées lors de nos cours d'algorithmique.",
        lienGithub: null,
        videos: []
    },
    {
        id: 3,
        nom: "Cops'N Robbers",
        description: "Le concept de ce projet est de créer un jeu multijoueur en ligne où des joueurs incarnent soit des policiers, soit des voleurs. Les policiers doivent attraper les voleurs, tandis que les voleurs doivent éviter d'être capturés et tout ceux en se déplaçant tour à tour sur un graphe qui représente le plateau de jeu.<br>",
        details: "J'ai développé ce projet en groupe dans le cadre de ma formation en utilisant différents langages comme le PHP, le C# dont nottamenet le framework Entity ou encore le javaScript. Le but de ce projet était de nous familiariser avec le développement sur différents types de clients car nous devons faire en sorte de créer un jeu jouable sur plusieurs plateformes et ces plateformes doivent par conséquent partager les mêmes informations. <br><br> Ce projet est toujours en cours de développement cependant, la plupart du travail a déjà été effectué.",
        image: [
            "../../Photo/Cops'n_robber_partie.png"
        ],
        lienGithub: null,
        videos: [
            { src: "../../Videos/Cops'n_robber_video_partie.mp4", description: "Partie en cours (Le policier capture le voleur ce qui mets fin à la partie)" }
        ]
    }
];

// Création du HTML du carrousel
function creerCarrousel() {
    const section = document.getElementById('Projets');
    
    const html = `
    <h2>Mes projets</h2>
        <div class="carousel-container">
            <button class="carousel-btn prev-btn" id="prevBtn">‹</button>
            <div class="carousel-wrapper">
                <div class="carousel-track" id="carouselTrack">
                    ${projets.map(projet => `
                        <div class="projet-card" data-projet-id="${projet.id}">
                            <h3 class="projetTitre">${projet.nom}</h3>
                            ${projet.image ? `<img src="${projet.image}" alt="${projet.nom}" class="projet-image">` : '<div class="no-image">Image à venir</div>'}
                        </div>
                    `).join('')}
                </div>
            </div>
            <button class="carousel-btn next-btn" id="nextBtn">›</button>
        </div>
    `;
    
    section.innerHTML = html;
    
    // Créer la modal EN DEHORS de #Projets, directement dans le body
    const modalHTML = `
        <div class="modal" id="projetModal">
            <div class="modal-content">
                <span class="close-btn">&times;</span>
                <div id="projetModalBody"></div>
            </div>
        </div>
    `;
    
    // Ajouter la modal à la fin du body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Création du contenu de la modale
function creerContenuModal(projet) {
    try {
        const html = `
            <h2>${projet.nom}</h2>
            <p class="description">${projet.description}</p>
            <p class="details">${projet.details}</p>
            ${projet.lienGithub ? `
                <p class="github-link">
                    Voici le lien vers le <a href="${projet.lienGithub}" target="_blank">code source</a>
                </p>
            ` : ''}
            ${projet.videos && projet.videos.length > 0 ? `
                <div class="videos-container">
                    ${projet.videos.map(video => `
                        <div class="video-wrapper">
                            <video controls loop>
                                <source src="${video.src}" type="video/mp4">
                            </video>
                            <p class="video-description">${video.description}</p>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        `;
        
        return html;
    } catch (error) {
        console.error('Erreur lors de la création du contenu:', error);
        return '<p>Erreur lors du chargement du contenu</p>';
    }
}

// Gestion du carrousel
function initialiserCarrousel() {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;
    const cardWidth = 320; 
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }
    });
    
    nextBtn.addEventListener('click', () => {
        const maxIndex = projets.length - Math.floor(track.parentElement.offsetWidth / cardWidth);
        if (currentIndex < maxIndex) {
            currentIndex++;
            track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }
    });
}

// Gestion de la modale - VERSION DEBUG
function initialiserModal() {
    const modal = document.getElementById('projetModal');
    const closeBtn = modal.querySelector('.close-btn');
    const modalBody = document.getElementById('projetModalBody'); // CORRECTION ICI
    const cards = document.querySelectorAll('.projet-card');
    
    console.log('Modal:', modal);
    console.log('Modal body:', modalBody);
    console.log('Close btn:', closeBtn);
    console.log('Nombre de cartes:', cards.length);
    
    // Fonction pour ouvrir la modal
    function ouvrirModal(projet) {
        console.log('=== OUVERTURE MODAL ===');
        console.log('Projet:', projet);
        
        const contenu = creerContenuModal(projet);
        console.log('Contenu généré:', contenu);
        
        modalBody.innerHTML = contenu;
        console.log('ModalBody après innerHTML:', modalBody.innerHTML);
        
        modal.style.display = 'block';
        console.log('Modal display:', modal.style.display);
        
        document.body.classList.add('modal-open');
        modal.style.zIndex = '9999';
        
        // Vérification finale
        setTimeout(() => {
            console.log('Vérification après 100ms:');
            console.log('Modal visible?', modal.style.display);
            console.log('Contenu présent?', modalBody.innerHTML.length);
            console.log('Modal content visible?', document.querySelector('.modal-content'));
        }, 100);
    }
    
    // Fonction pour fermer la modal
    function fermerModal() {
        console.log('=== FERMETURE MODAL ===');
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        modalBody.innerHTML = '';
    }
    
    // Événements de clic sur les cartes
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const projetId = parseInt(card.dataset.projetId);
            const projet = projets.find(p => p.id === projetId);
            
            if (projet) {
                ouvrirModal(projet);
            }
        });
    });
    
    // Fermeture avec le bouton X
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            fermerModal();
        });
    }
    
    // Fermeture en cliquant sur le fond
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            fermerModal();
        }
    });
    
    // Fermeture avec la touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            fermerModal();
        }
    });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    creerCarrousel();
    initialiserCarrousel();
    
    // Attendre que la modal soit bien dans le DOM avant d'initialiser
    setTimeout(() => {
        initialiserModal();
    }, 0);
});