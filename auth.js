function openLoginModal() {
    document.getElementById('loginModal').style.display = "block";
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = "none";
}


window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (event.target === modal) {
        closeLoginModal();
    }
}


window.onload = function() {
    checkLoginStatus();
};

function checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    const loginLogoutButton = document.getElementById('login-logout-button');

    if (user) {
        loginLogoutButton.textContent = `LOG OUT (${user.name})`;
        loginLogoutButton.style.display = "inline-block";
    } else {
        loginLogoutButton.textContent = "LOG IN";
        loginLogoutButton.style.display = "inline-block";
    }
}

function handleLoginLogout() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user) {
        logOut();
    } else {
        openLoginModal();
    }
}


document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;

    const subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
    const user = subscribers.find(subscriber => subscriber.email === email);

    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        closeLoginModal(); 
        checkLoginStatus(); 
    } else {
        document.getElementById('login-error-message').textContent = 'Invalid email or not subscribed.';
    }
});


document.getElementById('subscribe-form').addEventListener('submit', function(event) {
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
        window.location.href = 'subscribe.html';
    }
});


function logOut() {
    localStorage.removeItem('loggedInUser');
    checkLoginStatus();
}

document.addEventListener('DOMContentLoaded', function() {
    // Only run modal check on DOM load
    if (localStorage.getItem('showModal') === 'true') {
        localStorage.removeItem('showModal');
        openLoginModal();
    }
});

window.onload = function() {
    checkLoginStatus();
};
