import mockedPlants from "../../mocks/plants";

const ADD_REMINDER = "ADD_REMINDER"
const DELETE_REMINDER = "DELETE_REMINDER"
const ADD_PLANT = "ADD_PLANT"
const DELETE_PLANT = "DELETE_PLANT"

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
      case DELETE_REMINDER:
        return {
            ...state,
            plants: state.plants.map(plant => plant.id === action.payload.plantId ? {
                ...plant,
                reminders: plant.reminders.filter(reminder => reminder.id !== action.payload.reminderId)
            } : plant )
        };
      case ADD_PLANT:
        return {
            ...state,
            plants: [
                ...state.plants,
                {
                    id: state.idGenerator,
                    name: action.payload.newPlantName,
                    description: action.payload.newPlantDescription,
                    reminders: []
                }
            ],
            idGenerator: state.idGenerator + 1
        };
      case DELETE_PLANT:
        {
            console.log(action)
            return {
            ...state,
            plants: state.plants.filter(plant => plant.id !== action.payload.plantId),
        };}

      default:
        return state;
    }
  }

  export const addReminder = (plantId, newReminderName, newReminderInterval) => ({
      type: ADD_REMINDER,
      payload: {plantId, newReminderName, newReminderInterval}
  })

  export const addPlant = (newPlantName, newPlantDescription) => ({
      type: ADD_PLANT,
      payload: {newPlantName, newPlantDescription}
  })

  export const deleteReminder = (plantId, reminderId) => ({
      type: DELETE_REMINDER,
      payload: {plantId, reminderId}
  })

  export const deletePlant = (plantId) => ({
      type: DELETE_PLANT,
      payload: {plantId}
  })

export default reducer;