export class User {
    constructor(user) {
        this.identificador = user.identificador;
        this.numeroPais = user.numeroPais;
        this.admitido = user.admitido;
        this.categoria = user.categoria; 
        this.verificador = user.verificador; 
        this.mail = user.mail; 
        this.metodoDePago = user.metodoDePago; 
        this.metodoDePagoPreferido = user.metodoDePagoPreferido; 
        this.contraseña = user.contraseña; 
        this.documento = user.documento; 
        this.nombre = user.nombre; 
        this.apellido = user.apellido; 
        this.direccion = user.direccion; 
        this.fechanacimiento = user.fechanacimiento; 
        this.estado = user.estado; 
        this.foto = user.foto; 
        this.Token = user.Token;
    }
}