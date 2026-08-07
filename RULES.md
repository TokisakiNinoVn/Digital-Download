# 📜 RULES.md

> Coding & Git Convention cho team

---

# 1. Mục tiêu

- Code dễ đọc.
- Git history rõ ràng.
- Dễ review.
- Dễ maintain.

Không cần quá cứng nhắc, ưu tiên tốc độ phát triển.

---

# 2. Coding Rules

## Naming

### Variable / Function

```ts
const productName = "";
const getProduct = () => {};
```

### Component

```tsx
ProductCard.tsx;
OrderTable.tsx;
```

### Hook

```ts
useAuth.ts;
useProduct.ts;
```

### Constant

```ts
const API_URL = "";
const DEFAULT_LIMIT = 10;
```

---

# 3. File Structure

```
src/
    components/
    pages/
    hooks/
    services/
    utils/
    types/
```

Một file chỉ nên làm một nhiệm vụ.

---

# 4. Code Style

- Sử dụng ESLint
- Sử dụng Prettier
- Không để code bị lỗi lint trước khi commit.
- Không comment code cũ.

❌

```ts
// old code
// getData();
```

✅

```ts
const products = await getProducts();
```

---

# 5. Git Branch

```
main
develop

feature/...
fix/...
refactor/...
```

Ví dụ

```
feature/login

feature/upload-file

fix/webhook

refactor/auth-service
```

---

# 6. Commit Convention

## feat

Thêm tính năng mới.

```
feat: add upload file feature
```

---

## fix

Sửa bug.

```
fix: resolve login issue
```

---

## refactor

Chỉ sửa cấu trúc code.

Không thêm tính năng.

```
refactor: split auth service
```

---

## style

Chỉ format.

Không thay đổi logic.

```
style: format product page
```

---

## docs

Tài liệu.

```
docs: update README
```

---

## test

Test.

```
test: add auth service tests
```

---

## chore

Các việc linh tinh.

```
chore: update dependencies

chore: add eslint

chore: configure prettier
```

---

# 7. Pull Request

PR nên:

- Có tiêu đề rõ ràng.
- Mô tả ngắn thay đổi.
- Có ảnh nếu thay đổi UI.

Ví dụ

```
Title

feat: add digital download page

Description

- Add upload page
- Add validation
- Update API
```

---

# 8. Before Push

Đảm bảo:

- Build thành công
- Không lỗi lint
- Đã test chức năng chính

---

# 9. Review

Ưu tiên review:

- Logic
- Readability
- Performance
- Security

Không soi những thứ nhỏ như khoảng trắng hay dấu ; (để Prettier xử lý).

---

# 10. Team Rule

✔ Commit nhỏ, thường xuyên.

✔ Không commit code đang lỗi.

✔ Không push thẳng vào `main`.

✔ Hỏi khi không chắc.

✔ Ưu tiên code dễ hiểu hơn code "thông minh".

---

Happy Coding 🚀
