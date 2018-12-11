import * as React from 'react';

export interface PaginatorConfig {
    curentPage: number;
    itemsPerPage: number;
    itemsPage: any[];
}

interface PropsPaginator {
    listItemsForPaging: any[];
    paginatorConfig: PaginatorConfig;
    handlePaginator: (config: PaginatorConfig) => void;
    listItemsPerPage?: number[];
}

export const Paginator = (props: PropsPaginator) => {
    const { handlePaginator, listItemsForPaging } = props;
    const { curentPage, itemsPerPage, itemsPage } = props.paginatorConfig;
    const listItemsPerPage = props.listItemsPerPage || [5, 10, 30, 50];
    const numberPage = Math.ceil((listItemsForPaging.length) / itemsPerPage);
    if (!itemsPage.length) {
        handlePaginator({
            curentPage,
            itemsPage: listItemsForPaging.slice(curentPage * itemsPerPage - itemsPerPage, curentPage * itemsPerPage),
            itemsPerPage,
        });
    }

    const handleChangePage = (curentPageChanged: number) => {
        handlePaginator({
            curentPage: curentPageChanged,
            itemsPage: listItemsForPaging.slice(curentPageChanged * itemsPerPage - itemsPerPage, curentPageChanged * itemsPerPage),
            itemsPerPage,
        });
    };

    const changeSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const itemsPerPageSelected = Number(event.currentTarget.value);
        handlePaginator({
            curentPage: 1,
            itemsPage: listItemsForPaging.slice(0, itemsPerPageSelected),
            itemsPerPage: itemsPerPageSelected,
        });
    };
    const clickPrevious = () => {
        const curentPageChanged = curentPage - 1;
        if (curentPageChanged > 0) {
            handleChangePage(curentPageChanged);
        }
    };
    const clickNext = () => {
        const curentPageChanged = curentPage + 1;
        if (curentPageChanged <= numberPage) {
            handleChangePage(curentPageChanged);
        }
    };
    const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const curentPageChanged = Number(event.target.value);
        if (curentPageChanged > 0 && curentPageChanged <= numberPage) {
            handleChangePage(curentPageChanged);
        }
    };

    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
            <button onClick={clickPrevious}>previous</button>
            Go to page
            <input
                min={1}
                max={numberPage}
                onChange={changeInput}
                // onKeyDown={(e) => {e.preventDefault()}}
                type='number'
                value={String(curentPage)}
            />
            of {numberPage}
            <button onClick={clickNext}>next</button>
            Show by
            <select onChange={changeSelected}>
                {listItemsPerPage.map((item: number, index: number) =>
                    <option key={index} value={item}>{item}</option>)}
            </select>
        </div>
    );
};
