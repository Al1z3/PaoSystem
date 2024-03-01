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
import { connect } from 'react-redux';

import { Card } from '../Models/Card';
import * as commonStyle from '../utils/commonStyles';

const myCard = (props: any) => {


    const deleteCard = (id: number) => {
        const action = { type: 'REMOVE_CARD_IN_LIST', value: id };
        props.dispatch(action);
    };

    const modifyCard = (modifiedCard) => {
        const action = { type: 'MODIFY_CARD_IN_LIST', value: modifiedCard };
        props.dispatch(action);
    };


    const CardDetails = (id, Personnage, Action, Objet, src) => {
        props.navigation.navigate('z', {
            id: id,
            Personnage: Personnage,
            Action: Action,
            Objet: Objet,
            src: src,
        });
    };
    const shuffleCards = () => {
        const shuffledCards = [...props.arrayCardSend].sort(() => Math.random() - 0.5);
        const action = { type: 'SHUFFLE_CARDS', value: shuffledCards };
        props.dispatch(action);
    };
    const sortCards = (order) => {
        if (order === 'ASC') {
            props.dispatch({ type: 'SORT_CARDS_ASC' });
        } else {
            props.dispatch({ type: 'SORT_CARDS_DESC' });
        }
    };

    const [isEditing, setIsEditing] = useState(false);
    const [currentCard, setCurrentCard] = useState(null);
    const onEdit = (card) => {
        setCurrentCard(card);
        setIsEditing(true);
    };
    const handleSaveEdit = (editedCard) => {
        modifyCard(editedCard);
        setIsEditing(false);
    };

    return (
        <View style={styles.mainContainer}>
            <FlatList
                style={{ flex: 1, marginTop: 50, }}
                data={props.arrayCardSend}
                numColumns={2}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) =>
                    <CardItem
                        card={item}
                        onClickCard={CardDetails}
                        onDelete={deleteCard}
                        onEdit={onEdit}
                    />
                }
            />
            {isEditing && (
                <EditCardForm
                    card={currentCard}
                    onSave={handleSaveEdit}
                    onCancel={() => setIsEditing(false)}
                />
            )}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.shuffleButton} onPress={shuffleCards}>
                    <Text style={styles.shuffleButtonText}>Mélanger les cartes</Text>
                </TouchableOpacity>

                <View style={styles.sortButtons}>
                    <TouchableOpacity style={styles.sortButton} onPress={() => sortCards('ASC')}>
                        <Text style={styles.sortButtonText}>Trier ASC</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sortButton} onPress={() => sortCards('DESC')}>
                        <Text style={styles.sortButtonText}>Trier DESC</Text>
                    </TouchableOpacity>
                </View>
            </View>



        </View>
    );
};

const CardItem = ({ card, onClickCard, onDelete, onEdit }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <TouchableOpacity onPress={toggleDetails}>
            {showDetails ? (
                <View style={styles.cardContainer}>
                <Text style={styles.title_text}>
                    <Text style={styles.label}>Personnage: </Text>
                    <Text style={styles.value}>{card.Personnage}</Text>
                </Text>
                <Text style={styles.title_text}>
                    <Text style={styles.label}>Action: </Text>
                    <Text style={styles.value}>{card.Action}</Text>
                </Text>
                <Text style={styles.title_text}>
                    <Text style={styles.label}>Objet: </Text>
                    <Text style={styles.value}>{card.Objet}</Text>
                </Text>
            </View>
            
            ) : (
                <View style={styles.cardContainer}>
                    <Image style={styles.image} source={card.src} />
                </View>
            )}
            <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(card.id)}>
                <Text style={styles.deleteButtonText}>Supprimer</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};




const styles = StyleSheet.create({
    details_container: {
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 10,
        ...commonStyle.elevationButton,
        
    },

    main_container: {
        flexDirection: 'row',
        marginLeft: 50,
        backgroundColor: '#BDB0D9',
    },

    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#BDB0D9',
        marginHorizontal: 10, // Espace horizontal entre les cartes
        marginVertical: 10, // Espace vertical entre les cartes
 
 
    },
    image: {


    },
    buttonContainer: {
        flexDirection: 'row', // Alignement horizontal des enfants
        justifyContent: 'space-between', // Espace entre les groupes de boutons
        alignItems: 'center', // Alignement vertical au centre
        padding: 10, // Espacement autour du conteneur
        backgroundColor: '#BDB0D9',
    },
    sortButtons: {
        flexDirection: 'column', // Alignement vertical des boutons de tri
    },

    content_container: {
        flex: 1,
        margin: 5,
        backgroundColor: '#BDB0D9'
        
    },
    header_container: {
        flex: 3,
        flexDirection: 'row',
        backgroundColor: '#BDB0D9'
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#BDB0D9'
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
    },
    level_text: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 12,
        color: '#666666',
    },
    container: {
        padding: 20,
        backgroundColor: '#BDB0D9',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
    label: {
        fontWeight: 'bold',
        color: '#A68881',

    },
    value: {
        fontWeight: 'normal',
        color: '#7D6AA6',
    
    },

    shuffleButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10,

    },
    shuffleButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    deleteButton: {
        backgroundColor: '#FF5733',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    sortButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignSelf: 'center',
        marginTop: 10,
    },
    sortButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
function EditCardForm({ card, onSave, onCancel }) {
    const [personnage, setPersonnage] = useState(card.personnage);
    const [action, setAction] = useState(card.action);
    const [objet, setObjet] = useState(card.objet);

    const handleSubmit = () => {
        onSave({ ...card, personnage, action, objet });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={personnage}
                onChangeText={setPersonnage}
                placeholder="Personnage"
            />
            <TextInput
                style={styles.input}
                value={action}
                onChangeText={setAction}
                placeholder="Action"
            />
            <TextInput
                style={styles.input}
                value={objet}
                onChangeText={setObjet}
                placeholder="Objet"
            />
            <Button title="Sauvegarder" onPress={handleSubmit} />
            <Button title="Annuler" onPress={onCancel} />
        </View>
    );
}





const mapStateToProps = (state: any) => {
    return {
        arrayCardSend: state.arrayCardSend.arrayCardSend
    };
};


export default connect(mapStateToProps)(myCard);