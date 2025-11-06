import { prisma } from "../db.config.js";

// 해당 storeId가 실제로 존재하는지 확인
export const findStoreById = async (storeId) => {
  const store = await prisma.store.findUnique({
    where: {
      id: storeId,
    },
  });

  return store; 
};

// 리뷰를 DB에 저장
export const insertReview = async (reviewDto) => {
  const { storeId, userId, rating, content } = reviewDto;

  const createdReview = await prisma.userStoreReview.create({
    data: {
      storeId,
      userId,
      rating,
      content,
    },
    include: {
      store: true, 
      user: true,  
    },
  });

  return createdReview;
};

// 내가 작성한 리뷰 목록 불러오기 
export const getReviewsByUserId = async(userId) => {
  return await prisma.review.findMany({
    where: {
      userId: userId,
    },
    include: {
      store: true,
      images: true,
      ownerComment: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}