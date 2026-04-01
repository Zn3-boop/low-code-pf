import React, { useState } from 'react';
import { List, Button, Modal, Input, message } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const PageManagerContainer = styled.div`
  padding: 20px;
  background: ${props => props.$theme === 'dark' ? '#16213e' : '#ffffff'};
  border-left: 1px solid ${props => props.$theme === 'dark' ? '#2d3748' : '#e0e0e0'};
  height: 100%;
  overflow-y: auto;
`;

const Title = styled.h3`
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  background: ${props => props.$theme === 'dark'
    ? 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)'
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const PageList = styled(List)`
  .ant-list-item {
    background: ${props => props.$theme === 'dark' ? '#1a1a2e' : '#fafafa'};
    border: 1px solid ${props => props.$theme === 'dark' ? '#2d3748' : '#e0e0e0'};
    border-radius: 8px;
    margin-bottom: 8px;
    padding: 12px 16px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      border-color: #764ba2;
      transform: translateX(4px);
    }

    &.active {
      border-color: #764ba2;
      background: ${props => props.$theme === 'dark' ? 'rgba(118, 75, 162, 0.2)' : 'rgba(118, 75, 162, 0.1)'};
    }
  }
`;

const PageManager = ({ pages = [], activePageId, onPageSelect, onPageAdd, onPageDelete, onPageRename, theme }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPageName, setNewPageName] = useState('');
  const [editingPageId, setEditingPageId] = useState(null);
  const [editingPageName, setEditingPageName] = useState('');

  const handleAddPage = () => {
    if (!newPageName.trim()) {
      message.warning('请输入页面名称');
      return;
    }
    onPageAdd(newPageName);
    setNewPageName('');
    setIsModalVisible(false);
  };

  const handleDeletePage = (e, pageId) => {
    e.stopPropagation();
    if (pages.length <= 1) {
      message.warning('至少需要保留一个页面');
      return;
    }
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个页面吗？',
      onOk: () => onPageDelete(pageId)
    });
  };

  const handleRenamePage = (e, pageId) => {
    e.stopPropagation();
    setEditingPageId(pageId);
    setEditingPageName(pages.find(p => p.id === pageId)?.name || '');
  };

  const handleSaveRename = (e, pageId) => {
    e.stopPropagation();
    if (!editingPageName.trim()) {
      message.warning('请输入页面名称');
      return;
    }
    onPageRename(pageId, editingPageName);
    setEditingPageId(null);
    setEditingPageName('');
  };

  const handleCancelRename = (e) => {
    e.stopPropagation();
    setEditingPageId(null);
    setEditingPageName('');
  };

  return (
    <PageManagerContainer $theme={theme}>
      <Title>页面管理</Title>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
        style={{ marginBottom: 16 }}
      >
        新建页面
      </Button>
      <PageList
        $theme={theme}
        dataSource={pages}
        renderItem={(page) => (
          <List.Item
            key={page.id}
            className={page.id === activePageId ? 'active' : ''}
            onClick={() => onPageSelect(page.id)}
          >
            {editingPageId === page.id ? (
              <div style={{ display: 'flex', gap: 8, flex: 1 }}>
                <Input
                  value={editingPageName}
                  onChange={(e) => setEditingPageName(e.target.value)}
                  onPressEnter={(e) => handleSaveRename(e, page.id)}
                  autoFocus
                />
                <Button
                  type="primary"
                  size="small"
                  onClick={(e) => handleSaveRename(e, page.id)}
                >
                  确定
                </Button>
                <Button
                  size="small"
                  onClick={handleCancelRename}
                >
                  取消
                </Button>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <span>{page.name}</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button
                    type="text"
                    size="small"
                    icon={<EditOutlined />}
                    onClick={(e) => handleRenamePage(e, page.id)}
                  />
                  <Button
                    type="text"
                    size="small"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={(e) => handleDeletePage(e, page.id)}
                  />
                </div>
              </div>
            )}
          </List.Item>
        )}
      />
      <Modal
        title="新建页面"
        open={isModalVisible}
        onOk={handleAddPage}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input
          placeholder="请输入页面名称"
          value={newPageName}
          onChange={(e) => setNewPageName(e.target.value)}
          onPressEnter={handleAddPage}
        />
      </Modal>
    </PageManagerContainer>
  );
};

export default PageManager;
