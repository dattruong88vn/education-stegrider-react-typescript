# Section 21 - The Path Lerna

### Mục tiêu

1. Đóng gói project thành package, khi user khác sử dụng chỉ cần gõ câu lệnh `npx jbook serve` là có thể start ở local.

2. Content của tất cả các cell (bao gồm cả code và text) sẽ tự động được ghi vào file `notebook.js` (thay cho DB), sau đó get content của file này và hiển thị trên UI. Cả 2 thao tác này đều sử dụng Express API của node server.

### Các chức năng cụ thể

1. _CLI_

- chức năng start Local API
- chức năng publish file notebook lên một public API

2. _Local Express API_

- Serve local react app
- Save/Load thông tin cells từ 1 file

3. _Public Express API_

- Serve local react app
- Save/Load thông tin cells từ DB
- Handle thêm permission, auth

4. _React App_

- Chứa các file tĩnh để có thể tương tác từ local API và public API

**Chúng ta sẽ develop và deploy 4 package tương ứng với 4 chức năng cụ thể ở trên**

Khi tách thành nhiều package chúng ta sẽ có nhiều ưu điể như sau:

- Package `CLI` cần sử dụng package `local-api`, nên sẽ xem nó như một dependency và có thể chỉ định được version. Tương tự, package `local-api` và `public-api` đều sử dụng `react-app`, tuy nhiên ở 2 môi trường local và public có thể sử dụng 2 version khác nhau của `react-app`. Nó hoạt động hoàn toàn tương tự với các package chúng ta sử dụng hiện nay.
- Các package tách biệt sẽ dễ dàng refactor, maintain và extend trong tương lai.

### Thư viện Lerna

###### Đặt vấn đề

Chúng ta develop 2 package: `message` và `printer`. Package `message` export một string và `printer` sẽ hiển thị nó.

Để có thể connect 2 package, thông thường chúng ta sẽ phải

- public package message lên `npm registry`
- trong package printer, chạy câu lệnh npm install message để tải package đó về (giả sử message đang có version 1.0.0)
- import message trong module và hiển thị

Vấn đề xảy ra khi chúng ta muốn thay đổi string được export từ package message. Các bước phải thực hiện như sau:

- update package message lên version 2.0.0
- trong package printer, phải chạy câu lệnh update (message update lên version 2.0.0).

Mỗi lần có update từ package `message` chúng ta đều phải thực hiện các bước này, đây là điều không mong muốn. Do vậy, package `lerna` giúp ta khắc phục vấn đề này.

`Lerna` sẽ giúp quá trình development `printer` có thể trỏ thẳng đến package `message` ở local, lúc này chỉ cần update string ở message local thì ngay lập tức cập nhật trên printer local.

###### Giới thiệu

`Lerna` là một tool để quản lý nhiều package cùng lúc.

Một số thư viện tương tự như Lerna: `Yarn workspaces`, `NPM workspaces`, `Bolt` hay `Luigi`.

Các folder name của project bao gồm:

- local-client: react app
- cli
- local-api

Khi sử dụng thư viện Lerna, chúng ta không phải install các package bằng câu lệnh npm. Thay vào đó, chúng ta sử dụng câu lệnh `lurna add <package-name>`.

### Build Package CLI

Cài đặt thư viện `commander` để build CLI project: `lerna add commander --scope=cli`. Option `--scope=` chỉ định cho Lerna biết cài đặt package vào project nào, nếu ko có sẽ cài vào tất cả project bên trong lerna.

Để có thể run tất cả các project cùng lúc bên trong thư mục Lerna, thực hiện như sau:

- Trong thư mục root, file package.json của `lenar` thêm vào script: `  "start": "lerna run start --parallel"`.
- Script này sẽ thực thi script `npm start` của tất cả các project bên trong nó.
