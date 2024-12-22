import { Div } from "components/wrappers";
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
        <Div cond={totalPages>0}>
        <menu data-pagination>

            <BiCaretLeft 
            onMouseDown={ page===0 ? null : ()=>setPage(page--) }
            className=  { page===0 ? "unactive" : null}/>

            <div><p>Página {page+1} de {totalPages}</p></div>

            <BiCaretRight
            onMouseDown={last?null:()=>setPage(page++)}
            className={last?"unactive":null}/>
        </menu>
        </Div>
    );
}