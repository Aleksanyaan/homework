import process from 'process';
import os from 'os';
import fs from 'node:fs';
import path from 'path';

const currentDir = process.cwd();

process.stdin.setEncoding('utf8');
process.stdout.write(`Welcome ${os.userInfo().username} \n`);

process.stdin.on('data',(data) => {
    const input = data.trim();
    

    const parts = input.split(' ');
    const firstOp = parts[1];
    const secondOp = parts[2];
    
    switch (input) {
        case '.exit':
            process.stdout.write(`Thank you ${os.userInfo().username}, goodbye!`);
            process.exit();
        case 'os --cpus':
            console.log(os.cpus());
            process.stdin.read();
            break;
        case 'os --homedir':
            console.log(os.homedir());
            process.stdin.read();
            break;
        case 'os --username':
            console.log(os.userInfo().username);
            process.stdin.read();
            break;
        case 'os --architecture':
            console.log(os.arch());
            process.stdin.read();
            break;
        case 'os --hostname':
            console.log(os.hostname());
            process.stdin.read();
            break;
        case 'os --platform':
            console.log(os.platform());
            process.stdin.read();
            break;
        case 'os --memory':
            console.log(os.totalmem());
            process.stdin.read();
            break;
        default:
            process.stdout.write('Invalid input \n');
            process.stdin.read();
            break;
    }

    if(input === 'ls') {
        fs.readdir(currentDir, { withFileTypes: true }, (err, files) => {
            if (err) {
                console.error("Error occurred while reading directory:", err);
            }
            const folders = [];
            const filesList = [];

            files.forEach((file) => {
                if (file.isDirectory()) {
                    folders.push(file.name);
                } else {
                    filesList.push(file.name);
                }
            });

            let index = 0;
            folders.sort();
            filesList.sort();

            folders.forEach((folder, i) => {
                console.log(`${i}   |    ${folder}   |    'dicrectory'`);
                index = i;
            });

            filesList.forEach((file) => {
                const extension = path.extname(file);
                console.log(`${++index}  |   ${file} (${extension})   |    'file'`);
            });
        });
    } else if (input.startsWith('add') && firstOp.length > 0) {
        fs.writeFile(firstOp, '', (err) => {
            if (err) throw err;
            console.log('File is created successfully.');
        });
    } else if (input.startsWith('rn') && firstOp.length > 0 && secondOp.length > 0) {
        fs.rename(firstOp, secondOp, function(err) {
            if (err) throw err;
            console.log('File Renamed.');
        });
    } else if (input.startsWith('cp') && firstOp.length > 0 && secondOp.length > 0) {
        const destinationPath = `${secondOp}/${firstOp}`;

        fs.copyFile(firstOp, destinationPath, (err) => {
            if (err) throw err;
            console.log(`${firstOp} was copied to ${destinationPath}`);
        });
    } else if (input.startsWith('mv') && firstOp.length > 0 && secondOp.length > 0) {
        const currentPath = path.join(currentDir, firstOp);
        const newPath = path.join(currentDir, secondOp, firstOp);

        fs.rename(currentPath, newPath, (err) => {
            if (err) {
                console.error("Error occurred while moving the file:", err);
            } else {
                console.log("Successfully moved the file!");
            }
        });
    } else if(input.startsWith('rm') && firstOp.length > 0) {
        fs.unlink(firstOp, (err) => {
            if (err) {
              console.error("Error occurred while deleting the file:", err);
            } else {
              console.log("File deleted successfully");
            }
        });
    } else {
        console.log('Invalid input');
    }      
});