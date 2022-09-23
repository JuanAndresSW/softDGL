import React from "react";
import { BiCaretLeft, BiCaretRight } from "react-icons/bi";
import './Pagination.css';

type props = {
    page: number,
    setPage: Function,
    totalPages: number,
    last: boolean,
}

export default function Pagination({page,setPage, totalPages, last}:props): JSX.Element {
    return (
        <menu data-pagination>

            <button title="página anterior" onClick={ ()=>{ if (page===0) return; setPage(page-1)} }>
            <BiCaretLeft className=  { page===0 ? "unactive" : null}/>
            </button>

            <div><p>{page+1}/{totalPages}</p></div>

            <button title="página siguiente" onClick={()=>{ if (last) return; setPage(page+1)}}>
            <BiCaretRight className={last?"unactive":null}/>
            </button>

        </menu>
    );
}