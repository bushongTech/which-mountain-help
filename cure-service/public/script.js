document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cure-form');
  const startInput = document.getElementById('cureStartTime');
  const endInput = document.getElementById('cureEndTime');
  const durationDisplay = document.getElementById('cureDuration');

  function calculateDuration() {
    const start = new Date(startInput.value);
    const end = new Date(endInput.value);

    if (!isNaN(start) && !isNaN(end) && end > start) {
      const diffMs = end - start;
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      durationDisplay.textContent = `${diffHrs}h ${diffMins}m`;
      return { hours: diffHrs, minutes: diffMins };
    } else {
      durationDisplay.textContent = "--";
      return null;
    }
  }

  startInput.addEventListener('change', calculateDuration);
  endInput.addEventListener('change', calculateDuration);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const duration = calculateDuration();

    const payload = {
      articleId: document.getElementById('articleId').value,
      articleType: document.getElementById('articleType').value,
      cureOvenId: document.getElementById('cureOvenId').value,
      cureOvenTemp: parseFloat(document.getElementById('cureOvenTemp').value),
      cureOvenHumidity: parseFloat(document.getElementById('cureOvenHumidity').value),
      cureStartTime: document.getElementById('cureStartTime').value,
      cureEndTime: document.getElementById('cureEndTime').value,
      cureDuration: duration ? `${duration.hours}h ${duration.minutes}m` : null,
      comments: document.getElementById('comments').value
    };

    try {
      const response = await fetch('/api/v1/cure-batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      alert(`Submission successful: ${JSON.stringify(result)}`);
      form.reset();
      durationDisplay.textContent = "--";
    } catch (error) {
      console.error(error);
      alert('Error submitting cure batch data.');
    }
  });
});