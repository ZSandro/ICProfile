import { Avatar, Image } from 'antd';

import React from "react";
import {
    ProfileUpdate,
    _SERVICE,
} from "../../../declarations/avatar/avatar.did";

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

    componentWillReceiveProps(nextProps: any) {
        this.setState({
            profile: nextProps.profile
        });
        console.log(nextProps)
    }

    render() {
        return (
            <div className="profile_content">
                <div className="profile_avatar_zone">
                    <div className="profile_avatar_bg"></div>
                    <Avatar className="profile_avatar"
                        size={{
                            xs: 60,
                            sm: 60,
                            md: 60,
                            lg: 60,
                            xl: 60,
                            xxl: 60,
                        }} src={this.props.profile?.bio.imageUrl[0]} />
                </div>
                <p className="profile_name">{this.props.profile?.bio.nickName[0]}</p>
                <p className="profile_about">{this.props.profile?.bio.about[0]}</p>
                <p className="profile_location">{this.props.profile?.bio.location[0]}</p>
                <p className="profile_nft_title">我的NFT橱柜</p>
                <Image preview={false} src="https://p3.itc.cn/q_70/images03/20210813/ca7c127495b242dea4fc8cc552c4bcc1.png" width={250} height={100}></Image>
            </div>
        );
    }
}

export default Profile;