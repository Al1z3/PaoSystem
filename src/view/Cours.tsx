import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    FlatList,
    Button,
    TouchableOpacity,
    TextInput
} from 'react-native';

const Cours = (props: any) => {
    const [searchText, setSearchText] = useState('');
    const [submittedSearch, setSubmittedSearch] = useState('');

    const handleSubmit = () => {
        setSubmittedSearch(searchText);
    };

    const highlightText = (text, search) => {
        if (!search) return text;

        const regex = new RegExp(`(${search})`, 'g');
        const parts = text.split(regex);

        return parts.map((part, index) =>
            part === search ? <Text key={index} style={styles.highlightedText}>{part}</Text> : part
        );
    };



    return (
        <View style={styles.container}>
            <View style={styles.Ajust}>
                <View style={styles.searchSection}>
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Rechercher..."
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                    <TouchableOpacity onPress={handleSubmit} style={styles.searchButton}>
                        <Text style={styles.searchButtonText}>Rechercher</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <ScrollView style={styles.scrollViewStyle}>
                <Text style={styles.titleStyle}>
                {highlightText('Mnemonic', submittedSearch)}
                </Text>
                <Text style={styles.paragraphStyle}>
                {highlightText('La mémoire, cette fascinante bibliothèque intérieur que nous possédons, remplit de livres de souvenirs. Imaginez que vous pouvez accéder à ces livres à votre guise et que pour cela il suffit juste de tourner les bonnes pages. Imaginez que vos examens que ce soit un contrôle de fin d\'années, un partiel ou même une certification que vous aillez plus besoin de les apprendres. Imaginez que vous pouvez retranscrire tout les souvenirs que vous avez vécu avec votre famille ou amies. Imaginez ! Imaginez que cela est possible.', submittedSearch)} 
                    </Text >
                <Text style={styles.paragraphStyle}>
                {highlightText('Les mnemonics sont des techniques d\'apprentissage pour amélioré la rétention et la récupération de toutes sortes informations.J\'était moi même dubitatif sur ces techniques au début de mon apprentissage, mais j\'en ai vue très vite les effets. En 2 semaine d\'apprentissage avec quelques minutes d\'entrainements par jours, j\'ai réussi à retenir mon premier jeux de 52 cartes aléatoires. J\'étais donc capable de récité le numéro de la cartes, son signe et sa position dans le paquet. Cela parrai impressionnant au premier coup d\'œil et vous ferra beaucoup brillier en soiré. Mais quand vous connaissez la technique, apprendre un jeux de cartes par coeur devient tout de suite anodin. Le premier Arcticle de cette rubrique parlera donc de cette technique \"PAO System\" qui à énormément de qualité mais possèdent un seul défaut, C\'est que vos amis voudront plus jouer au cartes avec vous !', submittedSearch)}</Text>
                <Text style={styles.titleStyle}>
                    {highlightText('PAO System', submittedSearch)}
                </Text>
                <Text style={styles.paragraphStyle}>
                {highlightText('PAO system signifie Personne-Action-Objet est une technique de mémorisation dont chaque élément d\'informations peut être associé à une personne, une action et un objet. Un exemple vaudra toujours mieux que de longue explications. L\' élément d\'informations que je choisie sera donc le 5 de coeur, j\'aurai pu choisir d\'autre élément d\'informations comme une table, un numéro ou même un monument.Une fois j\'ai mon 5 de coeur, je vais lui associer un personnage qui sera donc .... Heinstein, une action comme la lecture et un objet qu\'on représentera par une École. Un Objet est pour moi un élément physique.', submittedSearch)}
                    </Text>
                <Text style={styles.paragraphStyle}>
                {highlightText('Notre 5 de coeur est donc Einstein qui lit à l\'école. Nous avons donc notre premier élément construit avec le System PAO. Nous allons ajouter 2 autres élément d\'informations comme le 8 de piques qui sera Lewis Hamilton (Personnage) qui promène (Action) son chien (Objet) et le 9 de coeurs qui sera Steven Spielberg qui film dans un studio.', submittedSearch)}
                </Text>
                <Text style={styles.paragraphStyle}>
                {highlightText('Je vous pose la question comment retiendrez vous le 5 de coeurs, le 8 de piques et le 9 de coeurs ?', submittedSearch)}</Text>
                <Text style={styles.paragraphStyle}>
                {highlightText('Si votre réponses et de les retenirs les numéros en se represantent les scènes. Ceci n\'est pas la réponses la plus évidente car dans le cas d\'un jeux de 52 cartes. Vous aurez 52 scènes à retenir, ce qui ai trop. Si je vous dis que vous en avez juste 17 scènes à retenir. Avez vous une idée de comment cela est possible ?', submittedSearch)}</Text>
                <Text style={styles.paragraphStyle}>
                {highlightText('Cela est possible en prenant le personnage du premier élément d\'informations, l\'action du 2 ème et l\'objet du 3 élément d\'information. Ce qui dans notre cas donnerai : \"Einstein qui se promène dans un studio.\" Nous avons donc à présent 1 scène pour 3 élément. Donc pour retenir le jeux de cartes en entier il faudra donc 17 scènes à mémorisé, ce qui ai mieux que 52. ', submittedSearch)}</Text>
                <Text style={styles.paragraphStyle}>
                {highlightText('Je vous conseils au début de commencer à apprendre un jeux de cartes cela est un bonne entrainement pour connaitre les bases de plusieurs notions des Mnemonics', submittedSearch)}</Text>
                <Text style={styles.paragraphStyle}>
                {highlightText('Dans un premier temps commencer par appliquer le system PAO de 3 cartes en 3 cartes. Vous pouvez commencer par les cartes de coeur, puis piques, carreaux et streffle. Ne vous pressipité pas, avancé de petit à petit.', submittedSearch)}</Text>
                <Text style={styles.paragraphStyle}>
                {highlightText('Pour vous souvenirs plus simplement des cartes regrouper les par familles, dans mon cas les cartes commencant par 5 sont des intélectuel, 8 des pilotes de F1, 9 des réalisateurs, 2 ma familles, 3 mes amies et ensuite suite à vous d\'innover!.', submittedSearch)}</Text>
                <Text style={styles.paragraphStyle}>
                {highlightText(' Tout à l\'heure nous avons parler qu\'il faudrait retenir 17 scènes.  Mais comment se souvenir de ces 17 scènes ? Pour s\'en souvenirs il faudra stocker ces scènes dans un Palais Mémoriel. Se sera donc le prochaine sujet abordé les Palais Mémoriels.', submittedSearch)}</Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 30, // Taille de la police
        fontWeight: 'bold', // Poids de la police
        color: '#A68881', // Couleur du texte, ici noir
        textAlign: 'center', // Centrer le texte
        marginTop: 40, // Marge en haut
        marginBottom: 20, // Marge en bas

    },
    Ajust: {
        marginTop:40,
    },
    scrollViewStyle: {

        paddingHorizontal: 10, // Espace horizontal pour un meilleur rendu
        paddingTop: 10, // Espace en haut

    },
    paragraphStyle: {
        fontSize: 16,
        color: '#553159', // Couleur du texte, généralement plus sombre pour une meilleure lisibilité
        lineHeight: 24, // Hauteur de ligne pour l'espacement des lignes
        textAlign: 'justify', // Alignement du texte, 'justify' pour un alignement justifié peut être une bonne option pour les paragraphes
        marginTop: 10, // Marge en haut
        marginBottom: 10, // Marge en bas
        paddingHorizontal: 10, // Padding horizontal pour ne pas coller sur les bords de l'écran ou du conteneur

    },
    highlightedText: {
        backgroundColor: 'yellow',
    },
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#BDB0D9',
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    searchBar: {
        flex: 1,
        height: 40,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 5,
    },
    searchButton: {
        marginLeft: 10,
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
    },
    searchButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Cours;