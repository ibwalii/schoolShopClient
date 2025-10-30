$('#loginform').on('submit', function(event) {
    event.preventDefault();
    const username = $('#username').val();
    const password = $('#password').val();

    $.ajax({
        url: 'http://127.0.0.1:5000/login',
        type: 'post',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({ username, password }),
        xhrFields: {
            withCredentials: true // Crucial for sending cookies
        }
    })
    .done(function(data) {
        if (data.status === 'success') {
            // No need to store sensitive data in localStorage
            if (data.user.role === 'salesrep') {
                location.replace('page-shop-shopping.html');
            } else {
                location.replace('dashboard.html');
            }
        } else {
            alert('Login failed: ' + data.message);
        }
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        // Handle login failure
        alert('Login failed: ' + jqXHR.responseJSON.message);
    });
});