/* eslint-disable @typescript-eslint/no-unused-vars */
import { Placeholder, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';

const ShortTwoColumns = (): JSX.Element => {
  const context = useSitecoreContext();
  const route = context.sitecoreContext.route;
  return (
    <>
      <div className="g-g">
        <div className="g-u-1 g-u-lg-1-5">
          {route && <Placeholder name="col-1" rendering={route} />}
        </div>
        <div className="g-u-1 g-u-lg-4-5">
          {route && <Placeholder name="col-2" rendering={route} />}
        </div>
      </div>
    </>
  );
};

export default ShortTwoColumns;
