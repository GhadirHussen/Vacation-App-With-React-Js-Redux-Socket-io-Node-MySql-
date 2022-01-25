import  VacationModel  from "../models/vacation-model";
import  UserModel  from "../models/user-model";



export class AppState {
    public user: UserModel =  new UserModel();
    public isLogin: boolean = false;
    public vacations: VacationModel[] = [];
    public followedVacations: VacationModel[] = [];
}
 


export enum ActionType {
    getUser = "getUser",
    updateIsLogin = "updateIsLogin",
    logout = "logout",
    getAllVacations = "getAllVacations",
    getFollowedVacations = "getFollowedVacations",
    addNewVacation = "addNewVacation",
    deleteVacation = "deleteVacation",
    updateVacation = "updateVacation"
}

export interface Action {
    type: ActionType, 
    payload?: any 
}


export function reducer(oldState: AppState = new AppState(), action: Action): AppState {

    const newState = { ...oldState };

    switch (action.type) {

        case ActionType.getUser:
            newState.user = action.payload;
            break;

        case ActionType.updateIsLogin:
            newState.isLogin = action.payload;
            break;

        case ActionType.logout:
            newState.user = null;
            localStorage.removeItem("token");
            break;

        case ActionType.getAllVacations:
            newState.vacations = action.payload;
            break;

        case ActionType.getFollowedVacations:
            newState.followedVacations = action.payload;
            break;

        case ActionType.addNewVacation:
            newState.vacations.push(action.payload);
            break;

        case ActionType.deleteVacation:
            const indexToDelete = newState.vacations.findIndex(v => v.vacationID === action.payload);
            newState.vacations.splice(indexToDelete, 1);
            break;

        case ActionType.updateVacation:
            const index = newState.vacations.findIndex(v => v.vacationID === action.payload.vacationID);
            newState.vacations[index] = action.payload;
            break;
    }

    return newState;
}
