<template>
  <div
    v-if="isVisible"
    class="tokban-modal-backdrop"
    :style="backdropStyles"
    @click.self="handleBackdropClick"
  >
    <div class="tokban-modal-panel" :style="panelStyles">
      <!-- Header with icon -->
      <div class="tokban-modal-header">
        <div class="tokban-modal-header-row">
          <!-- Icon circle -->
          <div
            v-if="content?.icon !== 'none'"
            class="tokban-modal-icon-wrap"
            :style="iconWrapStyles"
          >
            <!-- Trash icon -->
            <svg
              v-if="content?.icon === 'trash'"
              class="tokban-modal-icon"
              :style="iconStyles"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <!-- Warning icon -->
            <svg
              v-if="content?.icon === 'warning'"
              class="tokban-modal-icon"
              :style="iconStyles"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            <!-- Building icon -->
            <svg
              v-if="content?.icon === 'building'"
              class="tokban-modal-icon"
              :style="iconStyles"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <!-- Check icon -->
            <svg
              v-if="content?.icon === 'check'"
              class="tokban-modal-icon"
              :style="iconStyles"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <!-- Title & subtitle -->
          <div class="tokban-modal-titles">
            <h3 class="tokban-modal-title">{{ content?.title || 'Confirm' }}</h3>
            <p
              v-if="content?.subtitle"
              class="tokban-modal-subtitle"
            >
              {{ content?.subtitle }}
            </p>
          </div>
        </div>
      </div>

      <!-- Body -->
      <div class="tokban-modal-body" :style="bodyBgStyles">
        <div
          class="tokban-modal-body-content"
          v-html="content?.bodyHtml || ''"
        ></div>

        <!-- Typed confirmation -->
        <div
          v-if="hasTypedConfirm"
          class="tokban-modal-typed-section"
        >
          <label
            class="tokban-modal-typed-label"
            v-html="content?.typedLabel || 'Type to confirm'"
          ></label>
          <input
            type="text"
            class="tokban-modal-typed-input"
            :placeholder="content?.typedPlaceholder || 'Type to confirm'"
            :value="typedValue.value"
            @input="handleTypedInput"
            :style="typedInputFocusColor"
          />
        </div>
      </div>

      <!-- Footer -->
      <div class="tokban-modal-footer">
        <button
          class="tokban-modal-cancel-btn"
          @click="handleCancel"
        >
          {{ content?.cancelText || 'Cancel' }}
        </button>
        <button
          class="tokban-modal-confirm-btn"
          :style="confirmBtnStyles"
          :disabled="isConfirmDisabled"
          @click="handleConfirm"
        >
          {{ content?.confirmText || 'Confirm' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watch, onMounted, onBeforeUnmount } from 'vue';

const COLOR_MAP = {
  red: { bg: '#ef4444', hover: '#dc2626', iconBg: '#fef2f2', icon: '#dc2626', bodyBg: '#fef2f2', focusRing: 'rgba(239,68,68,0.2)', focusBorder: '#ef4444' },
  blue: { bg: '#2563eb', hover: '#1d4ed8', iconBg: '#eff6ff', icon: '#2563eb', bodyBg: '#eff6ff', focusRing: 'rgba(37,99,235,0.2)', focusBorder: '#2563eb' },
  green: { bg: '#16a34a', hover: '#15803d', iconBg: '#f0fdf4', icon: '#16a34a', bodyBg: '#f0fdf4', focusRing: 'rgba(22,163,74,0.2)', focusBorder: '#16a34a' },
  amber: { bg: '#d97706', hover: '#b45309', iconBg: '#fffbeb', icon: '#d97706', bodyBg: '#fffbeb', focusRing: 'rgba(217,119,6,0.2)', focusBorder: '#d97706' },
};

export default {
  props: {
    uid: { type: String, required: true },
    content: { type: Object, required: true },
    /* wwEditor:start */
    wwEditorState: { type: Object, required: true },
    /* wwEditor:end */
  },
  emits: ['trigger-event', 'update:content'],
  setup(props, { emit }) {
    // ── Internal variables ──
    const { value: typedValue, setValue: setTypedValue } =
      wwLib.wwVariable.useComponentVariable({
        uid: props.uid,
        name: 'typedValue',
        type: 'string',
        defaultValue: '',
      });

    const { value: isOpen, setValue: setIsOpen } =
      wwLib.wwVariable.useComponentVariable({
        uid: props.uid,
        name: 'isOpen',
        type: 'boolean',
        defaultValue: false,
      });

    // ── Computed: visibility ──
    const isVisible = computed(() => {
      /* wwEditor:start */
      if (props.wwEditorState?.isEditing) return true;
      /* wwEditor:end */
      return !!props.content?.visible;
    });

    // ── Computed: has typed confirmation ──
    const hasTypedConfirm = computed(() => {
      const req = props.content?.requireTyped;
      return typeof req === 'string' && req.length > 0;
    });

    // ── Computed: confirm button disabled ──
    const isConfirmDisabled = computed(() => {
      if (!hasTypedConfirm.value) return false;
      return (typedValue.value || '').trim() !== (props.content?.requireTyped || '');
    });

    // ── Color helpers ──
    const confirmColors = computed(() => {
      const key = props.content?.confirmColor || 'red';
      return COLOR_MAP[key] || COLOR_MAP.red;
    });

    const iconColorKey = computed(() => {
      return props.content?.iconColor || 'red';
    });

    const iconColorSet = computed(() => {
      return COLOR_MAP[iconColorKey.value] || COLOR_MAP.red;
    });

    // ── Styles ──
    const backdropStyles = computed(() => ({
      background: props.content?.backdropColor || 'rgba(0,0,0,0.4)',
      backdropFilter: `blur(${props.content?.backdropBlur || '2px'})`,
      WebkitBackdropFilter: `blur(${props.content?.backdropBlur || '2px'})`,
      fontFamily: props.content?.fontFamily || "'DM Sans', system-ui, sans-serif",
    }));

    const panelStyles = computed(() => ({
      maxWidth: props.content?.maxWidth || '448px',
      borderRadius: props.content?.borderRadius || '12px',
    }));

    const iconWrapStyles = computed(() => ({
      backgroundColor: iconColorSet.value?.iconBg || '#fef2f2',
    }));

    const iconStyles = computed(() => ({
      color: iconColorSet.value?.icon || '#dc2626',
    }));

    const bodyBgStyles = computed(() => {
      const bgKey = props.content?.bodyBg || 'none';
      if (bgKey === 'none' || !COLOR_MAP[bgKey]) return {};
      return {
        backgroundColor: COLOR_MAP[bgKey].bodyBg,
      };
    });

    const confirmBtnStyles = computed(() => ({
      '--confirm-bg': confirmColors.value?.bg || '#ef4444',
      '--confirm-hover': confirmColors.value?.hover || '#dc2626',
      backgroundColor: confirmColors.value?.bg || '#ef4444',
    }));

    const typedInputFocusColor = computed(() => {
      const colors = confirmColors.value;
      return {
        '--focus-ring': colors?.focusRing || 'rgba(239,68,68,0.2)',
        '--focus-border': colors?.focusBorder || '#ef4444',
      };
    });

    // ── Watchers ──
    // Reset typed value when visibility changes to true (modal opens)
    watch(
      () => props.content?.visible,
      (newVal, oldVal) => {
        if (newVal && !oldVal) {
          setTypedValue('');
          setIsOpen(true);
          emit('trigger-event', { name: 'open', event: {} });
        }
        if (!newVal && oldVal) {
          setIsOpen(false);
        }
      }
    );

    // Reset typed value when requireTyped changes
    watch(
      () => props.content?.requireTyped,
      () => {
        setTypedValue('');
      }
    );

    // ── Escape key handler ──
    const handleKeydown = (e) => {
      if (e.key === 'Escape' && props.content?.closeOnEscape !== false && props.content?.visible) {
        handleClose('escape');
      }
    };

    onMounted(() => {
      const doc = wwLib.getFrontDocument();
      if (doc) {
        doc.addEventListener('keydown', handleKeydown);
      }
    });

    onBeforeUnmount(() => {
      const doc = wwLib.getFrontDocument();
      if (doc) {
        doc.removeEventListener('keydown', handleKeydown);
      }
    });

    // ── Handlers ──
    const handleBackdropClick = () => {
      if (props.content?.closeOnBackdrop !== false) {
        handleClose('backdrop');
      }
    };

    const handleCancel = () => {
      emit('trigger-event', { name: 'cancel', event: {} });
      handleClose('cancel');
    };

    const handleConfirm = () => {
      if (isConfirmDisabled.value) return;
      emit('trigger-event', {
        name: 'confirm',
        event: {
          action: props.content?.onConfirmAction || '',
        },
      });
      handleClose('confirm');
    };

    const handleClose = (reason) => {
      emit('trigger-event', {
        name: 'close',
        event: { reason },
      });
      // Update the visible property to false
      emit('update:content', { visible: false });
    };

    const handleTypedInput = (e) => {
      const val = e?.target?.value || '';
      setTypedValue(val);
      emit('trigger-event', {
        name: 'typed-input',
        event: {
          value: val,
          isMatch: val.trim() === (props.content?.requireTyped || ''),
        },
      });
    };

    return {
      isVisible,
      hasTypedConfirm,
      isConfirmDisabled,
      typedValue,
      backdropStyles,
      panelStyles,
      iconWrapStyles,
      iconStyles,
      bodyBgStyles,
      confirmBtnStyles,
      typedInputFocusColor,
      handleBackdropClick,
      handleCancel,
      handleConfirm,
      handleTypedInput,
    };
  },
};
</script>

<style lang="scss" scoped>
/* ═══════════════════════════════════════
   BACKDROP
   ═══════════════════════════════════════ */
.tokban-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  animation: tokban-fadeIn 0.2s ease forwards;
}

