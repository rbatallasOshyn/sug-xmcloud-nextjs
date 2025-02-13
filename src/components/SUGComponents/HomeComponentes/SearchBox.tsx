/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';

type SearchBoxProps = {
  fields: {
    Title: Field<string>;
    Label: Field<string>;
  };
};

const SearchBox = (props: SearchBoxProps): JSX.Element => {
  return (
    <>
      <div className="box form">
        <h2>
          <Text field={props.fields.Title} />
        </h2>
        <div className="form">
          <label>
            <Text field={props.fields.Label} />
          </label>
          <input type="text" />
          <input type="submit" value="Submit" className="btn btn-primary btn-default" />
        </div>
      </div>
    </>
  );
};

export default SearchBox;
