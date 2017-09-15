import Signin from './signin';
import Signup from './signup';
import UserList from './user-list';
import NotFound from './not-found';

(function () {
  const routes = {
    '': Signin,
    'signup': Signup,
    'user-list': UserList,
    '**': NotFound
  };

  function router() {
    const hash = window.location.hash.replace('#', '');
    console.log('[ROUTER]', hash);

    (routes[hash] || routes['**']).init();
  }

  // hashchange 이벤트: uri의 hash가 변경하면 발생
  window.addEventListener('hashchange', router);

  // DOMContentLoaded 이벤트: HTML과 script가 로드된 시점에 발생하는 이벤트로 load 이벤트보다 먼저 발생한다. (IE 9 이상 지원)
  // 웹페이지가 처음 로딩 또는 새로고침 되었을 경우, 현 페이지(예를들어 loclahost:3000/#service)를 요청하므로 index.html이 재로드되고 DOMContentLoaded 이벤트가 발생하여 router가 호출된다.
  window.addEventListener('DOMContentLoaded', router);
}());
