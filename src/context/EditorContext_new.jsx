import React, { createContext, useContext, useState, useCallback } from 'react';

const EditorContext = createContext(null);

export const EditorProvider = ({ children }) => {
  // 页面管理
  const [pages, setPages] = useState([
    {
      id: 'page_1',
      type: 'page',
      name: '首页',
      props: {
        title: '页面标题'
      },
      children: []
    }
  ]);

  // 当前激活的页面ID
  const [activePageId, setActivePageId] = useState('page_1');

  // 获取当前激活的页面DSL
  const dsl = pages.find(page => page.id === activePageId) || pages[0];

  // 历史记录
  const [history, setHistory] = useState([{
    id: 'page_1',
    type: 'page',
    name: '首页',
    props: {
      title: '页面标题'
    },
    children: []
  }]);

  // 当前历史记录索引
  const [historyIndex, setHistoryIndex] = useState(0);

  // 选中的组件ID
  const [selectedId, setSelectedId] = useState(null);

  // 拖拽状态
  const [activeId, setActiveId] = useState(null);

  // 预览模式
  const [previewMode, setPreviewMode] = useState(false);

  // 代码编辑模式
  const [codeMode, setCodeMode] = useState(false);

  // 主题状态
  const [theme, setTheme] = useState('light');

  // 切换主题
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  // 更新历史记录
  const updateHistory = useCallback((newDsl) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(newDsl);
      // 限制历史记录长度
      if (newHistory.length > 50) {
        newHistory.shift();
        setHistoryIndex(prev => prev - 1);
      }
      return newHistory;
    });
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  // 获取选中组件的配置
  const selectedComponent = useCallback(() => {
    const findComponent = (node, path = []) => {
      if (node.id === selectedId) {
        return { node, path };
      }
      if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          const result = findComponent(node.children[i], [...path, i]);
          if (result) return result;
        }
      }
      return null;
    };

    return findComponent(dsl);
  }, [dsl, selectedId]);

  // 更新组件属性
  const updateComponentProps = useCallback((componentId, newProps) => {
    const updateNode = (node) => {
      if (node.id === componentId) {
        return { ...node, props: { ...node.props, ...newProps } };
      }
      if (node.children) {
        return {
          ...node,
          children: node.children.map(child => updateNode(child))
        };
      }
      return node;
    };

    setPages(prev => prev.map(page => {
      if (page.id === activePageId) {
        const newPage = updateNode(page);
        updateHistory(newPage);
        return newPage;
      }
      return page;
    }));
  }, [activePageId, updateHistory]);

  // 更新组件事件
  const updateComponentEvents = useCallback((componentId, newEvents) => {
    const updateNode = (node) => {
      if (node.id === componentId) {
        return { ...node, events: { ...node.events, ...newEvents } };
      }
      if (node.children) {
        return {
          ...node,
          children: node.children.map(child => updateNode(child))
        };
      }
      return node;
    };

    setPages(prev => prev.map(page => {
      if (page.id === activePageId) {
        const newPage = updateNode(page);
        updateHistory(newPage);
        return newPage;
      }
      return page;
    }));
  }, [activePageId, updateHistory]);

  // 添加组件
  const addComponent = useCallback((parentId, componentType, index) => {
    console.log('开始添加组件:', { parentId, componentType, index });
    const newComponent = {
      id: `${componentType}_${Date.now()}`,
      type: componentType,
      props: {},
      events: {},
      children: []
    };
    console.log('新组件:', newComponent);

    const addNode = (node) => {
      if (node.id === parentId) {
        console.log('找到父节点:', node.id);
        const newChildren = [...(node.children || [])];
        if (index !== undefined) {
          newChildren.splice(index, 0, newComponent);
        } else {
          newChildren.push(newComponent);
        }
        console.log('新子节点数组:', newChildren);
        return { ...node, children: newChildren };
      }
      if (node.children) {
        return {
          ...node,
          children: node.children.map(child => addNode(child))
        };
      }
      return node;
    };

    setPages(prev => prev.map(page => {
      if (page.id === activePageId) {
        console.log('当前页面DSL:', page);
        // 确保DSL有效
        if (!page || !page.id) {
          console.error('DSL无效，使用默认DSL');
          const defaultDsl = {
            id: activePageId,
            type: 'page',
            name: '我的页面',
            props: { title: '页面标题' },
            children: [newComponent]
          };
          updateHistory(defaultDsl);
          return defaultDsl;
        }

        const newPage = addNode(page);
        console.log('新页面DSL:', newPage);
        updateHistory(newPage);
        return newPage;
      }
      return page;
    }));
    setSelectedId(newComponent.id);
    console.log('添加组件完成，选中ID:', newComponent.id);
  }, [activePageId, updateHistory]);

  // 删除组件
  const deleteComponent = useCallback((componentId) => {
    const deleteNode = (node) => {
      if (node.id === componentId) {
        return null;
      }
      if (node.children) {
        const newChildren = node.children
          .map(child => deleteNode(child))
          .filter(child => child !== null);

        return { ...node, children: newChildren };
      }
      return node;
    };

    setPages(prev => prev.map(page => {
      if (page.id === activePageId) {
        const newPage = deleteNode(page);
        updateHistory(newPage);
        return newPage;
      }
      return page;
    }));
    setSelectedId(null);
  }, [activePageId, updateHistory]);

  // 移动组件
  const moveComponent = useCallback((fromId, toId, index) => {
    // 提取组件
    const extractComponent = (node) => {
      if (node.id === fromId) {
        return { component: node, remaining: null };
      }
      if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          const result = extractComponent(node.children[i]);
          if (result.component) {
            const newChildren = [...node.children];
            newChildren.splice(i, 1);
            return {
              component: result.component,
              remaining: { ...node, children: newChildren }
            };
          }
        }
      }
      return { component: null, remaining: node };
    };

    // 插入组件
    const insertComponent = (node, component) => {
      if (node.id === toId) {
        const newChildren = [...node.children];
        if (index !== undefined) {
          newChildren.splice(index, 0, component);
        } else {
          newChildren.push(component);
        }
        return { ...node, children: newChildren };
      }
      if (node.children) {
        return {
          ...node,
          children: node.children.map(child => insertComponent(child, component))
        };
      }
      return node;
    };

    setPages(prev => prev.map(page => {
      if (page.id === activePageId) {
        const { component, remaining } = extractComponent(page);
        if (component) {
          const newPage = insertComponent(remaining, component);
          updateHistory(newPage);
          return newPage;
        }
      }
      return page;
    }));
  }, [activePageId, updateHistory]);

  // 页面管理方法
  const addPage = useCallback((pageName) => {
    const newPage = {
      id: `page_${Date.now()}`,
      type: 'page',
      name: pageName,
      props: {
        title: pageName
      },
      children: []
    };
    setPages(prev => [...prev, newPage]);
    setActivePageId(newPage.id);
  }, []);

  const deletePage = useCallback((pageId) => {
    setPages(prev => {
      const newPages = prev.filter(page => page.id !== pageId);
      if (activePageId === pageId) {
        setActivePageId(newPages[0]?.id);
      }
      return newPages;
    });
  }, [activePageId]);

  const renamePage = useCallback((pageId, newName) => {
    setPages(prev => prev.map(page => 
      page.id === pageId 
        ? { ...page, name: newName, props: { ...page.props, title: newName } }
        : page
    ));
  }, []);

  const selectPage = useCallback((pageId) => {
    setActivePageId(pageId);
    setSelectedId(null);
  }, []);

  // 切换预览模式
  const togglePreviewMode = useCallback(() => {
    setPreviewMode(prev => !prev);
  }, []);

  // 切换代码模式
  const toggleCodeMode = useCallback(() => {
    setCodeMode(prev => !prev);
  }, []);

  // 撤销
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setPages(prev => prev.map(page => {
        if (page.id === activePageId) {
          return history[newIndex];
        }
        return page;
      }));
      setHistoryIndex(newIndex);
    }
  }, [history, historyIndex, activePageId]);

  // 重做
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setPages(prev => prev.map(page => {
        if (page.id === activePageId) {
          return history[newIndex];
        }
        return page;
      }));
      setHistoryIndex(newIndex);
    }
  }, [history, historyIndex, activePageId]);

  // 拖拽结束处理
  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // 如果是组件库中的新组件
    if (activeId.startsWith('component-')) {
      const componentType = activeId.replace('component-', '');
      addComponent(overId, componentType);
    } else {
      // 移动已有组件
      moveComponent(activeId, overId);
    }
  }, [addComponent, moveComponent]);

  const value = {
    pages,
    activePageId,
    dsl,
    setDsl: (newDsl) => {
      setPages(prev => prev.map(page => 
        page.id === activePageId ? newDsl : page
      ));
    },
    selectedId,
    setSelectedId,
    activeId,
    setActiveId,
    previewMode,
    codeMode,
    theme,
    toggleTheme,
    selectedComponent,
    updateComponentProps,
    updateComponentEvents,
    addComponent,
    deleteComponent,
    moveComponent,
    togglePreviewMode,
    toggleCodeMode,
    handleDragEnd,
    undo,
    redo,
    history,
    historyIndex,
    addPage,
    deletePage,
    renamePage,
    selectPage
  };

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
};

export const useEditor = () => useContext(EditorContext);
