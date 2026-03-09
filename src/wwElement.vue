<template>
  <div class="tk-root" :style="cssVars">
    <div
      v-if="showModal"
      class="tk-backdrop"
      :class="{ active: backdropActive }"
      @click.self="handleBackdropClick"
    >
      <div class="tk-panel" :class="{ closing: isClosing }">

        <!-- ═══ HEADER ═══ -->
        <div class="tk-header">
          <div class="tk-header-row">
            <!-- Icon circle -->
            <div class="tk-icon-circle" :style="iconCircleStyle">
              <span v-if="content?.iconName" class="tk-icon-glyph" :style="iconGlyphStyle">
                {{ content.iconName }}
              </span>
              <wwLayout v-else path="iconContent" class="tk-icon-dropzone" />
            </div>
            <!-- Title + subtitle -->
            <div class="tk-title-area">
              <p v-if="content?.title"    class="tk-title"    v-html="content.title"></p>
              <p v-if="content?.subtitle" class="tk-subtitle" v-html="content.subtitle"></p>
            </div>
          </div>
        </div>

        <!-- ═══ BODY ═══ -->
        <div class="tk-body">

          <!-- Info banner -->
          <div v-if="content?.infoBannerText" class="tk-banner" :style="infoBannerStyle">
            <svg class="tk-banner-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"/>
            </svg>
            <span v-html="content.infoBannerText"></span>
          </div>

          <!-- Body text -->
          <div v-if="content?.bodyHtml" class="tk-body-html" v-html="content.bodyHtml"></div>

          <!-- Checklist items -->
          <div v-if="checklistItems.length" class="tk-checklist">
            <p v-if="content?.checklistTitle" class="tk-checklist-title" v-html="content.checklistTitle"></p>
            <div v-for="item in checklistItems" :key="item.id || item.text" class="tk-checklist-row">
              <span class="tk-checklist-icon" :style="{ color: item.iconColor || content?.checklistIconColor || '#E53935' }">
                <svg v-if="item.icon === 'x'" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd"/>
                </svg>
                <svg v-else-if="item.icon === 'warning'" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"/>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd"/>
                </svg>
              </span>
              <span class="tk-checklist-text" v-html="item.text"></span>
            </div>
          </div>

          <!-- Warning / danger banner -->
          <div v-if="content?.warningBannerText" class="tk-banner" :style="warningBannerStyle">
            <svg class="tk-banner-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"/>
            </svg>
            <span v-html="content.warningBannerText"></span>
          </div>

          <!-- ── Free-text input (e.g. new branch name) ── -->
          <!-- Shows when inputLabel is set AND requireTyped is NOT set -->
          <div v-if="content?.inputLabel && !content?.requireTyped" class="tk-input-section">
            <label class="tk-input-label">{{ content.inputLabel }}</label>
            <input
              ref="freeInputRef"
              type="text"
              class="tk-typed-input"
              :placeholder="content?.inputPlaceholder || ''"
              :value="inputValue"
              @input="handleFreeInput"
            />
            <p v-if="content?.inputHelp" class="tk-input-help">{{ content.inputHelp }}</p>
          </div>

          <!-- Typed confirmation -->
          <div v-if="content?.requireTyped" class="tk-typed-section">
            <label v-if="content?.typedLabel" class="tk-typed-label" v-html="content.typedLabel"></label>
            <input
              ref="typedInputRef"
              type="text"
              class="tk-typed-input"
              :class="{ 'is-valid': typedIsValid, 'is-invalid': typedValue && !typedIsValid }"
              :placeholder="content?.typedPlaceholder || 'Type to confirm'"
              :value="typedValue"
              @input="handleTypedInput"
            />
            <p v-if="typedValue && !typedIsValid" class="tk-typed-hint">{{ typedHintText }}</p>
          </div>

        </div>

        <!-- ═══ FOOTER ═══ -->
        <div class="tk-footer">
          <button
            v-if="content?.showCancelButton !== false"
            class="tk-btn-cancel"
            :disabled="isLoading"
            @click="handleCancel"
          >
            {{ content?.cancelText || 'Cancel' }}
          </button>
          <button
            class="tk-btn-confirm"
            :disabled="!confirmEnabled || isLoading"
            :style="confirmBtnStyle"
            @click="handleConfirm"
          >
            <span v-if="isLoading" class="tk-spinner"></span>
            <span>{{ isLoading ? (content?.loadingText || 'Processing...') : (content?.confirmText || 'Confirm') }}</span>
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';

