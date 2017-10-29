# SWRPG
The purpose of this project is to provide an online viewer of character sheets for Star Wars RPG sets, including Edge of the Empire and the like.


### Secrets File
The secrets file follows the below format:
```
{
  "port": 8888,
  "db":
  {
    "host": "",
    "schema": "",
    "username": "",
    "password": ""
  }
}
```
There is a `sample_secrets.json` file in the top most directory, you can edit that one as it's already in the correct place directory wise. Just make sure to rename it to `secrets.json`.