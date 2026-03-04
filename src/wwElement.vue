<template>
  <div class="tokban-modal-root">
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
        <!-- Header with icon -->
        <div class="tokban-modal-header">
          <div class="tokban-modal-header-row">
            <div class="tokban-modal-icon-wrap" :style="iconWrapStyle">
              <svg v-if="currentIcon === 'trash'" class="tokban-modal-icon-svg" :style="iconColorStyle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
              <svg v-else-if="currentIcon === 'warning'" class="tokban-modal-icon-svg" :style="iconColorStyle" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
              <svg v-else-if="currentIcon === 'building'" class="tokban-modal-icon-svg" :style="iconColorStyle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
              <svg v-else-if="currentIcon === 'check'" class="tokban-modal-icon-svg" :style="iconColorStyle" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="tokban-modal-title-group">
              <h3 class="tokban-modal-title">{{ content?.title || '' }}</h3>
              <p v-if="content?.subtitle" class="tokban-modal-subtitle">{{ content.subtitle }}</p>
            </div>
          </div>
        </div>

        <!-- Body -->
        <div class="tokban-modal-body">
          <div
            v-if="content?.bodyHtml"
            class="tokban-modal-body-content"
            v-html="content.bodyHtml"
          ></div>

          <!-- Typed confirmation -->
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

        <!-- Footer -->
        <div class="tokban-modal-footer">
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
</template>

<script>
import { computed, ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';

const ICON_BG_MAP = {
  red: '#fef2f2',
  blue: '#eff6ff',
  green: '#f0fdf4',
  amber: '#fffbeb',
};

const ICON_COLOR_MAP = {
  red: '#dc2626',
  blue: '#2563eb',
  green: '#16a34a',
  amber: '#d97706',
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

    // ── Computed ──
    const currentIcon = computed(() => props.content?.icon || 'warning');

    const iconWrapStyle = computed(() => ({
      backgroundColor:
        ICON_BG_MAP[props.content?.iconColor] || ICON_BG_MAP.red,
    }));

    const iconColorStyle = computed(() => ({
      color: ICON_COLOR_MAP[props.content?.iconColor] || ICON_COLOR_MAP.red,
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
        emit('trigger-event', { name: 'close', event: { reason } });
      }, 150);
    };

    // ── Watch visible prop ──
    watch(
      () => props.content?.visible,
      (newVal) => {
        if (newVal && !showModal.value) {
          openModal();
        } else if (!newVal && showModal.value && !isClosing.value) {
          backdropActive.value = false;
          showModal.value = false;
          setIsOpen(false);
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
      currentIcon,
      iconWrapStyle,
      iconColorStyle,
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
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
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
  background: #ffffff;
  border-radius: 12px;
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
  align-items: center;
  gap: 12px;
}

.tokban-modal-icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.tokban-modal-icon-svg {
  width: 20px;
  height: 20px;
}

.tokban-modal-title-group {
  min-width: 0;
}

.tokban-modal-title {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 0;
  line-height: 1.3;
}

.tokban-modal-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 2px 0 0;
  line-height: 1.4;
}

/* ── Body ── */
.tokban-modal-body {
  padding: 16px 24px;
}

.tokban-modal-body-content {
  font-size: 14px;
  line-height: 1.5;
  color: #374151;
}

.tokban-modal-body-content :deep(p) {
  margin: 0 0 8px;
}

.tokban-modal-body-content :deep(p:last-child) {
  margin-bottom: 0;
}

.tokban-modal-body-content :deep(ul) {
  margin: 8px 0;
  padding-left: 0;
  list-style: none;
}

.tokban-modal-body-content :deep(li) {
  margin-bottom: 6px;
}

.tokban-modal-body-content :deep(strong) {
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
  border: 1px solid #d1d5db;
  border-radius: 8px;
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
  border-top: 1px solid #f3f4f6;
}

.tokban-modal-cancel-btn {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #4b5563;
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
  border-radius: 8px;
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
