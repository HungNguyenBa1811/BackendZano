# Step 08 - Logging và debug local

## Trạng thái
- Status: Done
- Ngày cập nhật: 2026-03-13
- Mục tiêu: Thiết lập logging đủ rõ để debug nhanh khi chạy local và test Postman

## 1) Structured logging có requestId/traceId
- Mỗi request sinh requestId hoặc nhận từ header nếu có.
- Log theo format JSON hoặc key-value nhất quán.
- Bắt buộc log:
  - timestamp
  - level
  - requestId/traceId
  - method
  - path
  - statusCode
  - durationMs

## 2) Log an toàn cho endpoint quan trọng
- Log điểm vào/ra cho endpoint critical:
  - auth login/refresh/logout
  - start attempt
  - save answer
  - submit attempt
  - publish exam
  - import question
- Không log dữ liệu nhạy cảm:
  - password
  - full token
  - thông tin PII không cần thiết

## 3) Cơ chế bật/tắt debug log bằng env
- Biến môi trường đề xuất:
  - LOG_LEVEL=error|warn|info|debug
  - LOG_PRETTY=true|false
- Local mặc định:
  - LOG_LEVEL=debug
- Khi chạy test ổn định:
  - giảm xuống info để log gọn hơn

## 4) Debug flow chuẩn khi lỗi API
1. Lấy requestId từ response hoặc log middleware.
2. Tìm log theo requestId.
3. Đối chiếu input params/query/body đã sanitize.
4. Đối chiếu service path và repository query tương ứng.
5. Xác định nhóm lỗi:
  - validation
  - auth/permission
  - business rule
  - database
6. Ghi lại root cause và cách fix.

## 5) Danh sách lỗi thường gặp và xử lý nhanh
- 401 do token hết hạn:
  - Chạy refresh token rồi gọi lại request.
- 403 do role sai:
  - Kiểm tra token role và route guard.
- 422 do business validation:
  - Kiểm tra trạng thái exam/attempt trước khi submit.
- 500 do query lỗi:
  - Kiểm tra migration/index/schema lệch với code.

## 6) Debug checklist cho import Excel
- Kiểm tra mime type và extension.
- Kiểm tra mapping cột trong file template.
- Log tổng số dòng parse thành công/thất bại.
- Log rõ dòng nào lỗi và lý do.

## 7) Tiêu chí hoàn tất Step 08
- Có structured logging hoạt động ở mọi request.
- Có requestId/traceId xuyên suốt từ controller đến service.
- Có thể bật/tắt debug log qua env mà không sửa code.
- Có tài liệu lỗi thường gặp và playbook xử lý nhanh.
- Team có thể debug nhanh dựa trên log khi chạy local.
