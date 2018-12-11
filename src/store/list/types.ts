export interface List {
    results: Data[];
    next: number;
}

export interface Data {
    name: string;
    url: string;
}

export const enum ListActionTypes {
    FETCH_REQUEST = '@@list/FETCH_REQUEST',
    FETCH_SUCCESS = '@@list/FETCH_SUCCESS',
}

export interface ListState {
    readonly loading: boolean;
    readonly loaded: boolean;
    readonly data: List;
}
