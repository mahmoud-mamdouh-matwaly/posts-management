import { useEffect, Suspense, lazy, useCallback, useMemo, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteFilled, EditFilled, EyeFilled } from '@ant-design/icons';
import { Spin, Row, Space, theme, Typography } from 'antd';
import PropTypes from 'prop-types';

import {
  fetchPosts,
  setPostItem,
  setCurrentPage,
  setSearchTerm,
  deletePostItem,
  resetDeleteStatus,
} from './store/slice';
import { columns } from './columns';
import BaseButton from 'components/button';
import BaseMessage from 'components/message';
import PageHeading from './components/page-heading';
import BaseModal from 'components/modal';
import Form from './components/form';
const { Text } = Typography;

const BaseTable = lazy(() => import('components/table'));

const { useToken } = theme;

const PostsPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, currentPage, searchTerm, deleteStatus } = useSelector(state => state.postsReducer);
  const {
    alert: { type, message },
  } = useSelector(state => state.uiReducer);
  const dispatch = useDispatch();

  const {
    token: { colorBgContainer },
  } = useToken();

  const [showModal, setShowModal] = useState({ isOpen: false, id: null, item: null });

  useEffect(() => {
    if (!data?.length) {
      dispatch(fetchPosts());
    }
  }, [data]);

  useEffect(() => {
    if (deleteStatus.includes('success')) {
      handleCancel();
      dispatch(resetDeleteStatus());
    }
  }, [deleteStatus]);

  const handleClickEdit = useCallback(item => {
    dispatch(setPostItem(item));
    navigate(`/posts-management/post-details/${item.id}`);
  }, []);

  const handleDelete = useCallback(item => {
    setShowModal(prev => {
      return {
        ...prev,
        isOpen: !prev.isOpen,
        id: item?.id,
      };
    });
  }, []);
  const handleClickView = useCallback(item => {
    setShowModal(prev => {
      return {
        isOpen: !prev.isOpen,
        id: item?.id,
        item: item,
      };
    });
  }, []);

  const handleCurrentPage = useCallback(
    current => {
      dispatch(setCurrentPage(current));
    },
    [dispatch]
  );

  const handleChangeSearch = useCallback(
    event => {
      dispatch(setSearchTerm(event.target.value));
    },
    [dispatch]
  );

  const handleSubmitDeletePost = () => {
    dispatch(deletePostItem({ id: showModal.id }));
  };

  const handleCancel = () => {
    setShowModal({
      isOpen: false,
      id: null,
      item: null,
    });
  };

  const filteredPosts = useMemo(() => {
    return data.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm, data]);

  return (
    <Space direction="vertical" style={{ background: colorBgContainer, width: '100%' }} data-testid="postsPage">
      <PageHeading title="Posts" hasSearch={true} handleChangeSearch={handleChangeSearch} testId="pageTitle" />
      <Suspense fallback={<Spin />}>
        <PostList
          filteredPosts={filteredPosts}
          isLoading={isLoading}
          handleCurrentPage={handleCurrentPage}
          currentPage={currentPage}
          handleClickView={handleClickView}
          handleClickEdit={handleClickEdit}
          handleDelete={handleDelete}
        />
      </Suspense>

      <ModalsContainer
        handleCancel={handleCancel}
        handleSubmit={handleSubmitDeletePost}
        showModal={showModal}
        isLoading={isLoading}
        danger={true}
      />

      {type ? <BaseMessage type={type} message={message} /> : null}
    </Space>
  );
};

export default PostsPage;

function ModalsContainer(props) {
  const { handleCancel, handleSubmit, showModal, isLoading } = props;

  return (
    <>
      <BaseModal
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        isModalOpen={showModal.isOpen && !showModal.item}
        okText="Delete"
        isLoading={isLoading}
        danger={true}
        testId="deleteModal"
      >
        <Text>Are you sure, you want to delete this post?</Text>
      </BaseModal>

      <BaseModal
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        isModalOpen={showModal.isOpen && !!showModal.item}
        isLoading={isLoading}
        testId="viewModal"
      >
        <Form postItem={showModal?.item} isView={true} />
      </BaseModal>
    </>
  );
}

ModalsContainer.propTypes = {
  handleCancel: PropTypes.func,
  handleSubmit: PropTypes.func,
  showModal: PropTypes.shape({
    isOpen: PropTypes.bool,
    item: PropTypes.object,
    id: PropTypes.number,
  }),
  isLoading: PropTypes.bool,
};

const PostList = memo(props => {
  const { filteredPosts, handleClickView, handleClickEdit, handleDelete, isLoading, handleCurrentPage, currentPage } =
    props;

  const memoColumns = useMemo(() => {
    const columnActions = {
      title: 'Actions',
      key: 'operation',
      fixed: 'right',
      width: 150,
      render: row => {
        return (
          <Row justify={'space-between'}>
            <BaseButton
              className="btn"
              type="text"
              icon={<EyeFilled />}
              onClick={() => handleClickView(row)}
              testId="viewBtn"
            />
            <BaseButton
              className="btn"
              type="text"
              icon={<EditFilled />}
              onClick={() => handleClickEdit(row)}
              testId="editBtn"
            />
            <BaseButton
              className="btn"
              type="text"
              icon={<DeleteFilled />}
              danger
              onClick={() => handleDelete(row)}
              testId="deleteBtn"
            />
          </Row>
        );
      },
    };
    return [...columns, { ...columnActions }];
  }, []);

  return (
    <BaseTable
      data={filteredPosts}
      columns={memoColumns}
      loading={isLoading}
      getCurrentPage={handleCurrentPage}
      currentPage={currentPage}
      rowKey="id"
    />
  );
});

PostList.propTypes = {
  handleClickEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  handleClickView: PropTypes.func,
  filteredPosts: PropTypes.array,
  isLoading: PropTypes.bool,
  currentPage: PropTypes.number,
  handleCurrentPage: PropTypes.func,
};
