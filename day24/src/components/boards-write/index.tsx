// src/components/boards-write/index.tsx

"use client";

import { gql, useMutation } from "@apollo/client"; // 서버와 통신을 위한 도구 
import { useParams, useRouter } from "next/navigation"; //페이지 이동, 주소 관리를 위한 도구
import { useEffect, useState } from "react"; // 컴포넌트와 기억 (state), 특점 시점 행동 (effect)을 위한 도구
import styles from "./styles.module.css"; 
// 등록 Mutation 새 게시글 만들어주세요 
const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;

// 수정 Mutation 기존 게시글 수정해주세요 
const UPDATE_BOARD = gql`
  mutation updateBoard(
    $updateBoardInput: UpdateBoardInput!
    $password: String
    $boardId: ID!
  ) {
    updateBoard(
      updateBoardInput: $updateBoardInput
      password: $password
      boardId: $boardId
    ) {
      _id
    }
  }
`;


// props 타입을 정의합니다. 수정 페이지에서는 data를 받아옵니다.
interface IBoardsWriteProps {
  isEdit: boolean;
  data?: any; // fetchBoard로 받아온 데이터 타입
}

export default function BoardsWrite(props: IBoardsWriteProps) {
  const router = useRouter();
  const params = useParams(); // URL의 [boardId]를 가져오기 위해 사용

  const [inputs, setInputs] = useState({
    writer: "",
    password: "",
    title: "",
    contents: "",
  });

  const [createBoard] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);

  // 수정 모드일 때, useEffect를 사용해 기존 데이터를 state에 설정합니다.
  useEffect(() => {
    if (props.isEdit && props.data) {
      setInputs({
        writer: props.data.fetchBoard.writer,
        password: "********", // 비밀번호는 보안상 비워둡니다.
        title: props.data.fetchBoard.title,
        contents: props.data.fetchBoard.contents,
      });
    }
  }, [props.isEdit, props.data]);

  // 모든 input의 변경을 처리하는 공통 함수
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  // 등록하기 버튼 클릭 시 실행
  const onClickSubmit = async () => {
    try {
      const result = await createBoard({
        variables: { createBoardInput: { ...inputs } },
      });
      alert("게시글이 성공적으로 등록되었습니다.");
      router.push(`/boards/${result.data.createBoard._id}`);
    } catch (error) {
      alert("등록에 실패했습니다.");
      console.log(error);
    }
  };

  // 수정하기 버튼 클릭 시 실행
  const onClickUpdate = async () => {
    // 1. 비밀번호를 입력받습니다.
    const password = prompt("글을 입력할때 입력하셨던 비밀번호를 입력해주세요");
    if (!password) {
      alert("비밀번호가 있어야 수정이 가능합니다.");
      return;
    }

    // 2. 변경된 내용만 담을 객체를 생성합니다.
    const updateBoardInput: { title?: string; contents?: string } = {};
    if (inputs.title !== props.data.fetchBoard.title) {
      updateBoardInput.title = inputs.title;
    }
    if (inputs.contents !== props.data.fetchBoard.contents) {
      updateBoardInput.contents = inputs.contents;
    }

    // 3. 변경된 내용이 없으면 함수를 종료합니다.
    if (Object.keys(updateBoardInput).length === 0) {
      alert("수정된 내용이 없습니다.");
      return;
    }

    try {
      const result = await updateBoard({
        variables: {
          boardId: params.boardId, // useParams로 가져온 boardId
          password,
          updateBoardInput,
        },
      });
      alert("게시글이 성공적으로 수정되었습니다.");
      router.push(`/boards/${result.data.updateBoard._id}`);
    } catch (error) {
      // 4. 비밀번호 오류 등 예외처리를 합니다.
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>게시글 {props.isEdit ? "수정" : "등록"}</h1>
      작성자:
      <input
        type="text"
        name="writer"
        onChange={handleInputChange}
        value={inputs.writer}
        disabled={props.isEdit} // 수정 시 작성자 변경 불가 (disabled 처리)
      />
      <br />
      비밀번호:
      <input
        type="password"
        name="password"
        onChange={handleInputChange}
        value={inputs.password}
        disabled={props.isEdit} // 수정 시 비밀번호 필드는 사용하지 않음
      />
      <br />
      제목:
      <input
        type="text"
        name="title"
        onChange={handleInputChange}
        value={inputs.title}
      />
      <br />
      내용:
      <textarea
        name="contents"
        onChange={handleInputChange}
        value={inputs.contents}
      />
      <br />
      {/* isEdit 값에 따라 다른 함수를 실행하는 버튼 */}
      <button onClick={props.isEdit ? onClickUpdate : onClickSubmit}>
        {props.isEdit ? "수정" : "등록"}하기
      </button>
    </div>
  );
}