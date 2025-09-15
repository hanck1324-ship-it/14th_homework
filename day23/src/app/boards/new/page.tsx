"use client";
import React, { ChangeEvent, useState } from "react";
import styles from "@styles.module.css";
import Image from "next/image";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import addImage from "@assets/add_image.png";

const IMAGE_SRC = {
  addImage: {
    src: addImage,
    alt: "사진추가이미지",
  },
};

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;

export default function BoardsNewPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  const isButtonDisabled = !name || !password || !title || !content;

  const [createBoard] = useMutation(CREATE_BOARD);
  const router = useRouter();

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const onClickSignup = async () => {
    // 1. 필수 입력값 유효성 검사
    if (!name.trim()) return setNameError("작성자를 입력해주세요.");
    if (!password) return setPasswordError("비밀번호를 입력해주세요.");
    if (!title.trim()) return setTitleError("제목을 입력해주세요.");
    if (!content.trim()) return setContentError("내용을 입력해주세요.");

    // 2. 모든 검사를 통과하면 서버에 데이터 전송
    try {
      const { data } = await createBoard({
        variables: {
          createBoardInput: {
            writer: name,
            password: password,
            title: title,
            contents: content,
          },
        },
      });

      // 3. 등록 성공 후, 상세 페이지로 이동
      alert("게시글이 성공적으로 등록되었습니다!");
      router.push(`/boards/${data.createBoard._id}`);

    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.layout}>
      <div className={styles["enroll-subject"]}>
        <div className={styles["enroll-subject-text"]}>게시물 등록</div>
      </div>
      <div className={styles["enroll-row-container"]}>
        <div className={styles["enroll-row-section"]}>
          <div className={styles["enroll-row-flex"]}>
            <div className={styles["flex-half"]}>
              <div className={styles["enroll-form-title"]}>
                <div>작성자 </div>
                <div className={styles["enroll-required-indicator"]}> *</div>
              </div>
              <input
                type="text"
                placeholder="작성자 명을 입력해 주세요."
                className={styles["enroll-input"]}
                onChange={onChangeName}
              />
              <div className={styles["error-msg"]}>{nameError}</div>
            </div>
            <div className={styles["flex-half"]}>
              <div className={styles["enroll-form-title"]}>
                <div>비밀번호</div>
                <div className={styles["enroll-required-indicator"]}> *</div>
              </div>
              <input
                type="password"
                placeholder="비밀번호를 입력해 주세요."
                className={styles["enroll-input"]}
                onChange={onChangePassword}
              />
              <div className={styles["error-msg"]}>{passwordError}</div>
            </div>
          </div>
        </div>

        <div className={styles["enroll-border"]}></div>

        <div className={styles["enroll-row-section"]}>
          <div className={styles["enroll-form-title"]}>
            <div>제목</div>
            <div className={styles["enroll-required-indicator"]}> *</div>
          </div>
          <input
            type="text"
            className={styles["enroll-input"]}
            placeholder="제목을 입력해 주세요."
            onChange={onChangeTitle}
          />
          <div className={styles["error-msg"]}>{titleError}</div>
        </div>
        <div className={styles["enroll-border"]}></div>
        <div className={styles["enroll-row-section"]}>
          <div className={styles["enroll-form-title"]}>
            <div>내용</div>
            <div className={styles["enroll-required-indicator"]}> *</div>
          </div>
          <textarea
            placeholder="내용을 입력해 주세요."
            className={`${styles["enroll-input"]} ${styles["enroll-textarea"]}`}
            onChange={onChangeContent}
          ></textarea>
          <div className={styles["error-msg"]}>{contentError}</div>
        </div>
        <div className={styles["enroll-row-section"]}>
          <div className={styles["enroll-form-title"]}>
            <div>주소</div>
          </div>
          <div className={styles["enroll-address-firstrow"]}>
            <input
              type="number"
              className={styles["zipcode-input"]}
              placeholder="12345"
            />
            <button className={styles["zipcode-search-button"]}>
              우편번호 검색
            </button>
          </div>
          <input
            placeholder="주소를 입력해주세요."
            className={styles["enroll-input"]}
            type="text"
          />
          <input
            placeholder="상세주소"
            className={styles["enroll-input"]}
            type="text"
          />
        </div>
        <div className={styles["enroll-border"]}></div>
        <div className={styles["enroll-row-section"]}>
          <div className={styles["enroll-form-title"]}>
            <div>유튜브 링크</div>
          </div>
          <input
            className={styles["enroll-input"]}
            placeholder="링크를 입력해 주세요."
          />
        </div>
        <div className={styles["enroll-border"]}></div>
        <div className={styles["enroll-row-section"]}>
          <div>사진 첨부</div>
          <div className={styles["picture-enroll-row"]}>
            <Image src={IMAGE_SRC.addImage.src} alt="이미지추가" />
            <Image src={IMAGE_SRC.addImage.src} alt="이미지추가" />
            <Image src={IMAGE_SRC.addImage.src} alt="이미지추가" />
          </div>
        </div>
      </div>
      <div className={styles["enroll-button-container"]}>
        <button
          className={
            isButtonDisabled
              ? `${styles["enroll-submit-button"]} ${styles["disabled"]}`
              : styles["enroll-submit-button"]
          }
          onClick={onClickSignup}
          disabled={isButtonDisabled}
        >
          등록하기
        </button>
      </div>
    </div>
  );
}