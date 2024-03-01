import { Card } from "../../Models/Card";


const initialState = { arrayCardSend: [] };

function setArrayCardSendReducer(state = initialState, action: { type: string; value: any; }) {
    let nextState;
    switch (action.type) {
        case 'ADD_TO_LIST_CARD':
            nextState = {
                ...state,
                arrayCardSend: [...state.arrayCardSend, action.value],
            };
            console.log('[STORE] Add to pokemons captured: ', action.value);
            return nextState || state;  // Penser a retourner les deux
        case 'REMOVE_CARD_IN_LIST':
            nextState = {
                ...state,
                arrayCardSend: state.arrayCardSend.filter((card: Card) => card.id !== action.value)
            };
            console.log('[STORE] Delete the Card ID: ', action.value);
            return nextState || state;
        case 'MODIFY_CARD_IN_LIST':
            nextState = {
                ...state,
                arrayCardSend: state.arrayCardSend.map((card) =>
                    card.id === action.value.id ? { ...card, ...action.value } : card
                ),
            };
            console.log('[STORE] Modify Card: ', action.value);
            return nextState || state;
        case 'SHUFFLE_CARDS':
            nextState = {
                ...state,
                arrayCardSend: action.value,
            };
            console.log('[STORE] Shuffle Cards');
            return nextState || state;
            case 'SORT_CARDS_ASC':
                nextState = {
                    ...state,
                    arrayCardSend: [...state.arrayCardSend].sort((a, b) => a.id - b.id),
                };
                return nextState;
            
            case 'SORT_CARDS_DESC':
                nextState = {
                    ...state,
                    arrayCardSend: [...state.arrayCardSend].sort((a, b) => b.id - a.id),
                };
                return nextState;
            
        default:
            return state;
    }
}

export default setArrayCardSendReducer;