/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { GraphQLClient } from 'graphql-request';
import config from 'temp/config';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface SpecialtyModel {
  Url: string;
  Text: string;
}

interface SpelcialtyItems {
  MenuItems: SpecialtyModel[];
}

export const fetchSpecialtyList = async (language: string) => {
  const graphQLClient = new GraphQLClient(config.graphQLEndpoint);
  graphQLClient.setHeader('sc_apikey', config.sitecoreApiKey);
  const pageSourcePath = '/sitecore/content/SUGLATAM/Workshop/Workshop Site/Home/Medical Centers';
  const menuItemTemplateId = '{A956FDF7-E918-4BEE-9952-53B4E5D14DC5}';

  const query = `
        query {
        item(path: "${pageSourcePath}", language: "${language}") {
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

  const menuList: SpelcialtyItems = {
    MenuItems: [],
  };

  data.item.children.results.map((menu: any) => {
    const menuItem: SpecialtyModel = {
      Url: menu.url.path,
      Text: menu.name,
    };
    menuList.MenuItems.push(menuItem);
  });

  return menuList;
};

const SpecialtyList = (): JSX.Element => {
  const [menuItemResult, setMenuItemResult] = useState<SpelcialtyItems | null>(null);

  useEffect(() => {
    fetchSpecialtyList('en').then((menu) => {
      setMenuItemResult(menu);
    });
  }, []);

  const liItems =
    menuItemResult &&
    menuItemResult.MenuItems.map((item: SpecialtyModel, key: number) => {
      return (
        <li key={key}>
          <Link href={item.Url.toLowerCase()} target="_self">
            {item.Text}
          </Link>
        </li>
      );
    });
  return (
    <div className="treeMenu">
      <ul>{liItems}</ul>
    </div>
  );
};

export default SpecialtyList;
