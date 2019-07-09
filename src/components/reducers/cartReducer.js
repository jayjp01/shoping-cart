import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY } from '../actions/cartActions'

const initState = {
    items: [
        { id: 1, title: 'Shaman Coffee Tabel Walnut', price: 59, priceLabel: 59, quantity: 1 },
        { id: 2, title: 'Puget Arm  Chair Gray', price: 37, priceLabel: 37, quantity: 1 },
        { id: 3, title: 'Plumb Ottoman Brown', price: 12, priceLabel: 12, quantity: 1 },
        { id: 4, title: 'Mission Way Tall Six Level Self Distressed Natural', price: 48, priceLabel: 48, quantity: 1 },
    ],
    addedItems: [],
    total: 0

}
const cartReducer = (state = initState, action) => {

    if (action.type === ADD_TO_CART) {
        let addedItem = state.items.find(item => item.id === action.id)
        let existed_item = state.addedItems.find(item => action.id === item.id)
        if (existed_item) {
            addedItem.quantity += 1
            return {
                ...state,
                total: state.total + addedItem.price
            }
        }
        else {
            addedItem.quantity = 1;
            let newTotal = state.total + addedItem.price
            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total: newTotal
            }

        }
    }
    if (action.type === REMOVE_ITEM) {
        let new_items = state.addedItems.filter(item => action.id !== item.id)
        return {
            ...state,
            addedItems: new_items,
        }
    }

    if (action.type === ADD_QUANTITY) {

        let addedItem = state.items.find(item => item.id === action.id)
        addedItem.quantity += 1
        addedItem.priceLabel = addedItem.price * addedItem.quantity
        return {
            ...state
        }
    }
    if (action.type === SUB_QUANTITY) {
        let addedItem = state.items.find(item => item.id === action.id)
        //if the qt == 0 then it should be removed
        if (addedItem.quantity === 1) {
            return {
                ...state,
            }
        }
        else {
            addedItem.quantity -= 1
            addedItem.priceLabel = addedItem.price * addedItem.quantity
            let newTotal = state.total - addedItem.price
            return {
                ...state,
                total: newTotal
            }
        }

    }
    else {
        return {
            ...state,
            addedItems: [...state.items],
        }
    }

}

export default cartReducer
