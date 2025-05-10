export interface ErrorResponse {
    input: Input;
    loc: Array<number | string>;
    msg: string;
    type: string;
}

export interface Input {
    name: string;
}
