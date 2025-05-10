import { nextTick, type Ref } from "vue";
import { type FileUploadSelectEvent } from "primevue";

interface FileWithPreview extends File {
    objectURL?: string;
}

/**
 * Handle file selection and update the corresponding model
 * @param {Event} event - File selection event
 * @param event
 * @param refImage
 */
export const onFileSelect = async(event: FileUploadSelectEvent, refImage: (value: string, shouldValidate?: boolean | undefined) => void): Promise<void> => {
    if (event?.files.length) {
        const file = event.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            if (reader.result) {
                const base64String = (reader.result as string).split(",")[1];
                refImage(base64String);
            }
        };
    }
};

/**
 * Converts an image URL to a File object
 * @async {function} return async function
 * @param {String} url - Image URL
 * @param {String} filename - Name of the resulting file
 * @param {String} mimeType - MIME type of the file (e.g. "image/jpeg")
 * @returns {Promise<File>} File object with objectURL property for preview
 */
export const urlToFile = async(url: string, filename: string, mimeType: string): Promise<FileWithPreview> => {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const file = new File([ buffer ], filename, { type: mimeType }) as FileWithPreview;
    file.objectURL = URL.createObjectURL(file);
    return file;
};

/**
 * Set default images on page load
 * @param {String} url - expects an url sent via props
 * @param {ref} refFile - reactive variable to reference in html
 * @param {ref | ArrayBuffer} value - reactive variable to reference model
 * @param {String} name -name to image
 */
export const setDefaultImages = async(url: string, refFile: Ref, value: Ref<string>, name: string): Promise<void> => {
    const file = await urlToFile(url, name, "image/jpeg");
    const base64 = await fileToBase64(file);
    value.value = base64.split(",")[1];
    await nextTick(() => {
        forceFileUploadUpdate(refFile, [ file ]);
    });
};

/**
 * Converts a file to a Base64 string
 * @param {File} file - File object
 * @returns {Promise<string>} Base64 string representation of the file
 */
export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        // const base64String = (reader.result as string)
        reader.onload = () => resolve(reader.result as string);
        // reader.onload = () => resolve(base64String);
        reader.onerror = (error) => reject(error);
    });
};

/**
 * Force the FileUpload component to refresh to display the selected image
 * @param {ref} fileUploadRef - FileUpload component reference name
 * @param {File[]} files - Array of files to show in the FileUpload
 */
export const forceFileUploadUpdate = async(fileUploadRef: Ref, files: File[]): Promise<void> => {
    if (fileUploadRef && fileUploadRef?.value) {
        const dataTransfer = new DataTransfer();
        for (const file of files) {
            dataTransfer.items.add(file);
        }

        const input = fileUploadRef.value.$el.querySelector("input[type='file']") as HTMLInputElement | null;
        if (input) {
            input.files = dataTransfer.files;
            fileUploadRef.value.files = Array.from(dataTransfer.files);
            updateFilePreview(fileUploadRef.value.$el, files);
        }
    }
};

/**
 * Updates the image preview in the FileUpload
 * @param {HTMLElement} fileUploadEl - FileUpload component DOM element
 * @param {File[]} files - Array of files to show in preview
 */
export const updateFilePreview = (fileUploadEl: Element, files: File[]): void => {
    const img = fileUploadEl.querySelector("img") as HTMLImageElement | null;
    if (img && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            img.src = e.target?.result as string;
        };
        reader.readAsDataURL(files[0]);
    }
};
