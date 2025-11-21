import { createReview, getMyReviews } from "../services/review.service.js";
import { bodyToReview } from "../dtos/review.dto.js";

// 리뷰 등록
export const handleCreateReview = async (req, res, next) => {
  try {
    console.log("리뷰 등록 요청 도착!");
    console.log("params:", req.params);
    console.log("body:", req.body);

    const storeId = req.params.storeId;
    const reviewDto = bodyToReview(req.body, storeId);

    const review = await createReview(reviewDto);

    res.success({ review }); 
  } catch (err) {
    next(err); 
  }
};
/**
 * @swagger
 * /api/v1/stores/{storeId}/reviews:
 *   post:
 *     summary: 리뷰 등록
 *     description: 특정 가게에 대한 리뷰를 등록한다.
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: string
 *         description: 리뷰를 작성할 대상 가게의 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: 정말 맛있고 친절했어요!
 *               rating:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: 리뷰 등록 성공
 *       400:
 *         description: 요청이 잘못되었거나 유효성 검사 실패
 *       500:
 *         description: 서버 내부 오류
 */

// 내가 작성한 리뷰 조회
export const handleGetMyReviews = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const reviews = await getMyReviews(userId);

    res.success({ reviews });
  } catch (err) {
    next(err); 
  }
};
/**
 * @swagger
 * /api/v1/reviews/my:
 *   get:
 *     summary: 내가 작성한 리뷰 조회
 *     description: 현재 로그인한 사용자가 작성한 모든 리뷰를 조회한다.
 *     tags: [Review]
 *     responses:
 *       200:
 *         description: 리뷰 목록 반환
 *       401:
 *         description: 인증되지 않은 사용자
 *       500:
 *         description: 서버 내부 오류
 */
