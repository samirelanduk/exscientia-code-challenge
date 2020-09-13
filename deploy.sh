host="exscientia-code-task.samireland.com"

# Build app
npm run build

# Make temp directory on the server
ssh $host "mkdir ~/$host-temp"

# Upload app
scp -r build/* $host:~/$host-temp/

# Empty app directory
ssh $host "rm -r ~/$host/* >& /dev/null"

# Copy app over
ssh $host "cp -r ~/$host-temp/* $host/"

# Remove temp folder
ssh $host "rm -r ~/$host-temp"