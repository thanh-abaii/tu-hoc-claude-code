# Quiz: Plugins

## Câu 1
**Câu hỏi**: Plugin Claude Code là gì?
A. Một file markdown hướng dẫn
B. Bộ sưu tập các slash commands, subagents, MCP servers, hooks được đóng gói sẵn
C. Một subagent đặc biệt
D. Một loại memory
**Đáp án**: B
**Giải thích**: Plugin là cơ chế mở rộng cấp cao nhất, kết hợp nhiều tính năng (slash commands, subagents, MCP servers, hooks) thành package gắn kết, cài đặt bằng một lệnh.

## Câu 2
**Câu hỏi**: Sự khác biệt giữa Plugin và Skill là gì?
A. Plugin chỉ chứa slash commands; Skill chỉ chứa subagents
B. Plugin bundles nhiều tính năng thành package; Skill là đơn lẻ, tập trung vào một quy trình
C. Plugin mạnh hơn Skill
D. Không có khác biệt
**Đáp án**: B
**Giải thích**: Plugin là package lớn, chứa nhiều thành phần (commands, agents, MCP servers, hooks). Skill là đơn lẻ, tập trung vào một quy trình cụ thể.

## Câu 3
**Câu hỏi**: Lệnh để cài đặt plugin là gì?
A. `/skill install`
B. `/plugin install <tên-plugin>`
C. `claude plugin add <tên-plugin>`
D. `/install plugin <tên-plugin>`
**Đáp án**: B
**Giải thích**: Plugin được cài đặt qua lệnh `/plugin install <tên-plugin>`.

## Câu 4
**Câu hỏi**: Plugin được phân phối qua đâu?
A. Qua git clone
B. Qua Plugin Marketplace hoặc npm package
C. Qua email
D. Qua clipboard
**Đáp án**: B
**Giải thích**: Plugin có thể được phân phối qua marketplace chính thức hoặc npm package.

## Câu 5
**Câu hỏi**: Các thành phần nào có thể có trong một plugin?
A. Chỉ slash commands
B. Slash commands, subagents, MCP servers, hooks, configuration
C. Chỉ subagents và hooks
D. Chỉ memory files
**Đáp án**: B
**Giải thích**: Plugin có thể bundle slash commands, subagents, MCP servers, hooks, và configuration.

## Câu 6
**Câu hỏi**: Khi cài plugin, các slash commands sẽ được cấu hình ở đâu?
A. Trong `.claude/commands/`
B. Tích hợp trực tiếp vào hệ thống commands của Claude Code
C. Trong file riêng
D. Không cấu hình gì
**Đáp án**: B
**Giải thích**: Plugin extract components và cấu hình trực tiếp vào hệ thống Claude Code.

## Câu 7
**Câu hỏi**: Plugin có namespace để tránh xung đột không?
A. Không, tên phải unique toàn cầu
B. Có, dùng plugin-name:component-name
C. Có, nhưng chỉ cho subagents
D. Chỉ cho MCP servers
**Đáp án**: B
**Giải thích**: Plugin dùng namespace pattern `plugin-name:component-name` để tránh xung đột khi nhiều plugin cùng tên component.

## Câu 8 (Mở)
**Câu hỏi**: Quando nào bạn nên tạo plugin thay vì chỉ tạo skill?
**Đáp án**: Tạo plugin khi: (1) cần bundles nhiều tính năng (commands + agents + hooks); (2) muốn chia sẻ cho team/community dễ dàng; (3) cần đóng gói giải pháp hoàn chỉnh; (4) có quy trình phức tạp cần nhiều components phối hợp.
**Giải thích**: Plugin phù hợp cho giải pháp end-to-end, skill phù hợp cho task cụ thể.

## Câu 9 (Mở)
**Câu hỏi**: Tại sao plugin được gọi là "cơ chế mở rộng cấp cao nhất"?
**Đáp án**: Vì plugin kết hợp nhiều tính năng riêng lẻ thành một package hoàn chỉnh, cài đặt bằng một lệnh. Không cần setup thủ công từng component. Người dùng không cần biết internal structure.
**Giải thích**: Plugin đại diện cho highest-level extension mechanism của Claude Code.
