document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('uploadForm');
    const fileInput = document.getElementById('fileInput');
    const filesList = document.getElementById('filesList');

    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);

        try {
            const response = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData
            });
            const result = await response.text();
            alert(result);
            fetchFiles();
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    });

    async function fetchFiles() {
        try {
            const response = await fetch('http://localhost:3000/files');
            const files = await response.json();
            filesList.innerHTML = files.map(file => `
                <div class="file-item">
                    <span>${file.name}</span>
                    <button onclick="deleteFile(${file.id})">Delete</button>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    }

    window.deleteFile = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/files/${id}`, {
                method: 'DELETE'
            });
            const result = await response.text();
            alert(result);
            fetchFiles();
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    fetchFiles();
});

