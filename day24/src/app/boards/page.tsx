"use client";

import { gql, useQuery } from "@apollo/client";

// 1. "요청서" 작성하기 (GraphQL 쿼리)
const FETCH_BOARDS = gql`
  query {
    fetchBoards {
      _id
      writer
      title
    }
  }
`;

// 2. 컴포넌트 뼈대 만들기
export default function BoardsPage() {
  // 3. 요청서 보내고 데이터 받기 (useQuery)s
  const { data } = useQuery(FETCH_BOARDS);

  // 4. 받은 데이터 화면에 보여주기 (return + .map)
  return (
    <div>
      <h1>게시글 목록</h1>
      {/* data 상자 안에 fetchBoards 묶음이 있다면, 하나씩 꺼내서 보여줘! */}
      {data?.fetchBoards.map((el: any) => (
        <div key={el._id}>
          <span>작성자: {el.writer}</span>
          <span style={{ marginLeft: '10px' }}>제목: {el.title}</span>
        </div>
      ))}
    </div>
  );
}