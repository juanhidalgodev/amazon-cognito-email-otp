# Login with Amazon Cognito and Email OTP

This project is a proof of concept (POC) for implementing login functionality using email-based one-time passwords (OTP) with Amazon Cognito.
It demonstrates how to generate and validate OTPs sent to users' email addresses during the login process.

## Getting Started

Before cloning and running the project you need to create and configure in AWS:
- UserPool
- IdentityPool
- SES 
*config  [Source: "EMAIL_ADDRESS"] at creathe-auth-challenge lambda trigger 

then you can clone the repo and set the environment variables (env.development):
- AWS_REGION
- USER_POOL_ID
- USER_POOL_WEB_CLIENT_ID

## Installation

npm install

## Usage

npm run build
open ./dist/index.html 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

...

## Contributing

If you want to contribute to a project and make it better, your help is very welcome. Contributing is also a great way to learn more about social coding on Github, new technologies and and their ecosystems and how to make constructive, helpful bug reports, feature requests and the noblest of all contributions: a good, clean pull request.

### How to make a clean pull request

- Create a personal fork of the project on Github.
- Clone the fork on your local machine. Your remote repo on Github is called `origin`.
- Add the original repository as a remote called `upstream`.
- If you created your fork a while ago be sure to pull upstream changes into your local repository.
- Create a new branch to work on! Branch from `develop` if it exists, else from `master`.
- Implement/fix your feature, comment your code.
- Follow the code style of the project, including indentation.
- If the project has tests run them!
- Write or adapt tests as needed.
- Add or change the documentation as needed.
- Squash your commits into a single commit with git's [interactive rebase](https://help.github.com/articles/interactive-rebase). Create a new branch if necessary.
- Push your branch to your fork on Github, the remote `origin`.
- From your fork open a pull request in the correct branch. Target the project's `develop` branch if there is one, else go for `master`!
- …
- If the maintainer requests further changes just push them to your branch. The PR will be updated automatically.
- Once the pull request is approved and merged you can pull the changes from `upstream` to your local repo and delete
your extra branch(es).

And last but not least: Always write your commit messages in the present tense. Your commit message should describe what the commit, when applied, does to the code – not what you did to the code.


---- if you need help don't hesitate to contact me. ;D