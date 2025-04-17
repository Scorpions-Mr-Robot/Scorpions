document.getElementById('adminLoginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include' // Make sure this is present
        });

        const data = await response.json();

        if (data.success) {
            document.cookie = `adminToken=${data.token}; HttpOnly; Secure=${process.env.NODE_ENV === 'production'}; SameSite=Strict; Max-Age=${24 * 60 * 60}`;
            window.location.href = '/admin/dashboard';
        } else {
            showError(data.message || 'Credenciales inválidas');
        }
    } catch (error) {
        showError('Error en el servidor');
    }
});

function showError(message) {
    const errorElement = document.querySelector('.error-message') || 
                        document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    const form = document.getElementById('adminLoginForm');
    if (!document.querySelector('.error-message')) {
        form.appendChild(errorElement);
    }
}

JWT_SECRET=tu_secreto_muy_seguro
ADMIN_USER=tu_usuario_admin
ADMIN_PASS=tu_hash_bcrypt
NODE_ENV=production