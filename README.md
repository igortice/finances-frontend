# FinancesFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.4.
```
ng new finances-frontend --skip-tests --routing
```
# Dependencies:

###[NG-BOOTSTRAP](https://ng-bootstrap.github.io/#/getting-started):

```
npm install @ng-bootstrap/ng-bootstrap bootstrap jquery popper.js --save
```

add to style.scss:
```
@import '~bootstrap/scss/bootstrap';
```

###[PRIMENG](https://www.primefaces.org/primeng/#/setup):

```
npm install primeng primeicons --save
```

###[ANIMATE.CSS](https://github.com/daneden/animate.css):

```
npm install animate.css --save
```

add to angular.json:
```
"styles": [
            "./node_modules/animate.css/animate.min.css",
            ...,
            "src/styles.scss"
          ],
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
