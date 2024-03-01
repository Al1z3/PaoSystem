import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList, Button, TouchableOpacity, TextInput } from 'react-native';
import { Card } from '../Models/Card'
import { listcardOriginal } from '../data/CardList';
import { useState, useEffect } from 'react'
import * as commonStyles from '../utils/commonStyles'
import { connect } from 'react-redux'
const Home = (props) => {
    const [listcard, setlistcard] = useState(listcardOriginal);
    const [counterCard, setCounterCard] = useState(0);
    const [enteredAction, setEnteredAction] = useState('');
    const [enteredPersonnage, setEnteredPersonnage] = useState('');
    const [enteredObjet, setEnteredObjet] = useState('');
    const onNext = () => {
        if (counterCard === listcard.length - 1) {
            setCounterCard(0);


        } else {
            setCounterCard(counterCard + 1);
        }
    }

    const onPrevious = () => {
        if (counterCard === 0) {
            setCounterCard(listcard.length - 1);
        } else {
            setCounterCard(counterCard - 1);
        }
    }
    const getPersonnageCard = (ObjetCard: string) => {
        console.log(ObjetCard);

    }
    const modifyCardAction = (cardId, newAction) => {
        setlistcard(listcard.map(card =>
            card.id === cardId ? { ...card, Action: enteredAction } : card
        ));
    };
    const modifyCardPersonnage = (cardId, newPersonnage) => {
        setlistcard(listcard.map(card =>
            card.id === cardId ? { ...card, Personnage: enteredPersonnage } : card
        ));
    };
    const modifyCardObjet = (cardId, newAction) => {
        setlistcard(listcard.map(card =>
            card.id === cardId ? { ...card, Objet: enteredObjet } : card
        ));
    };

    const handleSubmitPersonnage = () => {
        modifyCardPersonnage(listcard[counterCard].id, enteredPersonnage);
        setEnteredPersonnage('');
    };

    const handleSubmitAction = () => {
        modifyCardAction(listcard[counterCard].id, enteredAction);
        setEnteredAction('');
    };

    const handleSubmitObjet = () => {
        modifyCardObjet(listcard[counterCard].id, enteredObjet);
        setEnteredObjet('');
    };

    const modifyCard = (cardId, newAction, newPersonnage, newObjet) => {
        setlistcard(listcard.map(card =>
            card.id === cardId ? { ...card, Action: newAction, Personnage: newPersonnage, Objet: newObjet } : card
        ));
    };

    const handleSubmit = () => {
        modifyCard(
            listcard[counterCard].id,
            enteredAction,
            enteredPersonnage,
            enteredObjet
        );
        setEnteredAction('');
        setEnteredPersonnage('');
        setEnteredObjet('');
    };


    const sendCard = () => {
        const currentCard = listcard[counterCard];
        if (currentCard.Personnage !== '' && currentCard.Action !== '' && currentCard.Objet !== '') {

            const isDuplicate = props.arrayCardSend.some(card => card.id === currentCard.id);
            if (!isDuplicate) {
                const action = { type: 'ADD_TO_LIST_CARD', value: currentCard };
                props.dispatch(action);
            } else {
                alert('Cette carte existe déjà dans la liste.');
            }
        } else {
            alert('Veuillez remplir et soumettre les informations de la carte.');
        }
    };



    return (
        <View style={{ flex: 1, backgroundColor: '#BDB0D9' }}>
            <View style={styles.titleContainer}>
                <Text style={styles.TextTitle}>System Memory</Text>
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    onChangeText={setEnteredPersonnage}
                    value={enteredPersonnage}
                    placeholder="Entrez un nouveau Personage"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setEnteredAction}
                    value={enteredAction}
                    placeholder="Entrez une nouvelle action"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setEnteredObjet}
                    value={enteredObjet}
                    placeholder="Entrez un nouveau Objet"
                />
                <TouchableOpacity
                    onPress={handleSubmit}
                    style={[styles.submitButton, { backgroundColor: '#4CAF50' }]}
                >
                    <Text style={styles.submitButtonText}>Envoyer</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cardContainer}>
                <Pao
                    {...listcard[counterCard]}
                    modifyCardAction={() => modifyCardAction(listcard[counterCard].id, enteredAction)}
                    modifyCardPersonnage={() => modifyCardPersonnage(listcard[counterCard].id, enteredPersonnage)}
                    modifyCardObjet={() => modifyCardObjet(listcard[counterCard].id, enteredObjet)}
                />
            </View>
            <View>
                <TouchableOpacity
                    onPress={sendCard}
                    style={[styles.addButton, { backgroundColor: '#FF5733' }]}
                >
                    <Text style={styles.addButtonText}>Ajouter la Carte</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.buttonNext}
                    onPress={() => onPrevious()}
                >
                    <Image source={require('../Asset/Icon/left-arrow.png')} style={styles.iconButton} />

                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonNext}
                    onPress={() => onNext()}
                >
                    <Image source={require('../Asset/Icon/right-arrow.png')} style={styles.iconButton} />

                </TouchableOpacity>
            </View>

        </View>


    );


};

const Pao = ({ id, Personnage, Action, Objet, isMale, src, onClickCard }: Card) => {

    return (
        <>

            <Image source={src} style={styles.image} />

            <Text style={styles.title_text}>
                <Text style={styles.label}>Personnage: </Text>
                <Text style={styles.value}>{Personnage}</Text>
            </Text>
            <Text style={styles.title_text}>
                <Text style={styles.label}>Action: </Text>
                <Text style={styles.value}>{Action}</Text>
            </Text>
            <Text style={styles.title_text}>
                <Text style={styles.label}>Objet: </Text>
                <Text style={styles.value}>{Objet}</Text>
            </Text>
        </>
    )
}

const styles = StyleSheet.create({
    image: {

    },
    TextTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 50,
        color:'#553159'

    },

    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#7D6AA6'
       
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 10,
    },

    buttonContainer: {
        flex: 0.8,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    cardContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconButton: {
        width: 40,
        height: 40,
        color: "#0D0D0D",
    },
    // @ts-ignore
    buttonNext: {
        ...commonStyles.elevationButton,
        ...commonStyles.roundedButton,
        backgroundColor: "#A68881",
    },
    input: {

        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        marginTop: 20,
        color : "#7D6AA6"
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignSelf: 'center',
        marginTop: 10,

    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },

    addButton: {
        backgroundColor: '#FF5733',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignSelf: 'center',
        marginTop: 10,
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    label: {
        fontWeight: 'bold',
        color: '#A68881',
        // autres styles pour les étiquettes
    },
    value: {
        fontWeight: 'normal',
        color: '#7D6AA6',
        // autres styles pour les valeurs
    },

})
const mapStateToProps = (state: any) => {
    return {
        arrayCardSend: state.arrayCardSend.arrayCardSend
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        dispatch: (action: any) => { dispatch(action); },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);