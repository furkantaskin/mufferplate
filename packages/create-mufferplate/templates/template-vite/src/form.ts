import { $, $$, DOMAIN } from './lib/utils.ts';
import Swal from "sweetalert2";

interface FormResponse {
  durum?: 'success' | 'error';
  bildirim?: string;
  status?: 'success' | 'error';
  message?: string;
  messages?: string[];
}

interface FormField {
  name: string;
  value: string;
}


document.addEventListener('DOMContentLoaded', () => {
  if (document.readyState === "interactive" || document.readyState === "complete"){
    $$<HTMLButtonElement>('.fe-submit').forEach(button => {
      button.addEventListener('click', function() {
        const form = this.dataset.form;
        const action = $<HTMLFormElement>(form!)?.dataset.action;
  
        const formSelect = $<HTMLFormElement>(form!);
        const checkValidation = formSelect.checkValidity();
  
        if (checkValidation) {
          const hiddenInput = document.createElement('input');
          hiddenInput.type = 'hidden';
          hiddenInput.name = action!;
          hiddenInput.value = '1';
          formSelect.appendChild(hiddenInput);
  
          const formData = new FormData(formSelect);
          
          fetch(DOMAIN + 'ajax', {
            method: 'POST',
            body: new URLSearchParams(formData as any)
          })
          .then(response => response.text())
          .then((data: string) => {
            const oku: FormResponse = JSON.parse(data);
            if (oku.durum === 'success') {
              formSelect.reset();
            }
            Swal.fire({
              icon: oku.durum!,
              text: oku.bildirim!,
              showConfirmButton: false
            });
            hiddenInput.remove();
          })
          .catch(() => {
            Swal.fire({
              icon: 'error',
              text: 'An error occurred'
            });
            hiddenInput.remove();
          });
        } else {
          validateOptions(Array.from(new FormData(formSelect).entries())
            .map(([name, value]) => ({ name, value: value.toString() })), 
            form!, 
            true
          );
        }
      });
    });
  
    $$<HTMLButtonElement>('.career-submit').forEach(button => {
      button.addEventListener('click', function() {
        const form = this.getAttribute('data-form');
        const action = $<HTMLFormElement>(form!)?.getAttribute('data-action');
  
        const formElem = $<HTMLFormElement>(form!);
        const checkValidation = formElem.checkValidity();
        
        if (checkValidation) {
          sendFormData(form!, action!);
        } else {
          validateCheckboxes(form!);
          validateFileInputs(form!);
          validateOptions(
            Array.from(new FormData(formElem).entries())
              .map(([name, value]) => ({ name, value: value.toString() })),
            form!,
            true
          );
        }
      });
    });
  }
});

function validateOptions(data: FormField[], form: string, show: boolean = false): void {
  data.forEach(field => {
    const name = field.name;
    const value = field.value;
    const element = $<HTMLInputElement>(`${form} [name="${name}"]`);
    
    if (!element) return;

    const errorStatus = element.checkValidity();
    const errorMessage = element.validationMessage;
    
    if (!errorStatus) {
      $<HTMLFormElement>(form).reportValidity();
    } else {
      element.setCustomValidity('');
    }
  });
}

function validateFileInputs(form: string): void {
  $$<HTMLInputElement>(`${form} input[type="file"]`).forEach(fileInput => {
    const fileStatus = fileInput.checkValidity();

    if (!fileStatus) {
      fileInput.reportValidity();
    } else {
      fileInput.setCustomValidity('');
    }
  });
}

function validateCheckboxes(form: string): void {
  $$<HTMLInputElement>(`${form} input[type="checkbox"][required]`).forEach(checkboxInput => {
    if (!checkboxInput.checked) {
      checkboxInput.setCustomValidity('Bu alanın seçilmesi zorunludur.');
      checkboxInput.reportValidity();
    } else {
      checkboxInput.setCustomValidity('');
    }
  });
}

function sendFormData(form: string, action: string): void {
  const formElement = $<HTMLFormElement>(form);
  const formData = new FormData(formElement);

  $$<HTMLInputElement>(`${form} input[type="checkbox"]`).forEach(checkboxInput => {
    formData.append(
      checkboxInput.name,
      checkboxInput.checked ? checkboxInput.value : ''
    );
  });

  formData.append('action', action);

  fetch(DOMAIN + 'ajax', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(response => {
    const data: FormResponse = JSON.parse(response);
    if (data.status === 'success') {
      Swal.fire({
        icon: 'success',
        text: data.message!,
        showConfirmButton: false
      });
      $<HTMLFormElement>(form).reset();
    }
  })
  .catch(error => {
    const data: FormResponse = JSON.parse(error.responseText);
    if (data.status === 'error') {
      Swal.fire({
        icon: 'error',
        text: data.messages?.join('\n') || 'An error occurred',
        showConfirmButton: false
      });
    }
  });
}