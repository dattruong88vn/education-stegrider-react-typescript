# Local API

### Start server

Sử dụng thư viện `express` để start server

### Handle Error

Một số trường hợp, port để start server đã được sử dụng trước đó. Chúng ta cần hiển thị thông báo để user biết và chuyển sang port khác.

Có 2 cách để handle lỗi này:

1. Trong function serve của `local-api`
2. Trong serveCommand của `cli`

Chúng ta sẽ chọn cách số 2, vị hiện tại chúng ta chỉ có một command, về sau có thể có hàng trăm command khác nhau. Do vậy nên mỗi command handle lỗi khi user gõ command đó sẽ là tối ưu hơn là handle ở package `local-api`.
