"use client";

import { useCommentList } from "./hook";
import styles from "./styles.module.css";
import Image from "next/image";
import { Rate } from "antd";
import profileImage from "@/assets/profile_image.png";
import editImage from "@/assets/pencil.png";
import closeImage from "@/assets/trashbin.png";

export default function CommentList() {
  const { data } = useCommentList();

  return (
    <div className={styles.commentListContainer}>
      {data?.fetchBoardComments.map((comment, index) => (
        <div key={comment._id}>
          <div className={styles.listBody}> 
            <Image
              src={profileImage}
              alt="프로필이미지"
              width={40}
              height={40}
              className={styles.profileImage} 
            />
            <div style={{ width: "100%" }}> 
              <div className={styles.listTitle}>
                <div className={styles.forwardTitle}>
                  <div className={styles.forwardTitleText}>{comment.writer}</div>
                  <Rate disabled value={comment.rating} style={{ fontSize: 16 }} />
                </div>
                <div className={styles.backTitle}>
                  <Image src={editImage} alt="편집버튼" width={20} height={20} />
                  <Image src={closeImage} alt="삭제버튼" width={20} height={20} />
                </div>
              </div>
              <div className={styles.commentText}>{comment.contents}</div>
              <div className={styles.commentDate}>
                {comment.createdAt?.split("T")[0].replaceAll("-", ".")}
              </div>
            </div>
          </div>
          {index + 1 !== data?.fetchBoardComments.length && (
            <div className={styles.border}></div>
          )}
        </div>
      ))}
    </div>
  );
}