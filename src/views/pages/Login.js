const Login = {
  render: async () => {
    return /*html*/ `
      <form>
        <div class="form-header">
          <div>
            <h1 style="color:white">Login in to our site</h1>
            <h2 style="color:white">Enter username or password to log on</h2>
          </div>
          <img src="/lock.svg" alt="lock" />
        </div>
        <div class="form-body">
          <input
            name="email"
            id="email"
            type="text"
            placeholder="Enter your email"
            value="Sincere@april.biz"
          />
          <div class="error-message displayNone" id="e-error-mail">email must be a valid email</div>
          <input
            name="password"
            id="password"
            type="password"
            placeholder="Enter your password"
            value="123456"
          />
          <div class="error-message displayNone" id="e-error-password">password must be at min 4 characters</div>
          <button type="button" id="e-login-button">Submit</button>
        </div>
        <p>
          Don't have account?
          <a href="/#/register">Sign up here.</a>
        </p>
      </form>
    `;
  },
  after_render: async () => {
    document
      .getElementById('e-login-button')
      .addEventListener('click', async () => {
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        if (!emailIsValid(email)) {
          document
            .getElementById('e-error-mail')
            .classList.remove('displayNone');
        } else if ((email == '') || (password == '')) {
          document
            .getElementById('e-error-mail')
            .classList.remove('displayNone');
          document
            .getElementById('e-error-password')
            .classList.remove('displayNone');
        } else {
          var existingUser = await handleSubmit({
            email,
            password
          });

          if (existingUser) {
            window.location.hash = '/posts';
          }
        }
      });
  }
};

const handleSubmit = async values => {
  try {
    var response = await fetch('https://jsonplaceholder.typicode.com/users');
    var users = await response.json();

    return users.filter(user => user.email === values.email);
  } catch (error) {
    console.warn(error);
  }
};

const emailIsValid = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export default Login;
