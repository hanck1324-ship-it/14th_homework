let 일기목록 = []

const 일기등록기능 = () => {
     // 폼이 있던 위치가 모달로 바뀌었으므로, id로 값을 가져옵니다. 기존에 있던 로컬스토리지에 있는거는 그대로 유지하기 
  const 감정 = document.querySelector('input[name="감정-모달"]:checked').value;
  const 제목 = document.getElementById("modal-diary-title").value;
  const 내용 = document.getElementById("modal-diary-content").value;
}
  if (!제목 || !내용) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
  }

  const 오늘 = new Date();
  const 년 = 오늘.getFullYear();
  const 월 = String(오늘.getMonth() + 1).padStart(2, '0');
  const 일 = String(오늘.getDate()).padStart(2, '0');
  
  const 날짜 = `${년}.${월}.${일}`

  const 입력한일기 = {
    감정: 감정,
    제목: 제목,
    내용: 내용,
    날짜: 날짜
  }

  const 기존일기목록 = JSON.parse(localStorage.getItem("일기목록") || "[]");
  console.log(일기목록, +일기목록)
  기존일기목록.push(입력한일기);
  localStorage.setItem("일기목록", JSON.stringify(기존일기목록));

 


  ><
  const 일기목록새로입력하기(); // 화면 다시 그리기
  .map ((el, 감정그림목록 ) => '  
  <a herf=".


  '





// 쿼리스트링 



  // 성공적으로 등록 후 모달 닫기
  document.getElementById('new-diary-modal').classList.remove('active');
  // 폼 초기화
  document.getElementById("modal-diary-title").value = "";
  document.getElementById("modal-diary-content").value = "";
;



// ... 기존의 다른 함수들 (일기입력하기, 필터링기능 등)은 그대로 둡니다 ...


// 이름 정의하기 힘들어 가장 많이 쓰는 단어를 줄임// 

// DOM이 로드된 후 모달 이벤트를 설정합니다.
window.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('open-modal-btn');
  const modal = document.getElementById('new-diary-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const submitBtn = document.getElementById('modal-submit-btn');

  // '+ 일기쓰기' 버튼 클릭 시 모달 열기
  if (openBtn) {
      openBtn.addEventListener('click', () => {
          modal.classList.add('active');
      });
  }

  // '취소' 버튼 클릭 시 모달 닫기
  if (closeBtn) {
      closeBtn.addEventListener('click', () => {
          modal.classList.remove('active');
      });
  }
  
  // '등록하기' 버튼 클릭 시 '일기등록기능' 함수 실행
  if (submitBtn) {
      submitBtn.addEventListener('click', 일기등록기능);
  }
// 여기서 이게 굉장히 안되서 힘들었습니다. 


  // 모달 바깥 배경 클릭 시 모달 닫기
  if (modal) {
      modal.addEventListener('click', (event) => {
          if (event.target === modal) {
              modal.classList.remove('active');
          }
      });
  }
});