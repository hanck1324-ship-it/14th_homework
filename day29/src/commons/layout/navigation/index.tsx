"use client";

import styles from "./styles.module.css"; 
import Image from "next/image";
import { useNavigation } from "./hook"; // 2. 방금 만든 hook 파일
import logo from "@/assets/logo.png"; // 3. 네 assets 폴더의 이미지

export default function Navigation() {
  // 4. hook을 실행해서 페이지 이동 기능만 꺼내옴
  const { onClickMenu } = useNavigation();

  return (
    // 5. 네 CSS 파일에 있는 'wrapper' 클래스 사용
    <nav className={styles.wrapper}>
      <div className={styles.wrapperLeft}>
        <Image
          src={logo} // 6. import한 이미지 변수 사용
          alt="logo"
          width={52} // Image 태그는 width, height가 필수
          height={32}
          className={styles.logo}
          onClick={onClickMenu("/")} // 7. onClick으로 기능 연결
        />
        <span className={styles.menuItem} onClick={onClickMenu("/boards")}>
          트립토크
        </span>
        <span className={styles.menuItem} onClick={onClickMenu("/purchase")}>
          숙박권 구매
        </span>
        <span className={styles.menuItem} onClick={onClickMenu("/myPage")}>
          마이 페이지
        </span>
      </div>
      <div className={styles.wrapperRight}>
        {/* 로그인 기능 뺐으니까 '로그인' 버튼만 남김 */}
        <button className={styles.loginButton} onClick={onClickMenu("/login")}>
          로그인
        </button>
      </div>
    </nav>
  );
}