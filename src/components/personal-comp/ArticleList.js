import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { readArticle } from '../../service/ipfs-service';
import { useNavigate } from 'react-router-dom';
import { ownedTypedNFT } from '../../service/nft-service';
function ArticleList() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
  const columns = [
    {
      title: '标题',
      dataIndex: 'name',
      width: 500,
      render: (text) => (
        <a href="javascript: void(0)" target="_self">
          {text}
        </a>
      ),
    },

    {
      title: '阅读',
      dataIndex: 'entity',
      width: 500,
      render: (entity) => (
        <a
          href="javascript: void(0)"
          target="_self"
          onClick={(e) => view(entity, e)}
        >
          阅读
        </a>
      ),
    },
  ];
  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    debugger;
    let { success, data } = await ownedTypedNFT('article');
    let rdata = data.map((e, i) => ({ index: i, entity: e, ...e }));
    setArticles(rdata);
    console.log('mounted!');
  };
  const view = async (entity, event) => {
    debugger;
    let content = await readArticle(entity.uri);
    navigate('/personal/article-read', {
      state: { title: entity.name, content },
    });
  };
  return (
    <div>
      <Table
        onRow={(record) => {
          return {
            onClick: (event) => {
              console.log(record);
            }, // 点击行
            onDoubleClick: (event) => {},
            onContextMenu: (event) => {},
            onMouseEnter: (event) => {}, // 鼠标移入行
            onMouseLeave: (event) => {},
          };
        }}
        columns={columns}
        dataSource={articles}
        bordered
      ></Table>
    </div>
  );
}
export default ArticleList;
