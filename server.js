const express = require('express');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(express.urlencoded({ extended: true }));

function readPosts() {
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(raw).posts;
}

function writePosts(posts) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ posts }, null, 2));
}

function findPost(id) {
  return readPosts().find((post) => String(post.id) === String(id));
}

function excerpt(text, length) {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}

const styles = `
  * { box-sizing: border-box; }
  body { font-family: Georgia, serif; max-width: 720px; margin: 0 auto; padding: 0 24px 60px; line-height: 1.6; color: #222; background: #fafafa; }
  nav { background: #222; margin: 0 -24px 32px; padding: 14px 24px; }
  nav a { color: #fff; text-decoration: none; margin-right: 20px; font-family: sans-serif; font-size: 0.95em; }
  nav a:hover { text-decoration: underline; }
  nav a.active { font-weight: bold; border-bottom: 2px solid #fff; padding-bottom: 2px; }
  h1 { font-size: 2em; margin-bottom: 8px; }
  .subtitle { color: #666; font-family: sans-serif; margin-bottom: 32px; }
  .post-card { background: #fff; border: 1px solid #ddd; border-radius: 6px; padding: 20px; margin-bottom: 16px; }
  .post-card h2 { margin: 0 0 8px; font-size: 1.4em; }
  .post-card h2 a { color: #222; text-decoration: none; }
  .post-card h2 a:hover { text-decoration: underline; }
  .date { color: #888; font-size: 0.85em; font-family: sans-serif; margin-bottom: 10px; }
  .read-more { font-family: sans-serif; font-size: 0.9em; }
  .read-more a { color: #0066cc; }
  .post-full { background: #fff; border: 1px solid #ddd; border-radius: 6px; padding: 28px; margin-bottom: 24px; }
  .post-full p { white-space: pre-wrap; }
  .back-link { font-family: sans-serif; font-size: 0.9em; }
  .back-link a { color: #0066cc; }
  form { background: #fff; border: 1px solid #ddd; border-radius: 6px; padding: 24px; }
  label { display: block; margin-bottom: 4px; font-weight: bold; font-family: sans-serif; font-size: 0.9em; }
  input, textarea { width: 100%; margin-bottom: 16px; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-family: sans-serif; font-size: 1em; }
  textarea { resize: vertical; }
  button { background: #222; color: #fff; border: none; padding: 12px 24px; border-radius: 4px; cursor: pointer; font-size: 1em; }
  button:hover { background: #444; }
  .empty { color: #888; font-family: sans-serif; font-style: italic; }
  .about-box { background: #fff; border: 1px solid #ddd; border-radius: 6px; padding: 28px; }
  .about-box p { margin-top: 0; }
  .storage-note { background: #eef6ff; border: 1px solid #b3d4f5; border-radius: 6px; padding: 16px; font-family: sans-serif; font-size: 0.9em; margin-top: 24px; }
  .storage-note code { background: #ddeeff; padding: 2px 6px; border-radius: 3px; }
`;

function layout(title, activePage, body) {
  const template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= title %> — Simple Blog</title>
  <style>${styles}</style>
</head>
<body>
  <nav>
    <a href="/" class="<%= activePage === 'home' ? 'active' : '' %>">Home</a>
    <a href="/new" class="<%= activePage === 'new' ? 'active' : '' %>">New Post</a>
    <a href="/about" class="<%= activePage === 'about' ? 'active' : '' %>">About</a>
  </nav>
  <%- body %>
</body>
</html>`;
  return ejs.render(template, { title, activePage, body });
}

const homeBody = `
  <h1>Simple Blog</h1>
  <p class="subtitle">Latest posts</p>

  <% if (posts.length === 0) { %>
    <p class="empty">No posts yet. <a href="/new">Write the first one!</a></p>
  <% } else { %>
    <% posts.forEach(function(post) { %>
      <article class="post-card">
        <h2><a href="/posts/<%= post.id %>"><%= post.title %></a></h2>
        <p class="date"><%= post.date %></p>
        <p><%= post.excerpt %></p>
        <p class="read-more"><a href="/posts/<%= post.id %>">Read more →</a></p>
      </article>
    <% }); %>
  <% } %>
`;

const postBody = `
  <article class="post-full">
    <h1><%= post.title %></h1>
    <p class="date"><%= post.date %></p>
    <p><%= post.body %></p>
  </article>
  <p class="back-link"><a href="/">← Back to all posts</a></p>
`;

const newPostBody = `
  <h1>New Post</h1>
  <p class="subtitle">Write and publish a new blog post</p>

  <form method="POST" action="/posts">
    <label for="title">Title</label>
    <input type="text" id="title" name="title" placeholder="Enter a title" required>

    <label for="body">Body</label>
    <textarea id="body" name="body" rows="8" placeholder="Write your post here..." required></textarea>

    <button type="submit">Publish</button>
  </form>

  <div class="storage-note">
    Posts are saved to <code>data.json</code> in this project folder when you click Publish.
  </div>
`;

const aboutBody = `
  <h1>About</h1>
  <div class="about-box">
    <p>This is a simple blog built with Express and EJS. It has no database — everything runs from a single <code>server.js</code> file.</p>
    <p><strong>Where is data stored?</strong> Every post you create is saved to the <code>data.json</code> file in this project folder. The file persists on disk, so your posts remain even after you restart the server.</p>
    <p><strong>Pages:</strong></p>
    <ul>
      <li><strong>Home</strong> — lists all posts with previews</li>
      <li><strong>New Post</strong> — form to add a post</li>
      <li><strong>Post page</strong> — click any post title to read the full article</li>
    </ul>
  </div>
`;

app.get('/', (req, res) => {
  const posts = readPosts().map((post) => ({
    ...post,
    excerpt: excerpt(post.body, 120)
  }));
  const body = ejs.render(homeBody, { posts });
  res.send(layout('Home', 'home', body));
});

app.get('/posts/:id', (req, res) => {
  const post = findPost(req.params.id);
  if (!post) return res.status(404).send(layout('Not Found', 'home', '<h1>Post not found</h1><p class="back-link"><a href="/">← Back to home</a></p>'));
  const body = ejs.render(postBody, { post });
  res.send(layout(post.title, 'home', body));
});

app.get('/new', (req, res) => {
  res.send(layout('New Post', 'new', newPostBody));
});

app.get('/about', (req, res) => {
  res.send(layout('About', 'about', aboutBody));
});

app.post('/posts', (req, res) => {
  const title = req.body.title.trim();
  const body = req.body.body.trim();
  if (!title || !body) return res.redirect('/new');

  const posts = readPosts();
  const newPost = {
    id: Date.now(),
    title,
    body,
    date: new Date().toISOString().slice(0, 10)
  };
  posts.unshift(newPost);
  writePosts(posts);
  res.redirect('/posts/' + newPost.id);
});

app.listen(PORT, () => {
  console.log('Blog running at http://localhost:' + PORT);
});
