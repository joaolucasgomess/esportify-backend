export default class SportComplex {

    public get id(): string {
        return this._id
    }
    public set id(value: string) {
        this._id = value
    }

    public get name(): string {
        return this._name
    }
    public set name(value: string) {
        this._name = value
    }

    public get cnpj(): string {
        return this._cnpj
    }
    public set cnpj(value: string) {
        this._cnpj = value
    }

    public get street(): string {
        return this._street
    }
    public set street(value: string) {
        this._street = value
    }

    public get neighborhood(): string {
        return this._neighborhood
    }
    public set neighborhood(value: string) {
        this._neighborhood = value
    }

    public get city(): string {
        return this._city
    }
    public set city(value: string) {
        this._city = value
    }

    public get number(): number {
        return this._number
    }
    public set number(value: number) {
        this._number = value
    }

    public get cep(): string {
        return this._cep
    }
    public set cep(value: string) {
        this._cep = value
    }

    constructor(
        private _id: string,
        private _name: string,
        private _cnpj: string,
        private _street: string,
        private _neighborhood: string,
        private _city: string,
        private _number: number,
        private _cep: string
    ) {}
}