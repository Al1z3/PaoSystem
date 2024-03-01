Mon Application est une app qui aide à la mémoire pour l’instant elle consiste à se connecter en tant qu’utilisateur et participer à un cours appeler PAO system. Le PAO système est PAO system qui signifie Personne-Action-Objet est une technique de mémorisation dont chaque élément d'informations peut être associé à une personne, une action et un objet. Un exemple vaudra toujours mieux que de longue explications. L' élément d'informations que je choisie sera donc le 5 de coeur, j'aurai pu choisir d'autre élément d'informations comme une table, un numéro ou même un monument. 

Une fois j'ai mon 5 de coeur, je vais lui associer un personnage qui sera donc .... Heinstein, une action comme la lecture et un objet qu'on représentera par une École. Un Objet est pour moi un élément physique.

Notre 5 de coeur est donc Einstein qui lit à l'école. Nous avons donc notre premier élément construit avec le System PAO.

Nous allons ajouter 2 autres élément d'informations comme le 8 de piques qui sera Lewis Hamilton (Personnage) qui promène (Action) son chien (Objet) et le 9 de coeurs qui sera Steven Spielberg qui film dans un studio.

Cela est possible en prenant le personnage du premier élément d'informations, l'action du 2 ème et l'objet du 3 élément d'information. Ce qui dans notre cas donnerai : "Einstein qui se promène dans un studio."

Nous avons donc à présent 1 scène pour 3 élément. Donc pour retenir le jeux de cartes en entier il faudra donc 17 scènes à mémorisé, ce qui ai mieux que 52. 

  

Dans le Cours PAO System nous pouvons donc attribuer à un jeux de 52 Cartes un personnage une action et un Objet. Nous avons ensuite un onglets myCard ou l’utilisateur de créer leurs propres associations PAO pour chaque carte. Chaque personne a des souvenirs et des associations uniques qui peuvent rendre la mémorisation plus efficace. Des que nous avons attribuer ces éléments à une carte la carte est ajouté à my card. Nous pouvons ensuite mélanger les cartes dans mycard  et quand nous cliquons sur la carte nous avons accès à notre PAO. L’objectif est donc de ce rappeler de notre PAO avant de cliquer sur la carte pour vérifier qu’oon à bon.  

# Fonctionnalités

Gestion de Compte Utilisateur : Permet aux utilisateurs de créer, visualiser et gérer leurs comptes, assurant une expérience personnalisée.
Authentification Sécurisée : Intègre un système d'authentification robuste pour garantir la sécurité des informations utilisateur.
Affichage et Gestion de Cartes : Présente une liste de cartes interactives, permettant une manipulation facile et une visualisation claire des données.
Intégration Supabase : Utilise Supabase pour une gestion efficace des données en arrière-plan, assurant rapidité et fiabilité.
Style Cohérent : Utilise des styles communs pour maintenir une cohérence visuelle à travers l'application.
Fonctionnalités Éducatives : Propose des composants pour l'éducation et l'apprentissage, enrichissant l'expérience utilisateur.

# Détails des Fichiers Principaux

App.tsx : Point d'entrée principal de l'application. Initialise l'application et intègre des configurations de base.
Account.tsx : Gère l'affichage et la modification des informations du compte utilisateur.
Auth.tsx : Implémente la logique d'authentification, incluant la connexion et l'inscription.
CardList.tsx : Affiche une liste de cartes, permettant une interaction et une visualisation efficaces.
supabase.ts : Configure et initialise la connexion avec la base de données Supabase.
Card.tsx : Représente un composant de carte individuelle pour l'affichage détaillé.
configureStore.tsx : Configure le store Redux pour la gestion de l'état global de l'application.
arrayCardSendReducer.tsx : Un reducer Redux pour gérer l'état d'une collection de cartes.
commonStyles.tsx : Définit des styles réutilisables pour maintenir une apparence uniforme.
Cours.tsx : Fournit des composants liés à des fonctionnalités éducatives.
Home.tsx : Sert de composant principal pour la page d'accueil de l'application, orchestrant l'affichage des divers éléments et fonctionnalités clés.
myCard.tsx : Gère la logique et la présentation d'une carte personnalisée, permettant aux utilisateurs de visualiser et d'interagir avec des données spécifiques.
