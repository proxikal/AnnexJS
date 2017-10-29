## Lennox v0.1
> Built with **AnnexJS Vanilla r29**  
  
### Features available
> 1. Give\Take role feature:  
Manage someones roles, or your own through this bot!  
> 2. Weather API:  
Check out the weather using your zip code or City, State. (Requires a Weather Underground API Key)
> 3. Tenor GIF API:  
Search for funny GIF animations through Tenor.  
> 4. Manage Status Commands:  
Add\Remove the bots status messages with commands!  
> 5. Blacklist system:  
Add users to a blacklis to prevent them from using the bot.  
> 6. Autonomous system:  
Play around with a system similar to Echos ARS.
  
### Script Configuration
You will need to change the role for Bot Masters.  
This can be located in **messageCreate.js** *Line: 12* Replace `Management` with your role name.  
Weather Command: Go to **framework.js** *Line: 31* And place your Weather Underground API Key.  
Don't allow commands through PM: Go to **framework.js** *Line: 8* Change value to `false`  
  
## Embed Builder
This code is prebuilt into the bot that will allow people to build embeds through the bot.  
Let's look at an example of what can be done below:
```
-emb 
-t(This is the top!),
-c(#00FF00),
-d(For all the kings men!),
-f(Testing Plot|[Plot #1](https://google.com/) |true),
-f(Testing Plot|[Plot #2](https://google.com/) |true),
-f(Testing Plot|[Plot #3](https://google.com/) |true),
-ft(Testing some stuff out!),
-tn(https://i0.wp.com/iconshots.com/wp-content/uploads/2010/01/homefinal.jpg),
-td(250x250),
```
will produce something like this  
![Embed Builder](https://raw.githubusercontent.com/proxikal/AnnexJS/master/examples/lennox/lennox-example.png)
