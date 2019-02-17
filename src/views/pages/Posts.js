const getPosts = async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments`,
      options
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.warn(error);
  }
};

let Posts = {
  render: async () => {
    let posts = await getPosts();
    let view = /*html*/ `
			<div class="posts-container">
				<ul>
					${posts
            .map(
              post => /*html*/ `
								<li>
									<h1>
										${post.name}
									</h1>
									<h2>
										${post.email}
									</h2>
									<h2>
										${post.body}
									</h2>
								</li>
							`
            )
            .join('\n ')}
				</ul>
			</div>
		`;
    return view;
  },
  after_render: async () => {}
};

export default Posts;
