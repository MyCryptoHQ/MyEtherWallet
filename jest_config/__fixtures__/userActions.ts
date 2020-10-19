import repIcon from '@assets/images/rep-logo.svg';
import { ACTION_CATEGORIES, ACTION_STATE, ActionTemplate, ExtendedUserAction, TUuid } from '@types';

export const fActionTemplates: ActionTemplate[] = [
  {
    name: 'dummy_0',
    icon: repIcon,
    heading: 'dummy action 0',
    body: ['dummy action body', 'another one'],
    priority: 0,
    button: {
      content: 'the rabit hole',
      to: '/settings',
      external: false
    },
    category: ACTION_CATEGORIES.MYC_EXPERIENCE
  },
  {
    name: 'dummy_1',
    icon: repIcon,
    heading: 'dummy action 1',
    body: ['dummy action body', 'another one'],
    priority: 0,
    button: {
      content: 'the rabit hole',
      to: '/settings',
      external: false
    },
    category: ACTION_CATEGORIES.MIGRATION
  },
  {
    name: 'dummy_2',
    icon: repIcon,
    heading: 'dummy action 2',
    body: ['dummy action body', 'another one'],
    priority: 0,
    button: {
      content: 'the rabit hole',
      to: '/settings',
      external: false
    },
    category: ACTION_CATEGORIES.SECURITY
  },
  {
    name: 'dummy_3',
    icon: repIcon,
    heading: 'dummy action 3',
    body: ['dummy action body', 'another one'],
    priority: 0,
    button: {
      content: 'the rabit hole',
      to: '/settings',
      external: false
    },
    category: ACTION_CATEGORIES.SELF_LOVE
  },
  {
    name: 'dummy_4',
    icon: repIcon,
    heading: 'dummy action 4',
    body: ['dummy action body', 'another one'],
    priority: 0,
    button: {
      content: 'the rabit hole',
      to: '/settings',
      external: false
    },
    category: ACTION_CATEGORIES.THIRD_PARTY
  },
  {
    name: 'dummy_5',
    icon: repIcon,
    heading: 'dummy action 5',
    body: ['dummy action body', 'another one'],
    priority: 0,
    button: {
      content: 'the rabit hole',
      to: '/settings',
      external: false
    },
    category: ACTION_CATEGORIES.SECURITY
  },
  {
    name: 'dummy_6',
    icon: repIcon,
    heading: 'dummy action 6',
    body: ['dummy action body', 'another one'],
    priority: 10,
    button: {
      content: 'the rabit hole',
      to: '/settings',
      external: false
    },
    category: ACTION_CATEGORIES.SELF_LOVE
  }
];

export const fUserActions: ExtendedUserAction[] = [
  {
    uuid: '19345669-8bad-4597-b541-02486696fcc1' as TUuid,
    name: 'update_label',
    state: ACTION_STATE.NEW
  }
];
