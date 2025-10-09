"use client";

import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { useCommentWrite } from "./hook"; // hook 이름 변경
import { Rate } from "antd";
import commentIcon from "@/assets/chat.png";

export default function CommentWrite() { // 컴포넌트 이름 변경
  const {
    writer,
    password,
    contents,
    rating,
    onChangeWriter,
    onChangePassword,
    onChangeContents,
    onChangeRating,
    onClickSubmit,
  } = useCommentWrite(); // hook 이름 변경

  return (
    <div className={styles.layout}>
      <div className={styles.comment_title_container}>
        <Image src={commentIcon} alt="댓글 아이콘" width={24} height={24} />
        <span className={styles.comment_title_text}>댓글</span>
      </div>
      <div className={styles.comment_input_container}>
        <div className={styles.comment_input_metadata}>
          <input
            type="text"
            placeholder="작성자"
            className={styles.comment_input}
            value={writer}
            onChange={onChangeWriter}
          />
          <input
            type="password"
            placeholder="비밀번호"
            className={styles.comment_input}
            value={password}
            onChange={onChangePassword}
          />
          <Rate onChange={onChangeRating} value={rating} /> {/* 별점 컴포넌트 */}
        </div>
        <div className={styles.comment_textarea_container}>
          <textarea
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
            className={`${styles.comment_input} ${styles.comment_textarea}`}
            value={contents}
            onChange={onChangeContents}
            maxLength={100}
          ></textarea>
          <div className={styles.comment_submit_wrapper}>
            <div className={styles.comment_textarea_count}>
              {contents.length}/100
            </div>
            <button
              className={styles.comment_submit_button}
              onClick={onClickSubmit}
            >
              등록하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}