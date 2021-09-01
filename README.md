# deno-persons-deploy
Deno persons example project using Deno Deploy. Caution: This application needs a Deno version with Typescript 4.3 or higher. (i.e. Deno v.1.11.0 or higher)

## Run
Use deployed service or test locally by using deployctl, e.g. **deployctl run webserver.ts**.

## Lint
To check for linting issues execute **deno lint --unstable**.

## Routes
* /person Get all persons
* /person/ID Get person for given ID
