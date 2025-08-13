// 페이지의 모든 콘텐츠가 로드된 후에 스크립트를 실행합니다.
window.onload = () => {
    // 1. 주소(URL)에서 일기 ID 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const diaryId = urlParams.get("id");
  
    // diaryId가 없으면 목록 페이지로 돌려보냅니다.
    if (!diaryId) {
      alert("잘못된 접근입니다.");
      window.location.href = "./index.html";
      return;
    }
  
    // 2. localStorage에서 전체 일기 데이터 가져오기
    const diaries = JSON.parse(localStorage.getItem("diaries")) || [];
  
    // 3. ID에 해당하는 일기 데이터 찾기
    // diary.id가 문자열일 수 있으므로, == 로 비교하거나 Number()로 변환합니다.
    const diary = diaries.find((d) => String(d.id) === diaryId);
  
    // ID에 해당하는 일기가 없다면 오류 메시지를 보여줍니다.
    if (!diary) {
      alert("해당하는 일기를 찾을 수 없습니다.");
      window.location.href = "./index.html";
      return;
    }
  
    // 4. 찾은 데이터로 HTML placeholder 채우기
    document.getElementById("HTML_일기상세제목보여주는곳").innerText = diary.title;
    document.getElementById("HTML_일기상세내용보여주는곳").innerText = diary.content;
    document.getElementById("HTML_날짜보여주는곳").innerText = new