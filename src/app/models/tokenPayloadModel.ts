export interface TokenPayloadModel {
    nameid: string
    name: string
    email: string
    exp: number
    aud: string
    iss: string
    nbf: number
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string

}