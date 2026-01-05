// Données des compétences
const skills = [
    {
        name: 'HTML',
        icon: 'HTML',
        description: 'Langage de balisage pour structurer les pages web. Maîtrise des balises sémantiques, formulaires, et des standards HTML5 pour créer des structures web accessibles et bien organisées.'
    },
    {
        name: 'CSS',
        icon: 'CSS',
        description: 'Feuilles de style en cascade pour la mise en forme. Compétence en Flexbox, Grid, animations, et responsive design pour créer des interfaces modernes et adaptatives.'
    },
    {
        name: 'PHP',
        icon: 'PHP',
        description: 'Langage de script côté serveur pour le développement web dynamique. Expérience avec la gestion de sessions, bases de données MySQL, et création d\'APIs.'
    },
    {
        name: 'Python',
        icon: 'PY',
        description: 'Langage polyvalent pour le développement logiciel, scripting et data science. Connaissance des bibliothèques standards, manipulation de données et automatisation de tâches.'
    },
    {
        name: 'C',
        icon: 'C',
        description: 'Langage de programmation bas niveau pour la performance. Maîtrise de la gestion mémoire, pointeurs, et programmation système pour des applications efficaces.'
    },
    {
        name: 'C++',
        icon: 'C++',
        description: 'Extension orientée objet du C. Compétences en POO, templates, STL et développement d\'applications performantes avec gestion avancée de la mémoire.'
    },
    {
        name: 'Shell',
        icon: 'SH',
        description: 'Scripts pour l\'automatisation système et DevOps. Maîtrise de Bash, automatisation de tâches, gestion de fichiers et administration système sous Linux.'
    },
    {
        name: 'Anglais',
        icon: 'EN',
        description: 'Niveau professionnel en anglais technique. Capacité à lire la documentation, communiquer avec des équipes internationales et rédiger du contenu technique en anglais.'
    },
    {
        name: 'Java',
        icon: 'JAVA',
        description: 'Langage de programmation orienté objet pour applications multiplateformes. Expérience avec les concepts de POO, gestion des exceptions, et développement d\'applications robustes.'
    }
];

// Fonction pour générer les cartes de compétences
function renderSkills() {
    const column1 = document.getElementById('skillsColumn1');
    const column2 = document.getElementById('skillsColumn2');
    
    skills.forEach((skill, index) => {
        const card = document.createElement('div');
        card.className = 'SkillCard';
        card.onclick = () => openModal(index);
        
        card.innerHTML = `
            <div class="SkillIcon">${skill.icon}</div>
            <div class="SkillName">${skill.name}</div>
        `;
        
        
        if (index < 5) {
            column1.appendChild(card);
        } else {
            column2.appendChild(card);
        }
    });
}

// Fonction pour ouvrir la modal
function openModal(index) {
    const skill = skills[index];
    document.getElementById('modalIcon').textContent = skill.icon;
    document.getElementById('modalTitle').textContent = skill.name;
    document.getElementById('modalBody').textContent = skill.description;
    document.getElementById('modal').classList.add('active');
}

// Fonction pour fermer la modal
function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

// Fermer la modal en cliquant sur le fond
document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Fermer la modal avec la touche Échap
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', renderSkills);