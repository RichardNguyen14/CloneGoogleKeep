document.addEventListener('DOMContentLoaded', function() {
    const addTitle = document.getElementById('addTitle');
    const addText = document.getElementById('addText');
    const addBtn = document.getElementById('add-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const notesContainer = document.getElementById('notes');
    let notes = JSON.parse(localStorage.getItem('notes')) || []; 

    function addNotes(){
        if(addText.value == ''){
            alert('Add your note');
            return;
        }
        
        const noteObj = {
            title: addTitle.value,
            text: addText.value,
            archived: false,
            reminder: null
        }
        addTitle.value = '';
        addText.value = '';
        notes.push(noteObj);
        localStorage.setItem('notes', JSON.stringify(notes));
        showNotes();
    }

    function showNotes() {
        notesContainer.innerHTML = '';
        notes.forEach(function(note, index) {
            const noteDiv = document.createElement('div');
            noteDiv.classList.add('note');
            noteDiv.draggable = true;
            noteDiv.setAttribute('data-index', index);

            noteDiv.innerHTML = `
                <button class="deleteNote" data-index="${index}">Delete</button>
                <button class="editNote" data-index="${index}">Edit</button>
                <div class="title">${note.title}</div>
                <div class="text">${note.text}</div>
            `;
            notesContainer.appendChild(noteDiv);

            noteDiv.addEventListener('dragstart', function(event) {
                event.dataTransfer.setData('text/plain', index);
            });
        });
    }

    function deleteNote(index) {
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        showNotes();
    }

    function editNote(index, newTitle, newText) {
        notes[index].title = newTitle;
        notes[index].text = newText;
        localStorage.setItem('notes', JSON.stringify(notes));
        showNotes();
    }

    function cancelAddition() {
        addTitle.value = ''; 
        addText.value = ''; 
    }

    addBtn.addEventListener('click', addNotes);
    cancelBtn.addEventListener('click', cancelAddition); 

    notesContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('deleteNote')) {
            const index = event.target.getAttribute('data-index');
            deleteNote(index);
        }

        if (event.target.classList.contains('editNote')) {
            const index = event.target.getAttribute('data-index');
            const newTitle = prompt('Enter new title:', notes[index].title);
            const newText = prompt('Enter new text:', notes[index].text);
            editNote(index, newTitle, newText);
        }
    });

    // Thêm sự kiện thả cho notesContainer
    notesContainer.addEventListener('dragover', function(event) {
        event.preventDefault();
    });

    notesContainer.addEventListener('drop', function(event) {
        event.preventDefault();
        const fromIndex = event.dataTransfer.getData('text/plain');
        const toIndex = Array.from(notesContainer.children).indexOf(event.target);

        // Đảm bảo toIndex là một số hợp lệ
        if (toIndex >= 0) {
            // Hoán đổi vị trí giữa ghi chú kéo và ghi chú được thả vào
            const temp = notes[fromIndex];
            notes[fromIndex] = notes[toIndex];
            notes[toIndex] = temp;

            localStorage.setItem('notes', JSON.stringify(notes));
            showNotes();
        }
    });

    showNotes();
});
