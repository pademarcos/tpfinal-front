const initialState = {
  specialities: []
}

export const specialitiesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_SPECIALITIES':
        return {...state, specialities: action.payload};
      default:
        return state;
    }
  };
  