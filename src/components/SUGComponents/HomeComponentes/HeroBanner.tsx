/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ImageField, LinkField, Text, Link } from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';

type HeroBannerProps = {
  fields: {
    Title: Field<string>;
    Description: Field<string>;
    Image: ImageField;
    CTA: LinkField;
    CTAText: Field<string>;
  };
};

const HeroBanner = (props: HeroBannerProps): JSX.Element => {
  return (
    <>
      <section id="banner" style={{ backgroundImage: `url(${props.fields.Image.value?.src})` }}>
        <div className="g-w">
          <div className="g-p">
            <div className="g-g">
              <div className="g-u-1 g-u-lg-1-2">
                <h1>{props.fields.Title.value}</h1>
                <p>{props.fields.Description.value}</p>
                <Link field={props.fields.CTA} className="btn red bold big">
                  <Text field={props.fields.CTAText} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroBanner;
