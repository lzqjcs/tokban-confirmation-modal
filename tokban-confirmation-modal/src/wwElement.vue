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
            <!-- Icon circle -->
            <div class="tokban-modal-icon-wrap" :style="iconWrapStyle">
              <wwLayout
                path="iconContent"
                class="tokban-modal-icon-dropzone"
              />
            </div>

            <!-- Title area -->
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

          <!-- Info banner (blue) -->
          <div
            v-if="content?.infoBannerText"
            class="tokban-modal-banner tokban-modal-banner--info"
            :style="infoBannerStyle"
          >
            <span v-html="content.infoBannerText"></span>
          </div>

          <!-- Body dropzone -->
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

          <!-- ── Checklist Items ── -->
          <div
            v-if="checklistItems.length"
            class="tokban-modal-checklist"
          >
            <p
              v-if="content?.checklistTitle"
              class="tokban-modal-checklist-title"
              v-html="content.checklistTitle"
            ></p>
            <div
              v-for="item in checklistItems"
              :key="item.id"
              class="tokban-modal-checklist-row"
            >
              <!-- Icon: SVG check or custom icon name -->
              <span
                class="tokban-modal-checklist-icon"
                :style="{ color: item.iconColor || content?.checklistDefaultIconColor || '#2563EB' }"
              >
                <!-- Inline check SVG as reliable default -->
                <svg
                  v-if="!item.icon || item.icon === 'check'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clip-rule="evenodd"
                  />
                </svg>
                <!-- Warning triangle -->
                <svg
                  v-else-if="item.icon === 'warning'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clip-rule="evenodd"
                  />
                </svg>
                <!-- Info circle -->
                <svg
                  v-else-if="item.icon === 'info'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <span
                class="tokban-modal-checklist-text"
                v-html="item.text"
              ></span>
            </div>
          </div>

          <!-- Warning banner (amber) -->
          <div
            v-if="content?.warningBannerText"
            class="tokban-modal-banner tokban-modal-banner--warning"
            :style="warningBannerStyle"
          >
            <svg
              class="tokban-modal-banner-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clip-rule="evenodd"
              />
            </svg>
            <span v-html="content.warningBannerText"></span>
          </div>

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
              :class="{ 'is-valid': typedIsValid, 'is-invalid': typedValue && !typedIsValid }"
              :placeholder="content?.typedPlaceholder || 'Type to confirm'"
              :value="typedValue"
              @input="handleTypedInput"
            />
            <p v-if="typedValue && !typedIsValid" class="tokban-modal-typed-hint">
              {{ typedHintText }}
            </p>
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
            <button
              v-if="content?.showCancelButton !== false"
              class="tokban-modal-cancel-btn"
              :disabled="isLoading"
              @click="handleCancel"
            >
              {{ content?.cancelText || 'Cancel' }}
            </button>
            <button
              class="tokban-modal-confirm-btn"
              :disabled="!confirmEnabled || isLoading"
              :style="confirmBtnStyle"
              @click="handleConfirm"
            >
              <span v-if="isLoading" class="tokban-modal-spinner"></span>
              <span>{{ isLoading ? (content?.loadingText || 'Processing...') : (content?.confirmText || 'Confirm') }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';

// Converts a hex color to a very light tint for banner backgrounds (20% opacity on white)
function hexToRgba(hex, alpha) {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// Lightens a hex color toward white by a given factor (0–1)
function lightenHex(hex, factor) {
  const h = hex.replace('#', '');
  const r = Math.round(parseInt(h.substring(0, 2), 16) + (255 - parseInt(h.substring(0, 2), 16)) * factor);
  const g = Math.round(parseInt(h.substring(2, 4), 16) + (255 - parseInt(h.substring(2, 4), 16)) * factor);
  const b = Math.round(parseInt(h.substring(4, 6), 16) + (255 - parseInt(h.substring(4, 6), 16)) * factor);
  return `rgb(${r},${g},${b})`;
}

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

    const { value: isLoading, setValue: setIsLoading } =
      wwLib.wwVariable.useComponentVariable({
        uid: props.uid,
        name: 'isLoading',
        type: 'boolean',
        defaultValue: false,
      });

    const { value: confirmEnabledVar, setValue: setConfirmEnabled } =
      wwLib.wwVariable.useComponentVariable({
        uid: props.uid,
        name: 'confirmEnabled',
        type: 'boolean',
        defaultValue: true,
      });

    // ── Animation State ──
    const showModal   = ref(false);
    const backdropActive = ref(false);
    const isClosing   = ref(false);
    const typedInputRef = ref(null);

    // ── CSS Variables ──
    const rootCssVars = computed(() => ({
      '--backdrop-color':  props.content?.backdropColor || 'rgba(0,0,0,0.4)',
      '--backdrop-blur':   props.content?.backdropBlur || '2px',
      '--panel-radius':    props.content?.borderRadius || '12px',
      '--panel-bg':        props.content?.panelBackground || '#ffffff',
      '--footer-border':   props.content?.footerBorderColor || '#f3f4f6',
      '--footer-bg':       props.content?.footerBackground || 'transparent',
      '--btn-radius':      props.content?.confirmBtnBorderRadius || '8px',
      '--cancel-color':    props.content?.cancelBtnColor || '#4b5563',
      '--input-radius':    props.content?.inputBorderRadius || '8px',
      '--input-border':    props.content?.inputBorderColor || '#d1d5db',
      '--checklist-gap':   props.content?.checklistGap || '10px',
    }));

    // ── Computed ──
    const iconWrapStyle = computed(() => ({
      backgroundColor: props.content?.iconBg || lightenHex(props.content?.iconColor || '#E53935', 0.9),
    }));

    const panelStyle = computed(() => ({
      maxWidth: props.content?.modalMaxWidth || '448px',
    }));

    const confirmBtnStyle = computed(() => ({
      backgroundColor: props.content?.confirmColor || '#E53935',
    }));

    const checklistItems = computed(() => {
      const items = props.content?.checklistItems;
      if (!Array.isArray(items)) return [];
      return items.filter(item => item?.text);
    });

    const confirmEnabled = computed(() => {
      const required = props.content?.requireTyped;
      if (!required) return true;
      return (typedValue.value || '').trim() === required;
    });

    // Keep internal variable in sync so workflows can read it
    watch(confirmEnabled, (val) => setConfirmEnabled(val), { immediate: true });

    const typedIsValid = computed(() => {
      const required = props.content?.requireTyped;
      if (!required) return true;
      return (typedValue.value || '').trim() === required;
    });

    const typedHintText = computed(() => {
      const required = props.content?.requireTyped;
      if (!required || !typedValue.value) return '';
      const typed = (typedValue.value || '').trim();
      const req   = required.trim();
      // Show progress hint: how many chars match from the start
      let match = 0;
      for (let i = 0; i < Math.min(typed.length, req.length); i++) {
        if (typed[i] === req[i]) match++;
        else break;
      }
      if (match === 0 && typed.length > 0) return `Expected: "${req}"`;
      return `Keep going…`;
    });

    // ── Banner Styles ──
    const infoBannerStyle = computed(() => {
      const color = props.content?.infoBannerColor || '#1565C0';
      return {
        backgroundColor: lightenHex(color, 0.92),
        color: color,
        borderColor: lightenHex(color, 0.7),
      };
    });

    const warningBannerStyle = computed(() => {
      const color = props.content?.warningBannerColor || '#FFB300';
      return {
        backgroundColor: lightenHex(color, 0.92),
        color: color,
        borderColor: lightenHex(color, 0.7),
      };
    });

    // ── Open / Close ──
    const openModal = () => {
      showModal.value   = true;
      isClosing.value   = false;
      setTypedValue('');
      setIsLoading(false);
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
      isClosing.value      = true;
      backdropActive.value = false;
      setTimeout(() => {
        showModal.value  = false;
        isClosing.value  = false;
        setIsOpen(false);
        setTypedValue('');
        setIsLoading(false);
        if (reason !== 'external') {
          emit('trigger-event', { name: 'close', event: { reason } });
        }
      }, 150);
    };

    // ── Watch visible prop ──
    watch(
      () => props.content?.visible,
      (newVal) => {
        if (newVal && !showModal.value)                    openModal();
        else if (!newVal && showModal.value && !isClosing.value) closeModal('external');
      },
      { immediate: true }
    );

    // ── Watch loading prop (allows workflow to set loading state) ──
    watch(
      () => props.content?.loading,
      (newVal) => { setIsLoading(!!newVal); }
    );

    // ── Event Handlers ──
    const handleBackdropClick = () => {
      if (isLoading.value) return; // don't close while loading
      if (props.content?.closeOnBackdropClick !== false) closeModal('backdrop');
    };

    const handleCancel = () => {
      if (isLoading.value) return;
      emit('trigger-event', { name: 'cancel', event: {} });
      closeModal('cancel');
    };

    const handleConfirm = () => {
      if (!confirmEnabled.value || isLoading.value) return;
      emit('trigger-event', {
        name: 'confirm',
        event: {
          action: props.content?.onConfirmAction || '',
          typedValue: typedValue.value || '',
        },
      });
      // Auto-loading mode: if autoLoading is on, show spinner until visible=false
      if (props.content?.autoLoading !== false) {
        setIsLoading(true);
      } else {
        closeModal('confirm');
      }
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
        !isLoading.value &&
        props.content?.closeOnEscape !== false
      ) {
        closeModal('escape');
      }
      // Enter to confirm if enabled
      if (
        e?.key === 'Enter' &&
        showModal.value &&
        confirmEnabled.value &&
        !isLoading.value &&
        props.content?.confirmOnEnter
      ) {
        handleConfirm();
      }
    };

    onMounted(() => {
      const frontDoc = wwLib.getFrontDocument();
      if (frontDoc) frontDoc.addEventListener('keydown', handleKeydown);
    });

    onBeforeUnmount(() => {
      const frontDoc = wwLib.getFrontDocument();
      if (frontDoc) frontDoc.removeEventListener('keydown', handleKeydown);
    });

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
      typedIsValid,
      typedHintText,
      isLoading,
      checklistItems,
      infoBannerStyle,
      warningBannerStyle,
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
  top: 0; left: 0; right: 0; bottom: 0;
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
  from { opacity: 0; transform: translateY(8px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0)   scale(1);    }
}
@keyframes tokban-modal-out {
  from { opacity: 1; transform: translateY(0)   scale(1);    }
  to   { opacity: 0; transform: translateY(8px) scale(0.98); }
}

