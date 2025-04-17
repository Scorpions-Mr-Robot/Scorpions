const bcrypt = require('bcryptjs');

async function generateHash() {
    const password = 'your_admin_password'; // Replace with your desired password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log('Password hash:', hash);
}

generateHash();