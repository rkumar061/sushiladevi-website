export const ADMISSION_DIALOG_EVENT = "open-admission-dialog";

export const openAdmissionDialog = () => {
  window.dispatchEvent(new Event(ADMISSION_DIALOG_EVENT));
};
