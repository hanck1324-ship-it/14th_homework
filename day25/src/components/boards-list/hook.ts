// day25/src/components/boards-list/hook.ts

import { useQuery, useMutation } from "@apollo/client";
import { useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
// 💥 바뀐 부분: codegen이 생성한 graphql.ts에서 Document를 가져옵니다.
import {
  FetchBoardsDocument,
  DeleteBoardDocument,
} from "src/commons/graphql/graphql";

export const useBoardsList = () => {
  const [hoveredId, setHoveredId] = useState("");
  // 💥 바뀐 부분: FETCH_BOARDS 대신 FetchBoardsDocument를 사용합니다.
  const { data } = useQuery(FetchBoardsDocument);
  // 💥 바뀐 부분: DELETE_BOARD 대신 DeleteBoardDocument를 사용합니다.
  const [deleteBoard] = useMutation(DeleteBoardDocument);
  const router = useRouter();

  // [이벤트 1] 삭제 아이콘 클릭 시
  const onClickDelete = async (event: MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    try {
      await deleteBoard({
        variables: { boardId: hoveredId },
        // 💥 바뀐 부분: 목록을 새로고침할 때도 Document를 사용합니다.
        refetchQueries: [{ query: FetchBoardsDocument }],
      });
    } catch (error: any) {
      console.error("삭제실패:", error.message);
    }
  };

  // [이벤트 2] 게시글 행 클릭 시
  const onClickDetail = (id: string) => {
    router.push(`/boards/${id}`);
  };

  return {
    data,
    hoveredId,
    setHoveredId,
    onClickDelete,
    onClickDetail,
  };
};