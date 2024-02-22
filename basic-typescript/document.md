# REACT and TYPESCRIPT

#### Props

Để khai báo kiểu dữ liệu `Props` của một component, ta có thể sử dụng cách đơn giản như sau:

```
interface ChildProps = {
    color: string;
}

export const Child = ({ color }: ChildProps) => {...}
```

- Cách này hoàn toàn đúng và hợp lệ khi khai báo kiểu dũ liệu cho `Props` của Component.
- Tuy nhiên, typescript chỉ biết `Child` là một function nhận vào 1 tham số là object có chưa key color, nó không hiểu được `Child` là một `component`, `Child` có thể có các thuộc tính khác như `propTypes`, `displayName`, `contextTypes`.

Do vậy, có thể khai báo type cho component theo cách thứ 2 sử dụng `React.FC<>` hoặc `React.FunctionComponent<>` như sau:

```
interface ChildProps = {
    color: string;
}

export const ChildAsComponent: React.FC<ChildProps> = ({ color }) => {...}
```

- Lúc này, nếu ta access đến các thuộc tính mặc định của `React Component` sẽ ko bị báo lỗi:

```
console.log(Child.displayName); // error
console.log(ChildAsFC.displayName);
```

- Đối với React có version < 18, sử dụng cách thứ hai còn giúp chúng ta không phải khai báo prop `children`.

```
interface ChildProps = {
    color: string;
    children: React.ReactNode; // version 18 require với React.FC<>
}
```
