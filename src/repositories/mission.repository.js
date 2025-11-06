import { prisma } from "../db.config.js";

// 해당 store가 실제 존재하는지 확인
export const findStoreById = async (storeId) => {
  const store = await prisma.store.findUnique({
    where: {id: storeId},
  })

  return store;
};

// 새로운 미션을 DB에 삽입
export const insertMission = async (missionDto) => {
  const { storeId, title, description, reward} = missionDto;

  // missions 테이블에 새 미션 추가 
  const createdMission = await prisma.mission.create({
    data: {
      storeId, title, description, reward
    },
    include: {
      store: true, // 연결된 가게 정보를 자동으로 JOIN해서 넣어줌.. 
    }
  });
  return createdMission;
};


// 특정 storeId에 해당하는 미션 전체 조회
export const findMissionsByStoreId = async (storeId) => {
  return await prisma.mission.findMany({
    where: {
      storeId: storeId
    }
  });
};

// 유저가 도전한 미션 목록 조회 (미션, 가게 정보 포함)
export const findUserMissions = async (userId) => {
  const userMissions = await prisma.userMission.findMany({
    where: {
      userId,
    },
    include: {
      mission: {
        include: {
          store: true,
        },
      },
    },
  });

  return userMissions;
};