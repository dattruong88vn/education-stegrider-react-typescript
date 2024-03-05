# Local API

### Start server

Sử dụng thư viện `express` để start server

### Handle Error

Một số trường hợp, port để start server đã được sử dụng trước đó. Chúng ta cần hiển thị thông báo để user biết và chuyển sang port khác.

Có 2 cách để handle lỗi này:

1. Trong function serve của `local-api`
2. Trong serveCommand của `cli`

Chúng ta sẽ chọn cách số 2, vị hiện tại chúng ta chỉ có một command, về sau có thể có hàng trăm command khác nhau. Do vậy nên mỗi command handle lỗi khi user gõ command đó sẽ là tối ưu hơn là handle ở package `local-api`.

### Accessing to React App

Hiện tại, chúng ta đã hoàn thành các bước sau:

- Start được server: CLI và local-client thông qua câu lệnh `npm start` của lenar.
- Sử dụng command line trong CLI để start được express server trong local-api.
- Truy cập `localhost:3000` thấy được React App.
- Truy cập `localhost:4005`, browser hiển thị trang trắng, chỉ show được một số log trong terminal.

Việc tiếp theo là chúng ta phải lấy được content của React App để hiển thị trên `localhost:4005` của local-api.

Có 2 cách thực hiện:

1. **Sử dụng proxy để lấy được content từ React App Server**

**_Cách này sẽ sử dụng trong quá trình Development_**

Trong `local-api` project, sử dụng thư viện `http-proxy-middleware`. Mục đích là tạo ra một proxy nằm trước `localhost:4005`, nhận các request đến url này và chuyển tiếp đến `localhost:3000`. Lúc này, khi access vào `:4005` chúng ta sẽ thấy được content của `:3000`

```
import {create}

const app = express();

app.use(
    createProxyMiddleware({
        target: "http://localhost:3000",
        ws: true,
        logLevel: "silent",
    })
);
```

Ta có thể sử dụng `http-proxy-middleware` để tạo ra một proxy nằm trước server, proxy này có thể catch 1 hoặc nhiều hoặc tất cả url của request đến server. Nếu matching nó sẽ điều hướng đến url target.

_Dựa theo định nghĩa về mô hình `forward-proxy` có thể mô tả lại như sau:_

- Origin server: localhost:3000
- Proxy server: localhos:4005

Khi browser gửi request lên `:4005`, nó sẽ được forward đến `:3000`, user sẽ không tương tác trực tiếp với origin server mà thông qua proxy server.

2. **Build source React App và hiển thị lên browser từ local-api server**

**_Cách này sẽ sử dụng khi chạy trên máy của User_**

Trong `local-client` (react app), build source code vào trong thư mục build.

Trong `local-api`, để có thể sử dụng tất cả file static bên trong thư mục `local-client/build`, ta sử dụng method built-in của express `express.static`.

```
const app = express();

app.use(express.static("path_to_client_build_foleder"));
```

Lúc này truy cập vào `localhost:4005` sẽ cho kết quả tương tự cách 1 nhưng không cần start server của `local-client`.

Tuy nhiên trong thực tế chúng ta không thể sử dụng folder build của một package khác như trên vì mỗi package được đưa lên NPM registry sẽ nằm ở một path khác nhau. Nên chúng ta phải nâng cấp cách 2 thêm một bước. Đó là install package `local-client` vào trong package `local-api`, sau đó access vào thư mục build của `local-client` bên trong node-modules của `local-api`. Đường dẫn này sẽ luôn ko đổi.

Lưu ý, ở môi trường development, trước khi install package `local-client` thì package này phải được run build để tạo thư mục build. Nếu install trước khi build thì trong node-modules/local-client sẽ không có thư mục build. Ở production thì chắc chắn sẽ có thư mục build.

`express.static` sẽ không work được với đường dẫn tương đối đến node-modules: `../node-modules/...`. Sử dụng `require.resolve` để fix lỗi này.

###### require.resolve

Thông thường trong module chúng ta thường sử dụng `require` để import module.

Bên cạnh đó, `require.resolve` là một method dùng để tìm đường dẫn đến một file chỉ định. Nó nhìn có vẻ giống với `__dirname`, tuy nhiên điểm khác biệt như sau:

- `__dirname`: cho biết đường dẫn tuyệt đối của file hiện tại chúng ta đang thao tác.
- `require.resolve(filename)`: cho biết đường dẫn tuyệt đối của file được pass vào.

Ở đây chúng ta tìm đường dẫn của folder build của `local-client` bên trong node-modules, do `require.resolve` nhận vào tên file nên ta sử dụng file `index.html`, để unique ta thêm 2 cấp folder:

```
// lấy đường dẫn tuyệt đối file index.html
const pathPackage = require.resolve('local-client/build/index.html');

// lấy đường dẫn tuyệt đối đến folder build và truyền vào express.static
app.use(express.static(path.dirname(pathPackage)))
```
