const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-sign-up').value.trim();
    const password = document.querySelector('#password-sign-up').value.trim();
    const name = document.querySelector('#name-sign-up').value.trim();
  
    if (email && password && name) {
      const response = await fetch('/api/users/', {
        method: 'POST',
        body: JSON.stringify({ email, password, name}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in');
      }
    }
  };
  
  document
    .querySelector('.sign-up-form')
    .addEventListener('submit', loginFormHandler);
  