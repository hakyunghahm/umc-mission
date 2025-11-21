import { createMission, getMyMissions } from "../services/mission.service.js";
import { bodyToMission } from "../dtos/mission.dto.js";

// 미션 등록 요청 처리
export const handleCreateMission = async (req, res, next) => {
  try {
    console.log("미션 등록 요청이 들어왔습니다!");
    console.log("params:", req.params);
    console.log("body:", req.body);

    const storeId = req.params.storeId;
    const missionDto = bodyToMission(req.body, storeId);

    const mission = await createMission(missionDto);

    res.success({ mission });
  } catch (err) {
    next(err); 
  }
};
/**
 * @swagger
 * /api/v1/stores/{storeId}/missions:
 *   post:
 *     summary: 미션 등록
 *     description: 특정 가게에 미션을 등록한다.
 *     tags: [Mission]
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: string
 *         description: 미션을 등록할 가게 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: 아메리카노 마시기
 *               description:
 *                 type: string
 *                 example: 스타벅스에서 아메리카노를 마시고 인증샷 찍기
 *               reward:
 *                 type: integer
 *                 example: 500
 *     responses:
 *       201:
 *         description: 미션 등록 성공
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 내부 오류
 */


// 내가 도전 중인 미션 목록 조회
export const handleGetMyMissions = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);

    const missions = await getMyMissions(userId);

    res.success({ missions }); 
  } catch (err) {
    next(err);
  }
};
/**
 * @swagger
 * /api/v1/users/{userId}/missions:
 *   get:
 *     summary: 내가 도전 중인 미션 목록 조회
 *     description: 특정 사용자가 도전 중인 미션 목록을 조회한다.
 *     tags: [Mission]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 사용자 ID
 *     responses:
 *       200:
 *         description: 미션 목록 반환
 *       404:
 *         description: 사용자를 찾을 수 없음
 *       500:
 *         description: 서버 내부 오류
 */
