# aspnetcore-angular7-angularuniversal

I have tried to use the latest asp.net core template for angular 7 but the SSR doesn't work due to the following compilation error.
```
ERROR in ./node_modules/aspnet-prerendering/Prerendering.js
Module not found : error : Can't resolve 'domain' in '/My_Project_Path/ClientApp/node_modules/aspnet-prerendering' [/My_Project_Path/My_Project.csproj]
  ERROR in ./node_modules/domain-context/lib/index.js
Module not found : error : Can't resolve 'domain' in '/My_Project_Path/ClientApp/node_modules/domain-context/lib' [/My_Project_Path/My_Project.csproj]
  ERROR in ./node_modules/domain-task/main.js
Module not found : error : Can't resolve 'domain' in '/My_Project_Path/ClientApp/node_modules/domain-task' [/My_Project_Path/My_Project.csproj]
```

The following issues could help:
https://github.com/aspnet/AspNetCore/issues/5184
https://github.com/MarkPieszak/aspnetcore-angular-universal/issues/609
