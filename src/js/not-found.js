class NotFound {
  init() {
    document.querySelector('.app-root').innerHTML = '<div class="notfound">404</div>';
  }
}

// Single Instance
export default new NotFound();
