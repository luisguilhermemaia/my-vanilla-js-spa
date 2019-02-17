let Navbar = {
  render: async () => {
    let view = /*html*/ `
      <nav class="nav-bar">
        <div>
          <a href="/#/">
            <img class="nav-logo" src="/logo.svg" alt="logo" />
          </a>
        </div>
      </nav>
    `;
    return view;
  },
  after_render: async () => {}
};

export default Navbar;
