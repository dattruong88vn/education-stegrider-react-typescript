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

- Sử dụng webpack để chuyển tất cả các module thành 1 file duy nhất và hiển thị lên browser.
