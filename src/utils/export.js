import { message } from 'antd';

// 导出为JSON文件
export const exportDSL = (dsl, fileName = 'page-dsl.json') => {
  const jsonString = JSON.stringify(dsl, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
  message.success('DSL导出成功');
};

// 导入JSON文件
export const importDSL = (file, callback) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const dsl = JSON.parse(e.target.result);
      callback(dsl);
      message.success('DSL导入成功');
    } catch (error) {
      message.error('DSL格式错误');
    }
  };
  reader.readAsText(file);
};