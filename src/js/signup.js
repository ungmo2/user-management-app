import Ajax from './ajax';
import html from './signup.html';

class Signup {
  // view 초기화 & event handler 바인딩
  init() {
    document.querySelector('.app-root').innerHTML = html;
    this.bindEvent();
  }

  // EVENT Handlers
  bindEvent() {
    // SIGN-UP Button
    document.getElementById('btn-signup').addEventListener('click', e => {

      const userid = document.getElementsByName('userid')[0].value;
      const password = document.getElementsByName('password')[0].value;
      const passwordConfirm = document.getElementsByName('password-confirm')[0].value;
      const firstname = document.getElementsByName('firstname')[0].value;
      const lastname = document.getElementsByName('lastname')[0].value;

      // TODO: FORM CHECK

      // 새로운 사용자의 id 취득
      Ajax.get('/users').then(users => {
        users = JSON.parse(users);

        const lastId = !users.length ? 1 : Math.max(...users.map(({ id }) => id)) + 1;

        const user = {
          id: lastId,
          userid,
          password,
          firstname,
          lastname,
          status: '',
          editable: false
        };

        // POST
        Ajax.post('/users', user)
          .then(res => {
            const result = JSON.parse(res);

            if (result.success) {
              // '/'을 할당하면 request가 발생한다
              window.location.href = '/#';
            } else {
              const signupAlert = document.getElementById('signup-alert');
              signupAlert.innerHTML = result.message;
              signupAlert.classList.remove('hidden');
            }
          });
      });
    });
  }
}

// Single Instance
export default new Signup();
