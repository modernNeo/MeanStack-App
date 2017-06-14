# MEAN stack App  
web app created using MEAN stack softwaer bundle for learing how to work JavaScript

Steps that were followed can be found here:  
 [Youtube Link](https://www.youtube.com/watch?v=Lzi2xYQdwWc)  
 [GitHub Link](https://github.com/hwz/chirp)

## Steps used to set up nginx web server on AWS
```
sudo apt-get update  
sudo apt-get install nginx  
ufw app list
ufw allow "Nginx HTTP'
ufw status  
service nginx status  
ufw allow proto tcp from 154.5.57.1 to 172.31.5.6 port 22  
 first ip is your own IP which you can get here -> https://www.iplocation.net/find-ip-address  
 second IP is the private ip of the machine that is hosting the app  
ufw enable  
fuser -k 80/tcp
```
  
##To locate the root index being used for nginx
run  
```
sudo find / -name sites-available*
```
if you change the root index being used, you will need to restart nginx
