import { useQuery, useMutation } from "@apollo/client";
import { useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { FETCH_BOARDS, DELETE_BOARD } from "./queries";

export const useBoardsList = () => {
  const [hoveredId, setHoveredId] = useState("");
  const { data } = useQuery(FETCH_BOARDS);
  const [deleteBoard] = useMutation(DELETE_BOARD);// 👈 1. "삭제 주문서"를 사용할 준비// 
  const router = useRouter();

  // [이벤트 1] 삭제 아이콘 클릭 시
  const onClickDelete = async (event: MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    try {
      await deleteBoard({// 👈 2. 사용자가 버튼을 클릭하면,
        variables: { boardId: hoveredId }, //👈 3. "어떤 글을 삭제할지(boardId)" 내용을 담아
        refetchQueries: [{ query: FETCH_BOARDS }],// 👈 4. 주문(삭제)을 넣고, 성공하면 메뉴판을 새로고침!
      });
    } catch (error: any) {
      // ❗️ 'error'로  삭제실패알림.
      console.error("삭제실패:", error.message);
    }
  };

  // [이벤트 2] 게시글 행 클릭 시
  const onClickDetail = (id: string) => {
    router.push(`/boards/${id}`);
  };

  // 컴포넌트(매니저)가 사용할 모든 데이터와 기능을 return 해줍니다.
  return {
    data,
    hoveredId,
    setHoveredId,
    onClickDelete,
    onClickDetail,
  };
};
//hook.ts (모든 기능을 담당할 셰프)

