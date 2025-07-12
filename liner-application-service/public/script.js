document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("linerApplicationForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      formulation_id: document.getElementById("formulation-id").value,
      batch_number: document.getElementById("batch-number").value,
      batch_size: parseFloat(document.getElementById("batch-size").value),
      start_time: document.getElementById("start-time").value,
      end_time: document.getElementById("end-time").value,
      humidity: parseFloat(document.getElementById("humidity").value),
      temperature: parseFloat(document.getElementById("temperature").value),
      liner_applicator: document.getElementById("application-operator-liner").value,
      comments: document.getElementById("liner-application-comments").value
    };

    try {
      const response = await fetch("/v1/liner-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (response.ok) {
        alert("Liner application submitted successfully.");
        form.reset();
      } else {
        alert(`Error: ${result.message || "Unknown error."}`);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while submitting the form.");
    }
  });
});
