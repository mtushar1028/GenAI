const users = [];

// function register() {
//     const username = document.getElementById('reg-username').value;
//     const password = document.getElementById('reg-password').value;

//     if (username && password) {
//         const user = {
//             username: username,
//             password: password,
//             otp: null
//         };
//         users.push(user);
//         alert('Registration successful');
//         window.location.href = 'products.html';
//     } else {
//         alert('Please fill out all fields');
//     }
// }


document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();
  console.log('inside login call:');
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  console.log(username);
  fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        'Content-Length':2000,
        'Accept': '*/*'
      },
      body: JSON.stringify({ username, password })
  })
  .then(response => response.json())
  .then(data => {
      if (data.error) {
          console.error('Error:', data.error);
          alert('Invalid username or password');
      } else {
               const userotp = Math.floor(100000 + Math.random() * 900000); // Generate 6 digit OTP
                alert('OTP: ' + userotp);
                const otp = prompt('Enter OTP:');
                if (otp == userotp) {
                    alert('Login successful');
                    // Redirect to the product page after 2 seconds
                    setTimeout(() => {
                      window.location.href = 'products.html';
                  }, 2000);  // 2000 milliseconds = 2 seconds
                } else {
                    alert('Invalid OTP');
                }

          console.log('Success:', data);
          // alert('Login successful!');
         
      }
  })
  .catch((error) => {
      console.error('Error:', error);
  });
});

// function login() {
//     const username = document.getElementById('login-username').value;
//     const password = document.getElementById('login-password').value;

//     const user = users.find(u => u.username === username && u.password === password);

//     if (user) {
//         // Send OTP
//         user.otp = Math.floor(100000 + Math.random() * 900000); // Generate 6 digit OTP
//         alert('OTP: ' + user.otp);
//         const otp = prompt('Enter OTP:');
//         if (otp == user.otp) {
//             alert('Login successful');
//             window.location.href = 'products.html';
//         } else {
//             alert('Invalid OTP');
//         }
//     } else {
//         alert('Invalid username or password');
//     }
// }

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

const registerUser = async (userData) => {
    try {
      console.log('before reg api call');
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*',
          'Content-Length':2000,
          'Accept': '*/*'
        },
        body: JSON.stringify(userData),
      });
      console.log('Registration beforeres:');
      if (!response.ok) {
        throw new Error('Registration failed: ' + response.statusText);
      }
  
      const data = await response.json();
      console.log('Registration successful:', data);
      alert('Registration successfully');
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
  };
  
  // Example usage function
  const register = () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        const mobile = document.getElementById('mobile').value;

    const userData = {
      username: username,
      email: email,
      password: password,
      mobile: mobile,
    };
  console.log('before reg call');
    registerUser(userData);
  };
  
  // Call the register function to initiate registration on button click
  document.getElementById('registerButton').addEventListener('click', register);
  