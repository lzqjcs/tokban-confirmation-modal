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
    // ═══════════════════════════════════════
    // DROPZONES — Appear in the element tree
    // ═══════════════════════════════════════

    iconContent: {
      hidden: true,
      defaultValue: [],
    },
    titleContent: {
      hidden: true,
      defaultValue: [],
    },
    bodyContent: {
      hidden: true,
      defaultValue: [],
    },
    footerContent: {
      hidden: true,
      defaultValue: [],
    },

    // ═══════════════════════════════════════
    // SETTINGS TAB
    // ═══════════════════════════════════════

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
          'Bind to a variable and set it to true from a workflow to show the modal.',
      },
      /* wwEditor:end */
    },

    // ── Icon circle color ──
    iconColor: {
      label: { en: 'Icon Circle Color' },
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
        tooltip: 'Icon circle background: red | amber | blue | green',
      },
      propertyHelp: {
        tooltip:
          'Sets the background color of the icon circle. Drop your icon element into the iconContent area in the tree.',
      },
      /* wwEditor:end */
    },

    // ── Body HTML (optional supplement to dropzone) ──
    bodyHtml: {
      label: { en: 'Body HTML (optional)' },
      type: 'Text',
      section: 'settings',
      defaultValue: '',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip:
          'Optional HTML rendered below the body dropzone. For dynamic content from workflows.',
      },
      propertyHelp: {
        tooltip:
          'For static content, drop elements into bodyContent in the tree. Use this for dynamic HTML built in workflows.',
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
          'If set, user must type this exact text to enable confirm. Leave empty for simple confirmation.',
      },
      propertyHelp: {
        tooltip:
          'Set a value (e.g. entity name) to require the user to type it before confirming.',
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
        tooltip: 'Label above the typed confirmation input. Supports HTML.',
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
          'Action identifier passed in the confirm event for workflow routing.',
      },
      propertyHelp: {
        tooltip:
          'Included in the confirm trigger event. Use in your workflow to route actions (e.g. "remove_branch").',
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

    // ═══════════════════════════════════════
    // STYLE TAB
    // ═══════════════════════════════════════

    // ── Panel ──
    modalMaxWidth: {
      label: { en: 'Max Width' },
      type: 'Length',
      section: 'style',
      defaultValue: '448px',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Maximum width of the modal panel',
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
    panelBackground: {
      label: { en: 'Panel Background' },
      type: 'Color',
      section: 'style',
      defaultValue: '#ffffff',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Background color of the modal panel',
      },
      /* wwEditor:end */
    },

    // ── Backdrop ──
    backdropColor: {
      label: { en: 'Backdrop Color' },
      type: 'Color',
      section: 'style',
      defaultValue: 'rgba(0,0,0,0.4)',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Backdrop overlay color (use rgba for opacity)',
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

    // ── Footer ──
    footerBorderColor: {
      label: { en: 'Footer Border Color' },
      type: 'Color',
      section: 'style',
      defaultValue: '#f3f4f6',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Color of the divider line above the footer',
      },
      /* wwEditor:end */
    },
    footerBackground: {
      label: { en: 'Footer Background' },
      type: 'Color',
      section: 'style',
      defaultValue: 'transparent',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Background color of the footer area',
      },
      /* wwEditor:end */
    },

    // ── Buttons ──
    confirmBtnBorderRadius: {
      label: { en: 'Confirm Btn Radius' },
      type: 'Length',
      section: 'style',
      defaultValue: '8px',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Border radius of the confirm button',
      },
      /* wwEditor:end */
    },
    cancelBtnColor: {
      label: { en: 'Cancel Btn Color' },
      type: 'Color',
      section: 'style',
      defaultValue: '#4b5563',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Text color of the cancel button',
      },
      /* wwEditor:end */
    },

    // ── Input ──
    inputBorderRadius: {
      label: { en: 'Input Border Radius' },
      type: 'Length',
      section: 'style',
      defaultValue: '8px',
      bindable: true,
      hidden: (content) => !content?.requireTyped,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Border radius of the typed confirmation input',
      },
      /* wwEditor:end */
    },
    inputBorderColor: {
      label: { en: 'Input Border Color' },
      type: 'Color',
      section: 'style',
      defaultValue: '#d1d5db',
      bindable: true,
      hidden: (content) => !content?.requireTyped,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Border color of the typed confirmation input',
      },
      /* wwEditor:end */
    },
  },
};
