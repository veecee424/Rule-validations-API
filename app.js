const { json } = require('body-parser');
const express = require('express')
const app = express();
const fs = require('fs')
const bodyParser = require('body-parser')
const { validateInputs } = require('./middleware/validate')
const { checkCondition } = require('./helpers/helpers')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//Home get route
app.get('/', (req, res)=> {
    const personal_details = JSON.parse(fs.readFileSync('./data/personal_details.json'))
    return res.json(personal_details)
})


//validation rule
app.post('/validate-rule', validateInputs, (req, res)=> {
    let { rule, data } = req.body;
  
    try {

        let condition = checkCondition(rule.condition)
        let validation = condition(data[rule.field], rule.condition_value)
        if (validation) {
            return res.status(200).send({
                "message": `field ${rule.field} successfully validated.`,
                "status": "success",
                "data": {
                  "validation": {
                    "error": false,
                    "field": `${rule.field}`,
                    "field_value": `${data[rule.field]}`,
                    "condition": `${rule.condition}`,
                    "condition_value": `${rule.condition_value}`
                  }
                }
              })
        }

        return res.status(400).send({
            "message": `field ${rule.field} failed validation.`,
            "status": "error",
            "data": {
              "validation": {
                "error": true,
                "field": `${rule.field}`,
                "field_value": `${data[rule.field]}`,
                "condition": `${rule.condition}`,
                "condition_value": `${rule.condition_value}`
              }
            }
          })
        
    } catch (error) {
        return res.status(500).send({
            "message": "Something went wrong.",
            "status": "error",
            "data": null
          })
    }

})




module.exports = app;