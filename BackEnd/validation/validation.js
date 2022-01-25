const { user , vacations} = require('./schema');

module.exports = {
    addUserValidation: async (req ,res ,next) => {
        const value = await user.validate(req.body);
        if(value.error) {
            res.json({
                success: "your data is not valid",
                message : value.error.message
            })
        } else {
            next();
        }
    },

 
    addVacationValidation: async (req ,res ,next) => {
        const value = await vacations.validate(req.body);
        if(value.error) {
            res.json({
                success: "your data is not valid",
                message : value.error.message
            })
        } else {
            next();
        }
    }
    
}


