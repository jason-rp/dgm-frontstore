# DGM Front store Project Guidelines



## Table of Contents
- [Project Structure Summary](#structure)
- [Installation & Setup Environmnent](#installation--setup-environmnent)
- [Steps](#step)
- [Main tasks](#main-task)
- [Tools](#tools)
- [Code scaffolding](#code-scaffolding)
- [Coding guides](#coding-guides)
- [Other documentation](#other-documentation)


#### Structure

```
dist/                        compiled version
docs/                        project docs and coding guides
e2e/                         end-to-end tests
  src/                         project source code
  |- app/                      app components
  |  |- @core/                 core module (ultil services and interceptors)
  |  |- @shared/               shared module  (common components, directives and pipes, enums, interfaces, common services)
  |  |- auth                   authenticate services and guards
  |  |- pages                  contains component's page of our application
  |  |- i18n                   contains language service and language component
  |  |- app.component.*        app root component
  |  |- app.module.ts          app root module definition
  |  |- app-routing.module.ts  app routes
  |  +- ...                    additional modules and components
  |- angular.json              define style sheet
  |- assets/                   app assets (images, fonts, sounds...)
  |- environments/             values for various build environments (development, stagging, production)
  |- theme/                    app global scss variables and theme
  |- translations/             translations files
  |- index.html                html entry point
  |- main.scss                 global style entry point
  |- main.ts                   app entry point
  tsconfig.json                it takes your baseUrl as the base of the route you are pointing to and it's mandatory as described on the doc
  proxy.conf.js                backend proxy configuration
  server.ts                    server render configuration (universal) (help our application server side rendering and optimize SEO)
  package.json                 contains all packages use for application and development
```

#### Installation & Setup Environmnent

* [Node.js](https://nodejs.org) [lasted version]
* [Angular CLI](https://cli.angular.io) [11.0.2]

#### Steps Development

1. Open directory **dgm-frontstore** in command line and execute **npm i**.
2. Open **dgm-frontstore** directory in Visual Studio Code. (you can stand at this directory then open **cmd** (windows)/ **terminal** (mac) then excute **code .**)
3. Open terminal in Visual Code then excute **npm start**.

#### Main tasks

Task automation is based on [NPM scripts](https://docs.npmjs.com/misc/scripts).

Tasks                         | Description
------------------------------|---------------------------------------------------------------------------------------
npm start                     | Run development server on `http://localhost:4200/`
dev:ssr                       | Run development server with server side rendering on `http://localhost:4200/`
npm run serve:ssr             | Run development server with server side rendering on `http://localhost:4200/`
npm run build [-- --env=prod] | Lint code and build app for production in `dist/` folder
npm run build:ssr             | Lint code and build app with server side rendering for production in `dist/` folder
npm run docs                  | Display project documentation



#### Tools

Development, build and quality processes are based on [angular-cli](https://github.com/angular/angular-cli) and
[NPM scripts](https://docs.npmjs.com/misc/scripts)

#### Code scaffolding

Run `npm run generate -- component <name>` to generate a new component. You can also use
`npm run generate -- directive|pipe|service|class|module`.

If you have installed [angular-cli](https://github.com/angular/angular-cli) globally with `npm install -g @angular/cli`,
you can also use the command `ng generate` directly.


#### Coding guides

- [Angular](docs/coding-guides/angular.md)
- [TypeScript](docs/coding-guides/typescript.md)
- [Sass](docs/coding-guides/sass.md)
- [HTML](docs/coding-guides/html.md)


#### Other documentation

- [I18n guide](docs/i18n.md)
- [Working behind a corporate proxy](docs/corporate-proxy.md)
- [Updating dependencies and tools](docs/updating.md)
- [Using a backend proxy for development](docs/backend-proxy.md)
- [Browser routing](docs/routing.md)
