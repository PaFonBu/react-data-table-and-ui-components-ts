import Swal, { SweetAlertResult } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Alert, ToastAlert } from "../ts/interfaces/utils.interfaces";

const swal = withReactContent(Swal);

export const confirmationAlert = async ({
  title,
  content,
  acceptButtonText = null,
  cancelButtonText = null,
}: Alert = {}): Promise<SweetAlertResult> => {
  return await swal.fire({
    title: title ?? "Confirmation required",
    text: content ?? "",
    showConfirmButton: true,
    confirmButtonText: acceptButtonText ?? "Ok",
    showDenyButton: true,
    denyButtonText: cancelButtonText ?? "Cancel",
    keydownListenerCapture: true,
    customClass: {
      container: "allow-line-break",
      popup: "bg-slate-700 text-slate-200 rounded-lg",
    },
  });
};

export const successAlert = async ({
  title,
  content,
}: Alert = {}): Promise<SweetAlertResult> => {
  return await swal.fire({
    icon: "success",
    title: title ?? "Done",
    text: content ?? "",
    keydownListenerCapture: true,
    customClass: {
      container: "allow-line-break",
      popup: "bg-slate-700 text-slate-200 rounded-lg",
    },
  });
};

export const errorAlert = async ({
  title,
  content,
  icon,
}: Alert = {}): Promise<SweetAlertResult> => {
  return await swal.fire({
    icon: icon ?? "error",
    title: title ?? "Unexpected error",
    text: content ?? "Please try again later",
    showConfirmButton: false,
    showCancelButton: true,
    cancelButtonText: "Cancel",
    keydownListenerCapture: true,
    customClass: {
      container: "allow-line-break",
      popup: "bg-slate-700 text-slate-200 rounded-lg",
    },
  });
};

export const toastAlert = async ({
  title,
  icon,
  position,
  timer,
}: ToastAlert = {}): Promise<SweetAlertResult> => {
  return await Swal.fire({
    position: position ?? "bottom-end",
    icon: icon ?? "success",
    title: title ?? "Done",
    showConfirmButton: false,
    showCloseButton: position === "center",
    toast: true,
    timer: timer ?? 3000,
    keydownListenerCapture: true,
    customClass: {
      popup: "!bg-slate-700 text-slate-200 rounded-lg",
    },
  });
};
