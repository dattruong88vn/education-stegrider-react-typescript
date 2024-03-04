# CLI Project

### Mục tiêu

1. User mở terminal và gõ vào command line: `jbook serve` sẽ run project local-api.
2. Command line sẽ có các optional để config.
   - Tên file để thao tác
   - Port để run server
   - ...

### Ý tưởng

Để có thể xem được các tham số trong một commanline chúng ta có thể test thông qua global variable của node. Đó là `process.argv`.

Ví dụ:

File test.js:

```
console.log(process.argv);
```

Chúng ta chạy command line:`node test.js mynotes.js --port 3050`. Kết quả trên màn hình ta nhận được tất cả các thông tin của command line vừa thực thi (bao gồm đường dẫn, tham số ...):

```
[
    '/usr/local/bin/node',
    '/Users/mjr/work/node/test.js',
    'mynode.js',
    '--port',
    '3050'
]
```

Thư viện `commander` giúp chúng ta quản lý các command line này.

### Commander Package

###### Khai báo 1 command line

1. Import Class Command

```
import { Command } from "commander";
```

2. Tạo command

Tạo 1 instance của Command kèm theo các thông tin của command đó

Ví dụ:

```
const serveCommand = new Command()
    // lệnh command là serve, đi kèm có một tên file để thực thi
    .command("serve [filename]")

    // description của command, hiển thị khi gõ --help
    .description("Open a file for editing")

    // option được thêm vào command: ở đây là -p, --port đi kèm theo là số port, tham số cuối là port mặc định
    .option("-p, --port <number>", "port to run server on", "4005")

    // callback function được thưc thi, 2 tham số lần lượt là filename được khai báo ở method command, option được khai báo ở method option
    .action((filename = "notebook.js", option) => {
        console.log({ filename, option });
    });
```

Khi tạo một command như trên, thư viện `commander` tự handle các option được truyền vào command, bao gồm thứ tự bất kỳ giữa filename và option. Nếu thông tin nào không có sẽ lấy mặc định: filename = notebook.js, port = 4005.

- serve
- serve jbook.js
- serve jbook.js --port 4000
- serve jbook.js -p 4000
- serve --port 4000 jbook.js
- serve -p 4000 jbook.js
- serve --port:4000 jbook.js
- serve -p:4000 jbook.js

###### Register Command với Node

1. Import object program: `import { program } from "commander";`

2. Thêm command vào program: `program.addCommand(serveCommand);`

3. Lắng nghe command trong terminal: `program.parse(process.argv);`
