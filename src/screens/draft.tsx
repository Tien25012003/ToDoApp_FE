import {View, Text, Button} from 'react-native';
import React from 'react';
import {API_DELETE, API_GET, API_POST, API_PUT, TResponse} from '@services/api';
import {PATH} from '@services/path';

const Draft = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', gap: 10}}>
      <Text>Draft</Text>
      <Button
        title="GET"
        onPress={async () => {
          const result: TResponse<ITask> = await API_GET({
            url: PATH.EXAMS.GET_EXAM,
          });
        }}
      />
      <Button
        title="POST"
        onPress={async () => {
          const data = {
            type: 'C',
            questions: [
              {
                questionTitle:
                  'Bạn có nhiều sở thích liên quan đến nhóm TEST NHA NHA? Hãy chọn một hoặc nhiều đáp án gần giống với bạn nhất nhé!',
                image: '',
                options: [
                  {
                    image: '',
                    content:
                      'Tôi thích mọi thứ được sắp xếp gọn gàng và ngăn nắp.',
                    isResult: false,
                  },
                  {
                    image: '',
                    content:
                      'Tôi thường xuyên lập danh sách chi tiết các công việc cần làm trong ngày hoặc trong một thời gian ngắn.',
                    isResult: false,
                  },
                  {
                    image: '',
                    content: 'Tôi thích đánh máy các tài liệu hơn là viết tay.',
                    isResult: false,
                  },
                  {
                    image: '',
                    content:
                      'Tôi rất thực tế, luôn cân nhắc kỹ về chi phí trước khi mua một thứ gì đó.',
                    isResult: false,
                  },
                  {
                    image: '',
                    content:
                      'Tôi thích đảm nhiệm vị trí thư ký trong các buổi họp hay họp nhóm.',
                    isResult: false,
                  },
                  {
                    image: '',
                    content:
                      'Tôi yêu thích việc sắp xếp, tổ chức công việc cho bản thân hoặc nhóm.',
                    isResult: false,
                  },
                  {
                    image: '',
                    content:
                      'Tôi tự thấy mình là người tỉ mỉ, chu đáo và cẩn thận.',
                    isResult: false,
                  },
                  {
                    image: '',
                    content:
                      'Tôi thích công việc tính toán sổ sách, ghi chép số liệu.',
                    isResult: false,
                  },
                  {
                    image: '',
                    content:
                      'Tôi thích các công việc lưu trữ, phân loại và cập nhật thông tin.',
                    isResult: false,
                  },
                  {
                    image: '',
                    content:
                      'Tôi thực sự bị cuốn hút bởi các hàm tính toán trong excel.',
                    isResult: false,
                  },
                ],
              },
            ],
            results: [
              {
                score: null,
                content:
                  '<article>\n        <p>Người yêu thích Quản lý thường yêu thích các hoạt động đòi hỏi sự lãnh đạo, thuyết phục, tác động vào người khác để đạt được mục đích chung của tổ chức hoặc lợi ích kinh tế. Nhóm này thường ưu tiên những công việc bao quát, những cải tiến, đổi mới mà không thích làm việc một cách máy móc, tượng trưng.</p>\n        <p>\n            <strong>Năng lực nổi trội: </strong>lãnh đạo, giao tiếp, thuyết phục.\n            <strong>Năng lượng thiếu hụt: </strong>khoa học.\n        </p>\n    </article>',
                image: '',
              },
            ],
          };
          const result: TResponse<any> = await API_POST({
            url: PATH.EXAMS.ADD_EXAM,
            request: data,
          });
          console.log(result);
        }}
      />
      <Button
        title="Delete"
        onPress={async () => {
          await API_DELETE<{id: string}>({
            url: PATH.EXAMS.DELETE_EXAM,
            params: {
              id: '660a27ede9b1e012f5845534',
            },
          });
        }}
      />
      <Button
        title="Update"
        onPress={async () => {
          const data = {
            type: 'C',
            questions: [
              {
                questionTitle:
                  'Bạn có nhiều sở thích liên quan đến nhóm TEST NHA NHA1? Hãy chọn một hoặc nhiều đáp án gần giống với bạn nhất nhé!',
                image: '',
                options: [
                  {
                    image: '',
                    content:
                      'Tôi thích mọi thứ được sắp xếp gọn gàng và ngăn nắp.',
                    isResult: false,
                  },
                  {
                    image: '',
                    content:
                      'Tôi thường xuyên lập danh sách chi tiết các công việc cần làm trong ngày hoặc trong một thời gian ngắn.',
                    isResult: false,
                  },
                  {
                    image: '',
                    content: 'Tôi thích đánh máy các tài liệu hơn là viết tay.',
                    isResult: false,
                  },
                  {
                    image: '',
                    content:
                      'Tôi rất thực tế, luôn cân nhắc kỹ về chi phí trước khi mua một thứ gì đó.',
                    isResult: false,
                  },
                  {
                    image: '',
                    content:
                      'Tôi thích đảm nhiệm vị trí thư ký trong các buổi họp hay họp nhóm.',
                    isResult: false,
                  },
                  {
                    image: '',
                    content:
                      'Tôi yêu thích việc sắp xếp, tổ chức công việc cho bản thân hoặc nhóm.',
                    isResult: false,
                  },
                  {
                    image: '',
                    content:
                      'Tôi tự thấy mình là người tỉ mỉ, chu đáo và cẩn thận.',
                    isResult: false,
                  },
                  {
                    image: '',
                    content:
                      'Tôi thích công việc tính toán sổ sách, ghi chép số liệu.',
                    isResult: false,
                  },
                  {
                    image: '',
                    content:
                      'Tôi thích các công việc lưu trữ, phân loại và cập nhật thông tin.',
                    isResult: false,
                  },
                  {
                    image: '',
                    content:
                      'Tôi thực sự bị cuốn hút bởi các hàm tính toán trong excel.',
                    isResult: false,
                  },
                ],
              },
            ],
            results: [
              {
                score: null,
                content:
                  '<article>\n        <p>Người yêu thích Quản lý thường yêu thích các hoạt động đòi hỏi sự lãnh đạo, thuyết phục, tác động vào người khác để đạt được mục đích chung của tổ chức hoặc lợi ích kinh tế. Nhóm này thường ưu tiên những công việc bao quát, những cải tiến, đổi mới mà không thích làm việc một cách máy móc, tượng trưng.</p>\n        <p>\n            <strong>Năng lực nổi trội: </strong>lãnh đạo, giao tiếp, thuyết phục.\n            <strong>Năng lượng thiếu hụt: </strong>khoa học.\n        </p>\n    </article>',
                image: '',
              },
            ],
          };
          await API_PUT({
            url: PATH.EXAMS.UPDATE_EXAM,
            params: {
              id: '660a27ede9b1e012f5845534',
            },
            request: data,
          });
        }}
      />
    </View>
  );
};

export default Draft;
