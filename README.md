# MEAN stack App  
web app created using MEAN stack softwaer bundle for learing how to work JavaScript

Steps that were followed can be found here:  
 [Youtube Link](https://www.youtube.com/watch?v=Lzi2xYQdwWc)  
 [GitHub Link](https://github.com/hwz/chirp)
  
Don't feel like folllowing along with the 4 and a half hour vid? Follow the below steps to quickly set it up.  
  
### Table of Contents  
 - [Steps used to set up nginx web server on AWS](#basic-instructions-that-were-used-for-site-creation)  
    - [Nginx Config File](#basic-instructions-for-site-set-up)  
 - [Setup the App](#miscellaniousextra-references)  
  
## Steps used to set up nginx web server on AWS  
```
sudo apt-get update  
sudo apt-get install nginx  
sudo systemctl status|start|stop|restart nginx
sudo vim /etc/nginx/sites-available/default
```  
  
### Nginx Config File  
```shell
server {
	listen 80 default_server;
	listen [::]:80 default_server ipv6only=on;

	root path/to/index/file/in/repo
	index index.html index.htm;

	# Make site accessible from http://localhost/
	server_name localhost;

	location / {
		# First attempt to serve request as file, then
		# as directory, then fall back to displaying a 404.
		try_files $uri $uri/ =404;
		# Uncomment to enable naxsi on this location
		# include /etc/nginx/naxsi.rules
	}

	location /api {
	
		proxy_pass http://127.0.0.1:3000;

	}

	location /auth {

		proxy_pass http://127.0.0.1:3000;
	}
	# Only for nginx-naxsi used with nginx-naxsi-ui : process denied requests
	#location /RequestDenied {
	#	proxy_pass http://127.0.0.1:8080;    
	#}

	#error_page 404 /404.html;

	# redirect server error pages to the static page /50x.html
	#
	#error_page 500 502 503 504 /50x.html;
	#location = /50x.html {
	#	root /usr/share/nginx/html;
	#}

	# pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
	#
	#location ~ \.php$ {
	#	fastcgi_split_path_info ^(.+\.php)(/.+)$;
	#	# NOTE: You should have "cgi.fix_pathinfo = 0;" in php.ini
	#
	#	# With php5-cgi alone:
	#	fastcgi_pass 127.0.0.1:9000;
	#	# With php5-fpm:
	#	fastcgi_pass unix:/var/run/php5-fpm.sock;
	#	fastcgi_index index.php;
	#	include fastcgi_params;
	#}

	# deny access to .htaccess files, if Apache's document root
	# concurs with nginx's one
	#
	#location ~ /\.ht {
	#	deny all;
	#}
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

touch mongo_log
mongod  --logpath /path/to/mongo_log
npm start &
```