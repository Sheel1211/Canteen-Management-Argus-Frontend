import React from "react";
import Footer from "rc-footer";
import "rc-footer/assets/index.css";

const FooterComponent = () => {
  return (
    <>
      <Footer
        theme="dark"
        columns={[
          {
            icon: (
              <img src="https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg" />
            ),
            title: "CMS",
          },
        ]}
        bottom="Made with ❤️ by Argus"
      />
    </>
  );
};

export default FooterComponent;
