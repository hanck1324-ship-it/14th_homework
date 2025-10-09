"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { CREATE_BOARD_COMMENT } from "./queries";
import { FETCH_BOARD_COMMENTS } from "../comment-list/queries";

export const useCommentWrite = () => {
  const params = useParams();
  const boardId = params.boardId as string;

  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [contents, setContents] = useState("");
  const [rating, setRating] = useState(0); // 별점 state

  const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT);

  const onChangeWriter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangeContents = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
  };

  const onChangeRating = (value: number) => {
    setRating(value);
  };

  const onClickSubmit = async () => {
    if (!writer || !password || !contents) {
      alert("작성자, 비밀번호, 내용을 모두 입력해주세요.");
      return;
    }

    try {
      await createBoardComment({
        variables: {
          boardId: boardId,
          createBoardCommentInput: {
            writer,
            password,
            contents,
            rating, // API로 별점 전달
          },
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId },
          },
        ],
      });
      // 성공 후 입력창 초기화
      setWriter("");
      setPassword("");
      setContents("");
      setRating(0);
      alert("댓글이 성공적으로 등록되었습니다.");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return {
    writer,
    password,
    contents,
    rating,
    onChangeWriter,
    onChangePassword,
    onChangeContents,
    onChangeRating,
    onClickSubmit,
  };
};