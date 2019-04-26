echo "start servers"
echo "SERVER_ENV: $SERVER_ENV, PRO_ENV: $PRO_ENV"
# 注意使用 runtime
pm2-runtime start processes.json 
