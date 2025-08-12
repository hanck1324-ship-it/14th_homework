// 수정할 일기의 ID를 저장할 변수 (수정 모드가 아닐 경우 null)
let editTargetId = null;

// 페이지가 로드되면 실행
window.onload = () => {
    // 1. 주소(URL)에서 ID 값 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    editTargetId = urlParams.get("id");

    // 2. ID 값이 있다면 '수정 모드'로 동작
    if (editTargetId) {
        // 헤더 텍스트 변경
        const header = document.querySelector('.CSS_헤더 div');
        if(header) header.innerText = "일기 수정하기";

        // 기존 데이터 불러와서 폼에 채우기
        const diaries = JSON.parse(localStorage.getItem("diaries")) || [];
        const diary = diaries.find(d => String(d.id) === editTargetId);

        if (diary) {
            // 폼 요소에 기존 데이터 채우기
            document.getElementById("HTML_일기제목입력창").value = diary.title;
            document.getElementById("HTML_일기내용입력창").value = diary.content;
            
            // 기존 기분에 맞는 라디오 버튼 체크하기
            const moodRadios = document.querySelectorAll('input[name="mood"]');
            moodRadios.forEach(radio => {
                if (radio.value === diary.mood) {
                    radio.checked = true;
               // 반환값이 없으므로 for each//
            });
        }
    }

    // 3. '저장하기' 버튼에 클릭 이벤트 추가
    const saveButton = document.getElementById("HTML_저장하기버튼");
    saveButton.addEventListener("click", saveDiary);
};

/**
 * 일기를 저장하는 함수 (새 작성 또는 수정)
 */
function saveDiary() {
    // 1. 폼에서 현재 값들 가져오기
    
    // 'HTML_일기제목입력창' ID를 가진 요소의 '값(value)'을 가져옴
    const title = document.getElementById("HTML_일기제목입력창").value; 

    // 'HTML_일기내용입력창' ID를 가진 요소의 '값(value)'을 가져옴
    const content = document.getElementById("HTML_일기내용입력창").value;

    // 'mood'라는 name을 가진 라디오 버튼 중 '선택된(checked)' 요소의 '값(value)'을 가져옴
    const mood = document.querySelector('input[name="mood"]:checked').value;

    // --- 이 아래는 이전에 작성한 저장합니다
    
    // 2. 제목이나 내용이 비어있는지 확인
    if (!title || !content) {
        alert("제목과 내용을 모두 입력해주세요.");
        return;
    }

    // ... (이후 저장) ...
}