import Ajax from './ajax';
import html from './signin.html';

class Signin {
  // view 초기화 & event handler 바인딩
  init() {
    document.querySelector('.app-root').innerHTML = html;
    this.bindEvent();
  }

  // EVENT Handlers
  bindEvent() {
    // SIGN-IN Button
    document.getElementById('btn-signin').addEventListener('click', e => {
      const userid = document.getElementsByName('userid')[0].value;
      const password = document.getElementsByName('password')[0].value;

      // TODO: FORM CHECK

      // POST
      Ajax.post('/auth', { userid, password })
        .then(res => {
          const result = JSON.parse(res);
          console.log(result);

          if (result.success) {
            window.location.href = '/#user-list';
          } else {
            const signinAlert = document.getElementById('signin-alert');
            signinAlert.innerHTML = '아이디 또는 패스워드를 다시 확인하세요';
            signinAlert.classList.remove('hidden');
          }
        });
    });
  }
}

// Single Instance
export default new Signin();
