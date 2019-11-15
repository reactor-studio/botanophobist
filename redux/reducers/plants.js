import mockedPlants from "../../mocks/plants";

const ADD_REMINDER = "ADD_REMINDER"

const initialState = {
    idGenerator: 4,
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
                        id: state.idGenerator,
                        name: action.payload.newReminderName,
                        interval: action.payload.newReminderInterval,
                        startDate: new Date()
                    }
                ]
            } : plant ),
            idGenerator: state.idGenerator + 1
        };
    //   case 'DECREMENT':
    //     return state - 1;
      default:
        return state;
    }
  }

  export const addReminder = (plantId, newReminderName, newReminderInterval) => ({
      type: ADD_REMINDER,
      payload: {plantId, newReminderName, newReminderInterval}
  })

export default reducer;