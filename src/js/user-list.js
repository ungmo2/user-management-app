import Ajax from './ajax';
import html from './user-list.html';

// UserList View Controller
class UserList {
  constructor() {
    this.url = '/users';
    // user list
    this.users = [];
  }

  // view 초기화 & event handler 바인딩
  init() {
    document.querySelector('.app-root').innerHTML = html;
    Ajax.get(this.url)
      .then(users => {
        this.users = JSON.parse(users);
        console.log('[GET]', this.users);
        this.bindUsersToDom();
        this.bindEvent();
      });
  }

  // users 객체의 마지막 id에 1을 더한 값 취득
  get lastId() {
    return !this.users.length ? 1 : Math.max(...this.users.map(({ id }) => id)) + 1;
  }

  // If a class method does not use this, it can safely be made a static function.
  static makeHtmlTableRow({ id, userid, password, firstname, lastname, editable }) {
    let res = '';
    // editable의 값이 'true'인 경우, true로 변경
    const isEditable = editable || (editable === 'true');

    // [true, 'true', false, 'false'].forEach(editable => {
    //   // const isEditable = (editable === true) || (editable === 'true'); // OK
    //   const isEditable = editable || (editable === 'true'); // OK
    //   // const isEditable = (editable === 'true'); // NG
    //   // const isEditable = (editable == 'true'); // NG
    //   console.log(isEditable);
    // });

    if (isEditable) {
      res = `<tr class="row-${id}">
        <th>${id}</th>
        <td><input type="text" class="form-control" name="userid" value="${userid}"></td>
        <td><input type="text" class="form-control" name="password" value="${password}"></td>
        <td><input type="text" class="form-control" name="firstname" value="${firstname}"></td>
        <td><input type="text" class="form-control" name="lastname" value="${lastname}"></td>
        <td>
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-default" data-item="${id}" data-type="save">
              <i class="fa fa-check" aria-hidden="true"></i>
            </button>
            <button type="button" class="btn btn-default" data-item="${id}" data-type="cancel">
              <i class="fa fa-ban" aria-hidden="true"></i>
            </button>
            <button type="button" class="btn btn-default" data-item="${id}" data-type="delete">
              <i class="fa fa-trash-o" aria-hidden="true"></i>
            </button>
          </div>
        </td>
      </tr>`;
    } else {
      res = `<tr class="row-${id}">
        <th>${id}</th>
        <td>${userid}</td>
        <td>${password}</td>
        <td>${firstname}</td>
        <td>${lastname}</td>
        <td>
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-default" data-item="${id}" data-type="edit">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </button>
            <button type="button" class="btn btn-default" data-item="${id}" data-type="delete">
              <i class="fa fa-trash-o" aria-hidden="true"></i>
            </button>
          </div>
        </td>
      </tr>`;
    }
    return res;
  }

  bindUsersToDom() {
    document.querySelector('tbody').innerHTML = this.users.map(({ id, userid, password, firstname, lastname, editable }) => UserList.makeHtmlTableRow({ id, userid, password, firstname, lastname, editable })).join('');
  }

  bindEvent() {
    // Add 버튼 이벤트 핸들러
    // users 배열에 내용이 비어 있는 새로운 user 객체를 추가한다
    document.getElementById('add').addEventListener('click', () => {
      // users 객체에 새로운 user 추가
      this.users.push({
        id: this.lastId,
        userid: '',
        password: '',
        firstname: '',
        lastname: '',
        status: 'new',
        editable: true
      });

      this.bindUsersToDom();
      console.log('[ADD]', this.users);
    });

    // edit / save / delete 버튼 이벤트 핸들러
    document.querySelector('tbody').addEventListener('click', e => {
      // 이벤트 타킷이 edit / save / delete 버튼이 아니면 처리 종료
      if (!e.target || e.target.nodeName !== 'BUTTON') return;

      // 이벤트를 발생시킨 버튼이 소속된 user의 id
      const targetId = e.target.dataset.item * 1;
      // 이벤트를 발생시킨 버튼의 타입 (edit / save / delete)
      const { type } = e.target.dataset;

      switch (type) {
        // edit 버튼 이벤트 핸들러
        case 'edit': {
          this.users.forEach(user => {
            if (user.id === targetId) {
              user.editable = true;
              user.status = 'edited';
            }
          });

          this.bindUsersToDom();
          console.log(`[EDIT: ${targetId}]`, this.users);
          break;
        }
        // save 버튼 이벤트 핸들러
        case 'save': {
          // save 대상 row에서 input data 취득
          const targetRowInputs = document.querySelectorAll(`.row-${targetId} input[type=text]`);
          const inputUserID = targetRowInputs[0];
          const inputPassword = targetRowInputs[1];
          // 공백 제거
          inputUserID.value = inputUserID.value.trim();
          inputPassword.value = inputPassword.value.trim();

          if (!inputUserID.value) {
            inputUserID.placeholder = '아이디를 입력하세요.';
            inputUserID.focus();
            return;
          } else if (!inputPassword.value) {
            inputPassword.placeholder = '패스워드를 입력하세요.';
            inputPassword.focus();
            return;
          }

          // save 대상 row에서 사용자 입력 데이터를 취득하여 users 배열에 반영
          this.users.forEach(user => {
            if (user.id === targetId) {
              // input의 name을 key로 input의 value를 값으로 user 객체 생성
              [...targetRowInputs].forEach(input => {
                user[input.name] = input.value;
              });
              user.editable = false;

              // user 객체를 DB에 반영
              if (user.status === 'new') {
                // user status가 new(신규추가)이면 DB에 POST
                console.log(`[SAVE/NEW: ${targetId}]`, user);
                user.status = '';

                Ajax.post(this.url, user)
                  .then(res => {
                    console.log('[POST]', res);
                    return Ajax.get(this.url);
                  })
                  .then(users => {
                    this.users = JSON.parse(users);
                    console.log('[GET]', this.users);
                    this.bindUsersToDom();
                  });
              } else if (user.status === 'edited') {
                // user status가 eidt(수정)이면 DB에 PUT
                console.log(`[SAVE/EDIT: ${targetId}]`, user);
                user.status = '';

                Ajax.put(this.url, user.id, user)
                  .then(newUser => {
                    console.log('[PUT]', newUser);
                    return Ajax.get(this.url);
                  })
                  .then(users => {
                    this.users = JSON.parse(users);
                    console.log('[GET]', this.users);
                    this.bindUsersToDom();
                  });
              }
            }
          });
          break;
        }
        // cancel 버튼 이벤트 핸들러
        case 'cancel': {
          const [targetBook] = this.users.filter(user => user.id === targetId);

          if (targetBook.status === 'new') {
            // Add 버튼으로 추가된 항목(DB 미반영)에 대한 입력이 취소되면 대상 항목 삭제
            this.users = this.users.filter(user => user.id !== targetId);
          } else {
            // 기존 항목(DB 반영)에 대한 입력이 취소되면 editable 취소
            this.users.forEach(user => {
              if (user.id === targetId) {
                user.editable = false;
                user.status = '';
              }
            });
          }

          this.bindUsersToDom();
          console.log(`[CANCEL: ${targetId}]`, this.users);
          break;
        }
        // delete 버튼 이벤트 핸들러
        case 'delete': {
          Ajax.delete(this.url, targetId)
            .then(() => {
              console.log('[DEL]', targetId);
              return Ajax.get(this.url);
            })
            .then(users => {
              this.users = JSON.parse(users);
              console.log('[GET]', this.users);
              this.bindUsersToDom();
            });
          break;
        }
        default:
          break;
      }
    });
  }
}

// Single Instance
export default new UserList();
