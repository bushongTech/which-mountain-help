document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cureForm');
  const startInput = document.getElementById('cure-start-time');
  const endInput = document.getElementById('cure-end-time');
  const durationDisplay = document.getElementById('cureDuration');
  const messageBox = document.getElementById('messageBox');

  function calculateDuration() {
    const start = new Date(startInput.value);
    const end = new Date(endInput.value);

    if (!isNaN(start) && !isNaN(end) && end > start) {
      const durationMs = end - start;
      const hours = Math.floor(durationMs / 3600000);
      const minutes = Math.floor((durationMs % 3600000) / 60000);
      durationDisplay.textContent = `${hours}h ${minutes}m`;
    } else {
      durationDisplay.textContent = '--';
    }
  }

  startInput.addEventListener('change', calculateDuration);
  endInput.addEventListener('change', calculateDuration);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      tool_id: document.getElementById('tool-id').value,
      cure_start_time: document.getElementById('cure-start-time').value,
      cure_end_time: document.getElementById('cure-end-time').value,
      oven_id: document.getElementById('oven-id').value,
      operator: document.getElementById('operator').value,
      comments: document.getElementById('comments').value,
    };

    try {
      const response = await fetch('/api/cure-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      messageBox.textContent = result.message || 'Submitted successfully!';
      messageBox.className = response.ok ? 'success' : 'error';

      if (response.ok) {
        form.reset();
        durationDisplay.textContent = '--';
      }
    } catch (err) {
      messageBox.textContent = 'Submission failed.';
      messageBox.className = 'error';
    }
  });
});