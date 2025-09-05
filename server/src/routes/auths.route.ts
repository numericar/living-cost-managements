import express, { Router } from "express";
import * as authController from "../controllers/auths.controller";
import IBaseResponse from "../dtos/base/baseResponse.dto";

const router: Router = express.Router();

/**
 * @swagger
 * /api/v1/auths/health-check:
 *   get:
 *     summary: health check api
 *     responses:
 *       200:
 *         description: successful
 */
router.get("/health-check", authController.healthCheck);

/**
 * @swagger
 * /api/v1/auths/sign-up:
 *   post:
 *     summary: Register user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                  type: string
 *     responses:
 *       201:
 *         description: User created
 */
router.post("/sign-up", authController.signUp);

export default router;