export class Subasta {
    constructor(subasta) {
        this.identificador = subasta.identificador;
        this.estado = subasta.estado; // abierta || cerrada
        this.subastador = subasta.subastador;
        this.ubicacion = subasta.ubicacion;
        this.capacidadAsistentes = subasta.capacidadAsistentes;
        this.moneda = subasta.moneda; // ARS || USD
        this.descripcion = subasta.descripcion;
        this.nombre = subasta.nombre;
        this.tieneDeposito = subasta.tieneDeposito;
        this.seguridadPropia = subasta.seguridadPropia;
        this.categoria = subasta.categoria; // comun || especial || plata || oro || platino
        this.productos = subasta.productos;
        this.inicio= subasta.inicio;
        this.fin= subasta.fin;
    }
}