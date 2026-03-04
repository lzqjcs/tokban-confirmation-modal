export default {
  editor: {
    label: {
      en: 'Tokban Confirmation Modal',
    },
    icon: 'alert',
  },
  properties: {
    // ═══════════════════════════════════════
    // VISIBILITY
    // ═══════════════════════════════════════
    visible: {
      label: { en: 'Visible' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: false,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'Controls modal visibility',
      },
      propertyHelp: {
        tooltip: 'Toggle modal open/closed. Bind to a variable to control programmatically.',
      },
      /* wwEditor:end */
    },

    // ═══════════════════════════════════════
    // ICON
    // ═══════════════════════════════════════
    icon: {
      label: { en: 'Icon' },
      type: 'TextSelect',
      section: 'settings',
      options: {
        options: [
          { value: 'trash', label: 'Trash' },
          { value: 'warning', label: 'Warning' },
          { value: 'building', label: 'Building' },
          { value: 'check', label: 'Check' },
          { value: 'none', label: 'None' },
        ],
      },
      defaultValue: 'warning',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Icon type: trash | warning | building | check | none',
      },
      propertyHelp: {
        tooltip: 'Choose the icon shown in the modal header.',
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
      hidden: (content) => content?.icon === 'none',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Icon color theme: red | amber | blue | green',
      },
      propertyHelp: {
        tooltip: 'Sets the icon circle background and icon stroke/fill color.',
      },
      /* wwEditor:end */
    },

    // ═══════════════════════════════════════
    // HEADER TEXT
    // ═══════════════════════════════════════
    title: {
      label: { en: 'Title' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Confirm Action',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Modal title text',
      },
      propertyHelp: {
        tooltip: 'The main heading displayed in the modal.',
      },
      /* wwEditor:end */
    },
    subtitle: {
      label: { en: 'Subtitle' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: '',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Optional subtitle text. Leave empty to hide.',
      },
      propertyHelp: {
        tooltip: 'Secondary text below the title. Leave empty to hide.',
      },
      /* wwEditor:end */
    },

    // ═══════════════════════════════════════
    // BODY
    // ═══════════════════════════════════════
    bodyHtml: {
      label: { en: 'Body HTML' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: '<p style="font-size:14px;color:#4b5563;">Are you sure you want to proceed?</p>',
      options: {
        textarea: true,
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'HTML content for the modal body',
      },
      propertyHelp: {
        tooltip: 'Rich HTML content rendered in the modal body. Supports any valid HTML.',
      },
      /* wwEditor:end */
    },
    bodyBg: {
      label: { en: 'Body Background' },
      type: 'TextSelect',
      section: 'settings',
      options: {
        options: [
          { value: 'none', label: 'None' },
          { value: 'red', label: 'Red tint' },
          { value: 'amber', label: 'Amber tint' },
          { value: 'blue', label: 'Blue tint' },
          { value: 'green', label: 'Green tint' },
        ],
      },
      defaultValue: 'none',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Body section background tint: none | red | amber | blue | green',
      },
      /* wwEditor:end */
    },

    // ═══════════════════════════════════════
    // CONFIRM BUTTON
    // ═══════════════════════════════════════
    confirmText: {
      label: { en: 'Confirm Button Text' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Confirm',
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
      bindable: true,
      defaultValue: 'Cancel',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Text displayed on the cancel button',
      },
      /* wwEditor:end */
    },

    // ═══════════════════════════════════════
    // TYPED CONFIRMATION
    // ═══════════════════════════════════════
    requireTyped: {
      label: { en: 'Require Typed Confirmation' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: '',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Text the user must type to enable confirm. Leave empty to disable.',
      },
      propertyHelp: {
        tooltip: 'If set, the user must type this exact string to enable the confirm button. Leave empty for simple confirmation.',
      },
      /* wwEditor:end */
    },
    typedLabel: {
      label: { en: 'Typed Confirm Label' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Type to confirm',
      hidden: (content) => !content?.requireTyped,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Label text above the typed confirmation input. Supports HTML.',
      },
      /* wwEditor:end */
    },
    typedPlaceholder: {
      label: { en: 'Typed Input Placeholder' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Type to confirm',
      hidden: (content) => !content?.requireTyped,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Placeholder text for the typed confirmation input',
      },
      /* wwEditor:end */
    },

    // ═══════════════════════════════════════
    // BEHAVIOR
    // ═══════════════════════════════════════
    closeOnBackdrop: {
      label: { en: 'Close on Backdrop Click' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: true,
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
      bindable: true,
      defaultValue: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'Whether pressing Escape closes the modal',
      },
      /* wwEditor:end */
    },

    // ═══════════════════════════════════════
    // ACTION IDENTIFIER (for workflow routing)
    // ═══════════════════════════════════════
    onConfirmAction: {
      label: { en: 'Confirm Action ID' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: '',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Action identifier passed with the confirm event for workflow routing',
      },
      propertyHelp: {
        tooltip: 'An identifier string (e.g. "remove_branch") emitted with the confirm trigger so your workflow can route to the correct action.',
      },
      /* wwEditor:end */
    },

    // ═══════════════════════════════════════
    // STYLING
    // ═══════════════════════════════════════
    maxWidth: {
      label: { en: 'Max Width' },
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
    borderRadius: {
      label: { en: 'Border Radius' },
      type: 'Length',
      section: 'style',
      defaultValue: '12px',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Border radius of the modal panel',
      },
      /* wwEditor:end */
    },
    backdropColor: {
      label: { en: 'Backdrop Color' },
      type: 'Color',
      section: 'style',
      defaultValue: 'rgba(0,0,0,0.4)',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Backdrop overlay color',
      },
      /* wwEditor:end */
    },
    backdropBlur: {
      label: { en: 'Backdrop Blur' },
      type: 'Length',
      section: 'style',
      defaultValue: '2px',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Backdrop blur intensity',
      },
      /* wwEditor:end */
    },
    fontFamily: {
      label: { en: 'Font Family' },
      type: 'Text',
      section: 'style',
      defaultValue: "'DM Sans', system-ui, sans-serif",
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'CSS font-family for the modal',
      },
      /* wwEditor:end */
    },
  },
  triggerEvents: [
    {
      name: 'confirm',
      label: { en: 'On confirm' },
      event: {
        action: '',
      },
      /* wwEditor:start */
      default: true,
      /* wwEditor:end */
    },
    {
      name: 'cancel',
      label: { en: 'On cancel' },
      event: {},
    },
    {
      name: 'close',
      label: { en: 'On close' },
      event: {
        reason: '',
      },
    },
    {
      name: 'open',
      label: { en: 'On open' },
      event: {},
    },
    {
      name: 'typed-input',
      label: { en: 'On typed input change' },
      event: {
        value: '',
        isMatch: false,
      },
    },
  ],
};
