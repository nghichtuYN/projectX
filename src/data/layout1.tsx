import { LayoutType } from "@/types/layoutCv";

export const layout: LayoutType = {
  color: "#E2EAEE",

  rows: [
    {
      id: "row-1",
      columns: [
        {
          id: "col-1-1",
          row_id: "row-1",
          width: "100",
          content: [
            {
              id: "content-1-1-1",
              column_id: "col-1-1",
              name: "Thông tin cá nhân",
              type: "info",
            },
          ],
        },
      ],
    },
    {
      id: "row-2",
      columns: [
        {
          id: "col-2-1",
          row_id: "row-2",
          width: "75",
          content: [
            {
              id: "content-2-1-2",
              column_id: "col-2-1",
              name: "Danh thiếp",
              type: "business_card",
            },
            {
              id: "content-2-1-1",
              column_id: "col-2-1",
              name: "Mục tiêu nghề nghiệp",
              type: "career_goals",
            },
          ],
        },
        {
          id: "col-2-2",
          row_id: "row-2",
          width: "25",
          content: [
            {
              id: "content-2-2-1",
              column_id: "col-2-2",
              name: "Ảnh đại diện",
              type: "avatar",
            },
          ],
        },
      ],
    },
    {
      id: "row-3",
      width: "100",
      columns: [
        {
          id: "col-3-1",
          row_id: "row-3",
          width: "100",
          content: [
            {
              id: "content-3-1-1",
              column_id: "col-3-1",
              name: "Kinh nghiệm làm việc",
              type: "experiencies",
            },
          ],
        },
      ],
    },
    {
      id: "row-4",
      columns: [
        {
          id: "col-4-1",
          row_id: "row-4",
          width: "33",
          content: [
            {
              id: "content-4-1-1",
              column_id: "col-4-1",
              name: "Học vấn",
              type: "education",
            },
          ],
        },
        {
          id: "col-4-2",
          row_id: "row-4",
          width: "34",
          content: [
            {
              id: "content-4-2-1",
              column_id: "col-4-2",
              name: "Kỹ năng",
              type: "skills",
            },
          ],
        },
        {
          id: "col-4-3",
          row_id: "row-4",
          width: "33",
          content: [
            {
              id: "content-4-3-1",
              column_id: "col-4-3",
              name: "Chứng chỉ",
              type: "certificate",
            },
          ],
        },
      ],
    },
    {
      id: "row-5",
      width: "100",
      columns: [
        {
          id: "col-5-1",
          row_id: "row-5",
          width: "100",
          content: [
            {
              id: "content-5-1-1",
              column_id: "col-5-1",
              name: "Dự án cá nhân",
              type: "activies",
            },
          ],
        },
      ],
    },
    {
      id: "row-6",
      columns: [
        {
          id: "col-6-1",
          row_id: "row-6",
          width: "33",
          content: [
            {
              id: "content-6-1-1",
              column_id: "col-6-1",
              name: "Sở thích",
              type: "hobbies",
            },
          ],
        },
        {
          id: "col-6-2",
          row_id: "row-6",
          width: "34",
          content: [
            {
              id: "content-6-2-1",
              column_id: "col-6-2",
              name: "Người tham chiếu",
              type: "referencer",
            },
          ],
        },
        {
          id: "col-6-3",
          row_id: "row-6",
          width: "33",
          content: [
            {
              id: "content-6-3-1",
              column_id: "col-6-3",
              name: "Giải thưởng",
              type: "achievement",
            },
          ],
        },

      ],
    },
  ],
};
