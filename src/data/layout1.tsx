export const layout1 = {
  rows: [
    {
      columns: [{ content: [{ name: "Thông tin cá nhân" }] }],
      width: "full",
    },
    {
      columns: [
        {
          content: [{ name: "Mục tiêu nghề nghiệp" }, { name: "Danh thiếp" }],
          width: "half",
        },
        {
          content: [{ name: "Ảnh đại diện" }],
          width: "half",
        },
      ],
    },
    {
      columns: [{ content: [{ name: "Kinh nghiệm làm việc" }] },],
      width: "full",
    },
    {
      columns: [
        { content: [{ name: "Học vấn" }] },
        { content: [{ name: "Kỹ năng" }] },
        { content: [{ name: "Chứng chỉ" }] }, // Sửa lỗi chính tả "Chừng chỉ"
      ],
    },
    {
      columns: [{ content: [{ name: "Kinh nghiệm làm việc" }] }],
    },
    {
      columns: [
        { content: [{ name: "Sở thích" }] },
        { content: [{ name: "Người tham chiếu" }] },
        { content: [{ name: "Giải thưởng" }] },
      ],
    },
  ],
};
