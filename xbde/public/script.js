document.addEventListener('DOMContentLoaded', () => {
  const iframe = document.getElementById('content-frame');
  const dateElement = document.getElementById('date');

  // Display current date
  const today = new Date();
  dateElement.textContent = today.toLocaleDateString();

  // Add click listeners to each service button
  document.querySelectorAll('.sidebar button').forEach(button => {
    button.addEventListener('click', () => {
      const folder = button.getAttribute('data-folder');
      iframe.src = `/${folder}/index.html`;
    });
  });
});