
"use client";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FetchBoardDocument } from "@/commons/graphql/graphql";

export const useBoardDetail = (boardId: string) => {
  const router = useRouter();
  const params = useParams();
  const id = params.boardId.toString();
  // 보여줄 board 정보 받아오기
  const { data , loading} = useQuery(FetchBoardDocument, {
    variables: { boardId: boardId },
    skip: !boardId, // boardId가 없을 경우 쿼리 실행을 pass
  });
  //수정하기 페이지로 이동
  const goToEditPage = () => {
    router.push(`${id}/edit`);
  };

  return {
      board: data?.fetchBoard, // data 안에 들어있는 실제 게시글 정보는 data.fetchBoard 
      loading, // 받아온 loading 상태를 그대로 넘겨
      goToEditPage,
    };
  };

