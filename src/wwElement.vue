<template>
  <div class="tokban-modal-root" :style="rootCssVars">
    <div
      v-if="showModal"
      class="tokban-modal-backdrop"
      :class="{ active: backdropActive }"
      @click.self="handleBackdropClick"
    >
      <div
        class="tokban-modal-panel"
        :class="{ closing: isClosing }"
        :style="panelStyle"
      >
        <!-- ═══ Header ═══ -->
        <div class="tokban-modal-header">
          <div class="tokban-modal-header-row">
            <!-- Icon circle: styled by iconColor, user drops icon inside -->
            <div class="tokban-modal-icon-wrap" :style="iconWrapStyle">
              <wwLayout
                path="iconContent"
                class="tokban-modal-icon-dropzone"
              />
            </div>

            <!-- Title area: user drops Text elements for title + subtitle -->
            <div class="tokban-modal-title-area">
              <wwLayout
                path="titleContent"
                direction="column"
                class="tokban-modal-title-dropzone"
              />
            </div>
          </div>
        </div>

        <!-- ═══ Body ═══ -->
        <div class="tokban-modal-body">
          <!-- Dropzone: drag & drop any WeWeb elements -->
          <wwLayout
            path="bodyContent"
            direction="column"
            class="tokban-modal-body-dropzone"
          />

          <!-- Optional: Dynamic HTML from bound variable -->
          <div
            v-if="content?.bodyHtml"
            class="tokban-modal-body-html"
            v-html="content.bodyHtml"
          ></div>

          <!-- Built-in: Typed confirmation -->
          <div v-if="content?.requireTyped" class="tokban-modal-typed-section">
            <label
              v-if="content?.typedLabel"
              class="tokban-modal-typed-label"
              v-html="content.typedLabel"
            ></label>
            <input
              ref="typedInputRef"
              type="text"
              class="tokban-modal-typed-input"
              :placeholder="content?.typedPlaceholder || 'Type to confirm'"
              :value="typedValue"
              @input="handleTypedInput"
            />
          </div>
        </div>

        <!-- ═══ Footer ═══ -->
        <div class="tokban-modal-footer">
          <!-- Optional: extra footer content dropzone -->
          <wwLayout
            path="footerContent"
            direction="row"
            class="tokban-modal-footer-dropzone"
          />

          <!-- Built-in buttons -->
          <div class="tokban-modal-footer-buttons">
            <button class="tokban-modal-cancel-btn" @click="handleCancel">
              {{ content?.cancelText || 'Cancel' }}
            </button>
            <button
              class="tokban-modal-confirm-btn"
              :disabled="!confirmEnabled"
              :style="confirmBtnStyle"
              @click="handleConfirm"
            >
              {{ content?.confirmText || 'Confirm' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';

const ICON_BG_MAP = {
  red: '#fef2f2',
  blue: '#eff6ff',
  green: '#f0fdf4',
  amber: '#fffbeb',
};

const BTN_COLOR_MAP = {
  red: '#ef4444',
  blue: '#2563eb',
  green: '#16a34a',
  amber: '#d97706',
};

export default {
  props: {
    uid: { type: String, required: true },
    content: { type: Object, required: true },
    /* wwEditor:start */
    wwEditorState: { type: Object, required: true },
    /* wwEditor:end */
  },
  emits: ['trigger-event'],
  setup(props, { emit }) {
    // ── Internal Variables ──
    const { value: isOpen, setValue: setIsOpen } =
      wwLib.wwVariable.useComponentVariable({
        uid: props.uid,
        name: 'isOpen',
        type: 'boolean',
        defaultValue: false,
      });

    const { value: typedValue, setValue: setTypedValue } =
      wwLib.wwVariable.useComponentVariable({
        uid: props.uid,
        name: 'typedValue',
        type: 'string',
        defaultValue: '',
      });

    // ── Animation State ──
    const showModal = ref(false);
    const backdropActive = ref(false);
    const isClosing = ref(false);
    const typedInputRef = ref(null);

    // ── CSS Variables ──
    const rootCssVars = computed(() => ({
      '--backdrop-color': props.content?.backdropColor || 'rgba(0,0,0,0.4)',
      '--backdrop-blur': props.content?.backdropBlur || '2px',
      '--panel-radius': props.content?.borderRadius || '12px',
      '--panel-bg': props.content?.panelBackground || '#ffffff',
      '--footer-border': props.content?.footerBorderColor || '#f3f4f6',
      '--footer-bg': props.content?.footerBackground || 'transparent',
      '--btn-radius': props.content?.confirmBtnBorderRadius || '8px',
      '--cancel-color': props.content?.cancelBtnColor || '#4b5563',
      '--input-radius': props.content?.inputBorderRadius || '8px',
      '--input-border': props.content?.inputBorderColor || '#d1d5db',
    }));

    // ── Computed ──
    const iconWrapStyle = computed(() => ({
      backgroundColor:
        ICON_BG_MAP[props.content?.iconColor] || ICON_BG_MAP.red,
    }));

    const panelStyle = computed(() => ({
      maxWidth: props.content?.modalMaxWidth || '448px',
    }));

    const confirmBtnStyle = computed(() => ({
      backgroundColor:
        BTN_COLOR_MAP[props.content?.confirmColor] || BTN_COLOR_MAP.red,
    }));

    const confirmEnabled = computed(() => {
      const required = props.content?.requireTyped;
      if (!required) return true;
      return (typedValue.value || '').trim() === required;
    });

    // ── Open / Close ──
    const openModal = () => {
      showModal.value = true;
      isClosing.value = false;
      setTypedValue('');
      setIsOpen(true);
      nextTick(() => {
        backdropActive.value = true;
        if (props.content?.requireTyped && typedInputRef.value) {
          typedInputRef.value.focus();
        }
      });
    };

    const closeModal = (reason) => {
      if (isClosing.value) return;
      isClosing.value = true;
      backdropActive.value = false;
      setTimeout(() => {
        showModal.value = false;
        isClosing.value = false;
        setIsOpen(false);
        setTypedValue('');
        if (reason !== 'external') {
          emit('trigger-event', { name: 'close', event: { reason } });
        }
      }, 150);
    };

    // ── Watch visible prop ──
    watch(
      () => props.content?.visible,
      (newVal) => {
        if (newVal && !showModal.value) {
          openModal();
        } else if (!newVal && showModal.value && !isClosing.value) {
          closeModal('external');
        }
      },
      { immediate: true }
    );

    // ── Event Handlers ──
    const handleBackdropClick = () => {
      if (props.content?.closeOnBackdropClick !== false) {
        closeModal('backdrop');
      }
    };

    const handleCancel = () => {
      emit('trigger-event', { name: 'cancel', event: {} });
      closeModal('cancel');
    };

    const handleConfirm = () => {
      if (!confirmEnabled.value) return;
      emit('trigger-event', {
        name: 'confirm',
        event: {
          action: props.content?.onConfirmAction || '',
          typedValue: typedValue.value || '',
        },
      });
      closeModal('confirm');
    };

    const handleTypedInput = (e) => {
      const val = e?.target?.value ?? '';
      setTypedValue(val);
      emit('trigger-event', {
        name: 'typed-value-change',
        event: { value: val },
      });
    };

    // ── Keyboard ──
    const handleKeydown = (e) => {
      if (
        e?.key === 'Escape' &&
        showModal.value &&
        props.content?.closeOnEscape !== false
      ) {
        closeModal('escape');
      }
    };

    onMounted(() => {
      const frontDoc = wwLib.getFrontDocument();
      if (frontDoc) {
        frontDoc.addEventListener('keydown', handleKeydown);
      }
    });

    onBeforeUnmount(() => {
      const frontDoc = wwLib.getFrontDocument();
      if (frontDoc) {
        frontDoc.removeEventListener('keydown', handleKeydown);
      }
    });

    // ── Editor ──
    /* wwEditor:start */
    const isEditing = computed(() => props.wwEditorState?.isEditing);
    /* wwEditor:end */

    return {
      showModal,
      backdropActive,
      isClosing,
      typedInputRef,
      rootCssVars,
      iconWrapStyle,
      panelStyle,
      confirmBtnStyle,
      confirmEnabled,
      typedValue,
      handleBackdropClick,
      handleCancel,
      handleConfirm,
      handleTypedInput,
      /* wwEditor:start */
      isEditing,
      /* wwEditor:end */
    };
  },
};
</script>

<style scoped>
.tokban-modal-root {
  position: relative;
}

/* ── Backdrop ── */
.tokban-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--backdrop-color);
  backdrop-filter: blur(var(--backdrop-blur));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 9999;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.tokban-modal-backdrop.active {
  opacity: 1;
  pointer-events: auto;
}

/* ── Panel Animations ── */
@keyframes tokban-modal-in {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes tokban-modal-out {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(8px) scale(0.98);
  }
}

/* ── Panel ── */
.tokban-modal-panel {
  background: var(--panel-bg);
  border-radius: var(--panel-radius);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  width: 100%;
  animation: tokban-modal-in 0.2s ease-out forwards;
}

.tokban-modal-panel.closing {
  animation: tokban-modal-out 0.15s ease-in forwards;
}

/* ── Header ── */
.tokban-modal-header {
  padding: 24px 24px 8px;
}

.tokban-modal-header-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

/* Icon circle — styled by iconColor, user drops icon inside */
.tokban-modal-icon-wrap {
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}

.tokban-modal-icon-dropzone {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

/* wwEditor:start */
.tokban-modal-icon-dropzone:empty::after {
  content: '+';
  color: rgba(0, 0, 0, 0.25);
  font-size: 18px;
  font-weight: 300;
  pointer-events: none;
}
/* wwEditor:end */

/* Title area — user drops Text elements for title + subtitle */
.tokban-modal-title-area {
  flex: 1;
  min-width: 0;
}

.tokban-modal-title-dropzone {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

/* wwEditor:start */
.tokban-modal-title-dropzone:empty {
  min-height: 40px;
  border: 2px dashed #d0d0d0;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tokban-modal-title-dropzone:empty::after {
  content: 'Drop title / subtitle here';
  color: #999;
  font-size: 12px;
  font-style: italic;
  pointer-events: none;
}

.tokban-modal-title-dropzone:hover:empty {
  border-color: #007aff;
  background: rgba(0, 122, 255, 0.04);
}
/* wwEditor:end */

/* ── Body ── */
.tokban-modal-body {
  padding: 16px 24px;
}

.tokban-modal-body-dropzone {
  min-height: 0;
}

/* wwEditor:start */
.tokban-modal-body-dropzone:empty {
  min-height: 48px;
  border: 2px dashed #d0d0d0;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.02);
}

.tokban-modal-body-dropzone:empty::after {
  content: 'Drop body content here';
  color: #999;
  font-size: 13px;
  font-style: italic;
  pointer-events: none;
}

.tokban-modal-body-dropzone:hover:empty {
  border-color: #007aff;
  background: rgba(0, 122, 255, 0.04);
}
/* wwEditor:end */

.tokban-modal-body-dropzone:not(:empty) {
  display: flex;
  flex-direction: column;
}

/* Optional HTML body */
.tokban-modal-body-html {
  font-size: 14px;
  line-height: 1.5;
  color: #374151;
  margin-top: 8px;
}

.tokban-modal-body-html :deep(p) {
  margin: 0 0 8px;
}

.tokban-modal-body-html :deep(p:last-child) {
  margin-bottom: 0;
}

.tokban-modal-body-html :deep(ul) {
  margin: 8px 0;
  padding-left: 0;
  list-style: none;
}

.tokban-modal-body-html :deep(li) {
  margin-bottom: 6px;
}

.tokban-modal-body-html :deep(strong) {
  font-weight: 600;
}

/* ── Typed Confirmation ── */
.tokban-modal-typed-section {
  margin-top: 16px;
}

.tokban-modal-typed-label {
  display: block;
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 6px;
  line-height: 1.4;
}

.tokban-modal-typed-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--input-border);
  border-radius: var(--input-radius);
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  font-family: inherit;
  box-sizing: border-box;
}

.tokban-modal-typed-input:focus {
  border-color: #9ca3af;
  box-shadow: 0 0 0 3px rgba(156, 163, 175, 0.15);
}

/* ── Footer ── */
.tokban-modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid var(--footer-border);
  background: var(--footer-bg);
  border-radius: 0 0 var(--panel-radius) var(--panel-radius);
}

/* Footer dropzone for optional extra content */
.tokban-modal-footer-dropzone {
  flex: 0 0 auto;
  min-height: 0;
}

/* wwEditor:start */
.tokban-modal-footer-dropzone:empty {
  min-height: 32px;
  min-width: 48px;
  border: 2px dashed #d0d0d0;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: auto;
}

.tokban-modal-footer-dropzone:empty::after {
  content: '+';
  color: #999;
  font-size: 14px;
  pointer-events: none;
}

.tokban-modal-footer-dropzone:hover:empty {
  border-color: #007aff;
}
/* wwEditor:end */

.tokban-modal-footer-dropzone:not(:empty) {
  margin-right: auto;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tokban-modal-footer-buttons {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.tokban-modal-cancel-btn {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--cancel-color);
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.15s;
  font-family: inherit;
  border-radius: 6px;
}

.tokban-modal-cancel-btn:hover {
  color: #1f2937;
}

.tokban-modal-confirm-btn {
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  border: none;
  border-radius: var(--btn-radius);
  cursor: pointer;
  transition: filter 0.15s, opacity 0.15s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  font-family: inherit;
}

.tokban-modal-confirm-btn:hover:not(:disabled) {
  filter: brightness(0.9);
}

.tokban-modal-confirm-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
