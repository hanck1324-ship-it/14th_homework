
import { useQuery } from "@apollo/client";
import { FETCH_BOARD } from "./queries";
import { IBoardDetail } from "./types";

export const useBoardDetail = (boardId: string) => {
  const { data, loading, error } = useQuery<{ fetchBoard: IBoardDetail }>(
    FETCH_BOARD,
    { variables: { boardId } }
  );

  return {
    board: data?.fetchBoard,
    loading,
    error,
  };
};
