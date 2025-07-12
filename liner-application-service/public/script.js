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
        document.addEventListener("DOMContentLoaded", () => {
          const form = document.getElementById("linerApplicationForm");
          const durationDisplay = document.getElementById("cureDuration");
          const messageBox = document.getElementById("messageBox");

          const updateDuration = () => {
            const start = new Date(document.getElementById("start-time").value);
            const end = new Date(document.getElementById("end-time").value);
            if (!isNaN(start) && !isNaN(end) && end > start) {
              const diffMs = end - start;
              const diffMins = Math.floor(diffMs / 60000);
              const hours = Math.floor(diffMins / 60);
              const minutes = diffMins % 60;
              durationDisplay.textContent = `${hours}h ${minutes}m`;
            } else {
              durationDisplay.textContent = "--";
            }
          };

          document.getElementById("start-time").addEventListener("change", updateDuration);
          document.getElementById("end-time").addEventListener("change", updateDuration);

          form.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Validation
            const requiredFields = [
              "formulation-id", "batch-number", "batch-size", "start-time", "end-time",
              "humidity", "temperature", "application-operator-liner"
            ];
            for (const id of requiredFields) {
              const el = document.getElementById(id);
              if (!el.value) {
                messageBox.textContent = `Please fill in all required fields. (${id})`;
                return;
              }
            }

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
                messageBox.textContent = "Submission successful!";
                messageBox.style.color = "#00e676";
                form.reset();
                durationDisplay.textContent = "--";
              } else {
                messageBox.textContent = `Error: ${result.message || "Unknown error."}`;
                messageBox.style.color = "#ff5252";
              }
            } catch (err) {
              console.error(err);
              messageBox.textContent = "Network error occurred.";
              messageBox.style.color = "#ff5252";
            }
          });
        });

        alert(`Error: ${result.message || "Unknown error."}`);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while submitting the form.");
    }
  });
});
