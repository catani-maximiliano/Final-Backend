const path = require("path")
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info:{
      title: "API Documentation",
      version: "1.0.0"
    },
    servers:[
      {
        url: "https://final-backend-production-f554.up.railway.app/"
      }
    ]
  },
  apis:[`${path.join(__dirname,"../controllers/*/*js")}`]
}
const swaggerRoutes = (app) => {
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))
}

module.exports =swaggerRoutes;
