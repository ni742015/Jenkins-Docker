echo "Start Install Dependence"
pwd

npm config set registry https://registry.npm.taobao.org

echo "Install Server"
cd ./server
npm install

cd ..
echo "Success Install Dependence"
