import { gql } from "@apollo/client";

// [요청서 1] 댓글 목록 조회 (Query)
export const FETCH_BOARD_COMMENTS = gql`
  query fetchBoardComments($boardId: ID!) {
    fetchBoardComments(boardId: $boardId) {
      _id
      writer
      contents
      rating
      createdAt
      updatedAt
    }
  }
`;

// [요청서 2] 댓글 삭제 (Mutation)
export const DELETE_BOARD_COMMENT = gql`
  mutation deleteBoardComment($boardCommentId: ID!, $password: String!) {
    deleteBoardComment(boardCommentId: $boardCommentId, password: $password)
  }
`;