import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./styles.module.css";
import {  } from "./hook";

// 이미지 import
import profileImage from "@assets/profile_image.png";
import linkImage from "@assets/link.png";
import locationImage from "@assets/location.png";
import heartImage from "@assets/heart.png";
import brokenheartImage from "@assets/brokenheart.png";
import pencilImage from "@assets/pencil.png";
import listImage from "@assets/spinningtop.png";
import contentImage from "@assets/beauty.png";

export default function BoardsDetail() {
  const router = useRouter();
  const params = useParams();
  const boardId = params.boardId;

  const { board, loading } = useBoardDetail(boardId);

  if (loading) {return <div>게시글을 불러오는 중입니다...</div>};
      console.log("게시글 상세 데이터:", board);

  return (
   
  );
}

