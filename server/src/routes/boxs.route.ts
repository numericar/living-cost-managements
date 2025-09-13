import express, { Router } from "express";
import * as boxsController from "../controllers/boxs.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router: Router = express.Router();

/**
 * @swagger
 * /api/v1/boxs/health-check:
 *  get:
 *      summary: health check api
 *      tags: [Boxs]
 *      responses:
 *          200:
 *              description: successful
 */
router.get("/health-check", boxsController.healthCheck);

/**
 * @swagger
 * /api/v1/boxs:
 *   post:
 *     summary: create living cost profile
 *     tags: [Boxs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profileName:
 *                 type: string
 *               provinceId:
 *                 type: integer
 *               countyId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: successful
 */
router.post("", [authMiddleware], boxsController.createBoxs);

/**
 * @swagger
 * /api/v1/boxs:
 *      get:
 *          summary: get living cost profiles
 *          tags: [Boxs]
 *          responses:
 *              200:
 *                  description: list of living cost profile
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              properties:
 *                                  id:
 *                                      type: integer
 *                                  profileName:
 *                                      type: string
 *                                  proviceName:
 *                                      type: string
 *                                  countyName:
 *                                      type: string
 */
router.get("", [authMiddleware], boxsController.getBoxs);

router.get("/:boxId", [authMiddleware], boxsController.getBoxById);

export default router;