// src/app/boards/[boardId]/page.tsx

"use client"; // 👈 [핵심] useState, useRouter, useQuery 같은 훅(hook)을 사용하려면 반드시 최상단에 선언해야 합니다
import React, {ChangeEvent,  useState } from "react";
import styles from "./styles.moduless.css";
import Image from "next/image";"
import { useMutation, gql, useQuery } from "@apollo/client";
import { useParams, useRouter } from  "next/navigation";
import {
  FETCH_BOARD,
  CREATE_BOARD,
  UPDATE_BOARD,
}  from "components/queries";
import addImage from "@assets/add_image.png"; // 사진 객체 관리를 하기 위해서 하는 거 같다 

const  IMAGE_SRC = {
  addImage: {
    src: addImage,
    alt: "사진추가이미지",
  },
};

interface IBoardWriteProps {
    isEdit: boolean; 
}




// [데이터] 서버에 어떤 데이터를 요청할지 미리 작성해둔 '요청서(Query)'입니다.
const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      likeCount
      dislikeCount
      createdAt
    }
  }
`;
export default function BoardsWritePage(props: IBoardWriteProps) {
  const router = useRouter(); // 👈 [준비] 페이지 이동 기능을 사용할 수 있도록 준비합니다.
  const params = useParams(); // 👈 [준비] 주소창의 동적인 값([boardId])을 가져올 수 있도록 준비합니다.
  const boardId = params.isEdit ? param.boardId :null;
 
  // [핵심] Apollo Client의 useQuery를 사용해 서버에 데이터를 요청합니다.
  // boardId를 variables에 담아 보내면, 서버는 그 ID에 맞는 게시글 하나만 찾아서 보내줍니다.
  const { data, loading } = useQuery(FETCH_BOARD, {
    variables: { boardId: boardId },
    skip : !props.isEdit, // isEdit이 true가 아닐 때(즉, 등록모드일 때)는 요청을 스킵!
  });

  //
  //  [안정성] 데이터가 로딩 중일 때는 잠시 "로딩 중"이라는 글자를 보여줘서, 데이터가 없는 상태에서 발생하는 오류를 막아줍니다.
  if (loading) return <div>게시글을 불러오는 중입니다...</div>;



  
  return (
    <div className = {styles. layout}>
       <div classNaME 






       </div>

  );
}