// ── Hex helpers — no keyword maps, pure hex in / hex out ──
function isHex(v) { return typeof v === 'string' && /^#([0-9a-fA-F]{3,8})$/.test(v.trim()); }
function hexToRgb(hex) {
  let h = hex.replace('#', '').trim();
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  if (h.length === 8) h = h.slice(0, 6);
  const n = parseInt(h, 16);
  if (isNaN(n)) return { r: 0, g: 0, b: 0 };
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}
function lightenHex(hex, factor) {
  if (!isHex(hex)) return hex;
  const { r, g, b } = hexToRgb(hex);
  return `rgb(${Math.round(r+(255-r)*factor)},${Math.round(g+(255-g)*factor)},${Math.round(b+(255-b)*factor)})`;
}

export default {
  props: {
    uid:     { type: String, required: true },
    content: { type: Object, required: true },
    /* wwEditor:start */
    wwEditorState: { type: Object, required: true },
    /* wwEditor:end */
  },
  emits: ['trigger-event'],
  setup(props, { emit }) {

    // ── Internal variables ──
    const { value: isOpen,    setValue: setIsOpen    } = wwLib.wwVariable.useComponentVariable({ uid: props.uid, name: 'isOpen',    type: 'boolean', defaultValue: false });
    const { value: typedValue, setValue: setTypedValue } = wwLib.wwVariable.useComponentVariable({ uid: props.uid, name: 'typedValue', type: 'string',  defaultValue: '' });
    const { value: inputValue, setValue: setInputValue } = wwLib.wwVariable.useComponentVariable({ uid: props.uid, name: 'inputValue', type: 'string',  defaultValue: '' });
    const { value: isLoading,  setValue: setIsLoading  } = wwLib.wwVariable.useComponentVariable({ uid: props.uid, name: 'isLoading',  type: 'boolean', defaultValue: false });
    const { value: confirmEnabledVar, setValue: setConfirmEnabled } = wwLib.wwVariable.useComponentVariable({ uid: props.uid, name: 'confirmEnabled', type: 'boolean', defaultValue: true });

    // ── Animation state ──
    const showModal      = ref(false);
    const backdropActive = ref(false);
    const isClosing      = ref(false);
    const typedInputRef  = ref(null);
    const freeInputRef   = ref(null);

    // ── CSS vars ──
    const cssVars = computed(() => ({
      '--tk-panel-radius':  props.content?.borderRadius || '12px',
      '--tk-panel-bg':      props.content?.panelBg      || '#ffffff',
      '--tk-footer-border': props.content?.footerBorder || '#F4F4F4',
      '--tk-btn-radius':    props.content?.btnRadius     || '8px',
      '--tk-cancel-color':  props.content?.cancelColor   || '#616161',
      '--tk-input-radius':  props.content?.inputRadius   || '8px',
      '--tk-input-border':  props.content?.inputBorder   || '#C9C9C9',
      '--tk-max-width':     props.content?.maxWidth      || '448px',
      '--tk-checklist-gap': props.content?.checklistGap  || '10px',
    }));

    // ── Icon circle — hex directly ──
    const iconCircleStyle = computed(() => {
      const bg    = typeof props.content?.iconBg    === 'string' && props.content.iconBg.length    > 2 ? props.content.iconBg    : null;
      const color = typeof props.content?.iconColor === 'string' && props.content.iconColor.length > 2 ? props.content.iconColor : '#1565C0';
      return { backgroundColor: bg ?? lightenHex(color, 0.9) };
    });
    const iconGlyphStyle = computed(() => {
      const color = typeof props.content?.iconColor === 'string' && props.content.iconColor.length > 2 ? props.content.iconColor : '#1565C0';
      return { color, fontSize: props.content?.iconSize || '20px' };
    });

    // ── Confirm button ──
    const confirmBtnStyle = computed(() => {
      const c = (typeof props.content?.confirmColor === 'string' && props.content.confirmColor.length > 2) ? props.content.confirmColor : '#F08227';
      return { backgroundColor: c };
    });

    // ── Banners ──
    const infoBannerStyle = computed(() => {
      const c = (typeof props.content?.infoBannerColor === 'string' && props.content.infoBannerColor.length > 2) ? props.content.infoBannerColor : '#1565C0';
      return { backgroundColor: lightenHex(c, 0.92), color: c, borderColor: lightenHex(c, 0.7) };
    });
    const warningBannerStyle = computed(() => {
      const c = (typeof props.content?.warningBannerColor === 'string' && props.content.warningBannerColor.length > 2) ? props.content.warningBannerColor : '#FFB300';
      return { backgroundColor: lightenHex(c, 0.92), color: c, borderColor: lightenHex(c, 0.7) };
    });

    // ── Checklist ──
    const checklistItems = computed(() => {
      const items = props.content?.checklistItems;
      if (!Array.isArray(items)) return [];
      return items.filter(i => i?.text);
    });

    // ── confirmEnabled: typed mode OR free-text input mode OR simple ──
    const confirmEnabled = computed(() => {
      if (props.content?.requireTyped) {
        return (typedValue.value || '').trim() === props.content.requireTyped;
      }
      if (props.content?.inputLabel) {
        return (inputValue.value || '').trim().length > 0;
      }
      return true;
    });
    watch(confirmEnabled, v => setConfirmEnabled(v), { immediate: true });

    const typedIsValid = computed(() => {
      const req = props.content?.requireTyped;
      if (!req) return true;
      return (typedValue.value || '').trim() === req;
    });
    const typedHintText = computed(() => {
      const req = props.content?.requireTyped;
      if (!req || !typedValue.value) return '';
      const typed = (typedValue.value || '').trim();
      let match = 0;
      for (let i = 0; i < Math.min(typed.length, req.length); i++) {
        if (typed[i] === req[i]) match++; else break;
      }
      return match === 0 && typed.length > 0 ? `Expected: "${req}"` : 'Keep going…';
    });

    // ── Open / close ──
    const openModal = () => {
      showModal.value = true;
      isClosing.value = false;
      setTypedValue('');
      setInputValue('');
      setIsLoading(false);
      setIsOpen(true);
      nextTick(() => {
        backdropActive.value = true;
        if (props.content?.requireTyped && typedInputRef.value) typedInputRef.value.focus();
        else if (props.content?.inputLabel && freeInputRef.value) freeInputRef.value.focus();
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
        setInputValue('');
        setIsLoading(false);
        if (reason !== 'external') emit('trigger-event', { name: 'close', event: { reason } });
      }, 150);
    };

    watch(() => props.content?.visible, v => {
      if (v && !showModal.value) openModal();
      else if (!v && showModal.value && !isClosing.value) closeModal('external');
    }, { immediate: true });
    watch(() => props.content?.loading, v => setIsLoading(!!v));

    // ── Handlers ──
    const handleBackdropClick = () => {
      if (isLoading.value) return;
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
          action:     props.content?.onConfirmAction || '',
          typedValue: typedValue.value || '',
          inputValue: inputValue.value || '',
        },
      });
      if (props.content?.autoLoading !== false) setIsLoading(true);
      else closeModal('confirm');
    };
    const handleTypedInput = (e) => {
      const val = e?.target?.value ?? '';
      setTypedValue(val);
      emit('trigger-event', { name: 'typed-value-change', event: { value: val } });
    };
    const handleFreeInput = (e) => {
      const val = e?.target?.value ?? '';
      setInputValue(val);
      emit('trigger-event', { name: 'input-value-change', event: { value: val } });
    };

    // ── Keyboard ──
    const handleKeydown = (e) => {
      if (e?.key === 'Escape' && showModal.value && !isLoading.value && props.content?.closeOnEscape !== false) closeModal('escape');
      if (e?.key === 'Enter'  && showModal.value && confirmEnabled.value && !isLoading.value && props.content?.confirmOnEnter) handleConfirm();
    };
    onMounted(()        => { const d = wwLib.getFrontDocument(); if (d) d.addEventListener('keydown', handleKeydown); });
    onBeforeUnmount(()  => { const d = wwLib.getFrontDocument(); if (d) d.removeEventListener('keydown', handleKeydown); });

    /* wwEditor:start */
    const isEditing = computed(() => props.wwEditorState?.isEditing);
    /* wwEditor:end */

    return {
      showModal, backdropActive, isClosing,
      typedInputRef, freeInputRef,
      cssVars, iconCircleStyle, iconGlyphStyle,
      confirmBtnStyle, infoBannerStyle, warningBannerStyle,
      checklistItems, confirmEnabled,
      typedValue, typedIsValid, typedHintText,
      inputValue, isLoading,
      handleBackdropClick, handleCancel, handleConfirm,
      handleTypedInput, handleFreeInput,
      /* wwEditor:start */
      isEditing,
      /* wwEditor:end */
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.tk-root * { font-family: 'Inter', system-ui, -apple-system, sans-serif; box-sizing: border-box; }

/* ── Backdrop ── */
.tk-backdrop {
  position: fixed; inset: 0;
  background: rgba(44,49,49,0.5); backdrop-filter: blur(2px);
  display: flex; align-items: center; justify-content: center;
  padding: 16px; z-index: 9999;
  opacity: 0; pointer-events: none; transition: opacity 0.2s ease;
}
.tk-backdrop.active { opacity: 1; pointer-events: auto; }

/* ── Panel ── */
@keyframes tk-in  { from { opacity:0; transform: translateY(8px) scale(0.98); } to { opacity:1; transform: translateY(0) scale(1); } }
@keyframes tk-out { from { opacity:1; transform: translateY(0) scale(1); } to { opacity:0; transform: translateY(8px) scale(0.98); } }
.tk-panel {
  background: var(--tk-panel-bg); border-radius: var(--tk-panel-radius);
  box-shadow: 0 20px 60px -10px rgba(44,49,49,0.2), 0 4px 16px -4px rgba(44,49,49,0.1);
  width: 100%; max-width: var(--tk-max-width);
  animation: tk-in 0.2s ease-out forwards; overflow: hidden;
}
.tk-panel.closing { animation: tk-out 0.15s ease-in forwards; }

/* ── Header ── */
.tk-header { padding: 24px 24px 8px; }
.tk-header-row { display: flex; align-items: center; gap: 14px; }

/* ── Icon ── */
.tk-icon-circle {
  width: 44px; height: 44px; min-width: 44px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background-color: #E8F1FA;
}
.tk-icon-glyph {
  font-family: 'Material Symbols Rounded', 'Material Icons', sans-serif;
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  font-size: 20px; line-height: 1; user-select: none;
}
.tk-icon-dropzone { display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; }
/* wwEditor:start */
.tk-icon-dropzone:empty::after { content: '+'; color: rgba(0,0,0,0.2); font-size: 16px; pointer-events: none; }
/* wwEditor:end */

/* ── Title ── */
.tk-title-area { flex: 1; min-width: 0; display: flex; flex-direction: column; padding-top: 2px; }
.tk-title    { margin: 0;       font-size: 16px; font-weight: 700; color: #2C3131; line-height: 1.3; }
.tk-subtitle { margin: 4px 0 0; font-size: 13px; font-weight: 400; color: #A8A8A8; line-height: 1.4; }

/* ── Body ── */
.tk-body { padding: 12px 24px 16px; display: flex; flex-direction: column; gap: 12px; }
.tk-body-html { font-size: 14px; line-height: 1.6; color: #616161; }
.tk-body-html :deep(p) { margin: 0 0 8px; }
.tk-body-html :deep(p:last-child) { margin-bottom: 0; }
.tk-body-html :deep(strong) { font-weight: 600; color: #2C3131; }

/* ── Banners ── */
.tk-banner {
  display: flex; align-items: flex-start; gap: 8px;
  padding: 11px 13px; border-radius: 8px; border: 1px solid transparent;
  font-size: 13px; font-weight: 500; line-height: 1.5;
}
.tk-banner-icon { flex-shrink: 0; margin-top: 1px; width: 15px; height: 15px; }
.tk-banner span :deep(strong) { font-weight: 700; }

/* ── Checklist ── */
.tk-checklist { display: flex; flex-direction: column; gap: var(--tk-checklist-gap); }
.tk-checklist-title { margin: 0 0 4px; font-size: 13px; font-weight: 600; color: #2C3131; }
.tk-checklist-row { display: flex; align-items: flex-start; gap: 9px; }
.tk-checklist-icon { flex-shrink: 0; margin-top: 1px; display: flex; }
.tk-checklist-text { font-size: 13px; line-height: 1.55; color: #616161; }
.tk-checklist-text :deep(strong) { font-weight: 600; color: #2C3131; }

/* ── Free-text input section ── */
.tk-input-section { display: flex; flex-direction: column; gap: 6px; }
.tk-input-label { font-size: 13px; font-weight: 500; color: #2C3131; line-height: 1.4; }
.tk-input-help  { margin: 0; font-size: 12px; color: #A8A8A8; line-height: 1.4; }

/* ── Typed confirmation ── */
.tk-typed-section { display: flex; flex-direction: column; gap: 6px; }
.tk-typed-label { font-size: 13px; color: #616161; line-height: 1.4; }
.tk-typed-label :deep(strong) { font-weight: 600; color: #2C3131; }
.tk-typed-input {
  width: 100%; padding: 9px 12px;
  border: 1.5px solid var(--tk-input-border); border-radius: var(--tk-input-radius);
  font-size: 14px; font-family: inherit; color: #2C3131; outline: none;
  box-sizing: border-box; transition: border-color 0.15s, box-shadow 0.15s;
}
.tk-typed-input:focus       { border-color: #A8A8A8; box-shadow: 0 0 0 3px rgba(168,168,168,0.15); }
.tk-typed-input.is-valid    { border-color: #4CAF50; box-shadow: 0 0 0 3px rgba(76,175,80,0.12); }
.tk-typed-input.is-invalid  { border-color: #E53935; }
.tk-typed-hint { margin: 0; font-size: 12px; color: #A8A8A8; }

/* ── Footer ── */
.tk-footer {
  display: flex; align-items: center; justify-content: flex-end;
  gap: 12px; padding: 14px 24px;
  border-top: 1px solid var(--tk-footer-border);
}
.tk-btn-cancel {
  padding: 9px 16px; font-size: 14px; font-weight: 500; font-family: inherit;
  color: var(--tk-cancel-color); background: none; border: none;
  border-radius: var(--tk-btn-radius); cursor: pointer;
  transition: color 0.15s, opacity 0.15s;
}
.tk-btn-cancel:hover:not(:disabled) { color: #2C3131; }
.tk-btn-cancel:disabled { opacity: 0.4; cursor: not-allowed; }
.tk-btn-confirm {
  display: flex; align-items: center; gap: 8px;
  padding: 9px 20px; font-size: 14px; font-weight: 600; font-family: inherit;
  color: #ffffff; border: none; border-radius: var(--tk-btn-radius);
  cursor: pointer; transition: filter 0.15s, opacity 0.15s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.tk-btn-confirm:hover:not(:disabled) { filter: brightness(0.88); }
.tk-btn-confirm:disabled { opacity: 0.4; cursor: not-allowed; }

/* ── Spinner ── */
@keyframes tk-spin { to { transform: rotate(360deg); } }
.tk-spinner {
  width: 14px; height: 14px; flex-shrink: 0;
  border: 2px solid rgba(255,255,255,0.35); border-top-color: #ffffff;
  border-radius: 50%; animation: tk-spin 0.6s linear infinite;
}
</style>
