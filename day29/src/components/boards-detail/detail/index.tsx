"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./styles.module.css";
import { useBoardDetail } from "./hook";
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd'; 

import locationImage from "@/assets/location.png";
import clipImage from "@/assets/clip.png";
import profileImage from "@/assets/profile_image.png";

export default function BoardsDetail() {
  const router = useRouter();
  const params = useParams();
  const boardId = params.boardId as string;

  const { board, loading } = useBoardDetail(boardId);

  if (loading) { return <div>게시글을 불러오는 중입니다...</div>; }

  const fullAddress = `${board?.boardAddress?.zipcode || ''} ${board?.boardAddress?.address || ''} ${board?.boardAddress?.addressDetail || ''}`.trim();

  return (
    <div className={styles.detailLayout}>
      <div className={styles.detailBody}>
        <div className={styles.detailFrame}>
          <div className={styles.detailSubject}>{board?.title}</div>
          
          <div className={styles.detailMetadataContainer}>
            <div className={styles.detailMetadataProfile}>
              <Image src={profileImage} alt="프로필이미지" width={40} height={40} />
              <div>{board?.writer}</div>
            </div>
            <div className={styles.detailMetadataDate}>
              {board?.createdAt?.split("T")[0]}
            </div>
          </div>

          <div className={styles.detailMetadataIconContainer}>
            <Image src={clipImage} alt="클립아이콘" />
            <Tooltip title={fullAddress}>
              <Image src={locationImage} alt="위치아이콘" />
            </Tooltip>
          </div>

          <div className={styles.detailContentContainer}>
            <div className={styles.detailContentText}>{board?.contents}</div>
            {board?.youtubeUrl && (
              <div className={styles.detailYoutubeWrapper}>
                <ReactPlayer
                  url={board.youtubeUrl}
                  width="486px"
                  height="240px"
                  controls={true}
                />
              </div>
            )}
            
            <div className={styles.detailContentGoodOrBad}>
              <div className={styles.detailGoodContainer}>
                <LikeOutlined style={{ fontSize: '24px', color: '#FFD600' }} />
                <div className={styles.detailGoodText}>{board?.likeCount}</div>
              </div>
              <div className={styles.detailGoodContainer}>
                <DislikeOutlined style={{ fontSize: '24px', color: '#828282' }} />
                <div className={styles.detailBadText}>{board?.dislikeCount}</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.detailButtonsContainer}>
          <button className={styles.detailButton} onClick={() => router.push('/boards')}>
            목록으로
          </button>
          <button className={styles.detailButton} onClick={() => router.push(`/boards/${boardId}/edit`)}>
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
}