class Globals {
    public vacation = "http://localhost:3001/api/vacations/";
    public addVacation = "http://localhost:3001/api/vacations/new-vacation";
    public reamoveVacation = "http://localhost:3001/api/vacations/delete-vacation/";
    public updateVacation = "http://localhost:3001/api/vacations/update-vacation";
    public getfollowVacation = "http://localhost:3001/api/vacations/get-followed-vacations/";
    public followVacation = "http://localhost:3001/api/vacations/followVacation";
    public removefollowVacation = "http://localhost:3001/api/vacations/delete";
    public register = "http://localhost:3001/api/auth/register";
    public login = "http://localhost:3001/api/auth/login";
    public saveToken = "http://localhost:3001/api/auth/login-save";
    public getToken = "http://localhost:3001/api/auth/login";
}

const globals = new Globals();

export default globals;