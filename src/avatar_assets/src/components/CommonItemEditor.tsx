import { remove, set } from "local-storage";
import React from "react";
import {
  ProfileUpdate,
  _SERVICE,
} from "../../../declarations/avatar/avatar.did";
import toast from "react-hot-toast";
import { emptyProfile } from "../hooks";
import { useContext } from "react";
import { AppContext } from "../App";
import { useHistory } from "react-router-dom";
import { PageHeader, Input, Button } from "antd"; 

interface Props {
  onBack: () => void;
}

const CommonItemEditor = (props: Props) => {
  const { setIsAuthenticated, isAuthenticated, actor, profile, updateProfile } =
    useContext(AppContext);
  const history = useHistory();


  function handleCreationError() {
    remove("profile");
    setIsAuthenticated?.(false);
    updateProfile?.(emptyProfile);
    toast.error("There was a problem creating your profile");
  }

  const submitCallback = async (profile: ProfileUpdate) => {
    // Save profile locally
    set("profile", JSON.stringify(profile));

    // Optimistic update
    updateProfile?.(profile);
    toast.success("Profile created");
    history.push("/manage");

    // Handle creation and verification async
    actor?.create(profile).then(async (createResponse) => {
      if ("ok" in createResponse) {
        // const profileResponse = await actor.read();
        // if ("ok" in profileResponse) {
        //   // Do nothing, we already updated
        // } else {
        //   console.error(profileResponse.err);
        //   handleCreationError();
        // }
      } else {
        handleCreationError();
        remove("ic-delegation");
        console.error(createResponse.err);
      }
    });
  };

  return (
    <div className="editor_common_item_module">
    <PageHeader
      className="site-page-header"
      onBack={props.onBack}
      title="NFT橱柜"
    />
    <Input placeholder="输入标题"></Input>
    <Input placeholder="添加链接"></Input>
    <Button value="large" type="primary" shape="round" onClick={props.onBack} block>保存</Button>
    <p>展示具体要呈现的内容</p>
    </div>

  );
};

export default CommonItemEditor;
