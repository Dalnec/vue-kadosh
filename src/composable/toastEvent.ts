import toastEventBus from "primevue/toasteventbus";
import type { HintedString } from "@primevue/core";

interface ToastOptions {
    message?: string | "";
    severity?: HintedString<"success" | "info" | "warn" | "error" | "secondary" | "contrast"> | undefined;
    life?: number | 5000;
    summary?: string | "";
    closable?: boolean | true;
}

const toastErrorMessageForm = ({ message, severity = "error", life = 5000, summary = "", closable = true }: ToastOptions): void => {
    toastEventBus.emit("add", { severity, detail: message, life, summary, closable });
};

export default toastErrorMessageForm;
