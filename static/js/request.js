$('#loginform').on('submit', function(){
    event.preventDefault();
    username = $('#username').val();
    password = $('#password').val();
    req = $.ajax({
        url: 'http://127.0.0.1:5000/login',
        type:'post',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({username:username, password:password})
    });
    req.done(function(data){
        
        if (data.status == 'success'){
            if(data.user.role == 'salesrep'){
                location.replace('page-shop-shopping.html')
            }else{
                location.replace('dashboard.html');
            }
            localStorage.setItem('username', username);
            localStorage.setItem('userID', data.user.id);
            localStorage.setItem('salesToday', data.salesToday);
            localStorage.setItem('allStudents', data.students);
            localStorage.setItem('inactiveAccounts', data.inactiveAccounts);
        }else{
            alert('Invalid details');
        }
    });
});