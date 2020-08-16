# Block-Share-API: A Description

I came up with the idea for this project from my family background.  Community is a major part of life in the countries my family comes from.  A lot of times people will go over to neighbors and ask for some form of food or spice, as none were available at the market.  They give knowing that one day the other will return the favor.

From this I made a community video game share.  Grander idea would be a site where a community could share any resource they have if they want with their neighbors. Starting with video games or movies you can easily borrow from a neighbor rather than pay a rental fee to a large company.

With this application you can search video game postings in your neighborhood.  Find one that available to borrow and request to borrow it.

## Important Links

- [GitHub API Repo](https://github.com/sebastian-chang/block-share-api)
- [Deployed API]( https://shrouded-woodland-10861.herokuapp.com)
- [GitHub Repo](https://github.com/sebastian-chang/block-share)
- [Deployed Client](https://sebastian-chang.github.io/block-share)

## Planning Story

- Create the API models and routes.
- Test API connections.
- Build basic front end web pages.
- Test front end to back end connection.
- Create styling for front end objects.
- Test, debug, troubleshoot and debug.
- [Gantt Chart](https://docs.google.com/spreadsheets/d/1z5f2GSEPifRBP3DsE0RQL32uXRSbROqJ7u_IqC4iMV8/edit#gid=1115838130)

## API End Points

| Verb   | URI Pattern            | Controller#Action           | Token Required  |
|--------|------------------------|-----------------------------|-----------------|
| POST   | `/sign-up`             | `users#signup`              | `false`         |
| POST   | `/sign-in`             | `users#signin`              | `false`         |
| DELETE | `/sign-out`            | `users#signout`             | `true`          |
| PATCH  | `/change-password`     | `users#changepw`            | `true`          |
| PATCH  | `/update-user`         | `users#updateuser`          | `true`          |
| GET    | `/video-games`         | `video-games#index`         | `true`          |
| GET    | `/video-games-user`    | `video-games#indexforuser`  | `true`          |
| GET    | `/video-games/:id`     | `video-games#show`          | `true`          |
| POST   | `/video-games`         | `video-games#create`        | `true`          |
| PATCH  | `/video-games/:id`     | `video-games#update`        | `true`          |
| DELETE | `/video-games/:id`     | `video-games#delete`        | `true`          |

All data returned from API actions is formatted as JSON.

### User Stories

- As a user I want to sign in/up
- As a user I would like to post a video game I have that people could borrow.
- As a user I would like to browse video games available.
- As a user I want to view the details of a specific video game.
- As a user I would like to update a video game's information.
- As a user I want to Delete a video game I own.
- As a user I would like to leave a thank you comment for letting me borrow a video game.

### Technologies Used

- jQuery
- HTML
- CSS
- Bootstrap
- Javascript
- Express
- Handlebars
- Mongoose
- MongoDB

### Unsolved Problems

- Still need to add addition error messages.  Add additional console platforms and better icons for each platform.
- Would like to eventually like to add a search bar feature, for any game title, platform or rating.
- Would like to have additional resources to share, such as books, movies, tools etc.
- Would like to add thank comments to each resource.
- Would like to actually send a request to the owner of the resource, so that a person can borrow said item.

## Images

#### ERD:

![wireframe](https://github.com/sebastian-chang/block-share/blob/master/public/images/Block-Share-ERD.jpg)

---
