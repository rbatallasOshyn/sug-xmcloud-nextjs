/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LinkField, Text, TextField, Link } from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';
import MenuNavigation from './MenuNavigation';

type HeaderProps = {
  fields: {
    CTA: LinkField;
    CTAText: TextField;
    MenuButtonText: TextField;
  };
};

const Header = (props: HeaderProps): JSX.Element => {
  if (props?.fields) {
    return (
      <div className="g-w">
        <div className="g-p">
          <div className="g-g">
            <div className="g-u-1 g-u-lg-2-5">
              <Link field={props.fields.CTA} className="logo">
                <Text field={props.fields.CTAText} />
              </Link>
              <span className="menu btn">{<Text field={props.fields.MenuButtonText} />}</span>
            </div>
            <MenuNavigation />
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Header Here</h1>;
  }
};

export default Header;
