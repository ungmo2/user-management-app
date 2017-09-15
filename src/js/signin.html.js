const html = `
<div class="container">
<div class="row">
  <!-- sign-in -->
  <div id="signin" class="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
    <div class="panel panel-info">
      <div class="panel-heading">
        <div class="panel-title">
          <i class="fa fa-users" aria-hidden="true"></i> Sign In
        </div>
      </div>
      <div class="panel-body">
        <div id="signin-alert" class="alert alert-danger hidden"></div>
        <form id="signin-form" class="form-horizontal">
          <div class="input-group">
            <div class="input-group-addon">
              <i class="fa fa-user" aria-hidden="true"></i>
            </div>
            <input type="text" class="form-control" name="userid" placeholder="email">
          </div>
          <div class="input-group">
            <div class="input-group-addon">
              <i class="fa fa-unlock-alt" aria-hidden="true"></i>
            </div>
            <input type="password" class="form-control" name="password" placeholder="password">
          </div>
          <div class="input-group">
            <div class="checkbox">
              <label>
                <input id="remember" type="checkbox" name="remember" value="1"> Remember me
              </label>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-12">
              <a id="btn-signin" class="btn btn-success" role="button">Sign In</a>
              <div class="btn-group pull-right">
                <a class="btn btn-primary disabled"><i class="fa fa-facebook"></i></a>
                <a id="btn-fb-signin" class="btn btn-primary">Sign In with Facebook</a>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-md-12">
              <div class="question">
                Don't have an account!
                <a id="goto-signup" href="#signup">Sign Up Here</a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</div>
`;

export default html;
