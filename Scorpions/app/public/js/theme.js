function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark-mode');
  const themeToggle = document.querySelector('.theme-toggle i');
  if (body.classList.contains('dark-mode')) {
    themeToggle.classList.remove('fa-moon');
    themeToggle.classList.add('fa-sun');
  } else {
    themeToggle.classList.remove('fa-sun');
    themeToggle.classList.add('fa-moon');
  }
}