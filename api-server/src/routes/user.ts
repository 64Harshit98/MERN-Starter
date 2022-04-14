import { Router } from "express"
import { addUser, verifyUser } from "../controllers/authentication"
const router: Router = Router()

router.post("/add-user", addUser)
router.post("/verify-user", verifyUser)

export default router