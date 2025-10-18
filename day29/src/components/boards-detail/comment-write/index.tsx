"use client";

import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { useCommentWrite } from "./hook";
import { Rate } from "antd";
import commentIcon from "@/assets/chat.png";

export default function CommentWrite() {
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
  } = useCommentWrite();

  return (
    <div className={styles.commentBodyArea}>
      <div className={styles.title}>
        <Image src={commentIcon} alt="댓글 아이콘" width={24} height={24} />
        <span>댓글</span>
      </div>

      {/* 수정 전: 별점(Rate) 컴포넌트가 작성자/비밀번호와 같은 줄에 있었음.
        수정 후: 이미지와 동일하게 별점 컴포넌트를 작성자/비밀번호 입력창 위로 이동함.
      */}
      <Rate onChange={onChangeRating} value={rating} />

      {/* 수정 전: 별점 컴포넌트가 이 div 안에 함께 있었음.
        수정 후: 작성자와 비밀번호 입력창만 남겨 가로 정렬을 유지함.
      */}
      <div className={styles.commentKeyArea}>
        <input
          type="text"
          placeholder="작성자"
          className={styles.writerInput}
          value={writer}
          onChange={onChangeWriter}
        />
        <input
          type="password"
          placeholder="비밀번호"
          className={styles.writerInput}
          value={password}
          onChange={onChangePassword}
        />
      </div>

      <div className={styles.commentInputBody}>
        <textarea
          placeholder="내용을 입력해주세요."
          className={styles.commentInput}
          value={contents}
          onChange={onChangeContents}
          maxLength={100}
        ></textarea>
        <div className={styles.buttonBody}>
          <div className={styles.inputTextCount}>
            {contents.length}/100
          </div>
          <button
            className={styles.commentEnrollButton}
            onClick={onClickSubmit}
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
}