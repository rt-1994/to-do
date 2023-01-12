if(JSON.parse(localStorage.getItem('currentUser'))){
    window.location.href = './pages/main.html'
}
else{
    window.location.href = './pages/login.html'
}