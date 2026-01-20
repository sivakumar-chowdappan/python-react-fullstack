# python-react-fullstack
 

git clone https://github.com/sivakumar-chowdappan/python-react-fullstack.git

# To Run Python Server


cd Server-Python

# "C:/Program Files/Python314/python.exe" -m uvicorn main:app --reload --port 8000

python  -m uvicorn main:app --reload --port 8000

# GET 
curl.exe http://localhost:8000/tasks -H "x-api-key: dev-secret-key"

curl.exe http://localhost:8000/tasks -H "x-api-key: dev-secret-key" | jq

curl.exe http://localhost:8000/tasks/7 -H "x-api-key: dev-secret-key"

curl.exe http://localhost:8000/tasks/7 -H "x-api-key: dev-secret-key" | jq

# Post
$body = @{
  title       = "Mongo DB"
  description = "FastAPI demo"
  completed   = $false
} | ConvertTo-Json

Invoke-RestMethod -Method POST `
  -Uri "http://localhost:8000/tasks" `
  -Headers @{ "x-api-key" = "dev-secret-key" } `
  -ContentType "application/json" `
  -Body $body

# PATCH

PATCH
-------------

$body = @{
  title       = "Migrate Data"
  description = "FastAPI Python"
  completed   = $true
} | ConvertTo-Json

Invoke-RestMethod -Method PATCH `
  -Uri "http://localhost:8000/tasks/7" `
  -Headers @{ "x-api-key" = "dev-secret-key" } `
  -ContentType "application/json" `
  -Body $body
  
# DELETE

curl.exe -X DELETE http://localhost:8000/tasks/7 -H "x-api-key: dev-secret-key"

# To Run UI Node React SSR Client

cd Client-NodeReactSSR

npm install

npm run build

$env:NODE_ENV="production"

node server.js

#  Open Browser http://localhost:5173







