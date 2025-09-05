import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Living Cost Management API",
            version: "1.0.0",
            description: "API Document with swagger"
        }
    },
    apis: [path.resolve(__dirname, "../routes/*.ts")]
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}