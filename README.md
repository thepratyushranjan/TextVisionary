# TextVisionary
TextVisionary is an AI-powered text-to-image generator that transforms textual descriptions into detailed images. Ideal for creative professionals and enthusiasts, TextVisionary uses advanced machine learning models to visualize any concept you can imagine.

# README #

__Backend commands__ 
==== 

### __1. Virtual environment__ 
```bash 
pip install virtualenv # install virtualenv 

virtualenv venv 

# windows 
`source venv/Scripts/activate` # activate virtual env 

# lniux 
source venv/bin/activate # activate virtual env 

pip install -r requirements.txt   #install all dependencies (listed in Pipfile) in virtual env 


python manage.py runserver  # to run command direct from virtual env 
``` 

### __2. Start Django server__ 
```bash 
migrate 
python manage.py runserver 
``` 

### __3. Migrations__ 
```bash 
source venv/bin/activate  
python manage.py makemigrations 
python mange.py migrate 
``` 

### __4. Start Redis Celery Server__ 
```bash 
source venv/bin/activate
celery -A gameai  worker --loglevel=info

``` 

__Frontend commands__ 
====== 

### __1. React__ 
```bash 
cd frontend
yarn # install dependencies 

# start rect server 
yarn start # run react on seperate dev server (on port 3000, default only) | (for development only) 

yarn build # craete build on watch (for production and development both) 

yarn preview # serve build (on port 3000, default ) | (for production onlly) 
