# DHIS2 user profile app [![Build Status](https://travis-ci.org/dhis2/user-profile-app.svg?branch=master)](https://travis-ci.org/dhis2/user-profile-app)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fdhis2%2Fuser-profile-app.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fdhis2%2Fuser-profile-app?ref=badge_shield)

The user profile app is used for changing user profile information, user settings and user passwords.

## Development

To work on this app: Clone the repo, install the dependencies using npm or yarn, and run the start script:

```sh
> git clone https://github.com/dhis2/user-profile-app.git
Cloning into 'user-profile-app'...
remote: Counting objects: 705, done.
remote: Total 705 (delta 0), reused 0 (delta 0), pack-reused 705
Receiving objects: 100% (705/705), 177.76 KiB | 500.00 KiB/s, done.
Resolving deltas: 100% (423/423), done.

> cd user-profile-app
> yarn install
yarn install v1.0.1
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 📃  Building fresh packages...
✨  Done in 15.45s.

> yarn start
yarn start v1.0.1
$ d2-manifest package.json manifest.webapp
Reading package data: package.json
Validating manifest: ✓ Ok
Writing manifest to: manifest.webapp
Done!
$ webpack-dev-server
[...]
```


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fdhis2%2Fuser-profile-app.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fdhis2%2Fuser-profile-app?ref=badge_large)