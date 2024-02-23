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

#### Thư viện ESBuild

1. Cài đặt: `npm i esbuild-wasm`.
2. Copy file `esbuild.wasm` từ node-modules vào thư mục public. Mục đích để có thể sử dụng esbuild trên browser.
