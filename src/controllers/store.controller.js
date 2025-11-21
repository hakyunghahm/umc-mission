import { bodyToStore } from "../dtos/store.dto.js";
import { createStore } from "../services/store.service.js";
import { getMissionsByStore } from "../services/mission.service.js";
import { listStoreReviews } from "../services/store.service.js"; 

// 가게 등록 API
export const handleStoreCreate = async (req, res, next) => {
  try {
    console.log("가게 등록 요청이 들어왔습니다!");
    console.log("body:", req.body);

    const storeDto = bodyToStore(req.body);
    const store = await createStore(storeDto);

    res.success({ store }); 
  } catch (error) {
    next(error); 
  }
};

/**
 * @swagger
 * /api/v1/stores:
 *   post:
 *     summary: 가게 등록
 *     description: 새로운 가게를 등록한다.
 *     tags: [Store]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 스타벅스 홍대점
 *               category:
 *                 type: string
 *                 example: cafe
 *               address:
 *                 type: string
 *                 example: 서울특별시 마포구 어딘가
 *     responses:
 *       201:
 *         description: 가게 등록 성공
 *       400:
 *         description: 요청 형식 오류
 *       500:
 *         description: 서버 내부 오류
 */

// 가게 리뷰 목록 조회
export const handleListStoreReviews = async (req, res, next) => {
  try {
    const storeId = parseInt(req.params.storeId);
    const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0;

    const reviews = await listStoreReviews(storeId, cursor);

    res.success({ reviews }); 
  } catch (error) {
    next(error); 
  }
};

/**
 * @swagger
 * /api/v1/stores/{storeId}/reviews:
 *   get:
 *     summary: 가게 리뷰 목록 조회
 *     description: 특정 가게에 대한 리뷰 목록을 조회한다.
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 가게 ID
 *       - in: query
 *         name: cursor
 *         required: false
 *         schema:
 *           type: integer
 *         description: 페이징을 위한 마지막 리뷰 ID
 *     responses:
 *       200:
 *         description: 리뷰 목록 반환
 *       404:
 *         description: 가게를 찾을 수 없음
 *       500:
 *         description: 서버 내부 오류
 */

// 가게 미션 목록 조회
export const handleListStoreMissions = async (req, res, next) => {
  try {
    const storeId = parseInt(req.params.storeId);

    const missions = await getMissionsByStore(storeId);

    res.success({ missions });
  } catch (error) {
    next(error); 
  }
};

/**
 * @swagger
 * /api/v1/stores/{storeId}/missions:
 *   get:
 *     summary: 가게 미션 목록 조회
 *     description: 특정 가게에 등록된 미션 목록을 반환한다.
 *     tags: [Mission]
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 가게 ID
 *     responses:
 *       200:
 *         description: 미션 목록 반환
 *       404:
 *         description: 가게 또는 미션 없음
 *       500:
 *         description: 서버 내부 오류
 */
