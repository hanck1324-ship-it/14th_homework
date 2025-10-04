"use client";

import { useMutation } from "@apollo/client";
import {
 //  댓글 생성과, 댓글 목록 리프레시를 위한 Document를 import 합니다.
  CreateBoardCommentDocument, 
  FetchBoardCommentsDocument,
} from "@/commons/graphql/graphql";
import { useParams } from "next/navigation";
import { useState, ChangeEvent } from "react";
import { useBoardWrite } from "./hook";

export const useCommentCreate = () => {
  const [newComment] = useMutation(CreateBoardCommentDocument); 
  const [commentWriter, setCommentWriter] = useState("");
  const [commentPassword, setCommentPassword] = useState("");
  const [commentText, setCommentText] = useState("");
  //별점을 저장한다느 생각을 못했음 (기본값은 0점임)
  const [rating, setRating] = useState(0);

  const params = useParams();
  const id = params.boardId.toString();

  const isButtonDisabled = !commentWriter || !commentPassword || !commentText;

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setCommentWriter(event.target.value);
  };

  const onChangePW = (event: ChangeEvent<HTMLInputElement>) => {
    setCommentPassword(event.target.value);
  };

  const onChangeText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(event.target.value);
  };
  // 어쩐지 구동이 안되더라 핸들러 필수 !!
  const onChangeRating = (value: number) => {
    setRating(value);
  };

  const createComment = async () => {
    if (isButtonDisabled) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    try {
      const { data } = await newComment({
        variables: {
          createBoardCommentInput: {
            writer: commentWriter,
            password: commentPassword,
            contents: commentText,
            rating: rating, // 0으로 설정하면 올라가지 않음 
          },
          boardId: id,
        },
        refetchQueries: [
          {
            query: FetchBoardCommentsDocument,
            variables: { boardId: id },
          },
        ],
      });

      if (data?.createBoardComment) {
        alert("댓글 등록이 완료 되었습니다!");
        setCommentWriter("");
        setCommentPassword("");
        setCommentText("");
      } else {
        alert("댓글 등록에 실패하였습니다");
      }
    } catch (err) {
      console.error(err);
      alert("댓글 등록 중 오류가 발생했습니다.");
    }
  };

  return {
    isButtonDisabled,
    onChangeWriter,
    onChangePW,
    onChangeText,
    commentWriter,
    commentPassword,
    commentText,
    createComment,
    rating,// UI 컴포넌트에서 rating
    onChangeRating, //onChangeReting을 Retunr에 추가해야 함
  };
};