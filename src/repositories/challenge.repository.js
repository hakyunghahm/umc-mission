import { Prisma } from "@prisma/client";

// 사용자 존재 여부 확인
export const findUserById = async (userId) => {
  return await Prisma.user.findUnique({
    where: {id: userId},
  });
};

// 미션 존재 여부 확인
export const findMissionById = async (missionId) => {
  return await Prisma.mission.findUnique({
    where: {id: missionId}
  })
};

// 이미 도전했는지 확인
export const hasUserChallenged = async (userId, missionId) => {
  const result = await prisma.userMission.findFirst({
    where: {
      userId,
      missionId,
    },
  });

  return result !== null; // 결과가 아니면 도전 안한거 
};

// 도전 기록 추가
export const insertChallenge = async (userId, missionId) => {
  // 도전 기록 추가 
  await Prisma.userMission.create({
    data: {
      userId,
      missionId,
    },
  });
  // 방금 삽입한 행 조회
  const result = await Prisma.userMission.findUnique({
    where: {
      userId_missionId: {
        userId,
        missionId,
      },
    },
  });
  
};
