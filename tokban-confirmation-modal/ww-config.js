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

    iconContent:   { hidden: true, defaultValue: [] },
    titleContent:  { hidden: true, defaultValue: [] },
    bodyContent:   { hidden: true, defaultValue: [] },
    footerContent: { hidden: true, defaultValue: [] },

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
        tooltip: 'Controls modal visibility. Bind to your confirmModal.visible variable.',
      },
      propertyHelp: {
        tooltip: 'Bind to a variable and set it to true from a workflow to show the modal.',
      },
      /* wwEditor:end */
    },

    // ── Icon circle color ──
    iconColor: {
      label: { en: 'Icon Color' },
      type: 'Color',
      section: 'settings',
      defaultValue: '#1565C0',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Icon color (hex). Used for the icon itself. The circle background is auto-derived unless iconBg is also bound.' },
      /* wwEditor:end */
    },

    // ── Icon circle background ──
    iconBg: {
      label: { en: 'Icon Circle Background' },
      type: 'Color',
      section: 'settings',
      defaultValue: '#E8F1FA',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Background color of the icon circle (hex). If left unbound, auto-derived as a light tint of iconColor.' },
      /* wwEditor:end */
    },

    // ══════════════════════════
    // INFO BANNER (blue box)
    // ══════════════════════════

    infoBannerText: {
      label: { en: 'Info Banner Text' },
      type: 'Text',
      section: 'settings',
      defaultValue: '',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Text/HTML shown in the blue info banner. Leave empty to hide.' },
      propertyHelp: { tooltip: 'Appears above the checklist. Supports HTML with <strong> tags.' },
      /* wwEditor:end */
    },
    infoBannerColor: {
      label: { en: 'Info Banner Color' },
      type: 'Color',
      section: 'settings',
      defaultValue: '#1565C0',
      bindable: true,
      hidden: (content) => !content?.infoBannerText,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Hex color for the info banner. Background and border are auto-derived as tints.' },
      /* wwEditor:end */
    },

    // ══════════════════════════
    // CHECKLIST ITEMS
    // ══════════════════════════

    checklistTitle: {
      label: { en: 'Checklist Section Title' },
      type: 'Text',
      section: 'settings',
      defaultValue: 'What changes:',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Optional heading above the checklist. Leave empty to hide.' },
      /* wwEditor:end */
    },
    checklistItems: {
      label: { en: 'Checklist Items' },
      type: 'Array',
      section: 'settings',
      bindable: true,
      defaultValue: [
        {
          id: '1',
          text: 'The entity becomes a <strong>headquarters (HQ)</strong> with a <strong>-HQ</strong> suffix',
          icon: 'check',
          iconColor: '#2563EB',
        },
        {
          id: '2',
          text: 'You can add <strong>branches</strong> with their own contacts, addresses, and payment accounts',
          icon: 'check',
          iconColor: '#2563EB',
        },
        {
          id: '3',
          text: 'Credit terms and discounts will be <strong>per branch</strong>',
          icon: 'check',
          iconColor: '#2563EB',
        },
      ],
      options: {
        expandable: true,
        getItemLabel(item) {
          // Strip HTML tags for readable label in editor
          return (item?.text || 'Item').replace(/<[^>]+>/g, '').substring(0, 50) || 'Item';
        },
        item: {
          type: 'Object',
          defaultValue: { id: 'new', text: 'New checklist item', icon: 'check', iconColor: '#2563EB' },
          options: {
            item: {
              id: {
                label: { en: 'ID' },
                type: 'Text',
              },
              text: {
                label: { en: 'Text (HTML supported)' },
                type: 'Text',
              },
              icon: {
                label: { en: 'Icon' },
                type: 'TextSelect',
                options: {
                  options: [
                    { value: 'check',   label: '✅ Check circle' },
                    { value: 'warning', label: '⚠️ Warning triangle' },
                    { value: 'info',    label: 'ℹ️ Info circle' },
                  ],
                },
              },
              iconColor: {
                label: { en: 'Icon Color' },
                type: 'Color',
              },
            },
          },
        },
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'array',
        tooltip: 'Array of checklist items. Each item: { id, text (HTML ok), icon (check|warning|info), iconColor }',
      },
      /* wwEditor:end */
    },
    checklistDefaultIconColor: {
      label: { en: 'Default Icon Color' },
      type: 'Color',
      section: 'settings',
      defaultValue: '#2563EB',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Fallback icon color used when individual items have no iconColor set' },
      /* wwEditor:end */
    },
    checklistGap: {
      label: { en: 'Checklist Row Gap' },
      type: 'Length',
      section: 'style',
      defaultValue: '10px',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Vertical gap between checklist rows' },
      /* wwEditor:end */
    },

    // ══════════════════════════
    // WARNING BANNER (amber box)
    // ══════════════════════════

    warningBannerText: {
      label: { en: 'Warning Banner Text' },
      type: 'Text',
      section: 'settings',
      defaultValue: '',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Text/HTML shown in the warning banner. Leave empty to hide.' },
      propertyHelp: { tooltip: 'Appears below the checklist. Use for irreversible action warnings.' },
      /* wwEditor:end */
    },
    warningBannerColor: {
      label: { en: 'Warning Banner Color' },
      type: 'Color',
      section: 'settings',
      defaultValue: '#FFB300',
      bindable: true,
      hidden: (content) => !content?.warningBannerText,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Hex color for the warning banner. Background and border are auto-derived as tints.' },
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
      bindingValidation: { type: 'string', tooltip: 'Optional HTML rendered below the body dropzone.' },
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
      bindingValidation: { type: 'string', tooltip: 'Text displayed on the confirm button' },
      /* wwEditor:end */
    },
    confirmColor: {
      label: { en: 'Confirm Button Color' },
      type: 'Color',
      section: 'settings',
      defaultValue: '#1565C0',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Confirm button background color (hex).' },
      /* wwEditor:end */
    },
    cancelText: {
      label: { en: 'Cancel Button Text' },
      type: 'Text',
      section: 'settings',
      defaultValue: 'Cancel',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Text displayed on the cancel button' },
      /* wwEditor:end */
    },
    showCancelButton: {
      label: { en: 'Show Cancel Button' },
      type: 'OnOff',
      section: 'settings',
      defaultValue: true,
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'boolean', tooltip: 'Toggle to hide the cancel button for non-dismissible confirmations' },
      /* wwEditor:end */
    },

    // ── Loading State ──
    loading: {
      label: { en: 'Loading State' },
      type: 'OnOff',
      section: 'settings',
      defaultValue: false,
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'boolean', tooltip: 'Bind to your async workflow state to show spinner on confirm button' },
      propertyHelp: { tooltip: 'When true, shows a spinner on the confirm button and disables all interactions. Bind to your workflow loading variable.' },
      /* wwEditor:end */
    },
    loadingText: {
      label: { en: 'Loading Button Text' },
      type: 'Text',
      section: 'settings',
      defaultValue: 'Processing...',
      bindable: true,
      hidden: (content) => !content?.loading,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Button text shown while loading' },
      /* wwEditor:end */
    },
    autoLoading: {
      label: { en: 'Auto Loading on Confirm' },
      type: 'OnOff',
      section: 'settings',
      defaultValue: true,
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'boolean', tooltip: 'When ON: clicking confirm auto-shows spinner and waits for visible=false to close. When OFF: modal closes immediately on confirm.' },
      propertyHelp: { tooltip: 'Recommended ON for async DB operations. Your workflow sets visible=false when done.' },
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
      bindingValidation: { type: 'string', tooltip: 'If set, user must type this exact text to enable confirm. Leave empty for simple confirmation.' },
      propertyHelp: { tooltip: 'Set to entity name or "DELETE" to require the user to type it before confirming.' },
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
      bindingValidation: { type: 'string', tooltip: 'Label above the typed confirmation input. Supports HTML.' },
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
      bindingValidation: { type: 'string', tooltip: 'Placeholder text for the typed confirmation input' },
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
      bindingValidation: { type: 'string', tooltip: 'Action identifier passed in the confirm event for workflow routing.' },
      propertyHelp: { tooltip: 'Included in the confirm trigger event. Use in your workflow to route actions (e.g. "convert_multi_branch").' },
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
      bindingValidation: { type: 'boolean', tooltip: 'Whether clicking the backdrop closes the modal' },
      /* wwEditor:end */
    },
    closeOnEscape: {
      label: { en: 'Close on Escape Key' },
      type: 'OnOff',
      section: 'settings',
      defaultValue: true,
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'boolean', tooltip: 'Whether pressing Escape closes the modal' },
      /* wwEditor:end */
    },
    confirmOnEnter: {
      label: { en: 'Confirm on Enter Key' },
      type: 'OnOff',
      section: 'settings',
      defaultValue: false,
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'boolean', tooltip: 'Whether pressing Enter triggers confirm (only when confirm is enabled)' },
      /* wwEditor:end */
    },

    // ═══════════════════════════════════════
    // STYLE TAB
    // ═══════════════════════════════════════

    modalMaxWidth: {
      label: { en: 'Max Width' },
      type: 'Length',
      section: 'style',
      defaultValue: '448px',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Maximum width of the modal panel' },
      /* wwEditor:end */
    },
    borderRadius: {
      label: { en: 'Border Radius' },
      type: 'Length',
      section: 'style',
      defaultValue: '12px',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Border radius of the modal panel' },
      /* wwEditor:end */
    },
    panelBackground: {
      label: { en: 'Panel Background' },
      type: 'Color',
      section: 'style',
      defaultValue: '#ffffff',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Background color of the modal panel' },
      /* wwEditor:end */
    },
    backdropColor: {
      label: { en: 'Backdrop Color' },
      type: 'Color',
      section: 'style',
      defaultValue: 'rgba(0,0,0,0.4)',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Backdrop overlay color (use rgba for opacity)' },
      /* wwEditor:end */
    },
    backdropBlur: {
      label: { en: 'Backdrop Blur' },
      type: 'Length',
      section: 'style',
      defaultValue: '2px',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Backdrop blur intensity' },
      /* wwEditor:end */
    },
    footerBorderColor: {
      label: { en: 'Footer Border Color' },
      type: 'Color',
      section: 'style',
      defaultValue: '#f3f4f6',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Color of the divider line above the footer' },
      /* wwEditor:end */
    },
    footerBackground: {
      label: { en: 'Footer Background' },
      type: 'Color',
      section: 'style',
      defaultValue: 'transparent',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Background color of the footer area' },
      /* wwEditor:end */
    },
    confirmBtnBorderRadius: {
      label: { en: 'Confirm Btn Radius' },
      type: 'Length',
      section: 'style',
      defaultValue: '8px',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Border radius of the confirm button' },
      /* wwEditor:end */
    },
    cancelBtnColor: {
      label: { en: 'Cancel Btn Color' },
      type: 'Color',
      section: 'style',
      defaultValue: '#4b5563',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Text color of the cancel button' },
      /* wwEditor:end */
    },
    inputBorderRadius: {
      label: { en: 'Input Border Radius' },
      type: 'Length',
      section: 'style',
      defaultValue: '8px',
      bindable: true,
      hidden: (content) => !content?.requireTyped,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Border radius of the typed confirmation input' },
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
      bindingValidation: { type: 'string', tooltip: 'Border color of the typed confirmation input' },
      /* wwEditor:end */
    },
  },
};
