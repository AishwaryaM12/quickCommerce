import cube from '@cubejs-client/core';

const CUBEJS_API_URL = 'https://amaranth-muskox.aws-us-east-1.cubecloudapp.dev/dev-mode/feat/frontend-hiring-task/cubejs-api/v1';
const CUBEJS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJicmFuZElkIjoiNDkiLCJleHAiOjE3NDM0OTYyMTIsImlzcyI6ImN1YmVjbG91ZCJ9.luqfkt0CQW_B01j5oAvl_8hicbFzPmyLXfvEZYJbej4'; // Replace with actual token

const cubeApi = cube(CUBEJS_TOKEN, { apiUrl: CUBEJS_API_URL });

export default cubeApi;
