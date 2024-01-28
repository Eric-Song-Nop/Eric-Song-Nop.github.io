tags:: #AWS #DevOps

- ## Connect with SSH
	- Don't forget to launch instance with a ssh keypair!!!
	- `chmod 400 pem`
	- Create ssh config file as `$HOME/.ssh/config`
		- ```bash
		  Host AnyAliasForServer
		  	HostName serverIP
		      IdentityFile pathToPem
		      User ubuntu
		  ```
	- ### For smart Kitty users
		- Connect with `kitten ssh $Host` for best experience