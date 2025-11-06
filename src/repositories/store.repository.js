import { prisma } from "../db.config.js";

// name + address 조합으로 기존에 존재하는 가게가 있는지 확인
export const findStoreByNameAndAddress = async (name, address) => {
  // stores 테이블에서 일치하는 데이터 1개 조회
  const store = await prisma.store.findFirst({
    where: {
      name: name,
      address: address,
    }
  });

  return store; 
};

// 가게 등록 함수 
export const insertStore = async (storeData) => {
  const {name, address, latitude, longitude, category } = storeData; // 구조분해 

  // Prisma의 create 메서드로 INSERT 수행
  const createdStore = await prisma.store.create({
    data: {
      name: name,
      address: address,
      latitude: latitude,
      longitude: longitude,
      category: category,
    },
  });
  return createdStore; 
};

// 가게의 리뷰 목록 
export const getAllStoreReviews = async (storeId, cursor) => {
  const reviews = await prisma.userStoreReview.findMany({ // 테이블에서 데이터 조회 시작 
    select: { // 가져올 컬럼들만 지정 
      id: true,
      content: true,
      store: true,
      user: true,
    },
    where: {
      storeId: storeId,
      id: { gt: cursor }, // 이전 페이지에서 받은 마지막 리뷰 id보다 큰 것만 가져옴
    },
    orderBy: {
      id: "asc",
    },
    take: 5, // 최대 5개만 가져옴
  });

  return reviews;
};

