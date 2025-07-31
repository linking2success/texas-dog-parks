#!/bin/bash
# Update ads.txt daily from AdstxtManager
curl -L https://srv.adstxtmanager.com/19390/dog-park.info > /var/www/html/ads.txt
