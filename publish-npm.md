# Publish to NPM

### Các bước thực hiện

1. **Đặt tên unique cho project**

Trong file `package.json`, điều chỉnh value của key `name`.

2. **Xác định các file publish lên npm**

Trong file `package.json`, điều chỉnh value của key `files` là một array chứa tên file hoặc tên thư mục.

Ví dụ, tất cả các file trong thư mục dist: `'files': ['dist']`

3. **Phân chia các package cần dùng vào `dependencies` và `devDependencies`**

4. **Config public hoặc private cho package**

Trong file `package.json`, điều chỉnh value của `publishConfig`:

```
'publishConfig': {
    'access': 'public'
}
```

5. **Nếu là CLI package: config file để chạy CLI**

- Chỉ định file cần chạy CLI: trong `package.json`, thêm key `bin` với value là đường dẫn file

```
'bin': '/dist/index.js'
```

- Trong file được thêm vào ở trên, thêm đoạn code sau ở line 1 để thực thi: `#!/usr/bin/env node`

6. **Thêm prePublish script**

```
"prePublishOnly": "npm run build"
```

7. **Commit lên git (optional)**

8. **Chạy `npm publish`**
