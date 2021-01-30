const { type } = require("os");


const validateInputs = (req, res, next) => {
    
    let { rule, data } = req.body;

    const required_propeties = ['rule', 'data']
    const required_fields = ['field', 'condition', 'condition_value']
    const accepted_conditions = ['eq', 'neq', 'gt', 'gte', 'contains']
    
    try {
        for (property of required_propeties) {
            //Validate required properties
            if(req.body.hasOwnProperty(property) != true) {
                return res.status(400).send({
                    "message": `${property} is required.`,
                    "status": "error",
                    "data": null
                  })
            }
    
            //Validate type of data passed
            if(typeof(req.body['rule']) != 'object') {
                return res.status(400).send({
                    "message": `rule should be an object.`,
                    "status": "error",
                    "data": null
                  })
            }
            
            if(typeof(req.body['data']) != 'object' && typeof(req.body['data']) != 'string' && !Array.isArray(req.body['data'])) {
                return res.status(400).send({
                    "message": `data should be a string, an object, or an array.`,
                    "status": "error",
                    "data": null
                  })
            }
        }
        
        
        for (field of required_fields) {
            //Validate required fields 
            if(!rule.hasOwnProperty(field)) {
                return res.status(400).send({
                    "message": `Field ${field} is required.`,
                    "status": "error",
                    "data": null
                  })
            }
        }
    
        //Validate required data fields
        if (!data.hasOwnProperty(rule.field)) {
            return res.status(400).json({
                "message": `Field ${rule.field} is missing from data.`,
                "status": "error",
                "data": null
            })
        }
    
        //Validate accepted condition values
        for (values in accepted_conditions) {
            if (!accepted_conditions.includes(rule.condition)) {
                return res.status(400).send({
                    "message": `${rule.condition} is not an accepted Condition value.`,
                    "status": "error",
                    "data": null
                })
            }
        }
    
        //Validate payload
        if(typeof(req.body) != 'object') {
            return res.status(400).send({
                "message": "Invalid JSON payload passed.",
                "status": "error",
                "data": null
              })
        }
    } catch (error) {
        return res.status(500).send({
            "message": "Something went wrong.",
            "status": "error",
            "data": null
          })
    }
    next()
}


module.exports = { validateInputs };