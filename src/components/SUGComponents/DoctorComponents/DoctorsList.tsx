/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { GraphQLClient } from 'graphql-request';
import config from 'temp/config';
import React, { useEffect, useState } from 'react';
import {
  Field,
  useSitecoreContext,
  Text,
  ImageField,
  NextImage,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';

interface ItemField {
  Name: string;
  Value: string;
  JsonValue: any;
}

interface DoctorItem {
  Text: string;
  Url: string;
  Fields: ItemField[];
}

interface DoctorListItems {
  Doctors: DoctorItem[];
}

interface RouteFields {
  [key: string]: unknown;
  Title: Field<string>;
}

export const fetchDoctorList = async (language: string) => {
  const graphQLClient = new GraphQLClient(config.graphQLEndpoint);
  graphQLClient.setHeader('sc_apikey', config.sitecoreApiKey);
  const pageSourcePath = '/sitecore/content/SUGLATAM/Workshop/Workshop Site/Home/Doctors';
  const menuItemTemplateId = '{894EE557-6053-44E6-8630-14A46D760FE6}';

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
                fields{
                    name
                    value
                    jsonValue                
                  }
                }
            }
            }
        }
        }
    `;

  const data = await graphQLClient.request(query);

  const doctorList: DoctorListItems = {
    Doctors: [],
  };

  data.item.children.results.map((doctor: any) => {
    const doctorItem: DoctorItem = {
      Url: doctor.url.path,
      Text: doctor.name,
      Fields: [],
    };

    doctor.fields.map((doctorField: any) => {
      const fieldItem: ItemField = {
        Name: doctorField.name,
        Value: doctorField.value,
        JsonValue: doctorField.jsonValue,
      };
      doctorItem.Fields.push(fieldItem);
    });
    doctorList.Doctors.push(doctorItem);
  });
  return doctorList;
};

const DoctorsList = (): JSX.Element => {
  const [doctorListResult, setDoctorListResult] = useState<DoctorListItems | null>(null);
  const context = useSitecoreContext();
  const fields = context.sitecoreContext.route?.fields as RouteFields;

  useEffect(() => {
    fetchDoctorList('en').then((doctor) => {
      setDoctorListResult(doctor);
    });
  }, []);

  const liItems =
    doctorListResult &&
    doctorListResult.Doctors.map((item: DoctorItem, key: number) => {
      const photoField = item.Fields[1] as ItemField;
      const photo = photoField.JsonValue as ImageField;
      const specialtyField = item.Fields[2] as ItemField;
      const specialty = specialtyField.JsonValue as Field<string>;
      const nameField = item.Fields[0] as ItemField;
      const doctorName = nameField.JsonValue as Field<string>;

      return (
        <li key={key}>
          <div className="g-g">
            <div className="g-u-1-6">
              <NextImage field={photo} />
            </div>
            <div className="g-u-5-6">
              <Link href={item.Url.toLocaleLowerCase()} target="_self">
                <Text field={doctorName} />
              </Link>
              <p>
                <Text field={specialty} />
              </p>
            </div>
          </div>
        </li>
      );
    });

  return (
    <>
      <h1>
        <Text field={fields.Title} />
      </h1>
      <ul className="doctors">{liItems}</ul>
    </>
  );
};

export default DoctorsList;
