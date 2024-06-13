const users = [];

function register() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;

    if (username && password) {
        const user = {
            username: username,
            password: password,
            otp: null
        };
        users.push(user);
        alert('Registration successful');
        window.location.href = 'products.html';
    } else {
        alert('Please fill out all fields');
    }
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Send OTP
        user.otp = Math.floor(100000 + Math.random() * 900000); // Generate 6 digit OTP
        alert('OTP: ' + user.otp);
        const otp = prompt('Enter OTP:');
        if (otp == user.otp) {
            alert('Login successful');
            window.location.href = 'products.html';
        } else {
            alert('Invalid OTP');
        }
    } else {
        alert('Invalid username or password');
    }
}

function forgotPassword() {
    const username = document.getElementById('forgot-username').value;
    const user = users.find(u => u.username === username);

    if (user) {
        // Send OTP
        user.otp = Math.floor(100000 + Math.random() * 900000); // Generate 6 digit OTP
        alert('OTP: ' + user.otp);
        const otp = prompt('Enter OTP to reset password:');
        if (otp == user.otp) {
            const newPassword = prompt('Enter new password:');
            user.password = newPassword;
            alert('Password reset successful');
        } else {
            alert('Invalid OTP');
        }
    } else {
        alert('User not found');
    }
}

function changePassword() {
    const username = prompt('Enter your username:');
    const user = users.find(u => u.username === username);

    if (user) {
        const oldPassword = prompt('Enter your current password:');
        if (oldPassword === user.password) {
            const newPassword = prompt('Enter new password:');
            user.password = newPassword;
            alert('Password changed successfully');
        } else {
            alert('Incorrect current password');
        }
    } else {
        alert('User not found');
    }
}
