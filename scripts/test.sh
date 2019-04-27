echo "Start Run Test"
pwd

cd ./server
npm run dev
npm run test

cd ..
echo "Test Pass"
