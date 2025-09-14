"use client";

import { useQuery, gql } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./styles.module.css";

// 이미지 import
import profileImage from "@assets/profile_image.png";
import linkImage from "@assets/link.png";
import locationImage from "@assets/location.png";
import goodImage from "@assets/good.png";
import badImage from "@assets/bad.png";
import pencilImage from "@assets/pencil.png";
import left_icon from "@assets/left_icon.png"; 

// GraphQL Query 정의
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

export default function BoardsDetailPage() {
  const router = useRouter();
  const params = useParams();
  const boardId = params.boardId;

  // useQuery 훅으로 서버에서 데이터 가져오기
  const { data, loading } = useQuery(FETCH_BOARD, {
    variables: { boardId: boardId },
  });

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return dateString.split("T")[0].replaceAll("-", ".");
  };

  // 데이터 로딩 중일 때 표시할 화면
  if (loading) {
    return <div>게시글을 불러오는 중입니다...</div>;
  }

  return (
    <div className={styles.detailLayout}>
      <div className={styles.detailBody}>
        <div className={styles.detailFrame}>
          {/* 서버에서 받아온 실제 데이터 사용 */}
          <div className={styles.detailSubject}>{data?.fetchBoard?.title}</div>
          <div className={styles.detailMetadataContainer}>
            <div className={styles.detailMetadataProfile}>
              <Image src={profileImage} alt="프로필이미지" width={40} height={40} />
              <div>{data?.fetchBoard?.writer}</div>
            </div>
            <div className={styles.detailMetadataDate}>
              {formatDate(data?.fetchBoard?.createdAt)}
            </div>
          </div>
          <div className={styles.enrollBorder}></div>
          <div className={styles.detailMetadataIconContainer}>
            <Image src={linkImage} alt="링크아이콘" />
            <Image src={locationImage} alt="위치아이콘" />
          </div>
          <div className={styles.detailContentContainer}>
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
            {/* 버튼 기능 및 아이콘 수정 */}
            <div className={styles.detailButtonsContainer}>
              <button className={styles.detailButton} onClick={() => router.push('/boards')}>
                <Image src={left_icon} alt="목록아이콘" />
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