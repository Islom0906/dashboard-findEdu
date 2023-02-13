import React from 'react';
import {BiAlignLeft} from 'react-icons/bi';
import {MdOutlineManageAccounts} from 'react-icons/md';

const routesConfig = [
  {
    id: 'app',
    title: 'Sample',
    messageId: 'sidebar.sample',
    type: 'group',
    children: [
      {
        id: 'page-1',
        title: 'Page 1',
        messageId: 'sidebar.sample.page1',
        type: 'item',
        icon: <BiAlignLeft />,
        path: '/sample/page-1',
      },
      {
        id: 'langs',
        title: 'Languages',
        messageId: 'sidebar.sample.langs',
        type: 'item',
        icon: <BiAlignLeft />,
        path: '/sample/langs',
      },
      {
        id: 'it',
        title: 'IT',
        messageId: 'sidebar.sample.it',
        type: 'item',
        icon: <BiAlignLeft />,
        path: '/sample/it',
      },
      {
        id: 'subjects',
        title: 'Subjects',
        messageId: 'sidebar.sample.subjects',
        type: 'item',
        icon: <BiAlignLeft />,
        path: '/sample/subjects',
      },
      {
        id: 'other',
        title: 'Others',
        messageId: 'sidebar.sample.other',
        type: 'item',
        icon: <BiAlignLeft />,
        path: '/sample/other',
      },
    ],
  },
  {
    id: 'extra-pages',
    title: 'Extra Pages',
    messageId: 'sidebar.pages.extraPages',
    path: 'extra-pages',
    type: 'group',
    children: [
      {
        id: 'account',
        title: 'Account',
        messageId: 'sidebar.pages.extraPages.account',
        icon: <MdOutlineManageAccounts />,
        path: '/extra-pages/user-profile',
      },
    ],
  },
];
export default routesConfig;
