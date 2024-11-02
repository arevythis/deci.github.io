window.onload = function() {
    checkLoginStatus();

    const subscribeForm = document.getElementById('subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;

            let subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
            const emailExists = subscribers.some(subscriber => subscriber.email === email);

            if (emailExists) {
                document.getElementById('error-message').textContent = 'You are already subscribed!';
            } else {
                const subscriber = { name, email };
                subscribers.push(subscriber);
                localStorage.setItem('subscribers', JSON.stringify(subscribers));
                window.location.href = 'login.html'; 
            }
        });
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            const email = document.getElementById('login-email').value;

            const subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
            const user = subscribers.find(subscriber => subscriber.email === email);

            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                checkLoginStatus(); 
                document.getElementById('login-error-message').textContent = ''; 
                window.location.href = 'index.html'; 
            } else {
                document.getElementById('login-error-message').textContent = 'Invalid email or not subscribed.';
            }
        });
    }
};

function checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    const loginLogoutLink = document.getElementById('login-logout-link');

    if (user) {
        loginLogoutLink.textContent = `LOG OUT (${user.name})`;
        loginLogoutLink.href = "#"; 
        loginLogoutLink.onclick = logOut; 
    } else {
        loginLogoutLink.textContent = "LOG IN";
        loginLogoutLink.href = "login.html"; 
        loginLogoutLink.onclick = null; 
    }
}

function logOut() {
    localStorage.removeItem('loggedInUser');
    checkLoginStatus(); 
    alert("You have logged out successfully.");
}

