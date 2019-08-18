<h3>Auth Component</h3>
<li>Contains the form (uses two way binding) that allows me to login and add/delete/edit of projects/skills </li> 
<li>It uses  the auth service which send my credentials to firebase then redirects me to home page</li> 
<li>After login buttons for adding/editing/deleting projects/skills appear</li> 
<li>I used an AuthGuard to protect the child components that allow me to add skills/projects   </li>
<li>When i log in firebase returns a login token that i store in localstorage, and when the app is loaded an autologin method from the authservice is executed to check if the token exists and auto, when i click the logout button the token is cleared from the localstorage </li>
<li>When i login the user daa is submitted from the auth service via a behavioral subject , the other components subscribe to this subject to check if the user is logged in and display elements accordingly </li><br>
<h3>Projects Component</h3>
<li> </li>
<li>This component is used to display/delete/edit projects  </li>
<li>Each projects has a screenshot, a title and a short description and  may have a github/youtube link they are displayed using Bootstrap grid system into card element also from bootstrap</li>
<li>Items are displayed using ngfor if the project has a github/youtube/website the icon will be displayed only if the propery is different from "" using ngif  </li>
<li>I can add projects using add button that is displayed if i'm loggein , when i click on the button a child components called addproject is displayed , it contains a form that is used to submit the displayed data to firebase</li>
<li>The form contains string propoerties and images upload  which stored in firebase storage and it returns a link to the image and added to the project json object</li>
<li>Each project has its edit and delete buttons  </li>
<li>When a click delete a confirmation box appears  if i click yes a delete request with the project's id is sent to firebase and the proejct is deleted</li>
<li>Each project has an embedded edit form it is displayed if i click on the edit button, the form is displayed under the appropriate project  and it allows me to edit the project </li>
<li>The form is the same as the add form it contains the basic string types that are easy to update and the images which is stored in firebase storage and it returns a link to the images and then deleted the old image from storages using the old link , a progress bar is used to show the upload progress after finishing  the upload</li>
<h3>Skills Component</h3>
<li> It is used to display/add/delete/edit the skill , it also uses bootstrap grid system, it is saved as a string but displayed as a list by creating and array and splitting it using the /\s+/ reguular expression</li>
<li>I can add skills using  a child component "addskills" which is displayed after i click the addskill button (only if loggedin) 
</li>
<li> Skills are saved in firebase as string and displayed as a list when the user clicks on the skill button that contains a title</li>
<li>Add/edit/delete buttons are displayed when logged in</li>
<li>When a click delete a confirmation box appears if i click yes a delete request with the project's id is sent to firebase and the skill is deleted when i click update a form is displayed under each skil that allows me to update it</li>


