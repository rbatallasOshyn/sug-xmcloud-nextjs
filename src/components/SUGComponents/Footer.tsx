import React from 'react';
import { Field, RichText } from '@sitecore-jss/sitecore-jss-nextjs';

type FooterProps = {
  fields: {
    Content: Field<string>;
  };
};

const Footer = (props: FooterProps): JSX.Element => {
  return <RichText field={props.fields.Content} />;
};

export default Footer;
