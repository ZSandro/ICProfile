import { clear, remove, set } from "local-storage";
import { Form, Input, Button, Checkbox, Image } from 'antd';
import { ActorSubclass } from "@dfinity/agent";
import React from "react";
import {
  ProfileUpdate,
  _SERVICE,
} from "../../../declarations/avatar/avatar.did";
import { emptyProfile } from "../hooks";

interface Props {
//  onChange: (value: string) => void;
  profile?: ProfileUpdate;
  submitCallback: (profile?: ProfileUpdate) => void;
  actor?: ActorSubclass<_SERVICE>;
}


function ProfileSelectIcon(props: Props) {

  const handleClick = () => {

  };


  return (
    <section>
      <div className="editor_profile_Subtitle_style">
      Social links
      </div>
      <div className="editor_selectIcon_box">
        <Button className="editor_selectIcon_first_style">
        <img className="editor_selectIconImage_style" src={"../../assets/instagram_band.png"} >
        </img>
        </Button>

        <Button className="editor_selectIcon_style">
        <img className="editor_selectIconImage_style" src={"../../assets/twitter_band.png"} >
        </img>
        </Button>

        <Button className="editor_selectIcon_style">
        <img className="editor_selectIconImage_style" src={"../../assets/facebook_band.png"} >
        </img>
        </Button>
        
      </div>
    </section>
  );
}

export default ProfileSelectIcon;
