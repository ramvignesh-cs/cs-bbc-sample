import { useEffect, useState } from "react";
import { AssetSDK } from "../../cs-sdk/entry";
import { cms } from "../../constants/cms";

import "./navBar.css";

const NavBar = () => {
  const [logo, setLogo] = useState("");

  useEffect(() => {
    async function fetchLogo() {
      const logoAsset = await AssetSDK.getAsset(cms.asset_uid.appLogo);
      setLogo(logoAsset.url);
    }
    fetchLogo();
  }, []);
  return (
    <div className="navBar_container">
      <img className="app_logo" src={logo} alt="BBC Logo" />
      <div className="navBar_links">
        <a href="/news">News</a>
        <a href="/sports">Sports</a>
      </div>
    </div>
  );
};

export default NavBar;
