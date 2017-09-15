const html = `
<nav class="navbar navbar-default navbar-fixed-top">
<div class="container-fluid">
  <div class="navbar-header">
    <a class="navbar-brand" href="#">
      <!-- <img alt="Brand" src=""> -->
      <img src="https://angular.io/assets/images/logos/angular/angular.svg">
    </a>
  </div>
  <ul class="nav navbar-nav">
    <li class="active"><a href="#">Home</a></li>
    <li><a href="#">Page 1</a></li>
    <li><a href="#">Page 2</a></li>
  </ul>
  <ul class="nav navbar-nav navbar-right">
    <li><a href="#"><i class="fa fa-user-circle-o" aria-hidden="true"></i> User name</a></li>
    <li><a href="#"><i class="fa fa-sign-out" aria-hidden="true"></i> Login out</a></li>
  </ul>
</div>
</nav>
<div class="sub-root">
<div class="container">
  <div class="row">
    <div class="col-md-12">
      <div class="panel panel-default">
        <div class="panel-heading clearfix">
          <h4 class="pull-left">
            <i class="fa fa-list-alt" aria-hidden="true"></i> User List
          </h4>
          <button id="add" type="button" class="btn btn-default pull-right">
            <i class="fa fa-plus" aria-hidden="true"></i>
          </button>
        </div>
        <div class="table-responsive">
          <table class="table table-bordred table-striped">
            <thead>
              <th>#</th>
              <th>User ID</th>
              <th>Password</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Action</th>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
`;

export default html;
