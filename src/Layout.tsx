/**
 * This Layout is needed for Starter Kit.
 */
import React from 'react';
import Head from 'next/head';
import { Placeholder, LayoutServiceData, Field, HTMLLink } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';
import Scripts from 'src/Scripts';
import { Inter } from 'next/font/google';

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = config.publicUrl;

interface LayoutProps {
  layoutData: LayoutServiceData;
  headLinks: HTMLLink[];
}

interface RouteFields {
  [key: string]: unknown;
  Title?: Field;
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const Layout = ({ layoutData, headLinks }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;
  const fields = route?.fields as RouteFields;
  const isPageEditing = layoutData.sitecore.context.pageEditing;
  const mainClassPageEditing = isPageEditing ? 'editing-mode' : 'prod-mode';

  return (
    <>
      <Scripts />
      <Head>
        <title>{fields?.Title?.value?.toString() || 'Page'}</title>
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
        {headLinks.map((headLink) => (
          <link rel={headLink.rel} key={headLink.href} href={headLink.href} />
        ))}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="referrer" content="always" />
      </Head>

      {/* root placeholder for the app, which we add components to using route data */}
      <div className={`${inter.className} ${mainClassPageEditing}`}>
        <header>{route && <Placeholder name="headless-header" rendering={route} />}</header>
        {route && <Placeholder name="headless-banner" rendering={route} />}
        <section id="main">
          <div className="g-w">
            <div className="g-p">
              {route && <Placeholder name="headless-main" rendering={route} />}
            </div>
          </div>
        </section>
        <footer>{route && <Placeholder name="headless-footer" rendering={route} />}</footer>
      </div>
    </>
  );
};

export default Layout;
