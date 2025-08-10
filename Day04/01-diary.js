document.addEventListener('DOMContentLoaded', () => {
    const diaryForm = document.getElementById('diary-form');
    const cardGrid = document.querySelector('.card-grid');
    let diaryData = [];

    const renderDiaryList = () => {
        cardGrid.innerHTML = '';
        diaryData.forEach(entry => {
            const card = document.createElement('article');
            card.className = 'diary-card';
            card.dataset.id = entry.id;
            card.innerHTML = `
                <div class="card-header">
                    <span class="card-author">${entry.author}</span>
                    <span class="card-date">${entry.date}</span>
                </div>
                <p class="card-content">${entry.title}</p>
            `;
            cardGrid.appendChild(card);
        });
    };

    diaryForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newEntry = {
            id: Date.now(),
            author: '효연',
            mood: document.querySelector('input[name="mood"]:checked').value,
            title: document.getElementById('diary-title').value,
            content: document.getElementById('diary-content').value,
            date: new Date().toLocaleDateString()
        };
        diaryData.push(newEntry);
        diaryForm.reset();
        renderDiaryList();
    });

    cardGrid.addEventListener('click', (event) => {
        const card = event.target.closest('.diary-card');
        if (card) {
            const entryId = Number(card.dataset.id);
            const entry = diaryData.find(item => item.id === entryId);
            if (entry) {
                alert(
`날짜: ${entry.date}
기분: ${entry.mood}
제목: ${entry.title}
--------------------
내용:
${entry.content}`
                );
            }
        }
    });

    renderDiaryList();
});