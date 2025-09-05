import { UserPayload } from "../dtos/middlewares/userPayload.dto";

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload | null
        }
    }
}