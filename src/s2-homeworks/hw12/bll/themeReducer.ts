import { threadId } from "worker_threads"

const initState: ThemeStateType = {
    themeId: 1,
}

export type ThemeStateType = {
    themeId: number;
};

export type ThemeActionType = ReturnType <typeof setThemeAC>;

export const themeReducer = (state = initState, action: ThemeActionType): ThemeStateType => { // fix any
    switch (action.type) {
        // дописать
        case 'SET_THEME_ID':
            return {
                ...state,
                themeId: action.payload.themeId 
            }
        default:
            return state
    }
}

export const setThemeAC = (themeId: number) => {
  return {
    type: 'SET_THEME_ID' as const,
    payload: { themeId }
  }
}

export const changeThemeId = (id: number): ReturnType<typeof setThemeAC> => (
    { type: 'SET_THEME_ID' as const, 
        payload: {
            themeId: id,
        } 
    }
) // fix any
