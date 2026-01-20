# python-react-fullstack
 

git clone https://github.com/sivakumar-chowdappan/python-react-fullstack.git

# To Run Python Server


cd Server-Python

# "C:/Program Files/Python314/python.exe" -m uvicorn main:app --reload --port 8000

python  -m uvicorn main:app --reload --port 8000

curl.exe http://localhost:8000/tasks -H "x-api-key: dev-secret-key"

curl.exe http://localhost:8000/tasks -H "x-api-key: dev-secret-key" | jq

curl.exe http://localhost:8000/tasks/7 -H "x-api-key: dev-secret-key"

curl.exe http://localhost:8000/tasks/7 -H "x-api-key: dev-secret-key" | jq


# To Run Node React SSR Client

cd Client-NodeReactSSR

npm install

npm run build

$env:NODE_ENV="production"

node server.js


#  Open Browser http://localhost:5173






