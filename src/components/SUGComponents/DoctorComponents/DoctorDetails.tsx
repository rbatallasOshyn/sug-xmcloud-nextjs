/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useSitecoreContext,
  Text,
  Field,
  RichText,
  LinkField,
  Link,
  ImageField,
  NextImage,
} from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';

interface RouteFields {
  [key: string]: unknown;
  Title?: Field;
}

const DoctorDetails = (): JSX.Element => {
  const context = useSitecoreContext();
  const fields = context.sitecoreContext.route?.fields as RouteFields;
  const contentField = fields.Content as Field<string>;
  const doctorName = fields.Name as Field<string>;
  const CTA = fields.CTA as LinkField;
  const CTAText = fields.CTAText as Field<string>;
  const specialty = fields.Specialty as Field<string>;
  const photo = fields.Photo as ImageField;
  return (
    <>
      <div className="g-g">
        <div className="g-u-1-5">
          <NextImage field={photo} />
        </div>
        <div className="g-u-4-5">
          <h1 className="doctor-name">
            <Text field={doctorName} />
          </h1>
          <span className="doctor-position">
            <Text field={specialty} />
          </span>
          <RichText field={contentField} />
          <Link field={CTA} className="btn red bold big">
            <Text field={CTAText} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default DoctorDetails;
