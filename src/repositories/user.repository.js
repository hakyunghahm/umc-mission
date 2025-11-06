import { prisma } from "../db.config.js";

// User 데이터 삽입
export const addUser = async(data) => { // data 객체 안에 email, name, gender 등 필드가 들어가 있어야 함
  const user = await prisma.user.findFirst({ // 조건에 맞는 첫 번째 유저를 찾아
    where: {email: data.email},
  });
  if (user) return null;

  const created = await prisma.user.create({ // 자동으로 INSERT 문을 만들어 실행
    data: data,
  });

  return created.id;
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  const user = await prisma.user.findFirstOrThrow({ // 조건 만족하는 유저가 없으면 자동으로 에러를 throw
    where: { id: userId },
  });

  return user;
};


// 유저가 선호하는 음식 카테고리 등록
export const setPreference = async (userId, foodCategoryId) => {
  await prisma.userFavorCategory.create({// 지정된 테이블에 새로운 행을 삽입함
    data: {
      userId: userId,
      foodCategoryId: foodCategoryId,
    },
  });
};


// 특정 유저의 선호 카테고리들 조회
export const getUserPreferencesByUserId = async (userId) => {
  const preferences = await prisma.userFavorCategory.findMany({ // 배열 형태로 여러 개의 결과 가져옴
    select: { // 어떤 필드를 포함할지 명시 (JOIN 대상 포함)
      id: true,
      userId: true,
      foodCategoryId: true,
      foodCategory: true, // 실제 연관된 테이블의 전체 정보를 가져오겠다 (JOIN)
    },
    where: {
      userId: userId,
    },
    orderBy: {
      foodCategoryId: "asc",
    },
  });

  return preferences;
};
