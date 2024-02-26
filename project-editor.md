## PROJECT Editor Markdown / Code with preview

#### Các vấn đề

1. Khi nhập JSX hoặc các cú pháp nâng cao, browser không biên dịch được các đoạn code này. Do đó cần sử dụng Babel để chuyển về Vanilla JS trước khi hiển thị.
2. Các câu lệnh `import` các thư viện `npm` hoặc `css`, browser cũng sẽ không hiểu. Cần xử lý trước khi thực thi trên browser.
3. Code được lưu trữ dưới dạng `String`, làm sao hiển thị trên Browser.

#### Cách xử lý

1. Đối với phần biên dịch code, có các cách xử lý sau:

Cách 1: Kết hợp với BE (đang được codepen.io sử dụng)

- FE lưu code, call API về BE.
- BE sử dụng babel biên dịch code về JS và trả lại cho FE
- FE hiển thị trên browser

Cách 2: Thực hiện transpile ngay trên trình duyệt (babeljs.io đang sử dụng)

2. Vấn đề import các thư viện `js` hoặc `css`.

Sử dụng webpack để chuyển tất cả các module thành 1 file duy nhất và hiển thị lên browser.

Trình tự thực hiện quá trình `bundler`:

- Đọc content của entry file (thường là index.js);
- Tự động tìm tất cả các câu lệnh `import/export/require`;
- Tự động tìm tất cả các module (file) có trong source code
- Gom tất cả content của các module vào 1 file duy nhất, liên các file với đúng các giá trị.

Với vấn đề số 3, chúng ta cần thay đổi một chút ở step tự động tìm các module. Thay vì trong source code sẽ là các package ở trên npm.

Có 3 cách xử lý các package từ npm:

Cách 1: call api về BE, BE tìm package, tải về và lưu ở server, sau đó trả về FE.
Cách 2: call api về BE, BE tìm package, tải về và cache, ko lưu ở server, sau đó trả về FE.
Cách 3: FE tìm package, viết plugin để tải về các file riêng lẻ từ npm.

Ngoài ra, có một vấn đề là `Webpack` không thể hoạt động trên browser, trong khi `babel` thì có thể. Sử dụng `ESBuild` để thay thế cho cả `babel` và `webpack`.

#### Tiến hành Transpile và Bunble trên Browser

###### Thư viện ESBUILD

1. Cài đặt: `npm i esbuild-wasm`.
2. Copy file `esbuild.wasm` từ node-modules vào thư mục public. Mục đích để có thể sử dụng esbuild trên browser.
3. Cấu hình theo file `index.tsx` để có thể transpile được js code (sử dụng method `transform`).

###### Bundle trên Browser

Nếu trong code có từ khoá `import`, `export` hay `require`, mặc định thư viện `esbuild` sẽ tiến hành tìm các module đó trong file system của máy tính.

Tuy nhiên, từ browser chúng ta không thể truy xuất vào các file này. Thay vào đó, chúng ta sẽ request lên `npm registry` để lấy url của các thư viện tương ứng, sau đó gửi các url này cho `esbuild` (thay cho file systems).

Các url trực tiếp đến mã nguồn các thư viện trên `npm` chúng ta không thể sử dụng để tải về vì bị chặn CORS từ `npm`.

###### Website: `https://www.unpkg.com/`

Thay vào đó, để có thể tải các file này chúng ta sử dụng một website thay thế đó là `https://www.unpkg.com/`. Đây là nơi có thể tải tất cả các file của tất cả các thư viện có trên npm.

Viết một `plugin` cho thư viện esbuild để override lại default behavior của nó, khi tìm thấy keyword `import` hoặc `require` thay vì tìm trong file system thì chung ta sẽ cung cấp url cho nó.

Mỗi plugin sẽ return về object gồm `name`: tên và `setup`: function. Function này nhận vào 1 tham số build.

Chúng ta cần thêm 2 method `onResolve` và `onLoad` vào tham số `build` để override lại behavior của thư viện.

- `onResolve`: xác định vị trí của file.
- `onLoad`: tải content file.

Khi gặp từ khoá `import` hoặc `require` cả 2 method trên đều tự động được gọi lại, quá trình này lặp đi lặp lại đến khi hết import.

Tham số `build` có thể config nhiều method `onResolve` cũng như `onLoad`, tham số đầu tiên của 2 method này là một object, object này có nhiệm vụ phân loại các file được apply với method này. Các key thông thường như sau:

- `filter` với value là Regex. Mục đích của filter chính là phân loại các file matching với các Regex để xử lý theo các method `onResolve` hoặc `onLoad` tương ứng.

Ví dụ: import thư viện react sẽ khác với import thư viện css. Import file internal khác với import file external.

- `namespace`: có value là string, method có config thuộc tính `namespace` chỉ được áp dụng với các file được đánh dấu với `namespace` tương ứng.

Trong method `onResolve`, sau khi tìm thấy file nó sẽ return về object để mô tả file này với các thông số như `{ path: "", namespace: ""}`. Thông số `namespace` này sẽ được check lại ở method `onLoad`.

###### Một số vấn đề khi xử lý đường dẫn

1. Xử lý đường dẫn tương đối

Trong các module, chúng ta dễ dàng bắt gặp các đường dẫn tương đối như sau:

```
'./utils'
'../assets/img1.png'
```

Để ESModule có thể xác định chính xác đường dẫn tuyệt đối của các file, ta có thể sử dụng `URL constructor`.

Sử dụng constructor của URL giúp chúng ta tạo ra URL mới dựa vào đường dẫn tương đối và baseURL.

**Link tham khảo: !(https://developer.mozilla.org/en-US/docs/Web/API/URL/URL)**

Một số package demo để có thể check tất cả các loại đường dẫn:

`https://www.unpkg.com/tiny-test-pkg`
`https://www.unpkg.com/medium-test-pkg`

2. File index nằm trong một nested folder

Tham khảo tại package `https://www.unpkg.com/nested-test-pkg`.

Logic để xác định đúng đường dẫn như sau:

- Đối với file chính của package:
  `https://www.unpkg.com/` + `package_name` --> `https://www.unpkg.com/nested-test-pkg`

- Đối với các file còn lại:
  `https://www.unpkg.com/` + `đường dẫn của file vừa được tải về` + `đường dẫn tương đối cho file cần tải` --> `https://www.unpkg.com/nested-test-pkg/src/helpers/utils.js`

Để lấy được đường dẫn chính xác của file vừa tải, trong method onLoad, sử dụng `request` object được trả về sau khi call api. Sau đó return thêm một key `resolveDir`.

Trong method `onResolve` sẽ nhận được thêm key này trong tham số `args`.
