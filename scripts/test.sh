echo "Start Run Test"
pwd

cd ./server
nohup npm run dev &
sleep 5s
npm run test

cd ..
echo "Test Pass"
