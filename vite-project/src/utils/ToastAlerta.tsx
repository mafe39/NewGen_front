import { toast } from "react-toastify";
import {
  CheckCircleIcon,
  WarningCircleIcon,
  InfoIcon,
} from "@phosphor-icons/react";

const toastBase = {
  position: "top-right" as const,
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
};

export function ToastAlerta(mensagem: string, tipo: string) {
  switch (tipo) {
    case "sucesso":
      toast.success(mensagem, {
        ...toastBase,
        icon: <CheckCircleIcon size={22} weight="fill" color="#065F46" />,
        style: {
          background: "#E5FCF5",
          color: "#065F46",
          borderLeft: "6px solid #B3DEC1",
        },
      });
      break;

    case "erro":
      toast.error(mensagem, {
        ...toastBase,
        icon: <WarningCircleIcon size={22} weight="fill" color="#7F1D1D" />,
        style: {
          background: "#FEF2F2",
          color: "#7F1D1D",
          borderLeft: "6px solid #F87171",
        },
      });
      break;

    case "info":
    default:
      toast.info(mensagem, {
        ...toastBase,
        icon: <InfoIcon size={22} weight="fill" color="#134E4A" />,
        style: {
          background: "#F0FDFA",
          color: "#134E4A",
          borderLeft: "6px solid #5EEAD4",
        },
      });
      break;
  }
}
