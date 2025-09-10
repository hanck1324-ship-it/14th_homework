// src/App.js
import { Routes, Route, Link } from "react-router-dom";
import BoardsNew from "./routes/boards/new/BoardsNew";
import BoardsDetail from "./routes/boards/detail/BoardsDetail";
import BoardsList from "./routes/boards/list/BoardsList"; // ✅ 새로 추가

function App() {
  return (
    <div>
      {/* 페이지 이동을 위한 네비게이션 */}
      <nav>
        <Link to="/">홈</Link> |{" "}
        <Link to="/boards">게시글 목록</Link> |{" "}
        <Link to="/boards/new">게시글 등록</Link>
      </nav>

      {/* 라우팅 설정 */}
      <Routes>
        <Route path="/" element={<h2>홈 페이지입니다.</h2>} />
        <Route path="/boards" element={<BoardsList />} />
        <Route path="/boards/new" element={<BoardsNew />} />
        {/* ✅ 동적 라우팅: boardId 값에 따라 상세 페이지 이동 */}
        <Route path="/boards/:boardId" element={<BoardsDetail />} />
      </Routes>
    </div>
  );
}

export default App;