/* ── Panel ── */
.tokban-modal-panel {
  background: var(--panel-bg);
  border-radius: var(--panel-radius);
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
  width: 100%;
  animation: tokban-modal-in 0.2s ease-out forwards;
}
.tokban-modal-panel.closing {
  animation: tokban-modal-out 0.15s ease-in forwards;
}

/* ── Header ── */
.tokban-modal-header { padding: 24px 24px 8px; }
.tokban-modal-header-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.tokban-modal-icon-wrap {
  width: 40px; height: 40px;
  min-width: 40px; min-height: 40px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}
.tokban-modal-icon-dropzone {
  display: flex; align-items: center; justify-content: center;
  width: 100%; height: 100%;
}
/* wwEditor:start */
.tokban-modal-icon-dropzone:empty::after {
  content: '+'; color: rgba(0,0,0,0.25);
  font-size: 18px; font-weight: 300; pointer-events: none;
}
/* wwEditor:end */
.tokban-modal-title-area { flex: 1; min-width: 0; }
.tokban-modal-title-dropzone { display: flex; flex-direction: column; min-height: 0; }
/* wwEditor:start */
.tokban-modal-title-dropzone:empty {
  min-height: 40px; border: 2px dashed #d0d0d0; border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
}
.tokban-modal-title-dropzone:empty::after {
  content: 'Drop title / subtitle here'; color: #999;
  font-size: 12px; font-style: italic; pointer-events: none;
}
.tokban-modal-title-dropzone:hover:empty { border-color: #007aff; background: rgba(0,122,255,0.04); }
/* wwEditor:end */

/* ── Body ── */
.tokban-modal-body { padding: 16px 24px; display: flex; flex-direction: column; gap: 12px; }
.tokban-modal-body-dropzone { min-height: 0; }
/* wwEditor:start */
.tokban-modal-body-dropzone:empty {
  min-height: 48px; border: 2px dashed #d0d0d0; border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,0.02);
}
.tokban-modal-body-dropzone:empty::after {
  content: 'Drop body content here'; color: #999;
  font-size: 13px; font-style: italic; pointer-events: none;
}
.tokban-modal-body-dropzone:hover:empty { border-color: #007aff; background: rgba(0,122,255,0.04); }
/* wwEditor:end */
.tokban-modal-body-dropzone:not(:empty) { display: flex; flex-direction: column; }

/* ── Banners ── */
.tokban-modal-banner {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid transparent;
  font-size: 14px;
  line-height: 1.5;
}
.tokban-modal-banner-icon {
  flex-shrink: 0;
  margin-top: 1px;
}

/* ── Checklist ── */
.tokban-modal-checklist { display: flex; flex-direction: column; gap: var(--checklist-gap); }
.tokban-modal-checklist-title {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 2px;
}
.tokban-modal-checklist-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}
.tokban-modal-checklist-icon {
  flex-shrink: 0;
  margin-top: 1px;
  display: flex;
  align-items: center;
}
.tokban-modal-checklist-text {
  font-size: 14px;
  line-height: 1.5;
  color: #374151;
}
.tokban-modal-checklist-text :deep(strong) { font-weight: 600; }

/* ── Optional HTML body ── */
.tokban-modal-body-html { font-size: 14px; line-height: 1.5; color: #374151; }
.tokban-modal-body-html :deep(p)         { margin: 0 0 8px; }
.tokban-modal-body-html :deep(p:last-child) { margin-bottom: 0; }
.tokban-modal-body-html :deep(strong)    { font-weight: 600; }

/* ── Typed Confirmation ── */
.tokban-modal-typed-section { display: flex; flex-direction: column; gap: 6px; }
.tokban-modal-typed-label { font-size: 14px; color: #4b5563; line-height: 1.4; }
.tokban-modal-typed-input {
  width: 100%; padding: 10px 12px;
  border: 1px solid var(--input-border);
  border-radius: var(--input-radius);
  font-size: 14px; outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  font-family: inherit; box-sizing: border-box;
}
.tokban-modal-typed-input:focus {
  border-color: #9ca3af;
  box-shadow: 0 0 0 3px rgba(156,163,175,0.15);
}
.tokban-modal-typed-input.is-valid {
  border-color: #16a34a;
  box-shadow: 0 0 0 3px rgba(22,163,74,0.1);
}
.tokban-modal-typed-input.is-invalid {
  border-color: #ef4444;
}
.tokban-modal-typed-hint {
  margin: 0;
  font-size: 12px;
  color: #9ca3af;
}

/* ── Footer ── */
.tokban-modal-footer {
  display: flex; align-items: center; justify-content: flex-end;
  gap: 12px; padding: 16px 24px;
  border-top: 1px solid var(--footer-border);
  background: var(--footer-bg);
  border-radius: 0 0 var(--panel-radius) var(--panel-radius);
}
.tokban-modal-footer-dropzone { flex: 0 0 auto; min-height: 0; }
/* wwEditor:start */
.tokban-modal-footer-dropzone:empty {
  min-height: 32px; min-width: 48px; border: 2px dashed #d0d0d0;
  border-radius: 6px; display: flex; align-items: center; justify-content: center;
  margin-right: auto;
}
.tokban-modal-footer-dropzone:empty::after { content: '+'; color: #999; font-size: 14px; pointer-events: none; }
.tokban-modal-footer-dropzone:hover:empty { border-color: #007aff; }
/* wwEditor:end */
.tokban-modal-footer-dropzone:not(:empty) { margin-right: auto; display: flex; align-items: center; gap: 8px; }

.tokban-modal-footer-buttons { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }

.tokban-modal-cancel-btn {
  padding: 8px 16px; font-size: 14px; font-weight: 500;
  color: var(--cancel-color); background: none; border: none;
  cursor: pointer; transition: color 0.15s, opacity 0.15s;
  font-family: inherit; border-radius: 6px;
}
.tokban-modal-cancel-btn:hover:not(:disabled) { color: #1f2937; }
.tokban-modal-cancel-btn:disabled { opacity: 0.4; cursor: not-allowed; }

.tokban-modal-confirm-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 20px; font-size: 14px; font-weight: 600;
  color: #ffffff; border: none; border-radius: var(--btn-radius);
  cursor: pointer; transition: filter 0.15s, opacity 0.15s;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  font-family: inherit;
}
.tokban-modal-confirm-btn:hover:not(:disabled) { filter: brightness(0.9); }
.tokban-modal-confirm-btn:disabled { opacity: 0.4; cursor: not-allowed; }

/* ── Loading Spinner ── */
@keyframes tokban-spin {
  to { transform: rotate(360deg); }
}
.tokban-modal-spinner {
  width: 14px; height: 14px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: tokban-spin 0.6s linear infinite;
  flex-shrink: 0;
}
</style>
