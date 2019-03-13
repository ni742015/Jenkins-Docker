echo "START BUILD SERVER"
echo "SERVER_ENV: $SERVER_ENV, PRO_ENV: $PRO_ENV"

cd server
npm run build

echo "BUILD SERVER SUCCESS"
