import { remove, set } from "local-storage";
import React from "react";
import {
  ProfileUpdate,
  _SERVICE,
} from "../../../declarations/avatar/avatar.did";
import {Button, Modal, List, Avatar, Image, Row, Col} from 'antd'
interface Props {
  enterEditing: (id: number) => void;
}

const ProfileEditor = (props: Props) => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const handleItemClick = (id: number) => {
    props.enterEditing(id)
    console.log(id)
  };
  const testUrl = 'https://s3.amazonaws.com/appforest_uf/f1638965014561x223953153292650000/twitter%20%284%29.svg'
  const items = [
      {
          id: 0,
          title: '基础信息',
          url: testUrl
      },
      {
          id: 1,
          title: 'NFT橱窗',
          url: testUrl
      }
  ]

  const socialItems = [
    {
      icon: './assets/instagram_icon.svg'
    },
    {
      icon: './assets/twritter_icon.svg'
    },
    {
      icon: './assets/facebook_icon.svg'
    },
  ]
  const data = [
  {
    id: 0,
    url: './assets/user_icon.svg',
    title: '基础信息',
  },
  {
    id: 1,
    url: 'assets/btc_icon.svg',
    title: 'NFT橱柜',
  },
];

  function generateModuleItems() {
        const viewList =  socialItems.map(
                (item) => (
                    <Col span={6}>
                        <div className="editor_modal_item">
                        <Image
                            preview={false}
                            width={48}
                            height={68}
                            src={item.icon}
                        />
                        </div>
                    </Col>
                )
        )
        return viewList;
  }

  const create_module_sytle: React.CSSProperties = {
    'display': 'flex',
    'alignItems': 'flex-start',
    'padding': '40px 24px',
    'margin': '0px 0px 0px 0px',

    'position': 'relative',
    'width': '448px',
    'height': '246px',

    'background': '#FFFFFF',
    'borderRadius': '16px'
  };

  return (
      
    <div className="editor_body">
        <Button className="editor_add_btn" type="primary" shape="round" size="large"
            block onClick={showModal}>
          Add New Block
        </Button>
        <List
          itemLayout="horizontal"
          dataSource={data}
          split={false}
          renderItem={item => (
          <List.Item onClick={() => handleItemClick(item.id!)}>
              <div className="editor_home_list_item">
                  <div className="editor_home_list_item_box">
                    <div className="editor_home_list_item_box_avatar">
                      <Avatar className="editor_home_list_item_box_avatar_icon" src={item.url} />
                    </div>
                    <p className="editor_home_list_item_box_text">{item.title}</p>
                  </div>
                <div className="editor_home_list_item_arrow_box">
                  <img src="./assets/rightarrow.svg"></img>
                </div>
              </div>
          </List.Item>
          )}
        />


          <Modal
              bodyStyle={create_module_sytle}
              visible={visible}
              footer={null}
              closable={false}
              onOk={handleOk}
              width={448}
              centered={true}
              onCancel={handleCancel}>
                <div>
                    <div className="create_module_text_box">
                          Create blocks for your page
                    </div>
                    <div className="create_module_social_media_box">
                        <div className="create_module_social_media_text ">
                          Social Media
                        </div>
                        <div className="create_module_social_icon_box">
                            <Row gutter={[80, 0]} justify="start">
                                { generateModuleItems() }
                            </Row>    
                        </div>
                    </div>
                </div>
          </Modal>
    </div>
  );
};

export default ProfileEditor;