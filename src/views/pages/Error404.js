const Error404 = {
  render: async () => {
    const view = /*html*/ `
      <section class="section">
        <img src="/404.svg" alt="404" />
        <h1 style="color:white">Oopss... Page not found!</h1>
      </section>
    `;
    return view;
  },
  after_render: async () => {}
};
export default Error404;
