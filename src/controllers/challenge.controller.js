import { paramsToChallenge } from "../dtos/challenge.dto.js";
import { challengeMission } from "../services/challenge.service.js";

// 미션 도전 요청 처리
export const handleChallengeMission = async (req, res, next) => {
  try {
    console.log("미션 도전 요청이 들어왔습니다!");
    console.log("params:", req.params);

    const { userId, missionId } = req.params;
    const { userId: uId, missionId: mId } = paramsToChallenge(userId, missionId);

    const challenge = await challengeMission(uId, mId);

    res.success({ challenge }); 
  } catch (err) {
    next(err); 
  }
};

/**
 * @swagger
 * /api/v1/users/{userId}/missions/{missionId}/challenge:
 *   post:
 *     summary: 미션 도전
 *     description: 특정 사용자가 특정 미션에 도전한다.
 *     tags: [Challenge]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 사용자 ID
 *       - in: path
 *         name: missionId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 도전할 미션의 ID
 *     responses:
 *       201:
 *         description: 미션 도전 성공
 *       404:
 *         description: 사용자 또는 미션이 존재하지 않음
 *       500:
 *         description: 서버 내부 오류
 */
