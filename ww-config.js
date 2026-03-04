export default {
  editor: {
    label: {
      en: 'Tokban Confirmation Modal',
    },
    icon: 'alert',
  },
  triggerEvents: [
    {
      name: 'confirm',
      label: { en: 'On confirm' },
      event: { action: '', typedValue: '' },
    },
    {
      name: 'cancel',
      label: { en: 'On cancel' },
      event: {},
    },
    {
      name: 'close',
      label: { en: 'On close' },
      event: { reason: '' },
    },
    {
      name: 'typed-value-change',
      label: { en: 'On typed value change' },
      event: { value: '' },
    },
  ],
  properties: {
    // ── Visibility ──
    visible: {
      label: { en: 'Visible' },
      type: 'OnOff',
      section: 'settings',
      defaultValue: false,
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip:
          'Controls modal visibility. Bind to your confirmModal.visible variable.',
      },
      propertyHelp: {
        tooltip:
          'Toggle modal visibility. Bind this to a variable and set it to true from a workflow to show the modal.',
      },
      /* wwEditor:end */
    },

    // ── Icon ──
    icon: {
      label: { en: 'Icon' },
      type: 'TextSelect',
      section: 'settings',
      options: {
        options: [
          { value: 'warning', label: 'Warning' },
          { value: 'trash', label: 'Trash' },
          { value: 'building', label: 'Building' },
          { value: 'check', label: 'Check' },
        ],
      },
      defaultValue: 'warning',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Icon type: warning | trash | building | check',
      },
      /* wwEditor:end */
    },
    iconColor: {
      label: { en: 'Icon Color' },
      type: 'TextSelect',
      section: 'settings',
      options: {
        options: [
          { value: 'red', label: 'Red' },
          { value: 'amber', label: 'Amber' },
          { value: 'blue', label: 'Blue' },
          { value: 'green', label: 'Green' },
        ],
      },
      defaultValue: 'red',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Icon color theme: red | amber | blue | green',
      },
      /* wwEditor:end */
    },

    // ── Content ──
    title: {
      label: { en: 'Title' },
      type: 'Text',
      section: 'settings',
      defaultValue: 'Confirm Action',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Modal title text',
      },
      /* wwEditor:end */
    },
    subtitle: {
      label: { en: 'Subtitle' },
      type: 'Text',
      section: 'settings',
      defaultValue: '',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Optional subtitle below the title. Leave empty to hide.',
      },
      /* wwEditor:end */
    },
    bodyHtml: {
      label: { en: 'Body HTML' },
      type: 'Text',
      section: 'settings',
      defaultValue: '<p>Are you sure you want to proceed?</p>',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip:
          'HTML content for the modal body. Supports rich HTML with inline styles.',
      },
      propertyHelp: {
        tooltip:
          'Accepts HTML string. Use inline styles for formatting. Build the HTML in your workflow and bind it here.',
      },
      /* wwEditor:end */
    },

    // ── Buttons ──
    confirmText: {
      label: { en: 'Confirm Button Text' },
      type: 'Text',
      section: 'settings',
      defaultValue: 'Confirm',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Text displayed on the confirm button',
      },
      /* wwEditor:end */
    },
    confirmColor: {
      label: { en: 'Confirm Button Color' },
      type: 'TextSelect',
      section: 'settings',
      options: {
        options: [
          { value: 'red', label: 'Red' },
          { value: 'blue', label: 'Blue' },
          { value: 'green', label: 'Green' },
          { value: 'amber', label: 'Amber' },
        ],
      },
      defaultValue: 'red',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Confirm button color: red | blue | green | amber',
      },
      /* wwEditor:end */
    },
    cancelText: {
      label: { en: 'Cancel Button Text' },
      type: 'Text',
      section: 'settings',
      defaultValue: 'Cancel',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Text displayed on the cancel button',
      },
      /* wwEditor:end */
    },

    // ── Typed Confirmation ──
    requireTyped: {
      label: { en: 'Required Typed Text' },
      type: 'Text',
      section: 'settings',
      defaultValue: '',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip:
          'If set, user must type this exact text to enable the confirm button. Leave empty for simple confirmation.',
      },
      propertyHelp: {
        tooltip:
          'Leave empty for simple confirmation. Set a value (e.g. entity name) to require the user to type it before confirming.',
      },
      /* wwEditor:end */
    },
    typedLabel: {
      label: { en: 'Typed Input Label' },
      type: 'Text',
      section: 'settings',
      defaultValue: 'Type to confirm',
      bindable: true,
      hidden: (content) => !content?.requireTyped,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip:
          'Label above the typed confirmation input. Supports HTML.',
      },
      /* wwEditor:end */
    },
    typedPlaceholder: {
      label: { en: 'Typed Input Placeholder' },
      type: 'Text',
      section: 'settings',
      defaultValue: 'Type to confirm',
      bindable: true,
      hidden: (content) => !content?.requireTyped,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Placeholder text for the typed confirmation input',
      },
      /* wwEditor:end */
    },

    // ── Action Routing ──
    onConfirmAction: {
      label: { en: 'Confirm Action ID' },
      type: 'Text',
      section: 'settings',
      defaultValue: '',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip:
          'Action identifier passed in the confirm event. Use in your workflow to route to the correct action.',
      },
      propertyHelp: {
        tooltip:
          'Included in the confirm trigger event. Use it in your workflow to determine which action to take (e.g. "remove_branch", "deactivate").',
      },
      /* wwEditor:end */
    },

    // ── Behavior ──
    closeOnBackdropClick: {
      label: { en: 'Close on Backdrop Click' },
      type: 'OnOff',
      section: 'settings',
      defaultValue: true,
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'Whether clicking the backdrop closes the modal',
      },
      /* wwEditor:end */
    },
    closeOnEscape: {
      label: { en: 'Close on Escape Key' },
      type: 'OnOff',
      section: 'settings',
      defaultValue: true,
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'Whether pressing Escape closes the modal',
      },
      /* wwEditor:end */
    },

    // ── Style ──
    modalMaxWidth: {
      label: { en: 'Modal Max Width' },
      type: 'Length',
      section: 'style',
      defaultValue: '448px',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Maximum width of the modal panel (e.g. 448px, 32rem)',
      },
      /* wwEditor:end */
    },
  },
};
