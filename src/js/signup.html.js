const html = `
<div class="container">
<div class="row">
  <div id="signup" class="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
    <div class="panel panel-info">
      <div class="panel-heading">
        <div class="panel-title">
          <i class="fa fa-users" aria-hidden="true"></i> Sign Up
        </div>
        <div class="signin"><a id="goto-signin" href="#">Sign In</a></div>
      </div>
      <div class="panel-body">
        <div id="signup-alert" class="alert alert-danger hidden"></div>
        <form id="signup-form" class="form-horizontal">
          <div id="signup-alert" class="alert alert-danger hidden"></div>
          <div class="form-group">
            <label for="email" class="col-md-4 control-label">User ID*</label>
            <div class="col-md-8">
              <input type="text" class="form-control" name="userid" placeholder="email">
            </div>
          </div>
          <div class="form-group">
            <label for="firstname" class="col-md-4 control-label">First Name</label>
            <div class="col-md-8">
              <input type="text" class="form-control" name="firstname" placeholder="First Name">
            </div>
          </div>
          <div class="form-group">
            <label for="lastname" class="col-md-4 control-label">Last Name</label>
            <div class="col-md-8">
              <input type="text" class="form-control" name="lastname" placeholder="Last Name">
            </div>
          </div>
          <div class="form-group">
            <label for="password" class="col-md-4 control-label">Password*</label>
            <div class="col-md-8">
              <input type="password" class="form-control" name="password" placeholder="Password">
            </div>
          </div>
          <div class="form-group">
            <label for="password-confirm" class="col-md-4 control-label">Password(Confirm)</label>
            <div class="col-md-8">
              <input type="password" class="form-control" name="password-confirm" placeholder="Password">
            </div>
          </div>
          <div class="form-group">
            <!-- Button -->
            <div class="col-md-offset-4 col-md-8">
              <a id="btn-signup" class="btn btn-info" role="button">Sign Up &nbsp;<span class="glyphicon glyphicon-circle-arrow-right" aria-hidden="true"></span></a>
            </div>
          </div>
      </div>
    </div>
  </div>
</div>
</div>
`;

export default html;
