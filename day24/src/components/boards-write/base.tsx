// src/components/boards-write/index.tsx

"use client";
import React, { ChangeEvent, useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { FETCH_BOARD, CREATE_BOARD, UPDATE_BOARD } from "components/queries"; // 👈 1. queries.ts에서 요청서들을 import

export default function BoardWrite({ isEdit }) {
  const router = useRouter();
  const params = useParams();
  const boardId = params.boardId;

  // --- 상태(State) 관리 ---
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  // --- GraphQL API 준비 ---
  const [createBoard] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);

  // 2. [핵심] 수정 모드일 때만(skip: false) fetchBoard 쿼리를 실행합니다.
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: boardId },
    skip: !isEdit, // isEdit이 false(등록 모드)이면 이 쿼리는 실행되지 않습니다.
  });

  // 3. [핵심] 수정 모드이고, 데이터 로딩이 완료되면 불러온 데이터를 state에 반영합니다.
  useEffect(() => {
    if (data) {
      setTitle(data.fetchBoard.title);
      setContents(data.fetchBoard.contents);
    }
  }, [data]);

  // --- 이벤트 핸들러 함수들 ---
  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => setWriter(event.target.value);
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);
  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => setContents(event.target.value);

  // 4. 등록하기 버튼 클릭 시 실행될 함수
  const onClickSubmit = async () => {
    try {
      const result = await createBoard({
        variables: {
          createBoardInput: { writer, password, title, contents },
        },
      });
      alert("게시글이 성공적으로 등록되었습니다.");
      router.push(`/boards/${result.data.createBoard._id}`);
    } catch (error: any) {
      alert(error.message);
    }
  };

  // 5. 수정하기 버튼 클릭 시 실행될 함수
  const onClickUpdate = async () => {
    const userPassword = prompt("글을 입력할때 입력하셨던 비밀번호를 입력해주세요");

    const updateBoardInput: { title?: string; contents?: string } = {};
    if (title !== data.fetchBoard.title) updateBoardInput.title = title;
    if (contents !== data.fetchBoard.contents) updateBoardInput.contents = contents;

    if (Object.keys(updateBoardInput).length === 0) {
      alert("수정된 내용이 없습니다.");
      return;
    }

    try {
      const result = await updateBoard({
        variables: {
          boardId,
          password: userPassword,
          updateBoardInput,
        },
      });
      alert("게시글이 성공적으로 수정되었습니다!");
      router.push(`/boards/${result.data.updateBoard._id}`);
    } catch (error: any) {
      if (error.graphQLErrors) {
        alert(error.graphQLErrors[0].message);
      } else {
        alert("수정 중 오류가 발생했습니다.");
      }
    }
  };

  // --- 화면에 그릴 내용 (JSX) ---
  return (
    <div className={styles.detailLayout}> 
    
    
    
    </div> 






    <div>
      <h1>게시글 {isEdit ? "수정" : "등록"}</h1>
      작성자:{" "}
      <input
        type="text"
        onChange={onChangeWriter}
        defaultValue={data?.fetchBoard.writer}
        disabled={isEdit} // 6. 수정 모드일 때 비활성화
      />
      <br />
      비밀번호:{" "}
      <input
        type="password"
        onChange={onChangePassword}
        disabled={isEdit} // 6. 수정 모드일 때 비활성화
      />
      <br />
      제목: <input type="text" value={title} onChange={onChangeTitle} />
      <br />
      내용: <textarea value={contents} onChange={onChangeContents}></textarea>
      <br />
      <button onClick={isEdit ? onClickUpdate : onClickSubmit}>
        {isEdit ? "수정하기" : "등록하기"}
      </button>
    </div>
  );
}