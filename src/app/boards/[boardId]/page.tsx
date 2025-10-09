"use client"

import BoardDetail from "@/components/boards-detail/detail";
import CommentList from "@/components/boards-detail/comment-list"
import CommentWrite from "@/components/boards-detail/comment-write"
import styles from "./styles.module.css"; 

export default function BoardsDetailPage() {
    return (
   
        <div className={styles.wrapper}>
            <BoardDetail />
            <CommentWrite />
            <CommentList />
        </div>
    );
}