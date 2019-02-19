# MEAN stack App  
web app created using MEAN stack softwaer bundle for learing how to work JavaScript

Steps that were followed can be found here:  
 [Youtube Link](https://www.youtube.com/watch?v=Lzi2xYQdwWc)  
 [GitHub Link](https://github.com/hwz/chirp)
  
Don't feel like folllowing along with the 4 and a half hour vid? Follow the below steps to quickly set it up.  
  
### Table of Contents  
 - [Steps used to set up nginx web server on AWS](#steps-used-to-set-up-nginx-web-server-on-aws)  
    - [Nginx Config File](#nginx-config-file)  
 - [Setup the App](#setup-the-app)  
  
## Steps used to set up nginx web server on AWS  
```
sudo apt-get update  
sudo apt-get install nginx  
sudo systemctl status|start|stop|restart nginx
sudo vim /etc/nginx/sites-available/default
sudo ln -s /etc/nginx/sites-available/chirp /etc/nginx/sites-enabled/.
```  
  
### Nginx Config File  
(`/etc/nginx/sites-available/chirp`)
```shell
server {
        listen 80;
        listen [::]:80;

        root /home/jace/MeanStack-App/public;

        # Add index.php to the list if you are using PHP
        index index.html index.htm index.nginx-debian.html;

        server_name chirp.jacemanshadi.ca;

        location / {
        		try_files $uri $uri/ =404;
        }

        location /api {
                proxy_pass http://127.0.0.1:3000;
        }

        location /auth {
                proxy_pass http://127.0.0.1:3000;
        }
}
```

(`etc/nginx/sites-available/default`)
```
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        root /home/jace/onlineResume;

        # Add index.php to the list if you are using PHP
        index index.html index.htm index.nginx-debian.html;

        server_name _;

        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                try_files $uri $uri/ =404;
        }
}
```
  
## Setup the App  
```shell
sudo apt-get install -y nodejs
sudo apt-get install -y npm
sudo npm install express-generator -g
npm install
npm install passport --save
npm install passport-local --save
npm install bcrypt-nodejs --save
npm install express-session --save
npm install mongoose --save
sudo apt-get install -y mongodb-server-core mongodb-clients
sudo mkdir -p /data/db
sudo chown -R <username>:<main_group> /data/db

sudo apt-get install -y mongodb
sudo systemctl restart mongodb
touch mongo_log
mongod  --logpath /path/to/mongo_log
npm start &
```