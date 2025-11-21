import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  try {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", req.body);

    const user = await userSignUp(bodyToUser(req.body)); 
    res.success({ user }); // 표준 응답 포맷 사용
  } catch (err) {
    next(err); // 전역 에러 핸들러로 전달
  }
};

/**
 * @swagger
 * /api/v1/users/signup:
 *   post:
 *     summary: 유저 회원가입
 *     description: 이메일과 비밀번호를 통해 새로운 유저를 등록한다.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultType:
 *                   type: string
 *                   example: SUCCESS
 *                 success:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         email:
 *                           type: string
 *       400:
 *         description: 이메일 또는 비밀번호 유효성 실패
 *       500:
 *         description: 서버 내부 오류
 */