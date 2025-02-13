/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { GraphQLClient } from 'graphql-request';
import config from 'temp/config';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface NavigationModel {
  Url: string;
  Text: string;
}

interface NavigationMenu {
  MenuItems: NavigationModel[];
}

const fetchMenuItems = async (language: string) => {
  const graphQLClient = new GraphQLClient(config.graphQLEndpoint);
  graphQLClient.setHeader('sc_apikey', config.sitecoreApiKey);
  const homePageSourcePath = '/sitecore/content/SUGLATAM/Workshop/Workshop Site/Home';
  const menuItemTemplateId = '{A956FDF7-E918-4BEE-9952-53B4E5D14DC5}';

  const query = `
    query {
      item(path: "${homePageSourcePath}", language: "${language}") {
        children(
          includeTemplateIDs: ["${menuItemTemplateId}"]
        ) {
          results {
            ... on Item {
              name
              id
              url{
                path
              }
            }
          }
        }
      }
    }
  `;

  const data = await graphQLClient.request(query);

  const menuList: NavigationMenu = {
    MenuItems: [],
  };

  data.item.children.results.map((menu: any) => {
    const menuItem: NavigationModel = {
      Url: menu.url.path,
      Text: menu.name,
    };
    menuList.MenuItems.push(menuItem);
  });

  return menuList;
};

const MenuNavigation = (): JSX.Element => {
  const [menuItemResult, setMenuItemResult] = useState<NavigationMenu | null>(null);

  useEffect(() => {
    fetchMenuItems('en').then((menu) => {
      setMenuItemResult(menu);
    });
  }, []);

  const liItems =
    menuItemResult &&
    menuItemResult.MenuItems.map((item: NavigationModel, key: number) => {
      return (
        <li key={key}>
          <Link href={item.Url.toLowerCase()} target="_self">
            {item.Text}
          </Link>
        </li>
      );
    });
  return (
    <div className="g-u-1 g-u-lg-3-5" id="menu">
      <nav>
        <ul>{liItems}</ul>
      </nav>
    </div>
  );
};

export default MenuNavigation;
