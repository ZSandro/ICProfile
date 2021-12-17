import { Avatar } from 'antd';

import { ActorSubclass } from "@dfinity/agent";
import React from "react";
import {
  Bio,
  ProfileUpdate,
  _SERVICE,
} from "../../../declarations/avatar/avatar.did";
import { emptyProfile } from "../hooks";
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
                    }} src={this.props.profile?.bio.imageUrl} />
                <p className="profile_name">{this.props.profile?.bio.nickName}</p>
                <p className="profile_about">{this.props.profile?.bio.about}</p>
                <p className="profile_about">nickname:{this.props.profile?.bio.location}</p>
                <GithubOutlined />
            </div>
        );
    }
}

export default Profile;