"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // 메인 페이지 접속 시 자동으로 게시판 목록으로 이동
    router.push("/boards");
  }, [router]);

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh" 
    }}>
      <p>게시판으로 이동 중...</p>
    </div>
  );
}