/**
 * Pynest — shared accessible form validation helper.
 * Replaces alert()-based error messages with inline, field-level errors
 * that are announced to screen readers and tied to the field via
 * aria-describedby (WCAG 2.2 SC 3.3.1 Error Identification).
 */
window.PynestForm = (function () {
  function ensureErrorEl(input) {
    var id = input.id + '-error';
    var el = document.getElementById(id);
    if (!el) {
      el = document.createElement('span');
      el.id = id;
      el.className = 'field-error';
      el.setAttribute('role', 'alert');
      input.insertAdjacentElement('afterend', el);
    }
    return el;
  }

  function showError(input, message) {
    var el = ensureErrorEl(input);
    el.textContent = message;
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', el.id);
  }

  function clearError(input) {
    input.removeAttribute('aria-invalid');
    var el = document.getElementById(input.id + '-error');
    if (el) el.textContent = '';
  }

  /**
   * fields: [{ input: HTMLElement, label: "Full Name" }, ...]
   * Returns true if all fields are non-empty; focuses the first invalid field.
   */
  function validateRequired(fields) {
    var firstInvalid = null;
    fields.forEach(function (f) {
      if (!f.input.value.trim()) {
        showError(f.input, f.label + ' is required.');
        if (!firstInvalid) firstInvalid = f.input;
      } else {
        clearError(f.input);
      }
    });
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  }

  return { showError: showError, clearError: clearError, validateRequired: validateRequired };
})();
