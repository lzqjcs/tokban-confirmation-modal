export default {
  editor: {
    label: { en: 'Tokban Confirmation Modal' },
    icon: 'alert',
  },
  triggerEvents: [
    { name: 'confirm',            label: { en: 'On confirm'           }, event: { action: '', typedValue: '', inputValue: '' } },
    { name: 'cancel',             label: { en: 'On cancel'            }, event: {} },
    { name: 'close',              label: { en: 'On close'             }, event: { reason: '' } },
    { name: 'typed-value-change', label: { en: 'On typed value change'}, event: { value: '' } },
    { name: 'input-value-change', label: { en: 'On input value change'}, event: { value: '' } },
  ],
  properties: {

    // ─────────────────────────────────────────
    // DROPZONE (icon fallback only)
    // ─────────────────────────────────────────
    iconContent: { hidden: true, defaultValue: [] },

    // ─────────────────────────────────────────
    // VISIBILITY
    // ─────────────────────────────────────────
    visible: {
      label: { en: 'Visible' }, type: 'OnOff', section: 'settings', defaultValue: false, bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'boolean', tooltip: 'Bind to your confirmModal variable. Set true to open, false to close.' },
      propertyHelp:      { tooltip: 'Bind to a boolean variable and set it true from a workflow to show the modal.' },
      /* wwEditor:end */
    },

    // ─────────────────────────────────────────
    // HEADER — icon
    // ─────────────────────────────────────────
    iconName: {
      label: { en: 'Icon Name' }, type: 'Text', section: 'settings', defaultValue: 'warning', bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Material Symbols icon name. e.g. warning, check_circle, delete_forever, business, store' },
      propertyHelp:      { tooltip: 'Bind to confirmModal.icon. Full list: fonts.google.com/icons' },
      /* wwEditor:end */
    },
    iconColor: {
      label: { en: 'Icon Color' }, type: 'Color', section: 'settings', defaultValue: '#1565C0', bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Hex color for the icon glyph. Also used to auto-derive icon circle background if iconBg is not bound.' },
      /* wwEditor:end */
    },
    iconBg: {
      label: { en: 'Icon Circle Background' }, type: 'Color', section: 'settings', defaultValue: '#E8F1FA', bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Hex color for the icon circle background. If not bound, auto-derived as a 90% lightened tint of iconColor.' },
      /* wwEditor:end */
    },
    iconSize: {
      label: { en: 'Icon Size' }, type: 'Length', section: 'settings', defaultValue: '20px', bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Font size of the Material icon glyph' },
      /* wwEditor:end */
    },

    // ─────────────────────────────────────────
    // HEADER — title & subtitle
    // ─────────────────────────────────────────
    title: {
      label: { en: 'Title' }, type: 'Text', section: 'settings', defaultValue: 'Confirm action', bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Modal title. Supports HTML. Bind to confirmModal.title' },
      /* wwEditor:end */
    },
    subtitle: {
      label: { en: 'Subtitle' }, type: 'Text', section: 'settings', defaultValue: '', bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Optional subtitle below the title. Leave empty to hide. Bind to confirmModal.subtitle' },
      /* wwEditor:end */
    },

    // ─────────────────────────────────────────
    // BODY — info banner (top)
    // ─────────────────────────────────────────
    infoBannerText: {
      label: { en: 'Info Banner Text' }, type: 'Text', section: 'settings', defaultValue: '', bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Text/HTML shown in the info banner at the top of the body. Leave empty to hide. Bind to confirmModal.infoBannerText' },
      /* wwEditor:end */
    },
    infoBannerColor: {
      label: { en: 'Info Banner Color' }, type: 'Color', section: 'settings', defaultValue: '#1565C0', bindable: true,
      hidden: (content) => !content?.infoBannerText,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Hex color for the info banner. Background and border are auto-derived as lighter tints.' },
      /* wwEditor:end */
    },

    // ─────────────────────────────────────────
    // BODY — body text
    // ─────────────────────────────────────────
    bodyHtml: {
      label: { en: 'Body Text (HTML)' }, type: 'Text', section: 'settings', defaultValue: '', bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Main body text. Supports HTML (<strong>, <br> etc). Bind to confirmModal.body' },
      /* wwEditor:end */
    },

    // ─────────────────────────────────────────
    // BODY — checklist
    // ─────────────────────────────────────────
    checklistTitle: {
      label: { en: 'Checklist Section Title' }, type: 'Text', section: 'settings', defaultValue: '', bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Optional heading above the checklist items. Leave empty to hide.' },
      /* wwEditor:end */
    },
    checklistItems: {
      label: { en: 'Checklist Items' }, type: 'Array', section: 'settings', bindable: true, defaultValue: [],
      options: {
        expandable: true,
        getItemLabel(item) { return (item?.text || 'Item').replace(/<[^>]+>/g, '').substring(0, 50) || 'Item'; },
        item: {
          type: 'Object',
          defaultValue: { id: 'new', text: 'Checklist item', icon: 'check', iconColor: '' },
          options: {
            item: {
              id:        { label: { en: 'ID' },                  type: 'Text' },
              text:      { label: { en: 'Text (HTML ok)' },       type: 'Text' },
              icon: {
                label: { en: 'Icon' }, type: 'TextSelect',
                options: { options: [
                  { value: 'check',   label: '✅ Check circle' },
                  { value: 'x',       label: '✕ X circle (danger)' },
                  { value: 'warning', label: '⚠️ Warning triangle' },
                ]},
              },
              iconColor: { label: { en: 'Icon Color (hex, optional)' }, type: 'Color' },
            },
          },
        },
      },
      /* wwEditor:start */
      bindingValidation: { type: 'array', tooltip: 'Bind to confirmModal.checklist. Array of { id, text, icon, iconColor }' },
      /* wwEditor:end */
    },
    checklistIconColor: {
      label: { en: 'Default Checklist Icon Color' }, type: 'Color', section: 'settings', defaultValue: '#E53935', bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Fallback icon color for checklist items that have no iconColor set' },
      /* wwEditor:end */
    },

    // ─────────────────────────────────────────
    // BODY — warning banner (bottom)
    // ─────────────────────────────────────────
    warningBannerText: {
      label: { en: 'Warning Banner Text' }, type: 'Text', section: 'settings', defaultValue: '', bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Text/HTML shown in the warning banner below the checklist. Leave empty to hide. Bind to confirmModal.bannerText' },
      /* wwEditor:end */
    },
    warningBannerColor: {
      label: { en: 'Warning Banner Color' }, type: 'Color', section: 'settings', defaultValue: '#FFB300', bindable: true,
      hidden: (content) => !content?.warningBannerText,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Hex color for the warning banner. Background and border are auto-derived as lighter tints.' },
      /* wwEditor:end */
    },

    // ─────────────────────────────────────────
    // BODY — free-text input (e.g. branch name)
    // ─────────────────────────────────────────
    inputLabel: {
      label: { en: 'Input Field Label' }, type: 'Text', section: 'settings', defaultValue: '', bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'If set, shows a free-text input field. Use for "add_branch" and "convert_to_multi" to collect a branch name. Leave empty to hide. Bind to confirmModal.inputLabel' },
      propertyHelp:      { tooltip: 'Confirm button is disabled until the user types something in this field. The value is passed as event.inputValue on confirm.' },
      /* wwEditor:end */
    },
    inputPlaceholder: {
      label: { en: 'Input Field Placeholder' }, type: 'Text', section: 'settings', defaultValue: '', bindable: true,
      hidden: (content) => !content?.inputLabel,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Placeholder text for the free-text input field. Bind to confirmModal.inputPlaceholder' },
      /* wwEditor:end */
    },
    inputHelp: {
      label: { en: 'Input Field Help Text' }, type: 'Text', section: 'settings', defaultValue: '', bindable: true,
      hidden: (content) => !content?.inputLabel,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Small helper text shown below the input field. Bind to confirmModal.inputHelp' },
      /* wwEditor:end */
    },

    // ─────────────────────────────────────────
    // TYPED CONFIRMATION
    // ─────────────────────────────────────────
    requireTyped: {
      label: { en: 'Required Typed Text' }, type: 'Text', section: 'settings', defaultValue: '', bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'If set, user must type this exact text to enable confirm. Leave empty for simple confirmation. Bind to confirmModal.requireTyped' },
      /* wwEditor:end */
    },
    typedLabel: {
      label: { en: 'Typed Input Label' }, type: 'Text', section: 'settings', defaultValue: 'Type to confirm', bindable: true,
      hidden: (content) => !content?.requireTyped,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Label above the typed input. Supports HTML. Bind to confirmModal.typedLabel' },
      /* wwEditor:end */
    },
    typedPlaceholder: {
      label: { en: 'Typed Input Placeholder' }, type: 'Text', section: 'settings', defaultValue: 'Type to confirm', bindable: true,
      hidden: (content) => !content?.requireTyped,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Placeholder text inside the typed confirmation input' },
      /* wwEditor:end */
    },

    // ─────────────────────────────────────────
    // FOOTER — buttons
    // ─────────────────────────────────────────
    confirmText: {
      label: { en: 'Confirm Button Text' }, type: 'Text', section: 'settings', defaultValue: 'Confirm', bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Bind to confirmModal.confirmText' },
      /* wwEditor:end */
    },
    confirmColor: {
      label: { en: 'Confirm Button Color' }, type: 'Color', section: 'settings', defaultValue: '#F08227', bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Hex background color of the confirm button. Bind to confirmModal.confirmColor' },
      /* wwEditor:end */
    },
    cancelText: {
      label: { en: 'Cancel Button Text' }, type: 'Text', section: 'settings', defaultValue: 'Cancel', bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Text displayed on the cancel button' },
      /* wwEditor:end */
    },
    showCancelButton: {
      label: { en: 'Show Cancel Button' }, type: 'OnOff', section: 'settings', defaultValue: true, bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'boolean', tooltip: 'Toggle to hide the cancel button' },
      /* wwEditor:end */
    },
    loadingText: {
      label: { en: 'Loading Button Text' }, type: 'Text', section: 'settings', defaultValue: 'Processing...', bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Button text shown while loading spinner is active' },
      /* wwEditor:end */
    },

    // ─────────────────────────────────────────
    // BEHAVIOR
    // ─────────────────────────────────────────
    onConfirmAction: {
      label: { en: 'Confirm Action ID' }, type: 'Text', section: 'settings', defaultValue: '', bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Passed in the confirm event for workflow routing. Bind to confirmModal.action or entityAction variable.' },
      /* wwEditor:end */
    },
    loading: {
      label: { en: 'Loading State' }, type: 'OnOff', section: 'settings', defaultValue: false, bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'boolean', tooltip: 'When true, shows spinner on confirm button and disables all interactions.' },
      /* wwEditor:end */
    },
    autoLoading: {
      label: { en: 'Auto Loading on Confirm' }, type: 'OnOff', section: 'settings', defaultValue: true, bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'boolean', tooltip: 'ON: clicking confirm auto-shows spinner, modal closes when visible=false. OFF: modal closes immediately on confirm.' },
      propertyHelp:      { tooltip: 'Recommended ON for async DB operations. Your workflow sets visible=false when the operation completes.' },
      /* wwEditor:end */
    },
    closeOnBackdropClick: {
      label: { en: 'Close on Backdrop Click' }, type: 'OnOff', section: 'settings', defaultValue: true, bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'boolean', tooltip: 'Whether clicking outside the modal closes it' },
      /* wwEditor:end */
    },
    closeOnEscape: {
      label: { en: 'Close on Escape Key' }, type: 'OnOff', section: 'settings', defaultValue: true, bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'boolean', tooltip: 'Whether pressing Escape closes the modal' },
      /* wwEditor:end */
    },
    confirmOnEnter: {
      label: { en: 'Confirm on Enter Key' }, type: 'OnOff', section: 'settings', defaultValue: false, bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'boolean', tooltip: 'Whether pressing Enter triggers confirm (only when confirm is enabled)' },
      /* wwEditor:end */
    },

    // ─────────────────────────────────────────
    // STYLE TAB
    // ─────────────────────────────────────────
    maxWidth: {
      label: { en: 'Max Width' }, type: 'Length', section: 'style', defaultValue: '448px', bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Maximum width of the modal panel' },
      /* wwEditor:end */
    },
    borderRadius: {
      label: { en: 'Panel Border Radius' }, type: 'Length', section: 'style', defaultValue: '12px', bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Border radius of the modal panel' },
      /* wwEditor:end */
    },
    btnRadius: {
      label: { en: 'Button Border Radius' }, type: 'Length', section: 'style', defaultValue: '8px', bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Border radius applied to both the confirm and cancel buttons' },
      /* wwEditor:end */
    },
    panelBg: {
      label: { en: 'Panel Background' }, type: 'Color', section: 'style', defaultValue: '#ffffff', bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Background color of the modal panel' },
      /* wwEditor:end */
    },
    footerBorder: {
      label: { en: 'Footer Border Color' }, type: 'Color', section: 'style', defaultValue: '#F4F4F4', bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Color of the divider line above the footer buttons' },
      /* wwEditor:end */
    },
    cancelColor: {
      label: { en: 'Cancel Button Color' }, type: 'Color', section: 'style', defaultValue: '#616161', bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Text color of the cancel button' },
      /* wwEditor:end */
    },
    inputRadius: {
      label: { en: 'Input Border Radius' }, type: 'Length', section: 'style', defaultValue: '8px', bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Border radius of the typed confirmation input' },
      /* wwEditor:end */
    },
    inputBorder: {
      label: { en: 'Input Border Color' }, type: 'Color', section: 'style', defaultValue: '#C9C9C9', bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Default border color of the typed confirmation input' },
      /* wwEditor:end */
    },
    checklistGap: {
      label: { en: 'Checklist Row Gap' }, type: 'Length', section: 'style', defaultValue: '10px', bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Vertical gap between checklist rows' },
      /* wwEditor:end */
    },
  },
};
