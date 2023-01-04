# NASA PORTAL

### January 2, 2023

## Purpose of The Development

- Upon passing the React frontend pre-screening test on December 21, 2022, I was asked to build a React application using [NASA API](https://api.nasa.gov/) for Reside.

## Requirements

- Apply a good UX design using React
- Fetch photos from the NASA API ('Mars Rover' endpoint)
- Limit number of photos being fetched at 25 per page by applying pagination or dynamic loading
- Build the filter OR search rover photos features:
  ## Filter Type
        • By camera name
        • By 'Earth Day' date (2020-09-22)
        • By 'Sol' date (2890)
- Add any warning or error messages
  - Possibly by adding messages for "No Results", "API fetch failed", etc

## User Experience

• A user will be welcomed with SignUp / LogIn with Google
• Once signed in a user will be directed to the main photo feed page
• A user can filter or search by (a) camera name, (b) 'Earth Day' date, or (c) By 'Sol' date.s
• A signed-in user will be able to save their favorite photos which can be viewed in their profile page (lowest priority at the moment. Build this feature if time allowed).

## Structure of NASA PORTAL

### Routes

• / (Main Feed page where a user can see every photos)

[Components]:

- FeedPost
- FeedPostSkeleton (For UI/UX purpose for slow loading)

<!-- If time allowed -->

• /pins/:username

[Components]:

- Pins (A user can pin a.k.a save their favourite NASA photos and view in this page)
- Pin
- Pin Skeleton

• /accounts/emailsignup (signup page)
• /accounts/login (login page)

<!-- If time allowed -->

• \* (not found page)

## Shared Components

- Navbar
- PinCard
- LoadingScreen
- Layout
- SEO
- Search

### Built With

- [![React][react.js]][react-url]
- [![Material-UI][material-ui]][material-ui-url]

<!-- MARKDOWN LINKS & IMAGES -->

[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[material-ui]: https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white
[material-ui-url]: https://mui.com/material-ui/getting-started/overview/
# nasa-portal-app
