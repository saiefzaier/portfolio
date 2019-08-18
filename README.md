<h3>Auth Component</h3>
<li>Contains the form (uses two way binding) that allows me to login and add/delete/edit of projects/skills </li> 
<li>It uses  the auth service which send my credentials to firebase then redirects me to home page</li> 
<li>After login buttons for adding/editing/deleting projects/skills appear</li> 
<li>I used an AuthGuard to protect the child components that allow me to add skills/projects   </li>
<li>When i log in firebase returns a login token that i store in localstorage, and when the app is loaded an autologin method from the authservice is executed to check if the token exists and auto, when i click the logout button the token is cleared from the localstorage </li>
<li>When i login the user daa is submitted from the auth service via a behavioral subject , the other components subscribe to this subject to check if the user is logged in and display elements accordingly </li>

