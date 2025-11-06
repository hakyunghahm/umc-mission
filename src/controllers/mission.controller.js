import { StatusCodes } from "http-status-codes";
import { createMission, getMyMissions} from "../services/mission.service.js";
import { bodyToMission } from "../dtos/mission.dto.js";

// 미션 등록 요청을 처리
export const handleCreateMission = async (req, res, next) => {
  console.log("미션 등록 요청이 들어왔습니다!");
  console.log("params:", req.params);
  console.log("body:", req.body);

  try {
    const storeId = req.params.storeId;
    const missionDto = bodyToMission(req.body, storeId);

    const result = await createMission(missionDto);

    return res.status(StatusCodes.CREATED).json({ result });
  } catch (err) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: err.message || "미션 등록 중 오류가 발생했습니다." });
  }
};

// 내가 도전 중인 미션 목록 조회
export const handleGetMyMissions = async (req, res, next) => {
  const userId = parseInt(req.params.userId);

  try {
    const missions = await getMyMissions(userId);
    res.status(StatusCodes.OK).json({ result: missions });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};