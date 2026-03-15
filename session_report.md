# Session Report - Backend API gap implementation

Ngay thuc hien: 2026-03-15
Nguoi thuc hien: Senior Backend role-play (GitHub Copilot)

## 1) Muc tieu va pham vi

- Nhiem vu: implement cac API con thieu theo `docs/api-list.md` va cap nhat trang thai trong `todo.md`.
- Pham vi code: bo sung route + controller + service + repository + mount route vao app.
- Nguyen tac thuc hien:
    - Giu nguyen convention hien co (Express modular monolith, `AppError`, `sendSuccess`, role guard, auth guard).
    - Uu tien hoat dong duoc local MVP, co validate input o boundary.

## 2) Ket qua tong quan

- Da implement toan bo endpoint thieu trong nhom Student/Admin theo checklist.
- Da cap nhat `todo.md` tu trang thai chua implement sang da implement.
- Khong co loi syntax/language-server sau khi thay doi (`get_errors` = no errors).

## 3) Chi tiet endpoint da implement

### Student

- `GET /api/v1/student/exams/{examId}`
    - Them route, controller `getExamDetail`, service + repository query chi tiet exam + question count.
- `GET /api/v1/student/results/{resultId}`
    - Them module route rieng `student-results.routes.js`.
    - Kiem tra ownership: student chi duoc xem result cua minh.
- `GET /api/v1/student/results`
    - Ho tro pagination `page`, `pageSize` va filter `examId`.
- `PUT /api/v1/student/attempts/{attemptId}/answers/{questionId}`
    - Nang cap contract: chap nhan ca `selectedOptionId` va `selectedOptionLabel` (backward compatibility).

### Admin - Exams & Questions

- `GET /api/v1/admin/exams`
- `POST /api/v1/admin/exams`
- `GET /api/v1/admin/exams/{examId}`
- `PUT /api/v1/admin/exams/{examId}`
- `DELETE /api/v1/admin/exams/{examId}` (soft delete qua `deleted_at`)
- `POST /api/v1/admin/exams/{examId}/publish`
    - Rule: exam phai ton tai, chua bi xoa, va co it nhat 1 cau hoi.
- `POST /api/v1/admin/exams/{examId}/questions/import`
    - Ban local MVP: import tu JSON payload `questions` (chua parse file Excel multipart).
- `GET /api/v1/admin/exams/{examId}/questions`
- `POST /api/v1/admin/exams/{examId}/questions`
- `PUT /api/v1/admin/exams/{examId}/questions/{questionId}`
- `DELETE /api/v1/admin/exams/{examId}/questions/{questionId}` (soft delete)

### Admin - Students & Attempts

- `GET /api/v1/admin/students`
- `POST /api/v1/admin/students`
    - Tao account student, default password hash = studentCode (de local test).
- `PUT /api/v1/admin/students/{studentId}`
- `DELETE /api/v1/admin/students/{studentId}`
    - Chinh sach local: deactivate (`is_active = 0`).
- `GET /api/v1/admin/students/{studentId}/overview`
- `GET /api/v1/admin/students/{studentId}/results`
- `GET /api/v1/admin/students/{studentId}/report`
    - Local MVP tra JSON report preview (format `pdf` mo phong).
- `GET /api/v1/admin/attempts/{attemptId}`
    - Tra chi tiet bai lam + dap an da chon + dap an dung.

### Admin - Stats

- `GET /api/v1/admin/stats/export`
    - Ho tro query `format`, `from`, `to`, `examId`.
    - Local MVP tra JSON export preview.
- Nang cap `GET /api/v1/admin/stats/summary`
    - Bo sung `completionRate` (submitted_attempts / total_attempts).

## 4) File thay doi chinh

- Routes moi:
    - `src/modules/student-results/student-results.routes.js`
    - `src/modules/admin-exams/admin-exams.routes.js`
    - `src/modules/admin-questions/admin-questions.routes.js`
    - `src/modules/admin-students/admin-students.routes.js`
    - `src/modules/admin-attempts/admin-attempts.routes.js`
- Mount route:
    - `src/app.js`
- Controller/Service/Repository duoc implement day du cho:
    - `student-results`
    - `admin-exams`
    - `admin-questions`
    - `admin-students`
    - `admin-attempts`
- Mo rong module co san:
    - `src/modules/student-exams/*` (exam detail)
    - `src/modules/student-attempts/student-attempts.controller.js` (accept `selectedOptionId`)
    - `src/modules/admin-stats/*` (export + completionRate)

## 5) Validation va quality checks

- Da chay kiem tra loi toan bo `src` bang language diagnostics: khong co loi.
- Da doi chieu route duoc mount voi endpoint list: du scope can thiet da co route.

## 6) Han che con lai / debt ky thuat

- Endpoint import cau hoi `3.6` hien dang o che do local MVP bang JSON payload, chua parse file Excel `multipart/form-data`.
- Endpoint report/export (`4.8`, `5.2`) hien dang tra JSON preview thay vi stream file PDF that.

## 7) De xuat buoc tiep theo

- Bo sung upload middleware (`multer`) + parser (`xlsx`) de hoan tat import Excel thuc su.
- Sinh PDF that cho report/export (vd: `pdfkit` hoac `puppeteer`) va tra ve file stream.
- Bo sung Postman regression suite theo Step 07 cho cac endpoint moi vua implement.

## 8) QA hotfix follow-up (2026-03-15)

- [H-1] Da fix route collision:
    - `adminQuestionsRouter` chuyen mount sang `/api/v1/admin` trong `src/app.js`.
    - Path trong `admin-questions.routes.js` chuyen thanh `/exams/:examId/questions...`.
- [H-2] Da them rate limiting cho auth endpoints:
    - Tao middleware `src/shared/middleware/rate-limit.js`.
    - Apply cho `/auth/login` (strict hon) va cac endpoint auth con lai.
- [H-3] Da bo password mac dinh = username:
    - `createStudent` tao `temporaryPassword` ngau nhien va hash truoc khi luu.
    - Response tra ve `mustChangePassword: true` cho flow tiep theo.
    - Luu y: enforcement doi mat khau lan dau can Tech Lead chot schema/endpoint.
- [H-4] Da them gioi han kich thuoc import questions:
    - `maxImportItems = 200` trong `admin-questions.service.js`.

- [M-1] Da nang cap email validation qua regex co ban.
- [M-2] Da them validate datetime cho `from`/`to` va validate range trong stats export.
- [M-3] Da cap `maxPage = 10000` cho cac service co pagination.
- [M-4] Da them audit log khi admin truy cap attempt detail (`admin-attempts.controller.js`).
