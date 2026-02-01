export function useToast() {
  const toastMessage = ref('');
  const toastType = ref<'success' | 'error' | 'info' | ''>('');

  function showToast(message: string, type: 'success' | 'error' | 'info' = 'success', duration = 2500) {
    toastMessage.value = message;
    toastType.value = type;
    setTimeout(() => {
      toastMessage.value = '';
      toastType.value = '';
    }, duration);
  }

  return { toastMessage, toastType, showToast };
}
