document.addEventListener('DOMContentLoaded', () => {
  const linerForm = document.getElementById('linerForm');
  const addDetailButton = document.getElementById('addDetail');
  const submitButton = document.getElementById('submitForReview');

  const mixSetup = document.getElementById('mixSetup');
  const batchMaterials = document.getElementById('batchMaterials');
  const batchDegas = document.getElementById('batchDegas');
  const degasStart = document.getElementById('degas-start');
  const degasEnd = document.getElementById('degas-end');
  const degasTotalTime = document.getElementById('degas-total-time');

  // Initially hide additional sections
  mixSetup.style.display = 'none';
  batchMaterials.style.display = 'none';
  batchDegas.style.display = 'none';

  // Show additional sections after required fields are filled
  addDetailButton.addEventListener('click', (e) => {
    e.preventDefault();

    const formulationId = document.getElementById('formulation-id').value.trim();
    const batchNumber = document.getElementById('batch-number').value.trim();
    const batchSize = document.getElementById('batch-size').value.trim();
    const startTime = document.getElementById('start-time').value.trim();
    const endTime = document.getElementById('end-time').value.trim();

    if (!formulationId || !batchNumber || !batchSize || !startTime || !endTime) {
      alert('Please fill out all required fields before adding details.');
      return;
    }

    mixSetup.style.display = 'block';
    batchMaterials.style.display = 'block';
    batchDegas.style.display = 'block';
  });

  // Calculate degas total time
  function calculateDegasTime() {
    const start = new Date(degasStart.value);
    const end = new Date(degasEnd.value);

    if (!isNaN(start) && !isNaN(end) && end > start) {
      const diffMs = end - start;
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      degasTotalTime.value = `${diffHrs}h ${diffMins}m`;
    } else {
      degasTotalTime.value = '';
    }
  }

  degasStart.addEventListener('change', calculateDegasTime);
  degasEnd.addEventListener('change', calculateDegasTime);

  // Submit handler
  linerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(linerForm);
    const payload = {};

    formData.forEach((value, key) => {
      payload[key] = value;
    });

    try {
      const response = await fetch('/api/v1/liner-batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      alert(`Submission successful: ${JSON.stringify(result)}`);
      linerForm.reset();
      mixSetup.style.display = 'none';
      batchMaterials.style.display = 'none';
      batchDegas.style.display = 'none';
      degasTotalTime.value = '';
    } catch (error) {
      console.error(error);
      alert('Error submitting liner batch data.');
    }
  });
});