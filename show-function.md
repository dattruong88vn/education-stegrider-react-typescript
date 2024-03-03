# Show function

## Mục đích

Tạo ra global function trong editor có chức năng hiển thị ra UI tất cả các content được truyền vào function này như một tham số.

Các giá trị truyền vào có thể là `number`, `string`, `boolean`, `array`, `object` và cả `JSX`.

## Phân tích

Đối với các kiểu dữ liệu mặc định của JS ta có thể chia thành 2 loại:

- Primitive: hiển thị trực tiếp dữ liệu lên UI
- Reference: sử dụng `JSON.stringify` để chuyển về string.

Riêng đối với JSX, chúng ta cần sử dụng `React` và `ReactDOM` để có thể render JSX lên UI.

- Nếu thêm một đoạn code mặc định import 2 thư viện trên vào trong code editor thì show function của chúng ta có thể hoạt động đúng với mong muốn:

Show Function:

````
import ReactDat from 'react';
import ReactDOMDat from 'react-dom';

    const root = document.getElementById('root');

    const show = (value) => {
    if (typeof value === 'object') {
        if (value.$$typeof && value.props) {
        ReactDOMDat.render(value, root)
        } else {
        root.innerHTML = JSON.stringify(value);
        }

    } else {
        root.innerHTML = value;
    }
    }
```

Editor:

````

show(<div>Hi</div>);

```

- Tuy nhiên, khi user nhập vào 2 câu lệnh import React và ReactDOM vào editor thì sẽ bị lỗi conflict (vì 2 thư viện này đã được khai báo trong code mặc định).

Editor:

```

import ReactDat from 'react';
import ReactDOMDat from 'react-dom';

show(<div>Hi</div>);

```

--> lỗi vì bị conflick thư viện

Để xử lý vấn đề này, thay vì import 2 thư viện và gán vào 2 biến `React` và `ReactDOM`, chúng ta thay thế bằng `_React` và `_ReactDOM`.

Đối với `_ReactDOM` chúng ta dễ dàng update vào câu lệnh `_ReactDOM.render()` ngay trong đoạn code mặc định.

Nhưng với `_React` thì nó được thư viện ESBuild tự động gọi đến thông qua câu lệnh `_React.createElement()`. Vì vậy, chúng ta phải thông báo với ESBuild thay vì dùng `React` sẽ chuyển sang `_React` khi chạy function `build`.

Thêm config sau vào option object khi chạy function `build` :

```

    jsxFactory: "_React.createElement",
    jsxFragment: "_React.Fragment",

```

Tham khảo: `https://esbuild.github.io/content-types/#using-jsx-without-react`.
```

## Một số vấn đề

1. Show function được call ở tất cả các cell

Logic hiện tại của chúng ta là cho tất cả các editor code phía sau đều có thể truy xuất đến các biến và function được khai báo trước đó.

Để làm điều này, hiện tại đối với mỗi `cell` chúng ta đang concat tất cả các code ở tất cả các cell trước đó. Khi chúng ta hiển thị một JSX Element tại một cell, thì những cell phía sau đều sẽ có đoạn code hiển thị này và đều có JSX Element đó trên Preview.

Để xử lý, chúng ta phải xử lý logic làm sao để mỗi editor của mỗi cell chỉ thực hiện những function được call bên trong nó.

Vấn đề này xảy ra với function show cũng như sử dụng ReactDOM để render bên trong editor.

- Đối với function show:

- Chúng ta define thêm một function show với empty content, khi concat những đoạn code của các cell trước đó thì thêm function empty này.
- Khi concat đoạn code của cell hiện tại --> sử dụng function show ở trên
- Lưu ý sử dụng từ khoá `var` để khai báo function show, vì chúng ta khai báo nhiều lần ở nhiều code cell khác nhau.

- Đối với trường hợp content của code editor có render JSX: cũng được resolve với cách trên, bởi vì khi user nhập câu lệnh `import React from 'react'` thì ESBuild cũng ko sử dụng biến React để tạo element. Mọi hành động hiển thị JSX đều phải đợi biến `_React` bên trong show function thì mới có thể hiển thị được.
