/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';

type ContactUsProps = {
  fields: {
    Title: Field<string>;
    Name: Field<string>;
    Email: Field<string>;
    Message: Field<string>;
    CTAText: Field<string>;
  };
};

const ContactUs = (props: ContactUsProps): JSX.Element => {
  return (
    <>
      <div className="box form">
        <h2>
          <Text field={props.fields.Title} />
        </h2>
        <div id="p_lt_ctl01_pP_p_lt_ctl00_BizForm_viewBiz">
          <div className="form">
            <label>
              <Text field={props.fields.Name} />
            </label>
            <input type="text" className="form-control" />
            <label>
              <Text field={props.fields.Email} />
            </label>
            <input type="text" className="form-control" />
            <label>
              <Text field={props.fields.Message} />
            </label>
            <textarea rows={2} cols={20} className="form-control"></textarea>
          </div>
          <input
            type="submit"
            value={props.fields.CTAText.value}
            className="FormButton btn btn-primary"
          />
        </div>
      </div>
    </>
  );
};

export default ContactUs;
