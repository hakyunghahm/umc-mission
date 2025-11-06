import { StatusCodes } from "http-status-codes"; // 상태 코드 상수
import { bodyToStore } from "../dtos/store.dto.js"; // body를 DTO로 변환하는 함수
import { createStore } from "../services/store.service.js"; // 실제 저장 로직을 담당하는 서비스 함수
import { getMissionsByStore } from "../services/mission.service.js";

// 클라이언트의 가게 등록 요청을 처리
export const handleStoreCreate = async (req, res, next) => {
  console.log("가게 등록 요청이 들어왔습니다!");
  console.log("body:", req.body); // 들어온 데이터 확인용

  try {
    const storeDto = bodyToStore(req.body); // 요청 데이터를 내부 로직용 DTO로 변환
    const store = await createStore(storeDto); // 실제 가게 등록

    return res.status(StatusCodes.CREATED).json({ result: store }); 
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message || "가게 등록 중 오류 발생" });
  }
};

// 가게의 리뷰 목록 조회 
export const handleListStoreReviews = async (req, res, next) => {
  const storeId = parseInt(req.params.storeId); // url 경로의 값을 숫자로 변환 
  const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0; // 쿼리 파라미터에서 값 꺼냄 

  const reviews = await listStoreReviews(storeId, cursor); // service 계층으로 두 값 넘김 

  res.status(StatusCodes.OK).json(reviews); // service에서 받은 데이터 응답으로 보냄 
};

// 가게의 미션 목록 조회 
export const handleListStoreMissions = async (req, res, next) => {
  const storeId = parseInt(req.params.storeId); // URL에서 storeId 꺼냄

  try {
    const missions = await getMissionsByStore(storeId); // 서비스 호출
    return res.status(StatusCodes.OK).json({ result: missions }); // 응답
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message || "미션 목록 조회 중 오류 발생" });
  }
};