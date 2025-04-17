document.getElementById('admin-login').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            window.location.href = '/admin/dashboard';
        } else {
            alert('Credenciales inválidas');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al intentar ingresar');
    }
});