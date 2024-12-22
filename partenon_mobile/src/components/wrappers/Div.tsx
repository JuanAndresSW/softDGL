import React from "react";

type props = {
  children: React.ReactNode,
  wrap?: boolean,
  justify?:string,
  align?:string,
  style?: React.CSSProperties,
  className?: string,
  cond?: boolean,
  flex?: boolean
}

/**
 * Envoltorio genérico.
 * @param props.flex    - Si debe ser display flex.
 * @param props.wrap    - Si se debe distribuir los componentes hijos a multiples líneas. Por defecto es verdadero.
 * @param props.justify - El modo de ajustar en el eje X. Por defecto es center.
 * @param props.align   - El modo de ajustar en el eje Y. Por defecto es center.
 * @param props.cond    - La condición para mostrar el contenido.
 */
export default function Div({flex=false, cond=true, wrap=true, justify="center", align="center", children, style, className}: props): JSX.Element {
    return (
      <div className={className} style={
      {...style, display: flex?"flex":'', alignItems: align, justifyContent: justify, flexFlow:wrap?'wrap':'nowrap'}}>

        {cond ? <>{children}</> : null}
      </div>
    )
}