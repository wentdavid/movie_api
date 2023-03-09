<h1>Movie API</h1>
<p>This is a RESTful API for movies. It is built using Node.js, Express, and MongoDB, and it is designed to provide users with access to information about movies, including titles, descriptions, genres, directors, actors, and images.</p>
<h2>Table of Contents</h2>
<ul>
  <li><a href="https://github.com/wentdavid/movie_api#getting-started">Getting Started</a></li>
  <li><a href="https://github.com/wentdavid/movie_api#technology-stack">Technology Stack</a></li>
  <li><a href="https://github.com/wentdavid/movie_api#api-endpoints">API Endpoints</a></li>
  <li><a href="https://github.com/wentdavid/movie_api#authentication">Authentication</a></li>
  <li><a href="https://github.com/wentdavid/movie_api#passport">Passport</a></li>
  <li><a href="https://github.com/wentdavid/movie_api#examples">Examples</a></li>
  <li><a href="https://github.com/wentdavid/movie_api#license">License</a></li>
</ul>
<h2 id="getting-started">Getting Started</h2>
<p>To get started with this API, you will need to have Node.js and MongoDB installed on your machine. Once you have these dependencies installed, follow these steps:</p>
<ol>
  <li>Clone this repository to your local machine.</li>
  <li>Navigate to the root directory of the repository in your terminal.</li>
  <li>Run <code>npm install</code> to install the required packages.</li>
  <li>Run <code>npm run start</code> to start the server.</li>
  <li>Open your browser and go to <a href="http://localhost:8080/">http://localhost:8080/</a> to verify that the server is running.</li>
</ol>
<h2 id="technology-stack">Technology Stack</h2>
<ul>
  <li>Node.js</li>
  <li>MongoDB</li>
  <li>Express</li>
  <li>Mongoose</li>
  <li>Passport</li>
  <li>JSON Web Tokens (JWT)</li>
</ul>
<h2 id="api-endpoints">API Endpoints</h2>
<p>Once the server is running, clients can make requests to the following endpoints:</p>
<table>
<thead>
<tr>
<th>Endpoint</th>
<th>HTTP Method</th>
<th>Description</th>
<th>Requires Authorization</th>
</tr>
</thead>
<tbody>
<tr>
<td>/movies</td>
<td>GET</td>
<td>Responds with a list of all movies.</td>
<td>Yes</td>
</tr>
<tr>
<td>/movies/:Title</td>
<td>GET</td>
<td>Responds with details about a specific movie based on the title.</td>
<td>Yes</td>
</tr>
<tr>
<td>/movies/genres/:Name</td>
<td>GET</td>
<td>Responds with all movies that match the given genre name.</td>
<td>Yes</td>
</tr>
<tr>
<td>/movies/directors/:Name</td>
<td>GET</td>
<td>Responds with the director data that matches the given name.</td>
<td>Yes</td>
</tr>
<tr>
<td>/users</td>
<td>GET</td>
<td>Responds with all users in the database.</td>
<td>Yes</td>
</tr>
<tr>
<td>/users/:Username</td>
<td>GET</td>
<td>Responds with the user that matches the given username.</td>
<td>Yes</td>
</tr>
<tr>
<td>/users</td>
<td>POST</td>
<td>Allows new users to register by creating a new user document in the database. A JSON object holding data about the users to add, structured like this:<code>{ "Username": "String","Password": "String","Email": "String","Birthday": "Date"}</code>. A JSON object holding data about the user that was added, structured like this <code>{ "username" : "Test1", "Password": "1234", "Email": "testtest@gmail.com", "Birthday": "1988-08-08", "favorite movie" : [] }</code> including an ID </td>
<td>No</td>
</tr>
<tr>
<td>/users/:Username</td>
<td>PUT</td>
<td>Allows users to update their user information in the database.</td>
<td>Yes</td>
</tr>
<tr>
<td>/users/:Username/movies/:MovieID</td>
<td>POST</td>
<td>Allow users to add a movie to their list of favorites.</td>
<td>Yes</td>
</tr>
<tr>
<td>/users/:Username/movies/:MovieID</td>
<td>DELETE</td>
<td>Allow users to delete a movie from their list of favorites.</td>
<td>Yes</td>
</tr>
<tr>
<td>/users/:Username</td>
<td>DELETE</td>
<td>This method allows existing users to be deregistered from the application.</td>
<td>Yes</td>
</tr>
<tr>
<td>/verify-password</td>
<td>POST</td>
<td>This method verifies the user's password before allowing updates to be made.</td>
<td>Yes</td>
</tr>
<tr>
<td>/documentation</td>
<td>GET</td>
<td>This method serves the documentation HTML file.</td>
<td>No</td>
</tr>
</tbody>
</table>
<h2 id="api-documentation">API Documentation</h2>

<h2 id="authentication">Authentication</h2>
<p>All endpoints (except for the root endpoint) require authentication using JSON Web Tokens (JWT). To access these endpoints, clients must include a valid JWT in the Authorization header of the request.</p>

<h2 id="passport">Passport</h2>
<p>This API uses the Passport module for authentication and authorization. Passport is middleware for Node.js that provides a set of authentication strategies. It is flexible and modular, and it allows developers to easily add authentication to their applications.

The following Passport strategies are used in this API:</p>

<ul>
  <li><strong>LocalStrategy</strong> - For local authentication.</li>
  <li><strong>JWTStrategy</strong> - For JSON Web Token (JWT) authentication.</li>
</ul>
<h2 id="examples">Examples</h2>
<p>Here are a examples of my projects that use this API:</p>
<ul>
  <li>Built with React: <a href="https://gleans-moviedb.netlify.app/">This web application</a> allows users to browse a list of movies, view movie details, and add movies to their list of favorites. It is built using React and integrates with the Movie API.</li>
  <li>Built with Angular: <a href="https://wentdavid.github.io/myFlix-Angular-client/">This is a single-page web application</a> that allows users to browse a list of movies, view movie details, and add movies to their list of favorites. It is built using Angular and integrates with the Movie API.</li>
</ul>
<p>Feel free to check out my projects to see how the Movie API can be used in real-world applications.</p>
<h2 id="license">License</h2>
<p>This project is licensed under the terms of the MIT license. See the <a href="LICENSE">LICENSE</a> file for more details.</p>



