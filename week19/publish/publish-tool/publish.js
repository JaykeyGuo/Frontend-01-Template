const http = require('http');
// const querystring = require('querystring');
const fs = require('fs');

const archiver = require('archiver');

// const postData = querystring.stringify({
//   'content': 'Hello World!! 2333'
// })

let packageName = './package';

// fs.stat(filename, (error, stat) => {
  const options = {
    host: 'localhost',
    port: 8081,
    path: '/?filename=package.zip',
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream ',
      // 'Content-Length': stat.size,
    }
  };

  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });


  const archive = archiver('zip', {
    zlib: { level: 9 },
  });

  archive.directory(packageName, false);
  archive.finalize();

  // archive.pipe(fs.createWriteStream('./package.zip'));
  archive.pipe(req);

  archive.on('end', () => {
    console.log('end');
  })

  // let readStream = fs.createReadStream('./image.png');
  // readStream.pipe(req);

  // readStream.on('end', () => {
  //   req.end();
  // });
  // req.write(postData);
// });


