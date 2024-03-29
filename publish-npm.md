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
"prepublishOnly": "npm run build"
```

7. **Commit lên git (optional)**

8. **Chạy `npm publish`**

### Tạo organization trên NPM

###### Đặt vấn đề

Chúng ta đang tạo 3 package khác nhau, mỗi package có sử dụng các package khác làm dependencies. Do vậy, khi đưa lên NPM registry, tốt nhất là tổ chức các package lại như sau:

- `cli`: `package_name_unique`
- 'local-api': `@package_name_unique/local-api`
- 'local-client': `@package_name_unique/local-client`

###### Thực hiện

Tên được chọn tại thời điểm này cho các package lần lượt là: `edu-jsnote`, `@edu-jsnote/local-api` và `@edu-jsnote/local-client`.

Sau khi đổi tên, chúng ta cần phải update tên mới này trong các file package.json của các project cũng như các module có import đến các package này.

Sau đó, sử dụng câu lệnh `lerna bootstrap` để install lại các package với tên mới tương ứng.

**_Start lại server để test lại_**
