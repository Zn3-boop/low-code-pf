import { message } from 'antd';

/**
 * 验证DSL格式是否有效
 * @param {Object} dsl - DSL对象
 * @returns {boolean}
 */
export const validateDsl = (dsl) => {
  // 基本类型检查
  if (!dsl || typeof dsl !== 'object') {
    console.error('DSL为空或不是对象');
    return false;
  }

  // 宽松验证：允许自动生成缺失的字段
  if (!dsl.id) {
    console.warn('DSL缺少id字段，自动生成');
    dsl.id = 'page_' + Date.now();
  }
  
  if (!dsl.type) {
    console.warn('DSL缺少type字段，自动设置为page');
    dsl.type = 'page';
  }

  // 检查type是否为有效的组件类型
  const validTypes = ['page', 'button', 'input', 'card', 'container'];
  if (!validTypes.includes(dsl.type)) {
    console.warn(`未知组件类型: ${dsl.type}，但允许导入`);
    // 不阻止导入，但显示警告
  }

  // 确保children字段存在且为数组
  if (!dsl.children) {
    console.warn('DSL缺少children字段，自动创建空数组');
    dsl.children = [];
  } else if (!Array.isArray(dsl.children)) {
    console.error('children字段不是数组');
    return false;
  }

  // 递归验证子节点（宽松验证）
  if (dsl.children) {
    for (const child of dsl.children) {
      // 只验证基本结构，自动补全缺失字段
      if (!child || typeof child !== 'object') {
        console.error('子节点结构无效');
        return false;
      }
      
      // 自动生成缺失的字段
      if (!child.id) {
        child.id = 'component_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      }
      if (!child.type) {
        child.type = 'container'; // 默认类型
      }
      if (!child.children) {
        child.children = [];
      }
    }
  }

  return true;
};

/**
 * 导入DSL文件
 * @param {File} file - 要导入的文件
 * @param {Function} onSuccess - 成功回调
 * @param {Function} onError - 错误回调
 */
export const importDslFromFile = (file, onSuccess, onError) => {
  // 文件类型验证
  if (!file) {
    const error = '未选择文件';
    message.error(error);
    onError?.(error);
    return;
  }

  // 文件扩展名检查
  const fileName = file.name.toLowerCase();
  if (!fileName.endsWith('.json')) {
    const error = '文件格式错误：请选择JSON文件';
    message.error(error);
    onError?.(error);
    return;
  }

  // 文件大小限制（10MB）
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    const error = '文件过大：请选择小于10MB的文件';
    message.error(error);
    onError?.(error);
    return;
  }

  // 读取文件
  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      // 解析JSON
      const parsed = JSON.parse(e.target.result);

      // 验证DSL格式
      if (!validateDsl(parsed)) {
        const error = 'DSL格式错误：缺少必要字段或结构无效';
        message.error(error);
        onError?.(error);
        return;
      }

      // 成功回调
      message.success('项目导入成功');
      onSuccess?.(parsed);
    } catch (error) {
      // JSON解析错误
      const errorMessage = `JSON解析失败：${error.message}`;
      console.error('导入错误:', error);
      message.error(errorMessage);
      onError?.(errorMessage);
    }
  };

  reader.onerror = () => {
    const error = '文件读取失败';
    message.error(error);
    onError?.(error);
  };

  // 开始读取
  reader.readAsText(file);
};

/**
 * 导出DSL到文件
 * @param {Object} dsl - DSL对象
 * @param {string} fileName - 导出文件名
 */
export const exportDslToFile = (dsl, fileName = 'project.json') => {
  if (!dsl) {
    message.error('没有可导出的项目数据');
    return;
  }

  try {
    // 格式化JSON（缩进2空格）
    const jsonString = JSON.stringify(dsl, null, 2);

    // 创建Blob
    const blob = new Blob([jsonString], { type: 'application/json' });

    // 创建下载链接
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;

    // 触发下载
    document.body.appendChild(link);
    link.click();

    // 清理
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    message.success('项目导出成功');
  } catch (error) {
    console.error('导出错误:', error);
    message.error('导出失败：' + error.message);
  }
};

/**
 * 保存DSL到localStorage
 * @param {Object} dsl - DSL对象
 * @param {string} key - 存储key
 */
export const saveDslToStorage = (dsl, key = 'lowcode-dsl') => {
  try {
    localStorage.setItem(key, JSON.stringify(dsl));
    message.success('项目已保存');
  } catch (error) {
    console.error('保存错误:', error);
    message.error('保存失败：' + error.message);
  }
};

/**
 * 从localStorage加载DSL
 * @param {string} key - 存储key
 * @returns {Object|null}
 */
export const loadDslFromStorage = (key = 'lowcode-dsl') => {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
    return null;
  } catch (error) {
    console.error('加载错误:', error);
    return null;
  }
};