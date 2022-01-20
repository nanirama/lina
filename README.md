# Server Badges

[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=LinaHealth_healthgent&metric=security_rating&token=f2071d6167f06ec16b1ad4dbe724b0cf9ebd52d4)](https://sonarcloud.io/summary/new_code?id=LinaHealth_healthgent)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=LinaHealth_healthgent&metric=sqale_rating&token=f2071d6167f06ec16b1ad4dbe724b0cf9ebd52d4)](https://sonarcloud.io/summary/new_code?id=LinaHealth_healthgent)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=LinaHealth_healthgent&metric=coverage&token=f2071d6167f06ec16b1ad4dbe724b0cf9ebd52d4)](https://sonarcloud.io/summary/new_code?id=LinaHealth_healthgent)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=LinaHealth_healthgent&metric=duplicated_lines_density&token=f2071d6167f06ec16b1ad4dbe724b0cf9ebd52d4)](https://sonarcloud.io/summary/new_code?id=LinaHealth_healthgent)

# Developing the backend

> Summary:
>
> - Set up your development environment and run the api server

## Developing the backend with Docker

Run `./docker-compose up --build`. This builds a development image with
dependencies needed to run the API server, starts postgres and redis, then
starts the API server in development mode. When you're done,
`docker-compose down` to stop. DB data will be persisted between.

### First time only

- You will need to bootstrap the database. Continue to the "Setting up Postgres"
  section

### Notes

- The `--build` flag causes the dev image to be rebuilt and is only required the
  first time, and whenever you change dependencies.
- By default, your local `./server` directory will be mounted inside the
  dev container, allowing you develop without rebuilding the image. You can
  disable this by commenting out the `volume` directive in the `server` service
  in `./docker-compose.yaml`, but you will have to rebuild the image each time
  you make changes.
  - This can be useful if you want to develop the frontend against a known
    version of the backend.

## Developing the backend without Docker

- Start postgres
- Start redis
- `yarn`
- `yarn server start:development`
- Continue to the "Setting up Postgres" section

# Setting up Postgres

> Summary:
>
> - Make a database for the api server and run migrations
> - See `./server/src/knexfile.ts` for details

Start your postgres instance

- With docker: `docker-compose up`
- Without docker: google

Log into your postgres instance:

- With docker: `docker-compose exec db psql -U postgres`
- Without docker: `psql -h localhost -U postgres`

Create the dev database and grant permissions on it to the api server's role. By
default, the dev server uses the `postgres` role to connect to the database.

```sql
create database healthgent_api_dev;
grant all privileges on database healthgent_api_dev to postgres;
```

Run migrations

- With docker: `docker-compose exec server yarn server knex migrate:latest --knexfile src/knexfile.ts`
- Without docker: `env POSTGRES_HOST=localhost yarn server knex migrate:latest --knexfile src/knexfile.ts`

# Developing the frontend

> Run the frontend in dev mode and connect to the backend

0. Optional: follow steps above to start the API server
1. Install dependencies `yarn`
2. Run the frontend in dev mode `yarn dev:frontend` or `yarn frontend dev`
3. Set the base url of the API server in the localstorage with the `base_url` key ([see](https://github.com/LinaHealth/healthgent/blob/efd85a9cc1fe514237ea7bf1accdeaffa73f670a/frontend/lib/api.ts#L24-L25))
   - for local dev, this is probably `http://localhost:4000`
4. Try logging in through the app to test API connectivity

# Deployment

We may have three deployment strategies on two different servers. On every push to `main`
or on a tag push prefixed with `stg`, the ci automatically deploys the server code to
the `staging` environment. We do this for some reasons:

* We can reuse the same server for multiple purposes, saving costs
* The `main` push ensures the staging environment is updated with the latest stable code
that can be tested for production
* Any engineer can deploy a `stg` tag from her open branch to override the staging environment
and test a specific feature without the need to merge. Example:

```
git tag dev20211209.01
git push origin --tags
```

For a production deploy, it is recommended to pull the latest version of `main` and push
a tag prefixed with `prod`. Example:

```
git tag prod20211209.01
git push origin --tags
```

For hotfixes, we can simply checkout the latest production tag and push a change from there:

```
git checkout tags/<tag_name> -b <branch_name>
# commit changes
git tag prod20211209.01
git push origin --tags
```
