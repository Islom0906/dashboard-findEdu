import React from 'react';
import {MdOutlineManageAccounts,MdSubject,MdOutlineReviews} from 'react-icons/md';
import {FaGlobeAmericas, FaGraduationCap} from 'react-icons/fa'
import {SiBookstack} from 'react-icons/si';
import {HiOutlineCode} from 'react-icons/hi';

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
        icon: <FaGraduationCap />,
        path: '/sample/page-1',
      },
      {
        id: 'langs',
        title: 'Languages',
        messageId: 'sidebar.sample.langs',
        type: 'item',
        icon: <FaGlobeAmericas />,
        path: '/sample/languages',
      },
      {
        id: 'programs',
        title: 'Programs',
        messageId: 'sidebar.sample.programs',
        type: 'item',
        icon: <HiOutlineCode />,
        path: '/sample/programs',
      },
      {
        id: 'subjects',
        title: 'Subjects',
        messageId: 'sidebar.sample.subjects',
        type: 'item',
        icon: <SiBookstack />,
        path: '/sample/subjects',
      },
      {
        id: 'other',
        title: 'Others',
        messageId: 'sidebar.sample.other',
        type: 'item',
        icon: <MdSubject />,
        path: '/sample/others',
      },
      {
        id: 'reviews',
        title: 'Reviews',
        messageId: 'sidebar.sample.reviews',
        type: 'item',
        icon: <MdOutlineReviews />,
        path: '/sample/reviews',
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
