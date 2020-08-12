import React, { useState, useEffect, useRef } from 'react';
import { TreeItem } from '@material-ui/lab';

function ArbolInventarioFaltante(props) {
    const equipoInventario = props.equipoInventario;
    const nodeId = props.nodeId;

    // const [renderItem, setRenderItem] = useState(<React.Fragment />);
    const [tree, setTree] = useState({
        incluirRama: true,
        hijos: [],
        nodeId: nodeId,
        nombreEquipo: ""
    });
    const mounted = useRef(false);

    console.log(`============Arbol Entro: ${nodeId}==================`);
    console.log(equipoInventario);
    console.log('====================================');

    /**
     * Esta función se encarga de visualizar recursivamente los equipos en los cuales se usa como componente 
     * el equipo de la variable global equipoInventario 
     * @param {*} equipo 
     */
    async function recursionItems(idEquipo, nodeId) {
        let respuesta = {
            incluirRama: false,
            nombreEquipo: "",
            nodeId: "",
            hijos: []
        }
        console.log('==================Equipo==================');
        console.log(`id: ${idEquipo}`);
        let equipo = await fetchEquipo(idEquipo)
        console.log(equipo);
        console.log('====================================');
        respuesta.nodeId = nodeId;
        respuesta.nombreEquipo = equipo.nombreEquipo;

        if (equipo.componentes && equipo.componentes.length === 0) { //Si el equipo no tiene más hijos
            console.log(`============HOJA DELL ARBOL: ${nodeId}==================`);
            console.log(equipo);
            console.log('====================================');
            if (idEquipo === equipoInventario.idEquipo) {
                console.log(`============RAIZ MELA: ${nodeId}==================`);
                console.log();
                console.log('====================================');
                respuesta.incluirRama = true;
            }
        }
        else if (equipo.componentes && equipo.componentes.length) {
            console.log('============RAMA DEL ARBOL========================');
            console.log(equipo);
            console.log('====================================');
            let contHijos = 0;

            for (const hijo of equipo.componentes) {
                console.log('==================HIJO==================');
                console.log(hijo);
                console.log('====================================');
                const idHijo = hijo.equipoID || hijo._id || hijo.idEquipo || hijo.id || hijo;
                const respuestaHijo = await recursionItems(idHijo, `${nodeId}-${contHijos}`);
                contHijos += 1;
                if (respuestaHijo.incluirRama) {
                    respuesta.hijos.push(respuestaHijo);
                }
            }


            if (contHijos) {
                respuesta.incluirRama = true;
            }

        }
        else {//Si hubo problemas en el fetch

        }
        return respuesta;



    }

    /**
     * Función que trae la información de un equipo del back sin los campos populados.
     * @param {String} idEquipo. id del equipo a buscar en el back.
     */
    async function fetchEquipo(idEquipo) {
        return await (await fetch(`/equipos/${idEquipo}/simple`)).json();
    }


    async function body() {
        console.log(`==============BODY: ${nodeId}===================`);
        console.log(equipoInventario);
        console.log('====================================');
        const equipoBase = await fetchEquipo(equipoInventario.idEquipo)

        let baseTree = {
            incluirRama: true,
            nombreEquipo: equipoBase.nombreEquipo,
            nodeId: `${nodeId}`,
            hijos: []
        }

        let cont = 0;
        for (const raiz of equipoInventario.equipo.raices) {
            const treeRaiz = await recursionItems(raiz.id, `${nodeId}-${cont}`)
            baseTree.hijos.push(treeRaiz);
            cont += 1;
        }
        if (mounted.current) {
            // setTree({
            //     incluirRama: true,
            //     hijos: [],
            //     nodeId: nodeId,
            //     nombreEquipo: "abrazadera "
            // });

            setTree(baseTree)
        }
        // setTree({
        //     incluirRama: true,
        //     hijos: [],
        //     nodeId: "00",
        //     nombreEquipo: "abrazadera "
        // });
    }

    function renderTree(treeObject) {
        // if (mounted.current === false) {
        //     return <></>
        // }
        // else {
        return (
            <TreeItem
                nodeId={treeObject.nodeId}
                label={`${treeObject.nombreEquipo}: ${nodeId}`}
                key={treeObject.nodeId}
            >
                {treeObject && treeObject.hijos && treeObject.hijos.map((hijo) => {
                    return renderTree(hijo);
                })}
            </TreeItem>
        )
        // }

    }

    useEffect(() => {
        mounted.current = true;
        return () => { mounted.current = false; };
    }, [])

    useEffect(() => {
        body()
    }, [equipoInventario])

    useEffect(() => {
        console.log(`===TREE Render CHANGE: ${nodeId}=========`);
        console.log(tree);
        console.log('====================================');

    }, [tree])



    return (
        // <TreeItem
        //     label={equipoInventario.equipo.cantidadRequerida}
        //     nodeId={nodeId}
        // >
        //     <TreeItem
        //         nodeId={String(nodeId) + "-1"}
        //         label="prueba"
        //     />
        //     {body()}
        // </TreeItem>
        <>
            {renderTree(tree)}
        </>
    );
}

export default ArbolInventarioFaltante;