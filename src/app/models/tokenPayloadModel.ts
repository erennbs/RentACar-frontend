export interface TokenPayloadModel {
    nameId: string
    name: string
    email: string
    exp: number
    aud: string
    iss: string
    nbf: number
}