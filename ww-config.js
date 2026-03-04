export default {
  editor: {
    label: {
      en: 'Tokban Confirmation Modal',
    },
    icon: 'alert',
  },
  properties: {
    title: {
      label: { en: 'Title' },
      type: 'Text',
      defaultValue: 'Confirm Action',
      section: 'settings',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Modal title text',
      },
      /* wwEditor:end */
    },
  },
};
