import { Avatar, Image } from 'antd';

import React from "react";
import {
  ProfileUpdate,
  _SERVICE,
} from "../../../declarations/avatar/avatar.did";
import { GithubOutlined } from '@ant-design/icons'

interface Props {
  profile?: ProfileUpdate;
}

class Profile extends React.Component<Props> {
    formRef = React.createRef();

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps:any) {
        this.setState({
          profile: nextProps.profile
        });
        console.log(nextProps)
    }

    render() {
        return (
            <div className="profile_content">
                <Avatar
                    size={{
                        xs: 24,
                        sm: 32,
                        md: 40,
                        lg: 64,
                        xl: 80,
                        xxl: 100,
                    }} src={this.props.profile?.bio.imageUrl[0]} />
                <p className="profile_name">{this.props.profile?.bio.nickName[0]}</p>
                <p className="profile_about">{this.props.profile?.bio.about[0]}</p>
                <p className="profile_about">nickname:{this.props.profile?.bio.location[0]}</p>
                <GithubOutlined />
                <p className="profile_nft_title">我的NFT橱柜</p>
                <Image preview={false} src="https://p3.itc.cn/q_70/images03/20210813/ca7c127495b242dea4fc8cc552c4bcc1.png" width={250} height={100}></Image>
            </div>
        );
    }
}

export default Profile;