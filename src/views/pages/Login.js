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
          <div class="error-message displayNone" id="e-error-email"></div>
          <input
            name="password"
            id="password"
            type="password"
            placeholder="Enter your password"
            value="123456"
          />
          <div class="error-message displayNone" id="e-error-password"></div>
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
        const formValues = {
          email: document.getElementById('email').value,
          password: document.getElementById('password').value
        };

        if (validateForm(formValues)) {
          var userExists = await handleSubmit(formValues);
          if (userExists) {
            window.location.hash = '/posts';
          }
        }
      });
  }
};

const validateForm = formValues => {
  let formIsInvalid = true;
  Object.keys(formValues).forEach(function(key) {
    const error = document.getElementById('e-error-' + key);
    if (formValues[key] === '') {
      error.classList.remove('displayNone');
      error.textContent = key + ' is required';
      formIsInvalid = false;
    } else {
      error.classList.add('displayNone');
    }
  });

  const passwordError = document.getElementById('e-error-password');
  if (formValues.password !== '' && formValues.password.length < 4) {
    passwordError.classList.remove('displayNone');
    passwordError.textContent = 'Password must be at min 4 characters';
    formIsInvalid = false;
  }

  const emailError = document.getElementById('e-error-email');
  if (formValues.email !== '' && !emailIsValid(formValues.email)) {
    emailError.classList.remove('displayNone');
    emailError.textContent = 'Please enter a valid email';
    formIsInvalid = false;
  } else if (emailIsValid(formValues.email)) {
    emailError.classList.add('displayNone');
  }

  return formIsInvalid;
};

const emailIsValid = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
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

export default Login;
