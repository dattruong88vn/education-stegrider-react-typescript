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
2. Copy file `esbuild.wasm` từ node-modules vào thư mục public. Mục đích để có thể sử dụng esbuild trên browser (có thể sử dụng file esbuild.wasm từ website unpkg.com: `https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm`.
3. Cấu hình theo file `index.tsx` để có thể transpile được js code.

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

###### Một số vấn đề

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

3. Biến môi trường

Một số package có truy cập đến các biến global như `process.env.NODE_ENV` hay `global`. Khi bundle bằng ESModule, các biến này chưa tồn tại nên sẽ gặp warning cho các trường hợp này.

Để fix các warning, ta sử dụng một tính năng được built-in trong ESModule đó là `define`. Ta thêm một option `define` khi chạy hàm `build`. Option này là một object, key-value của object này đều là string. Key đại diện cho biến global, value là giá trị tương ứng

```
define: {
    "process.env.NODE_ENV": "production",
    global: "window",
},
```

4. Caching

Để tránh lặp đi lặp lại việc gửi request lên `unpkg` để tải các package. Chúng ta tiến hành caching nội dung của các file tải.

Do dung lượng của localStorage có giới hạn nên giải pháp là sử dụng `indexedDB`. Package `localForage` giúp chúng ta làm việc với `indexedDB` thông qua các api `get`, `set` tương đồng với localStorage.

IndexedDB lưu trữ dữ liệu theo từng cặp key-value, để đảm bảo tính unique của các file cần tải:

- key: args.path
- value: object trả về từ method onLoad

Một số api cơ bản của package:

- Tạo instance của indexedDB:

```
const fileCached = localforage.createInstance({
  name: "package",
});
```

- Lấy data từ indexedDB:

```
const dataCached = await fileCached.getItem(args.path);
```

- Ghi data vào indexedDB:

```
fileCached.setItem(args.path, data);
```

###### Bundle CSS file

1. Trong method `onLoad`, sau khi tải được content của file chúng ta sẽ return về một object, trong đó có key `loader`.

Key này sẽ thông báo cho ESbuild biết được content bên trong file đó là Javascript, CSS, JSON.... Do đó, chúng ta có thể dynamic `loader` dựa vào phần mở rộng của file tải về, cụ thể ở đây là `args.path`: đường dẫn file.

```
const loader = args.path.match(/.css$/) ? "css" : "jsx";
...
return {
    loader,
    ...
}
```

2. Khi config loader là css, thư viện ESbuild sẽ tự động tạo ra file `app.css` và import vào file `app.js`. Tuy nhiên, điều đó chỉ có thể thực hiện được ở server. Do vậy, với project bundle ở trên browser, cách này sẽ báo lỗi.

Hiện tại, project thực hiện bundle ở trên browser nên không thể thực hiện theo cách trên. Do đó, chúng ta cần custom lại một chút để có thể import được file css.

Ý tưởng là sau khi tải được data (với content là css) từ api, chúng ta sẽ bọc toàn bộ file css vào trong một thẻ script. Thẻ này được đính vào file JS. Cuối cùng chúng ta chỉ cần bundle các file js là đạt được mục tiêu.

```
const escaped = data
    .replace(/\n/g, "")
    .replace(/"/g, '\\"')
    .replace(/'/g, "\\'");

const contents = `
    const style = document.createElement('style');
    style.innerText = '${escaped}';
    document.head.appendChild(style);
`;

return {
    contents,
    ...
}
```

###### Lưu ý thêm về onLoad function

`onLoad` function có thể trả về một giá trị null, điều này được esbuild chấp nhận và không báo lỗi.

Khi đó, esbuild sẽ tự động thực hiện các `onLoad` function khác đến khi nào nhận được một object với thông tin `loader`, `contents` hay `resolveDir`.

Tận dụng tính năng này, chúng ta tách phần caching vào 1 function onLoad riêng

```
build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
    const cached = await fileCached.getItem<esbuild.OnLoadResult>(
        args.path
    );

    return cached;
});
```
