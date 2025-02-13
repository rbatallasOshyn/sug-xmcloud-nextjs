/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, RichText, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';

interface RouteFields {
  [key: string]: unknown;
  Title?: Field;
}

const PageBodyText = (): JSX.Element => {
  const context = useSitecoreContext();
  const fields = context.sitecoreContext.route?.fields as RouteFields;
  const contentField = fields.Content as Field<string>;
  return <RichText field={contentField} />;
};

export default PageBodyText;
