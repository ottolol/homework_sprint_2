import {UserType} from '../HW8'

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => { // need to fix any
    switch (action.type) {
        case 'sort': { // by name
            const sortedState = [...state];
            return sortedState.sort((a, b) => {
                if (action.payload === 'up') {
                    return a.name > b.name ? 1 : -1
                } else {
                    return a.name < b.name ? 1 : -1
                }
            }) // need to fix
        }
        case 'check': {
            return action.payload === 18 ? state.filter(s => s.age > 18) : state;
            // need to fix
        }
        default:
            return state
    }
}
