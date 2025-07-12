document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('file-input');
  const dropZone = document.getElementById('drop-zone');
  const uploadBtn = document.getElementById('upload-btn');
  const resetBtn = document.getElementById('reset-btn');
  const loadingOverlay = document.getElementById('loading-overlay');
  const form = document.getElementById('test-form');

  // Enable upload button when a file is selected
  fileInput.addEventListener('change', () => {
    uploadBtn.disabled = fileInput.files.length === 0;
  });

  // Drag & drop handlers
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      fileInput.files = files;
      uploadBtn.disabled = false;
    }
  });

  // Upload handler
  uploadBtn.addEventListener('click', async () => {
    if (fileInput.files.length === 0) {
      alert('Please select a TDMS file to upload.');
      return;
    }

    const formData = new FormData(form);
    formData.append('file', fileInput.files[0]);

    loadingOverlay.classList.remove('hidden');

    try {
      const response = await fetch('/api/tdms-uploader/upload', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      alert(`Upload successful: ${JSON.stringify(result)}`);
    } catch (error) {
      console.error(error);
      alert('Error uploading file.');
    } finally {
      loadingOverlay.classList.add('hidden');
    }
  });

  // Reset handler
  resetBtn.addEventListener('click', () => {
    form.reset();
    fileInput.value = '';
    uploadBtn.disabled = true;
  });
});