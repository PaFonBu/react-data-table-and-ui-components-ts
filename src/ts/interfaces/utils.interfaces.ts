import { SweetAlertIcon, SweetAlertPosition } from "sweetalert2";

// #region alerts
export interface Alert {
  title?: string | null;
  content?: string | null;
  icon?: SweetAlertIcon;
  acceptButtonText?: string | null;
  cancelButtonText?: string | null;
}

export interface ToastAlert extends Alert {
  position?: SweetAlertPosition;
  timer?: number;
}
// #endregion
