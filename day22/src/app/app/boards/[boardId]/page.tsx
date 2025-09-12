"use client";

import React, { ChangeEvent, useState } from "react";

import styles from "./styles.module.css";

import Image from "next/image";

import { useMutation, gql } from "@apollo/client";

import { useRouter } from "next/navigation";

// 이미지 import
import addImage from "@assets/add_image.png";

// 이 부분에서 많은 고민함, 
// // "src에 들어갈 값은 profileImage라는 변수 안에 들어있어!"
{/* <Image src={profileImage} alt="프로필이미지" /> 이렇게 다같이 지정해야 하나 하나씩 해야하나 고민하다 시간 다감 
//  */}
// 레퍼런스 코드   
// 이 방식이 좋은 이유
// 중앙 관리: 모든 이미지가 한 파일에 정리되어 있어서 나중에 이미지를 찾거나 수정하기가 매우 편리해요.

// 오타 방지: 코드 다른 부분에서 이미지 경로를 문자열("/assets/profile.png")로 직접 쓰는 대신 IMAGE_SRC.profileImage.src 처럼 객체 속성으로 접근하게 되므로, 오타로 인한 오류를 방지할 수 있어요.

// 유지보수 용이: 만약 이미지 파일 이름이 바뀌어도, 이 파일에서 단 한 줄만 수정하면 이미지를 사용하는 모든 곳에 자동으로 반영됩
// 

const IMAGE_SRC = {
    profileimage: {
        src: require("@assets/profile_image.png"),
        alt: "프로필이미지"
    },
    linkImage: {
        src: require("@assets/link.png"),
        alt: "링크아이콘"
    },
    locationImage: {
        src: require("@assets/location.png"),
        alt: "위치아이콘"
    },
    opentheseaImage: {
        src: require("@assets/openthesea.png"),
        alt: "해변풍경"
    },
    video: {
        src: require("@assets/video.png"),
        alt: "영상사진"
    },
    uploading: {
        src: require("@assets/uploading.png"),
        alt: "업로드사진"
    },
    spinningtop: {
        src: require("@assets/spinningtop.png"),
        alt: "목록아이콘"
    },
    pencil: {
        src: require("@assets/pencil.png"),
        alt: "수정아이콘"
    },
    heart: {
        src: require("@assets/heart.png"),
        alt: "하트"    
    },
    brokenheart: {
        src: require("@assets/brokenheart.png"),
        alt: "깨진하트"
    }, 
}as const;



    const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      images
      user {
        _id
        email
        name
        picture
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
 
"use client";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import "./styles.modules.css"; // CSS 파일 경로 확인 필요
import profileImage from "../../../../../public/assets/profile_image.png"; // 이미지 경로 확인 필요
import link from "../../../../../public/assets/link.png";
import location from "../../../../../public/assets/location.png";
import heart from "../../../../../public/assets/heart.png";
import pencil from "../../../../../public/assets/pencil.png";
import Image from "next/image";




// 1. 특정 ID의 게시글을 조회하는 GraphQL Query를 정의합니다.
const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function BoardsDetailPage() {
  const params = useParams();
  const boardId = Array.isArray(params.boardId)
    ? params.boardId[0]
    : params.boardId;

  // 2. [과제] useQuery 훅을 사용해 boardId로 게시글 데이터를 요청합니다.
  const { data, loading, error } = useQuery(FETCH_BOARD, {
    variables: { boardId: boardId },
    skip: !boardId, // boardId가 없을 경우엔 요청을 보내지 않습니다.
  });

  // 3. [과제] 데이터를 받아오는 동안 로딩 상태를 처리합니다.
  if (loading) {
    return <div>게시글을 불러오는 중입니다...</div>;
  }

  if (error) {
    return <div>게시글을 불러오는데 실패했습니다.</div>;
  }

  // 4. [과제] 조회된 데이터를 화면에 보여줍니다.
  return (
    <div className="Css_detail_page_body">
      <div className="detail-layout">
        <div className="detail-body">
          <div className="detail-frame">
            {/* data가 있을 때만 내부 내용을 렌더링합니다. (옵셔널 체이닝 `?` 사용) */}
            <div className="detail-subject">{data?.fetchBoard?.title}</div>
            <div className="detail-metadata-container">
              <div className="detail-metadata-profile">
                <Image src={profileImage} alt="프로필이미지" width={40} height={40}/>
                <div>{data?.fetchBoard?.writer}</div>
              </div>
              <div className="detail-metadata-date">2024.11.11</div>
            </div>
            <div className="enroll-border"></div>
            <div className="detail-metadata-icon-container">
                <Image src={link} alt="링크아이콘" width={24} height={24} />
                <Image src={location} alt="위치아이콘" width={24} height={24} />
            </div>
            <div className="detail-content-container">
              <div className="detail-content-text">
                {/* Optional Chaining을 사용하여 안전하게 접근합니다. */}
                {data?.fetchBoard?.contents}
              </div>
              <div className="detail-content-goodorbad">
                  <div className="-good-container">
                    <Image src={heart} alt="좋아요" width={24} height={22}/>
                    <div className="detail-good-text">12</div>
                  </div>
              </div>
              <div className="detail-buttons-container">
                  <button className="detail-button">
                      <div>목록으로</div>
                  </button>
                  <button className="detail-button">
                      <Image alt="수정아이콘" src={pencil} width={24} height={24} />
                      <div>수정하기</div>
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}






export default function BoardDetail() {
    const { boardId } = useParams();
    const post = FAKE_POST_DATA;

    return (
        <div className="board-detail">
            {/* ... (제목, 헤더 등 이전 코드와 동일) ... */}
            <h1 className="board-detail__title">{post.title}</h1>
            {/* ... */}
            <div className="board-detail__divider"></div>

            <div className="board-detail__content">
                {post.imageUrl && <img src={post.imageUrl} alt="게시물 이미지" className="board-detail__image" />}
                
                {/* 바로 이 부분입니다! */}
                <div className="board-detail__text">
                    {post.contents.split('/ line이 비어있으면 <br\n').map((line, index) => (
                        / /> 태그로 진짜 '빈 줄'을 만들어줍니다.
                        line ? <div key={index}>{line}</div> : <br key={index} />
                    ))}
                </div>
                
                {/* ... (유튜브, 좋아요/싫어요, 푸터 등 이전 코드와 동일) ... */}
            </div>
            {/* ... */}
        </div>
    );
}; l 



