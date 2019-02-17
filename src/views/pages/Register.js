const Register = {
  render: async () => {
    return /*html*/ `
      <form>
        <label>
          <img
            class="logo"
            id="logo"
            src="/user.svg"
            alt="user"
          />
          <input id="file-chooser" type="file" class="displayNone" />
        </label>
        <div class="form-body">
          <input
            name="name"
            id="name"
            type="text"
            placeholder="Enter your name"
          />
          <div class="error-message displayNone" id="e-error-name"></div>
          <input
            name="email"
            id="email"
            type="text"
            placeholder="Enter your email"
          />
          <div class="error-message displayNone" id="e-error-email"></div>
          <input
            name="password"
            id="password"
            type="password"
            placeholder="Enter your password"
          />
          <div class="error-message displayNone" id="e-error-password"></div>
          <input 
            name="date" 
            id="date" 
            type="date" 
            placeholder="Enter your birth date"
            />
          <div class="error-message displayNone" id="e-error-date">Required</div>
          <button type="button" id="e-login-button">Submit</button>
        </div>
        <p>
          Don't have account?
          <a href="/#/">Sign up here.</a>
        </p>
      </form>
    `;
  },
  after_render: async () => {
    document.getElementById('file-chooser').addEventListener('change', () => {
      var preview = document.getElementById('logo');
      var file = document.getElementById('file-chooser').files[0];
      var reader = new FileReader();

      reader.onloadend = function() {
        preview.src = reader.result;
      };

      if (file) {
        reader.readAsDataURL(file);
      } else {
        preview.src = '/user.svg';
      }
    });

    document
      .getElementById('e-login-button')
      .addEventListener('click', async () => {
        const formValues = {
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          password: document.getElementById('password').value,
          date: document.getElementById('date').value
        };

        const avatar = document.getElementById('logo').src;

        if (validateForm(formValues)) {
          var userExists = await handleSubmit({
            ...formValues,
            avatar
          });
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
  if (formValues.password.length < 4) {
    passwordError.classList.remove('displayNone');
    passwordError.textContent = 'Password must be at min 4 characters';
    formIsInvalid = false;
  } else {
    passwordError.classList.add('displayNone');
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
    var response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
    return await response.json();
  } catch (error) {
    console.warn(error);
  }
};

export default Register;
