Tổng quan hệ thống
Hệ thống này được thiết kế để tự động hóa hoàn toàn quy trình lấy tin tức/bài viết từ các nguồn bên ngoài, đưa qua một bộ xử lý trung gian để làm sạch, sau đó sử dụng Trí tuệ Nhân tạo (LLMs) để xào lại/viết lại nội dung theo văn phong mong muốn trước khi lưu trữ vào cơ sở dữ liệu để hiển thị hoặc sử dụng tiếp.

Chi tiết các thành phần (Components)

1. Settings Dashboard (Bảng điều khiển)
   Đây là giao diện người dùng (Frontend/Admin Panel) dành cho quản trị viên.

Chức năng chính: \* Quản lý nguồn (Sources): Cho phép người dùng thêm, bớt hoặc chỉnh sửa các nguồn cấp dữ liệu (ví dụ: URL trang web, RSS feeds).

Cấu hình hệ thống (Settings): Điều chỉnh các thông số hoạt động của hệ thống.

Quản lý Prompt: Là nơi quản trị viên thiết lập và tinh chỉnh các "System Prompt" - chỉ thị cốt lõi sẽ được gửi cho AI để hướng dẫn cách viết lại bài.

Liên kết: Truy xuất và hiển thị dữ liệu từ Cơ sở dữ liệu (db) thông qua đường nét đứt, đồng thời truyền lệnh kích hoạt hoặc cấu hình trực tiếp xuống Explorer Engine.

2. Explorer Engine (Động cơ thu thập dữ liệu)
   Đây là một dịch vụ chạy ngầm (Background Worker / Crawler).

Chức năng chính:

Quét dữ liệu: Liên tục tìm kiếm và lấy các bản tin (feeds) mới từ những nguồn đã được định nghĩa trong Settings Dashboard.

Tiền xử lý (Refine): Làm sạch dữ liệu thô ban đầu (loại bỏ HTML thừa, lọc rác,...).

Phân phối: Đóng gói nội dung đã lọc và đẩy (publish) vào các hàng đợi tin nhắn của Kafka.

3. Kafka (Hệ thống điều phối tin nhắn)
   Chức năng chính: Đóng vai trò là Message Broker (trạm trung chuyển) kết nối giữa tiến trình cào dữ liệu và tiến trình xử lý AI.

Lợi ích: Giúp hệ thống giải quyết bài toán bất đồng bộ (asynchronous). Nếu Explorer Engine cào về hàng ngàn bài viết cùng lúc, Kafka sẽ xếp hàng chúng lại để Rewriter Engine từ từ xử lý, đảm bảo hệ thống không bị quá tải hay mất mát dữ liệu.

4. Rewriter Engine (Động cơ xử lý & Viết lại)
   Đây là bộ não của hệ thống, nơi tích hợp Trí tuệ Nhân tạo.

Chức năng chính:

Tiếp nhận: Tiêu thụ (consume) các bài viết thô đang chờ sẵn trong topic của Kafka.

Xử lý AI: Sử dụng các Mô hình Ngôn ngữ Lớn (LLMs như GPT, Claude, Gemini, v.v.) để viết lại toàn bộ bài báo. Nó sẽ áp dụng các system prompt (đã được quản trị viên cài đặt ở Settings Dashboard) để định hướng phong cách, giọng văn hoặc định dạng của bài viết mới.

Lưu trữ: Sau khi LLM trả về bài viết hoàn chỉnh, engine này sẽ tạo một bản ghi bài viết mới (new article record) và đẩy thẳng vào Cơ sở dữ liệu (db).

5. DB (Cơ sở dữ liệu)
   Chức năng chính: Nơi lưu trữ vĩnh viễn của toàn bộ hệ thống.

Dữ liệu lưu trữ: \* Cấu hình hệ thống, danh sách các nguồn (sources), và các system prompt.

Các bài viết/bản ghi mới đã được AI viết lại thành công từ Rewriter Engine.

Luồng hoạt động chính (Data Flow)
Thiết lập: Quản trị viên truy cập Settings Dashboard để nhập link các trang web cần lấy tin và viết một system prompt (VD: "Hãy tóm tắt bài báo này trong 3 đoạn bằng giọng văn hài hước").

Thu thập: Explorer Engine nhận lệnh, đi đến các trang web đó để lấy bài viết thô về, sơ chế rồi ném vào hàng đợi Kafka.

Xào bài: Rewriter Engine lấy bài thô từ Kafka, kết hợp với system prompt, rồi gửi cho API của LLM để yêu cầu viết lại.

Lưu kết quả: Bài viết mới (đã được viết lại) được Rewriter Engine lưu trực tiếp vào DB.

Hiển thị: Quản trị viên (hoặc người dùng cuối) có thể xem lại các bài viết thành phẩm này thông qua giao diện của Settings Dashboard (hoặc một trang web hiển thị dành cho người dùng được kết nối với DB).
