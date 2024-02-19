document.addEventListener('DOMContentLoaded', function() {
    const addTitle = document.getElementById('addTitle');
    const addText = document.getElementById('addText');
    const addBtn = document.getElementById('add-btn');
    const notesContainer = document.getElementById('notes');
    const notes = []; // Sử dụng một mảng để lưu trữ các ghi chú
    
    function addNotes() {
        if (addTitle.value === '' || addText.value === '') {
            alert('Please add title and note');
            return; // Dừng hàm nếu không có tiêu đề hoặc nội dung
        }
        
        const noteObj = {
            title: addTitle.value,
            text: addText.value,
        };

        notes.push(noteObj); // Thêm ghi chú vào mảng
        showNotes();
    }

    function showNotes() {
        // Xóa nội dung cũ của notesContainer trước khi cập nhật
        notesContainer.innerHTML = '';

        // Duyệt qua mảng notes và hiển thị ghi chú
        notes.forEach(function(note) {
            const noteDiv = document.createElement('div');
            noteDiv.classList.add('note');
            noteDiv.innerHTML = `
                <button class="delete-btn">Delete</button>
                <div class="title">${note.title}</div>
                <div class="text">${note.text}</div>
            `;
            notesContainer.appendChild(noteDiv);
        });
    }

    addBtn.addEventListener('click', addNotes);
    
    // Thêm sự kiện xóa ghi chú khi click vào nút Delete
    notesContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const noteDiv = event.target.parentElement;
            const index = Array.from(notesContainer.children).indexOf(noteDiv);
            notes.splice(index, 1); // Xóa ghi chú khỏi mảng
            showNotes(); // Hiển thị lại danh sách ghi chú sau khi xóa
        }
    });
});
