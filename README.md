# recipeBook
##About
The application is basically a list of recipes which are sorted by date of their creation.

##Main features of application:

- Display list of recipes (date created, description, image)
- Add new recipe 
- Modify existing recipe
- View all previous recipe versions
- Delete recipe as well as elements of history

##Description
In order to create an recipe, user should go to "Create recipe" item menu and fill the form. Both name and description fields
 are required. If user want add a photo of desired recipe, than after pushing button "Add Photo" (below description field), on
 the display appears pop-up window with progress bar. After successfull downloading, all images displays in window after what 
user can choose one.
For geting the data of required images i used API from pixabay.com.
Server-side is written utilizing NodeJS and ExpressJS. 
On the client-side i implemented AngularJS and Bootstrap.
