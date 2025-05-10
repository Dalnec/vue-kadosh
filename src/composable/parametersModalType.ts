import type { VNode } from "vue";

export type ModalParameters = {
    /**
     * @params {Function} - Function that returns a component
     * @description CallBack to function when modal is closed.
     */
    afterClose?: () => void;
    /**
     * @params {Component} - Function that returns a component
     * @description Component of the modal.
     */
    component: VNode | Record<string, any>;
    /**
     * @params {Component} - Function that returns a component
     * @description Component of footer modal.
     */
    footer?: string | null;
    /**
     *  @params {string} - default value.
     *  @description Title of the modal.
     */
    header: string;
    /**
     * @params {boolean} false - default value.
     * @description Visible of the modal.
     */
    visible: boolean;
    /**
     *  @params {string} - default value.
     *  @description Size of the modal.
     */
    width: string
};
