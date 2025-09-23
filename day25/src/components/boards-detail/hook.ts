// day25/src/components/boards-detail/hook.ts

import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
// 💥 바뀐 부분: codegen이 생성한 graphql.ts에서 Document를 가져옵니다.
import { FetchBoardDocument } from "src/commons/graphql/graphql";
import { IBoardDetail } from "./types";

export const useBoardDetail = () => {
  const params = useParams();

  // 💥 바뀐 부분: FETCH_BOARD 대신 FetchBoardDocument를 사용합니다.
  const { data, loading, error } = useQuery<{ fetchBoard: IBoardDetail }>(
    FetchBoardDocument,
    { variables: { boardId: String(params.boardId) } }
  );

  return {
    board: data?.fetchBoard,
    loading,
    error,
  };
};