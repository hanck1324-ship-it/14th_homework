import { jsx } from "react/jsx-runtime";
import "./BoardsNew.css";
import React, { useState, ChangeEvent, MouseEvent } from "react";

// 입력값과 에러 객체의 설계도를 미리 정의합니다. (Interface) type   보다 확장성이 있는 interface를 쓴다.
interface IFormData {
  writer: string;
  password: string;
  title: string;
  contents: string;
}

interface IFormErrors {
  writer?: string;
  password?: string;
  title?: string;
  contents?: string;
}

const BoardsNew = () jsx.Element => {
  // 1. 상태를 하나의 객체로 관리하여 코드를 간결하게 유지합니다.
  const [inputs, setInputs] = useState<IFormData>({
    writer: "",
    password: "",
    title: "",
    contents: "",
  });

  const [errors, setErrors] = useState<IFormErrors>({});

  // 2. 모든 input과 textarea의 변경을 하나의 함수로 처리합니다.
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // name의 타입을 IFormData의 key 중 하나로 명확히 합니다.
    const inputName = name as keyof IFormData;

    setInputs((prev) => ({
      ...prev,
      [inputName]: value,
    }));

    // 사용자가 입력을 시작하면 해당 필드의 에러 메시지를 지웁니다.
    if (value) {
      setErrors((prev) => ({
        ...prev,
        [inputName]: "",
      }));
    }
  };

  // 3. 레퍼런스 코드의 유효성 검사 로직을 여기에 적용합니다!
  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    const newErrors: IFormErrors = {};

    if (!inputs.writer.trim()) {
      newErrors.writer = "작성자를 입력해주세요.";
    }
    if (!inputs.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    }
    if (!inputs.title.trim()) {
      newErrors.title = "제목을 입력해주세요.";
    }
    if (!inputs.contents.trim()) {
      newErrors.contents = "내용을 입력해주세요.";
    }

    setErrors(newErrors);

    // 에러 객체에 아무 내용도 없으면 모든 검증을 통과한 것입니다.
    if (Object.keys(newErrors).length === 0) {
      alert("게시글이 성공적으로 등록되었습니다!");
      // 이 곳에서 서버로 데이터를 전송하는 API를 호출할 수 있습니다.
      console.log("제출할 데이터:", inputs);
    }
  };

  // 모든 필드가 채워졌는지 확인하여 버튼 활성화 여부를 결정합니다.
  const isButtonDisabled = !inputs.writer || !inputs.password || !inputs.title || !inputs.contents;

  return (
    <div className="board-new">
      <h1 className="board-new__title">게시물 등록</h1>

      <div className="board-new__section board-new__section--row">
        <div className="board-new__input-group">
          <label className="board--new__label">작성자</label>
          <input
            type="text"
            name="writer"
            className="board-new__input"
            onChange={handleInputChange}
            value={inputs.writer}
          />
          {errors.writer && <div className="board-new__error-message">{errors.writer}</div>}
        </div>
        <div className="board-new__input-group">
          <label className="board-new__label">비밀번호</label>
          <input
            type="password"
            name="password"
            className="board-new__input"
            onChange={handleInputChange}
            value={inputs.password}
          />
          {errors.password && <div className="board-new__error-message">{errors.password}</div>}
        </div>
      </div>
      
      <div className="board-new__section">
        <label className="board-new__label">제목</label>
        <input
          type="text"
          name="title"
          className="board-new__input"
          onChange={handleInputChange}
          value={inputs.title}
        />
        {errors.title && <div className="board-new__error-message">{errors.title}</div>}
      </div>

      <div className="board-new__section">
        <label className="board-new__label">내용</label>
        <textarea
          name="contents"
          className="board-new__input"
          onChange={handleInputChange}
          value={inputs.contents}
        />
        {errors.contents && <div className="board-new__error-message">{errors.contents}</div>}
      </div>

      <div className="board-new__footer">
        <button
          className={`board-new__button ${isButtonDisabled ? 'board-new__button--disabled' : ''}`}
          onClick={handleSubmit}
          disabled={isButtonDisabled}
        >
          등록하기
        </button>
      </div>
    </div>
  );
};

export default BoardsNew;