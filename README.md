<!-- 服务端重写nginx 404 -->

 location / {
      try_files $uri $uri.html $uri/ /index.html;
    }