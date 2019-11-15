import mockedPlants from "../../mocks/plants";

const ADD_REMINDER = "ADD_REMINDER"

const initialState = {
    plants: mockedPlants
}

function reducer(state = initialState, action) {
    switch (action.type) {
      case ADD_REMINDER:
        return {
            ...state,
            plants: state.plants.map(plant => plant.id === action.payload.plantId ? {
                ...plant,
                reminders: [
                    ...plant.reminders,
                    {
                        id: Math.floor(Math.random() * 1000),
                        name: "custom",
                        interval: "custom Interval"
                    }
                ]
            } : plant )
        };
    //   case 'DECREMENT':
    //     return state - 1;
      default:
        return state;
    }
  }

  export const addReminder = (plantId) => ({
      type: ADD_REMINDER,
      payload: { plantId }
  })

export default reducer;