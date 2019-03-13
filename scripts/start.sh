echo "start servers"
echo "SERVER_ENV: $SERVER_ENV, PRO_ENV: $PRO_ENV"

pm2-runtime start processes.json
