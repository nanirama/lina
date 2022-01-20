#### API Endpoints

- Prod: https://api.hellolina.com/
- Staging: https://staging-api.hellolina.com/
- Dev: Use ngrok locally


#### Testing procedure

Have Postgres instance running with user `postgres:postgres`

```
yarn test:setup
yarn test
```