@keyframes tokban-fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ═══════════════════════════════════════
   PANEL
   ═══════════════════════════════════════ */
.tokban-modal-panel {
  background: #ffffff;
  width: 100%;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: tokban-modalIn 0.2s ease-out forwards;
  overflow: hidden;
}

@keyframes tokban-modalIn {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ═══════════════════════════════════════
   HEADER
   ═══════════════════════════════════════ */
.tokban-modal-header {
  padding: 24px 24px 8px 24px;
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

.tokban-modal-icon {
  width: 20px;
  height: 20px;
}

.tokban-modal-titles {
  min-width: 0;
}

.tokban-modal-title {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 0;
  line-height: 1.4;
}

.tokban-modal-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 2px 0 0 0;
  line-height: 1.4;
}

/* ═══════════════════════════════════════
   BODY
   ═══════════════════════════════════════ */
.tokban-modal-body {
  padding: 16px 24px;
}

.tokban-modal-body-content {
  line-height: 1.6;

  :deep(p) {
    margin: 0 0 8px 0;
  }
  :deep(ul) {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  :deep(li) {
    margin-bottom: 4px;
  }
  :deep(strong) {
    font-weight: 600;
  }
}

/* ═══════════════════════════════════════
   TYPED CONFIRMATION
   ═══════════════════════════════════════ */
.tokban-modal-typed-section {
  margin-top: 16px;
}

.tokban-modal-typed-label {
  display: block;
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 6px;
  line-height: 1.4;

  :deep(strong) {
    font-weight: 700;
  }
  :deep(span) {
    font-family: monospace;
  }
}

.tokban-modal-typed-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  background: #ffffff;
  color: #111827;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: var(--focus-border, #ef4444);
    box-shadow: 0 0 0 3px var(--focus-ring, rgba(239, 68, 68, 0.2));
  }
}

/* ═══════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════ */
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
  font-family: inherit;
  border-radius: 6px;
  transition: color 0.15s ease;

  &:hover {
    color: #1f2937;
  }
}

.tokban-modal-confirm-btn {
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: inherit;
  transition: background-color 0.15s ease, opacity 0.15s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover:not(:disabled) {
    background-color: var(--confirm-hover) !important;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}

/* ═══════════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════════ */
@media (max-width: 480px) {
  .tokban-modal-backdrop {
    padding: 12px;
    align-items: flex-end;
  }

  .tokban-modal-panel {
    border-radius: 16px 16px 0 0 !important;
  }

  .tokban-modal-header,
  .tokban-modal-body,
  .tokban-modal-footer {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
