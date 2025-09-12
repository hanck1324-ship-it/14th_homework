"use client";

import { gql, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
// import styles from "./styles.module.css"; // CSS 모듈 파일이 있다면 주석 해제

// 1. 이미지들을 한 곳에서 관리하는 객체 (중앙 관리)
import profileImage from "../../../public/assets/profile_image.png";
import linkImage from "../../../public/assets/link.png";
import locationImage from "../../../public/assets/location.png";
import heartImage from "../../../public/assets/heart.png";
import pencilImage from "../../../public/assets/pencil.png";
// 상세 페이지에서 사용할 다른 이미지들도 여기에 추가하세요.
// import sampleImage from "../../../public/assets/openthesea.png";

const IMAGES = {
  profile: { src: profileImage, alt: "프로필 이미지" },
  link: { src: linkImage, alt: "링크 아이콘" },
  location: { src: locationImage, alt: "위치 아이콘" },
  heart: { src: heartImage, alt: "좋아요 아이콘" },
  pencil: { src: pencilImage, alt: "수정 아이콘" },
  // sample: { src: sampleImage, alt: "게시글 샘플 이미지" },
};

// 2. GraphQL 쿼리는 한 번만 정의
const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      createdAt
      // images // 백엔드에서 이미지 URL 배열을 받아온다면 주석 해제
    }
  }
`;

export default function BoardsDetailPage() {
  const router = useRouter();
  const params = useParams();
  const boardId = Array.isArray(params.boardId)
    ? params.boardId[0]
    : params.boardId;

  const { data, loading, error } = useQuery(FETCH_BOARD, {
    variables: { boardId: boardId },
    skip: !boardId,
  });

  const onClickMoveToEdit = () => {
    router.push(`/boards/${boardId}/edit`);
  };

  if (loading) return <div>게시글을 불러오는 중입니다...</div>;
  if (error) return <div>게시글을 불러오는데 실패했습니다.</div>;

  return (
    <div className="Css_detail_page_body"> {/* className={styles.wrapper} */}
      <div className="detail-layout">
        <div className="detail-body">
          <div className="detail-frame">
            <div className="detail-subject">{data?.fetchBoard?.title}</div>
            <div className="detail-metadata-container">
              <div className="detail-metadata-profile">
                {/* 3. IMAGES 객체를 사용해 이미지 렌더링 */}
                <Image src={IMAGES.profile.src} alt={IMAGES.profile.alt} width={40} height={40}/>
                <div>{data?.fetchBoard?.writer}</div>
              </div>
              <div className="detail-metadata-date">
                {new Date(data?.fetchBoard?.createdAt).toLocaleDateString("ko-KR")}
              </div>
            </div>
            <div className="enroll-border"></div>
            <div className="detail-metadata-icon-container">
                <Image src={IMAGES.link.src} alt={IMAGES.link.alt} width={24} height={24} />
                <Image src={IMAGES.location.src} alt={IMAGES.location.alt} width={24} height={24} />
            </div>
            <div className="detail-content-container">
              {/* 백엔드에서 받은 이미지가 있다면 여기서 map으로 표시
                data?.fetchBoard?.images?.map(src => <Image src={src} ... />) 
              */}
              <div className="detail-content-text">
                {data?.fetchBoard?.contents}
              </div>
              <div className="detail-content-goodorbad">
                  <div className="-good-container">
                    <Image src={IMAGES.heart.src} alt={IMAGES.heart.alt} width={24} height={22}/>
                    {/* 좋아요/싫어요 수도 실제 데이터로 교체 가능 */}
                    <div className="detail-good-text">12</div>
                  </div>
              </div>
              <div className="detail-buttons-container">
                  <button className="detail-button" onClick={() => router.push("/boards")}>
                      <div>목록으로</div>
                  </button>
                  <button className="detail-button" onClick={onClickMoveToEdit}>
                      <Image alt={IMAGES.pencil.alt} src={IMAGES.pencil.src} width={24} height={24} />
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