export default class VacationModel {

    public vacationID: number;
    public description: string;
    public destination: string; 
    public imageName: string; 
    public image: FileList; 
    public fromDate: string | Date;
    public toDate: string | Date;
    public price: string;
    public follow: boolean;
    public numFollowers: number; 
 
   
 
    public static convertToFormData(vacation: VacationModel): FormData {
        const myFormData = new FormData();
        myFormData.append("destination", vacation.destination);
        myFormData.append("description", vacation.description);
        myFormData.append("fromDate", vacation.fromDate.toString());
        myFormData.append("toDate", vacation.toDate.toString());
        myFormData.append("price", vacation.price);
         
        if(vacation.image.item(0) === null || undefined) {
            myFormData.append("imageName", vacation.imageName);
        }else {
            myFormData.append("image", vacation.image.item(0));
        }

        return myFormData;
    }
}
