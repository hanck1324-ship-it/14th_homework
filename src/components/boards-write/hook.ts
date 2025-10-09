"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter, useParams } from "next/navigation";
import { CREATE_BOARD, UPDATE_BOARD, FETCH_BOARD } from "./queries";
import { IUpdateBoardInput, CreateBoardDocument, UpdateBoardDocument, FetchBoardDocument } from "@/commons/graphql/graphql";

// IBoardAddress 타입을 IUpdateBoardInput에서 가져오거나 직접 정의
interface IBoardAddress {
  zipcode?: string;
  address?: string;
  addressDetail?: string;
}

export const useBoardWrite = (isEdit: boolean) => {
  const router = useRouter();
  const params = useParams();
  const boardId = params.boardId as string;

  // 상태(state) 정의 
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  //  과제 요구사항: 유튜브, 주소 관련 상태 추가
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // GraphQL API 요청 함수 
  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);
  const { data } = useQuery(FetchBoardDocument, { variables: { boardId }, skip: !isEdit });

  // 이벤트 핸들러 정리
  const onChangeWriter = (e: ChangeEvent<HTMLInputElement>) => setWriter(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onChangeContents = (e: ChangeEvent<HTMLTextAreaElement>) => setContents(e.target.value);
  // 과제 요구사항: 유튜브, 상세주소 핸들러 추가
  const onChangeYoutubeUrl = (e: ChangeEvent<HTMLInputElement>) => setYoutubeUrl(e.target.value);
  const onChangeAddressDetail = (e: ChangeEvent<HTMLInputElement>) => setAddressDetail(e.target.value);
  
  // 과제 요구사항: 주소 검색 모달 관련 핸들러
  const handleToggleModal = () => setIsModalOpen((prev) => !prev);
  const handleComplete = (data: any) => {
    setZipcode(data.zonecode);
    setAddress(data.address);
    handleToggleModal();
  };

  
  // 이거 왜 빠졌지 게시글 등록 로직 완성
  const onClickSubmit = async () => {
    if (!writer || !password || !title || !contents) {
      alert("작성자, 비밀번호, 제목, 내용은 필수 항목입니다.");
      return;
    }
    try {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer,
            password,
            title,
            contents,
            youtubeUrl,
            boardAddress: { // 주소 정보 추가
              zipcode,
              address,
              addressDetail,
            },
          },
        },
      });
      const newBoardId = result.data?.createBoard?._id;
      if (newBoardId) {
        alert("게시글이 성공적으로 등록되었습니다.");
        router.push(`/boards/${newBoardId}`);
      }
    } catch (error: any) {
      alert(`등록에 실패했습니다: ${error.message}`);
    }
  };

  // 내 의도  게시글 수정 로직 개선 (변경된 내용만 보내기)
  const onClickUpdate = async () => {
    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    const updateBoardInput: IUpdateBoardInput = {};
    const boardAddress: IBoardAddress = {};

    // 기존 데이터와 현재 입력된 값을 비교해서 변경된 것만 updateBoardInput에 추가
    if (title && title !== data.fetchBoard.title) updateBoardInput.title = title;
    if (contents && contents !== data.fetchBoard.contents) updateBoardInput.contents = contents;
    if (youtubeUrl !== data.fetchBoard.youtubeUrl) updateBoardInput.youtubeUrl = youtubeUrl;
    if (zipcode !== data.fetchBoard.boardAddress?.zipcode) boardAddress.zipcode = zipcode;
    if (address !== data.fetchBoard.boardAddress?.address) boardAddress.address = address;
    if (addressDetail !== data.fetchBoard.boardAddress?.addressDetail) boardAddress.addressDetail = addressDetail;

    if (Object.keys(boardAddress).length > 0) {
      updateBoardInput.boardAddress = boardAddress;
    }

    if (Object.keys(updateBoardInput).length === 0) {
      alert("수정된 내용이 없습니다.");
      return;
    }

    try {
      const result = await updateBoard({
        variables: { boardId, password, updateBoardInput },
      });
      const updatedBoardId = result.data?.updateBoard?._id;
      if (updatedBoardId) {
        alert("게시글이 성공적으로 수정되었습니다.");
        router.push(`/boards/${updatedBoardId}`);
      }
    } catch (error: any) {
      alert(`수정에 실패했습니다: ${error.message}`);
    }
  };

  // 수정 페이지 초기 데이터 바인딩 
  useEffect(() => {
    if (data?.fetchBoard) {
      setTitle(data.fetchBoard.title);
      setContents(data.fetchBoard.contents);
      setYoutubeUrl(data.fetchBoard.youtubeUrl ?? "");
      setZipcode(data.fetchBoard.boardAddress?.zipcode ?? "");
      setAddress(data.fetchBoard.boardAddress?.address ?? "");
      setAddressDetail(data.fetchBoard.boardAddress?.addressDetail ?? "");
    }
  }, [data]);

  const isActive = isEdit ? true : writer && password && title && contents;

  // --- UI 컴포넌트로 값과 함수들 전달 
  return {
    writer, password, title, contents, youtubeUrl, zipcode, address, addressDetail,
    isModalOpen, data, isActive,
    onChangeWriter, onChangePassword, onChangeTitle, onChangeContents, onChangeYoutubeUrl,
    onChangeAddressDetail, handleToggleModal, handleComplete,
    onClickSubmit, onClickUpdate,
  };
};