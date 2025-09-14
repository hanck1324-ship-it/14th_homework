"use client";

import { useQuery, gql } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
// CSS Modules를 사용하기 위해 styles를 import 합니다.
import styles from "./styles.module.css"; 

// 1. [수정] 올바른 경로 별칭으로 이미지들을 import 합니다.
import profileImage from "@assets/profile_image.png";
import linkImage from "@assets/link.png";
import locationImage from "@assets/location.png";
import goodImage from "@assets/good.png";
import badImage from "@assets/bad.png";
import pencilImage from "@assets/pencil.png";
import listImage from "@assets/left_icon.png"; 

import contentImage from "@assets/openthesea.png";

// 2. [추가] 서버에 데이터를 요청하기 위한 GraphQL Query를 정의합니다.
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

// 3. [수정] 컴포넌트 이름을 대문자로 시작하고, export default를 붙여줍니다.
export default function BoardsDetailPage() {
  const router = useRouter();
  const params = useParams();
  const boardId = params.boardId;

  // 4. [추가] useQuery로 서버에서 진짜 데이터를 가져옵니다.
  const { data, loading } = useQuery(FETCH_BOARD, {
    variables: { boardId: boardId },
  });

  if (loading) return <div>게시글을 불러오는 중입니다...</div>;

  return (
    // className을 CSS Modules 방식(`styles.`)으로 변경했습니다.
    <div className={styles.detailLayout}>
      <div className={styles.detailBody}>
        <div className={styles.detailFrame}>
          {/* 5. [수정] 하드코딩된 텍스트 대신 `data`에서 받아온 실제 데이터를 사용합니다. */}
          <div className={styles.detailSubject}>{data?.fetchBoard?.title}</div>
          <div className={styles.detailMetadataContainer}>
            <div className={styles.detailMetadataProfile}>
              <Image src={profileImage} alt="프로필이미지" width={40} height={40}/>
              <div>{data?.fetchBoard?.writer}</div>
            </div>
            <div className={styles.detailMetadataDate}>
                {data?.fetchBoard?.createdAt.split("T")[0]}
            </div>
          </div>
          <div className={styles.enrollBorder}></div>
          <div className={styles.detailMetadataIconContainer}>
            <Image src={linkImage} alt="링크아이콘" />
            <Image src={locationImage} alt="위치아이콘" />
          </div>
          <div className={styles.detailContentContainer}>
            <Image src={contentImage} alt="게시글 이미지" className={styles.detailContentImage}/>
            <div className={styles.detailContentText}>{data?.fetchBoard?.contents}</div>
            <div className={styles.detailContentGoodOrBad}>
              <div className={styles.detailGoodContainer}>
                <Image src={goodImage} alt="좋아요" />
                <div className={styles.detailGoodText}>{data?.fetchBoard?.likeCount}</div>
              </div>
              <div className={styles.detailGoodContainer}>
                <Image src={badImage} alt="싫어요" />
                <div className={styles.detailBadText}>{data?.fetchBoard?.dislikeCount}</div>
              </div>
            </div>
            {/* 6. [수정] 버튼 문법을 수정하고, 실제 이동 기능을 추가합니다. */}
            <div className={styles.detailButtonsContainer}>
              <button className={styles.detailButton} onClick={() => router.push('/boards')}>
                <Image src={listImage} alt="목록아이콘" />
                <div>목록으로</div>
              </button>
              <button className={styles.detailButton} onClick={() => router.push(`/boards/${boardId}/edit`)}>
                <Image src={pencilImage} alt="수정아이콘" />
                <div>수정하기</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}